"use strict";

/**
 * @fileoverview TikTok video management: render list, drag-and-drop reordering,
 * inline edit, add, and delete.
 *
 * Drag-and-drop uses the native HTML5 Drag and Drop API (no external library).
 * The order is persisted to the API via PUT /api/content immediately after a
 * successful drop.
 *
 * Depends on: api() from api.js, toast() / esc() from utils.js.
 */

/** @type {Array<Object>} Local cache of TikTok records from the API. */
let _tiktoks = [];

/** @type {number|null} Index of the item currently being dragged. */
let _dragSrcIdx = null;

// ── URL helpers ────────────────────────────────────────────────────────────────

/**
 * Extracts a TikTok video ID from any plausible input and returns the
 * canonical embed URL.
 *
 * Handles:
 *   - Regular video URLs: https://www.tiktok.com/@user/video/7580259479464217911
 *   - Share/app URLs that contain /video/<id> anywhere in the path
 *   - Already-formed embed URLs: https://www.tiktok.com/embed/v2/<id>
 *   - Bare numeric IDs: "7580259479464217911"
 *
 * @param {string} input - Any TikTok-related URL or raw video ID.
 * @returns {string|null} Canonical embed URL, or null if no ID could be found.
 */
function extractTikTokEmbedUrl(input) {
  const trimmed = (input ?? "").trim();
  if (!trimmed) return null;

  // Already a valid embed URL — pass through unchanged.
  if (/^https:\/\/www\.tiktok\.com\/embed\/v2\/\d+/.test(trimmed)) {
    return trimmed.split("?")[0]; // strip any query params for cleanliness
  }

  // Extract ID from /video/<digits> (standard & share URLs).
  const videoMatch = trimmed.match(/\/video\/(\d+)/);
  if (videoMatch) {
    return `https://www.tiktok.com/embed/v2/${videoMatch[1]}`;
  }

  // Extract ID from /embed/v2/<digits> (already embed but with extra stuff).
  const embedMatch = trimmed.match(/\/embed\/v2\/(\d+)/);
  if (embedMatch) {
    return `https://www.tiktok.com/embed/v2/${embedMatch[1]}`;
  }

  // Bare numeric ID.
  if (/^\d{10,}$/.test(trimmed)) {
    return `https://www.tiktok.com/embed/v2/${trimmed}`;
  }

  return null;
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Replaces the local TikTok cache and re-renders the list.
 *
 * @param {Array<Object>} tiktoks - Fresh array from the API.
 */
function setTikToks(tiktoks) {
  _tiktoks = tiktoks;
  renderTikToks();
}

// ── Rendering ──────────────────────────────────────────────────────────────────

/**
 * Renders the current `_tiktoks` array to `#tt-list` and updates the count badge.
 * Each item gets a drag handle and the full set of action buttons.
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
    <div class="tt-item"
         id="tt-item-${t.id}"
         data-id="${t.id}"
         data-idx="${i}"
         draggable="true">

      <div class="tt-drag-handle" title="Drag to reorder" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2">
          <circle cx="9"  cy="5"  r="1.2" fill="#aaa"/>
          <circle cx="15" cy="5"  r="1.2" fill="#aaa"/>
          <circle cx="9"  cy="12" r="1.2" fill="#aaa"/>
          <circle cx="15" cy="12" r="1.2" fill="#aaa"/>
          <circle cx="9"  cy="19" r="1.2" fill="#aaa"/>
          <circle cx="15" cy="19" r="1.2" fill="#aaa"/>
        </svg>
      </div>

      <div class="tt-num">${i + 1}</div>

      <div class="tt-body">
        <div class="tt-title-en">${esc(t.title)}</div>
        ${t.titlePl ? `<div class="tt-title-pl">${esc(t.titlePl)}</div>` : ""}
        <div class="tt-url">${esc(t.embedUrl)}</div>

        <div class="tt-edit" id="edit-${t.id}">
          <div class="titles-grid">
            <div class="form-row">
              <label>Title — English</label>
              <input id="e-en-${t.id}" value="${esc(t.title)}" />
            </div>
            <div class="form-row">
              <label>Title — Polish</label>
              <input id="e-pl-${t.id}" value="${esc(t.titlePl || "")}" />
            </div>
          </div>
          <div class="desc-grid">
            <div class="form-row">
              <label>Description — English</label>
              <textarea id="e-den-${t.id}">${esc(t.description || "")}</textarea>
            </div>
            <div class="form-row">
              <label>Description — Polish</label>
              <textarea id="e-dpl-${t.id}">${esc(t.descriptionPl || "")}</textarea>
            </div>
          </div>
          <div class="form-row">
            <label>TikTok link</label>
            <input id="e-url-${t.id}" class="mono" value="${esc(t.embedUrl)}"
              placeholder="https://www.tiktok.com/@user/video/123456…" />
            <div class="hint">Paste any TikTok link — the video ID will be extracted automatically.</div>
          </div>
          <div class="tt-edit-actions">
            <button class="btn btn-primary" onclick="saveTikTok(${t.id})">Save</button>
            <button class="btn btn-ghost"   onclick="toggleEdit(${t.id})">Cancel</button>
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

  _attachDragHandlers();
}

// ── Drag & Drop ────────────────────────────────────────────────────────────────

/**
 * Attaches HTML5 drag-and-drop event listeners to every `.tt-item` after render.
 *
 * Only initiates a drag when the pointer went down on the drag handle, so
 * clicking buttons and inputs inside the card still works normally.
 *
 * @private
 */
function _attachDragHandlers() {
  document.querySelectorAll(".tt-item[draggable]").forEach((item) => {
    // Allow drag only when the mousedown target was the handle
    item.addEventListener("mousedown", (e) => {
      item.draggable = !!e.target.closest(".tt-drag-handle");
    });

    item.addEventListener("dragstart", (e) => {
      if (!item.draggable) {
        e.preventDefault();
        return;
      }
      _dragSrcIdx = Number(item.dataset.idx);
      e.dataTransfer.effectAllowed = "move";
      setTimeout(() => item.classList.add("dragging"), 0);
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
      document
        .querySelectorAll(".tt-item")
        .forEach((el) => el.classList.remove("drag-over"));
    });

    item.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (Number(item.dataset.idx) !== _dragSrcIdx) {
        document
          .querySelectorAll(".tt-item")
          .forEach((el) => el.classList.remove("drag-over"));
        item.classList.add("drag-over");
      }
    });

    item.addEventListener("dragleave", () => {
      item.classList.remove("drag-over");
    });

    item.addEventListener("drop", async (e) => {
      e.preventDefault();
      const targetIdx = Number(item.dataset.idx);
      if (_dragSrcIdx === null || targetIdx === _dragSrcIdx) return;

      const moved = _tiktoks.splice(_dragSrcIdx, 1)[0];
      _tiktoks.splice(targetIdx, 0, moved);
      _dragSrcIdx = null;

      renderTikToks();

      try {
        await api("/api/content", {
          method: "PUT",
          body: JSON.stringify({ tiktoks: _tiktoks }),
        });
        toast("Order saved.");
      } catch (err) {
        toast(err.message, "error");
      }
    });
  });
}

