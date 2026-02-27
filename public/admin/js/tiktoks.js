/**
 * @fileoverview TikTok section — list, add, and delete videos.
 *
 * API contract (server.js):
 *   POST   /api/content/tiktoks       body: { title, titlePl, description, descriptionPl, embedUrl }
 *   DELETE /api/content/tiktoks/:id   returns: { ok: true }
 *
 * Both mutating operations re-fetch GET /api/content to get the updated list,
 * because the server returns only the new entry (POST) or { ok } (DELETE).
 *
 * Depends on: apiFetch, esc, toast, State (globals).
 */

"use strict";

const TikToks = (() => {
  /** @type {Array<Object>} */
  let _list = [];

  // -------------------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------------------

  /**
   * Renders the TikTok list into #tiktok-list and updates the count badge.
   */
  function _render() {
    const listEl = document.getElementById("tiktok-list");
    const countEl = document.getElementById("tiktok-count");

    if (countEl) countEl.textContent = _list.length;

    if (!_list.length) {
      listEl.innerHTML =
        '<div class="empty-state">No videos yet. Add one below.</div>';
      return;
    }

    listEl.innerHTML = _list
      .map(
        (t, i) => `
      <div class="tiktok-item">
        <div class="tiktok-thumb">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61
                     c3.95-.43 8.11-1.94 8.11-8.72A6.49 6.49 0 0 0 19 4.77
                     5.91 5.91 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7
                     0C5.27.65 4.09 1 4.09 1A5.91 5.91 0 0 0 4 4.77a6.49 6.49 0
                     0 0-1.72 4.52c0 6.72 4.16 8.28 8.12 8.72A3.37 3.37 0 0 0 9
                     20.13V24"/>
          </svg>
        </div>
        <div class="tiktok-body">
          <div class="tiktok-title-en">${esc(t.title ?? "")}</div>
          <div class="tiktok-title-pl">${esc(t.titlePl ?? "")}</div>
          <div class="tiktok-url">${esc(t.embedUrl ?? "")}</div>
          <div class="tiktok-desc">${esc(t.description ?? "")}</div>
        </div>
        <button
          class="btn btn-danger"
          onclick="TikToks.delete(${i})"
          title="Delete"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
          </svg>
        </button>
      </div>`,
      )
      .join("");
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  /**
   * Initialises the list from existing content (called by Auth on login).
   *
   * @param {Array<Object>} list
   */
  function populate(list) {
    _list = list ?? [];
    _render();
    State.patchSection("tiktoks", [..._list]);
  }

  /**
   * Handles the "Add TikTok" form submission.
   *
   * Field names match the server.js POST /api/content/tiktoks schema:
   *   title, titlePl, description, descriptionPl, embedUrl
   *
   * @returns {Promise<void>}
   */
  async function add() {
    const get = (id) => document.getElementById(id)?.value.trim() ?? "";

    const title = get("tt-title-en");
    const titlePl = get("tt-title-pl");
    const description = get("tt-desc-en");
    const descriptionPl = get("tt-desc-pl");
    const embedUrl = get("tt-url");

    if (!title || !embedUrl) {
      toast("Title (EN) and embed URL are required.", "error");
      return;
    }

    try {
      // Server returns only the new entry — re-fetch to get the full list.
      await apiFetch("/api/content/tiktoks", {
        method: "POST",
        body: JSON.stringify({
          title,
          titlePl,
          description,
          descriptionPl,
          embedUrl,
        }),
      });

      const content = await apiFetch("/api/content");
      _list = content.tiktoks ?? _list;
      _render();
      State.patchSection("tiktoks", [..._list]);
      State.commit();

      [
        "tt-title-en",
        "tt-title-pl",
        "tt-desc-en",
        "tt-desc-pl",
        "tt-url",
      ].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });

      toast("TikTok added successfully.", "success");
    } catch (err) {
      toast(err.message, "error");
    }
  }

  /**
   * Deletes a TikTok by its rendered list index.
   * Uses the numeric `id` field stored in content.json.
   *
   * @param {number} index - Position in the currently rendered list.
   * @returns {Promise<void>}
   */
  async function del(index) {
    const item = _list[index];
    if (!item) return;

    try {
      // Server returns { ok: true } — re-fetch to get the updated list.
      await apiFetch(`/api/content/tiktoks/${item.id}`, { method: "DELETE" });

      const content = await apiFetch("/api/content");
      _list = content.tiktoks ?? _list.filter((_, i) => i !== index);
      _render();
      State.patchSection("tiktoks", [..._list]);
      State.commit();

      toast("TikTok removed.", "success");
    } catch (err) {
      toast(err.message, "error");
    }
  }

  return { populate, add, delete: del };
})();
