/**
 * @fileoverview Centralized draft-state store for the admin panel.
 *
 * Maintains two copies of the content:
 *   - `saved`  — last value confirmed to the API
 *   - `draft`  — current working state; changes trigger `onChange` listeners
 *
 * No changes are persisted until `State.commit()` is explicitly called
 * (which is done inside the section save handlers after a successful API call).
 *
 * Usage:
 *   State.init(contentFromApi);
 *   State.patch("texts.heroTitle", "New title");
 *   State.onChange(draft => Preview.render(draft));
 */

"use strict";

const State = (() => {
  /** @type {Object} */
  let _saved = {};

  /** @type {Object} */
  let _draft = {};

  /** @type {Array<function>} */
  const _listeners = [];

  /**
   * Deep-clones a plain object.
   *
   * @param {Object} obj
   * @returns {Object}
   */
  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Sets a nested value inside an object using a dot-separated path.
   * Creates intermediate objects as needed.
   *
   * @param {Object} obj  - Root object to mutate.
   * @param {string} path - Dot path, e.g. "theme.primaryColor".
   * @param {*}      val  - Value to set.
   */
  function setPath(obj, path, val) {
    const keys = path.split(".");
    let cur = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (cur[keys[i]] == null || typeof cur[keys[i]] !== "object") {
        cur[keys[i]] = {};
      }
      cur = cur[keys[i]];
    }
    cur[keys[keys.length - 1]] = val;
  }

  return {
    /**
     * Initialises both `saved` and `draft` from the API response.
     *
     * @param {Object} data - Raw content object from GET /api/content.
     */
    init(data) {
      _saved = clone(data);
      _draft = clone(data);
    },

    /**
     * Updates a value in the draft and notifies all listeners.
     *
     * @param {string} path - Dot-separated key path (e.g. "texts.heroTitle").
     * @param {*}      value
     */
    patch(path, value) {
      setPath(_draft, path, value);
      _listeners.forEach((fn) => fn(_draft));
    },

    /**
     * Replaces an entire top-level section in the draft.
     *
     * @param {"theme"|"texts"|"tiktoks"} section
     * @param {Object|Array} value
     */
    patchSection(section, value) {
      _draft[section] =
        typeof value === "object" && !Array.isArray(value)
          ? { ...(_draft[section] || {}), ...value }
          : value;
      _listeners.forEach((fn) => fn(_draft));
    },

    /**
     * Returns a shallow clone of the current draft.
     *
     * @returns {Object}
     */
    get() {
      return clone(_draft);
    },

    /**
     * Returns a shallow clone of the last saved state.
     *
     * @returns {Object}
     */
    getSaved() {
      return clone(_saved);
    },

    /**
     * Returns true if the draft differs from the saved state.
     *
     * @returns {boolean}
     */
    isDirty() {
      return JSON.stringify(_draft) !== JSON.stringify(_saved);
    },

    /**
     * Marks the current draft as confirmed (syncs saved ← draft).
     * Call this after a successful API write.
     */
    commit() {
      _saved = clone(_draft);
    },

    /**
     * Resets the draft back to the last saved state.
     */
    discard() {
      _draft = clone(_saved);
      _listeners.forEach((fn) => fn(_draft));
    },

    /**
     * Registers a callback that is invoked with the updated draft whenever
     * `patch` or `patchSection` is called.
     *
     * @param {function(Object): void} fn
     */
    onChange(fn) {
      _listeners.push(fn);
    },
  };
})();