// ── CRUD ───────────────────────────────────────────────────────────────────────

/**
 * Toggles the inline edit panel for the given TikTok.
 *
 * @param {number} id
 */
function toggleEdit(id) {
  document.getElementById(`edit-${id}`).classList.toggle("open");
}

/**
 * Persists edits to an existing TikTok by PUTting the full array.
 * The URL field accepts any TikTok link — the video ID is extracted
 * automatically via {@link extractTikTokEmbedUrl}.
 *
 * @param {number} id
 * @returns {Promise<void>}
 */
async function saveTikTok(id) {
  const get = (s) => document.getElementById(s)?.value.trim() ?? "";
  const idx = _tiktoks.findIndex((t) => t.id === id);
  if (idx < 0) return;

  const rawUrl = get(`e-url-${id}`);
  const embedUrl = extractTikTokEmbedUrl(rawUrl);
  if (!embedUrl) {
    toast("Could not extract a video ID from that link.", "error");
    return;
  }

  _tiktoks[idx] = {
    ..._tiktoks[idx],
    title: get(`e-en-${id}`),
    titlePl: get(`e-pl-${id}`),
    description: get(`e-den-${id}`),
    descriptionPl: get(`e-dpl-${id}`),
    embedUrl,
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
 * POSTs a new TikTok from the add-form, then reloads the list.
 * The URL field accepts any TikTok link — the video ID is extracted
 * automatically via {@link extractTikTokEmbedUrl}.
 *
 * @returns {Promise<void>}
 */
async function addTikTok() {
  const g = (id) => document.getElementById(id)?.value.trim() ?? "";
  const title = g("tt-en");
  const rawUrl = g("tt-url");

  if (!title) {
    toast("Title (EN) is required.", "error");
    return;
  }

  const embedUrl = extractTikTokEmbedUrl(rawUrl);
  if (!embedUrl) {
    toast("Could not extract a video ID from that link.", "error");
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
 * DELETEs a TikTok after confirmation, then reloads the list.
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
