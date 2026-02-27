"use strict";

/**
 * @fileoverview Shared UI utilities: toast notifications, tab navigation, and
 * HTML escaping. No dependencies on other admin modules.
 */

// ── Toasts ────────────────────────────────────────────────────────────────────

/**
 * Shows a self-dismissing toast notification at the bottom-right of the screen.
 *
 * @param {string} msg - Message text to display.
 * @param {"success"|"error"} [type="success"] - Visual variant.
 */
function toast(msg, type = "success") {
  const icon =
    type === "success"
      ? `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`
      : `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`;

  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.innerHTML = `${icon}<span>${String(msg)}</span>`;
  document.getElementById("toast-root").appendChild(el);

  setTimeout(() => {
    el.style.cssText =
      "opacity:0;transform:translateY(6px);transition:opacity .25s,transform .25s";
    setTimeout(() => el.remove(), 260);
  }, 3000);
}

// ── Tab navigation ────────────────────────────────────────────────────────────

/**
 * Switches the visible panel by toggling `.active` on tab buttons and panels.
 *
 * @param {string} name - Panel name matching the `data-tab` / `data-panel` attributes.
 */
function showTab(name) {
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
  document
    .querySelectorAll(".panel")
    .forEach((p) => p.classList.toggle("active", p.dataset.panel === name));
}

document
  .querySelectorAll(".tab")
  .forEach((t) => t.addEventListener("click", () => showTab(t.dataset.tab)));

// ── XSS escaping ─────────────────────────────────────────────────────────────

/**
 * Escapes HTML special characters to prevent XSS when injecting user-supplied
 * strings into innerHTML.
 *
 * @param {*} str - Value to escape; coerced to string.
 * @returns {string} HTML-safe string.
 */
function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
