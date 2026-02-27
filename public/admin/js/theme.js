/**
 * @fileoverview Theme section — color pickers and gradient preview strip.
 *
 * Exposes five color inputs that map directly to the site's CSS variables.
 * Every change patches the draft state → triggers live preview update.
 *
 * Depends on: apiFetch, toast, State (globals).
 */

"use strict";

const Theme = (() => {
  /**
   * Mapping from DOM input IDs to theme object keys.
   * @type {Array<{id: string, key: string, label: string}>}
   */
  const FIELDS = [
    { id: "theme-primary", key: "primaryColor", label: "Primary" },
    { id: "theme-primary-light", key: "primaryLight", label: "Primary Light" },
    { id: "theme-primary-dark", key: "primaryDark", label: "Primary Dark" },
    { id: "theme-secondary", key: "secondaryColor", label: "Secondary" },
    {
      id: "theme-secondary-light",
      key: "secondaryLight",
      label: "Secondary Light",
    },
  ];

  // -------------------------------------------------------------------------
  // Internal helpers
  // -------------------------------------------------------------------------

  /**
   * Reads current values from all colour inputs.
   *
   * @returns {Object} Theme patch object.
   */
  function _readValues() {
    const out = {};
    FIELDS.forEach(({ id, key }) => {
      const el = document.getElementById(id);
      if (el) out[key] = el.value;
    });
    return out;
  }

  /**
   * Updates the gradient preview strip from current picker values.
   */
  function _updateStrip() {
    const strip = document.getElementById("gradient-strip");
    if (!strip) return;

    const colors = _readValues();
    const p = colors.primaryColor ?? "#7e22ce";
    const pl = colors.primaryLightColor ?? "#a855f7";
    const s = colors.secondaryColor ?? "#e11d48";

    strip.style.background = `linear-gradient(135deg, ${p} 0%, ${pl} 50%, ${s} 100%)`;
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  /**
   * Fills color inputs from the content object and attaches change listeners.
   *
   * @param {Object} theme - Theme sub-object from the API response.
   */
  function populate(theme) {
    FIELDS.forEach(({ id, key }) => {
      const picker = document.getElementById(id);
      const hexEl = document.getElementById(`${id}-hex`);

      if (picker) {
        picker.value = theme[key] ?? "#7e22ce";
        picker.addEventListener("input", () => {
          if (hexEl) hexEl.value = picker.value;
          _updateStrip();
          State.patchSection("theme", _readValues());
        });
      }

      if (hexEl) {
        hexEl.value = theme[key] ?? "#7e22ce";
        hexEl.addEventListener("input", () => {
          const val = hexEl.value.trim();
          if (/^#[0-9a-fA-F]{6}$/.test(val)) {
            if (picker) picker.value = val;
            _updateStrip();
            State.patchSection("theme", _readValues());
          }
        });
      }
    });

    _updateStrip();
  }

  /**
   * Saves the current theme values to the API.
   *
   * @returns {Promise<void>}
   */
  async function save() {
    const values = _readValues();

    try {
      await apiFetch("/api/content", {
        method: "PUT",
        body: JSON.stringify({ theme: values }),
      });
      State.patchSection("theme", values);
      State.commit();
      toast("Theme saved.", "success");
    } catch (err) {
      toast(err.message, "error");
    }
  }

  return { populate, save };
})();
