/**
 * @fileoverview Sidebar navigation controller.
 *
 * Handles switching between content panels and updating nav-item active states.
 */

"use strict";

const Nav = (() => {
  /** @type {string} */
  let _active = "tiktoks";

  /**
   * Activates a named panel and updates sidebar highlight.
   *
   * @param {string} section - `data-section` value of the target panel.
   */
  function show(section) {
    _active = section;

    document.querySelectorAll(".panel").forEach((el) => {
      el.classList.toggle("active", el.dataset.section === section);
    });

    document.querySelectorAll(".nav-item[data-section]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.section === section);
    });
  }

  /**
   * Wires click handlers on all `.nav-item[data-section]` elements.
   * Call once after the DOM is ready.
   */
  function init() {
    document.querySelectorAll(".nav-item[data-section]").forEach((btn) => {
      btn.addEventListener("click", () => show(btn.dataset.section));
    });
  }

  return {
    init,
    show,
    get active() {
      return _active;
    },
  };
})();
