/**
 * @fileoverview Texts section — hero, CTA and stats copy in EN/PL.
 *
 * Field names exactly match content.json / server.js schema:
 *   heroTitle, heroSubtitle, heroTitlePl, heroSubtitlePl,
 *   ctaTitle, ctaTitlePl,
 *   statsFollowers, statsViews, statsInterviews, statsIndustries
 *
 * Each input updates the draft state on every keystroke, which automatically
 * triggers a live preview re-render via the State.onChange() pipeline.
 *
 * Depends on: apiFetch, toast, State (globals).
 */

"use strict";

const Texts = (() => {
  /**
   * Maps DOM element IDs to content.json key names.
   * @type {Array<{id: string, path: string}>}
   */
  const FIELDS = [
    { id: "text-hero-title-en", path: "heroTitle" },
    { id: "text-hero-subtitle-en", path: "heroSubtitle" },
    { id: "text-hero-title-pl", path: "heroTitlePl" },
    { id: "text-hero-subtitle-pl", path: "heroSubtitlePl" },
    { id: "text-cta-title-en", path: "ctaTitle" },
    { id: "text-cta-title-pl", path: "ctaTitlePl" },
    { id: "text-stat-followers", path: "statsFollowers" },
    { id: "text-stat-views", path: "statsViews" },
    { id: "text-stat-interviews", path: "statsInterviews" },
    { id: "text-stat-industries", path: "statsIndustries" },
  ];

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  /**
   * Fills text inputs from the content object and wires live-patch listeners.
   *
   * @param {Object} texts - Texts sub-object from the API response.
   */
  function populate(texts) {
    FIELDS.forEach(({ id, path }) => {
      const el = document.getElementById(id);
      if (!el) return;

      el.value = texts[path] ?? "";

      el.addEventListener("input", () => {
        State.patch(`texts.${path}`, el.value);
      });
    });
  }

  /**
   * Collects current input values into a plain object.
   *
   * @returns {Object}
   */
  function _readValues() {
    const out = {};
    FIELDS.forEach(({ id, path }) => {
      const el = document.getElementById(id);
      if (el) out[path] = el.value;
    });
    return out;
  }

  /**
   * Saves all text values to the API.
   *
   * @returns {Promise<void>}
   */
  async function save() {
    const values = _readValues();

    try {
      await apiFetch("/api/content", {
        method: "PUT",
        body: JSON.stringify({ texts: values }),
      });
      State.patchSection("texts", values);
      State.commit();
      toast("Texts saved.", "success");
    } catch (err) {
      toast(err.message, "error");
    }
  }

  return { populate, save };
})();
