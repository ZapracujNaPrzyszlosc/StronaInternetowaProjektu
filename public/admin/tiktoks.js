"use strict";

/**
 * @fileoverview TikTok video management: render list, add, edit, delete.
 * Depends on: api() from api.js, toast() / esc() from utils.js.
 */

/** @type {Array<Object>} Local cache of TikTok records from the API. */
let _tiktoks = [];

/**
 * Replaces the TikTok list cache and re-renders the DOM.
 *
 * @param {Array<Object>} tiktoks - Array of TikTok objects from the API.
 */
function setTikToks(tiktoks) {
  _tiktoks = tiktoks;
  renderTikToks();
}

/**
 * Renders the current `_tiktoks` array to the `#tt-list` container and updates
 * the count badge.
 */
function renderTikToks() {
  const list = document.getElementById("tt-list");
  const badge = document.getElementById("tt-badge");
  badge.textContent = _tiktoks.length;

  if (!_tiktoks.length) {
    list.innerHTML = '<div class="empty">No videos yet. Add one below.</div>';
    return;
  }

  list.innerHTML = _tiktoks
    .map(
      (t, i) => `
    <div class="tt-item" id="tt-item-${t.id}">
      <div class="tt-num">${i + 1}</div>
      <div class="tt-body">
        <div class="tt-title-en">${esc(t.title)}</div>
        ${t.titlePl ? `<div class="tt-title-pl">${esc(t.titlePl)}</div>` : ""}
        <div class="tt-url">${esc(t.embedUrl)}</div>
        <div class="tt-edit" id="edit-${t.id}">
          <div class="grid-2">
            <div class="form-row"><label>Title EN</label><input id="e-en-${t.id}" value="${esc(t.title)}" /></div>
            <div class="form-row"><label>Title PL</label><input id="e-pl-${t.id}" value="${esc(t.titlePl || "")}" /></div>
            <div class="form-row"><label>Description EN</label><textarea id="e-den-${t.id}">${esc(t.description || "")}</textarea></div>
            <div class="form-row"><label>Description PL</label><textarea id="e-dpl-${t.id}">${esc(t.descriptionPl || "")}</textarea></div>
          </div>
          <div class="form-row"><label>Embed URL</label><input id="e-url-${t.id}" class="mono" value="${esc(t.embedUrl)}" /></div>
          <div class="tt-edit-actions">
            <button class="btn btn-primary" onclick="saveTikTok(${t.id})">Save</button>
            <button class="btn btn-ghost" onclick="toggleEdit(${t.id})">Cancel</button>
          </div>
        </div>
      </div>
      <div class="tt-actions">
        <button class="btn btn-ghost" onclick="toggleEdit(${t.id})" title="Edit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="btn btn-danger" onclick="deleteTikTok(${t.id})" title="Delete">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
        </button>
      </div>
    </div>
  `,
    )
    .join("");
}

/**
 * Toggles the inline edit panel for the given TikTok item.
 *
 * @param {number} id - TikTok record ID.
 */
function toggleEdit(id) {
  document.getElementById(`edit-${id}`).classList.toggle("open");
}

/**
 * Saves edits to an existing TikTok by PUTting the full tiktoks array.
 *
 * @param {number} id - TikTok record ID.
 * @returns {Promise<void>}
 */
async function saveTikTok(id) {
  const get = (s) => document.getElementById(s)?.value.trim() ?? "";
  const idx = _tiktoks.findIndex((t) => t.id === id);
  if (idx < 0) return;

  _tiktoks[idx] = {
    ..._tiktoks[idx],
    title: get(`e-en-${id}`),
    titlePl: get(`e-pl-${id}`),
    description: get(`e-den-${id}`),
    descriptionPl: get(`e-dpl-${id}`),
    embedUrl: get(`e-url-${id}`),
  };

  try {
    await api("/api/content", {
      method: "PUT",
      body: JSON.stringify({ tiktoks: _tiktoks }),
    });
    renderTikToks();
    toast("Video updated.");
  } catch (err) {
    toast(err.message, "error");
  }
}

/**
 * Reads the add-video form and posts a new TikTok to the API.
 * Reloads the full list from the server after success to stay in sync.
 *
 * @returns {Promise<void>}
 */
async function addTikTok() {
  const g = (id) => document.getElementById(id)?.value.trim() ?? "";
  const title = g("tt-en");
  const embedUrl = g("tt-url");

  if (!title || !embedUrl) {
    toast("Title (EN) and Embed URL are required.", "error");
    return;
  }

  try {
    await api("/api/content/tiktoks", {
      method: "POST",
      body: JSON.stringify({
        title,
        titlePl: g("tt-pl"),
        description: g("tt-desc-en"),
        descriptionPl: g("tt-desc-pl"),
        embedUrl,
      }),
    });

    const content = await api("/api/content");
    setTikToks(content.tiktoks ?? []);

    ["tt-en", "tt-pl", "tt-desc-en", "tt-desc-pl", "tt-url"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });

    toast("Video added.");
  } catch (err) {
    toast(err.message, "error");
  }
}

/**
 * Deletes a TikTok by ID after a native confirm dialog.
 * Reloads the full list from the server after success.
 *
 * @param {number} id
 * @returns {Promise<void>}
 */
async function deleteTikTok(id) {
  if (!confirm("Delete this video? This cannot be undone.")) return;

  try {
    await api(`/api/content/tiktoks/${id}`, { method: "DELETE" });
    const content = await api("/api/content");
    setTikToks(content.tiktoks ?? []);
    toast("Video removed.");
  } catch (err) {
    toast(err.message, "error");
  }
}

document.getElementById("tt-add-btn").addEventListener("click", addTikTok);
