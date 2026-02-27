/**
 * @fileoverview Transient toast notifications rendered at the bottom-right
 * of the viewport. Auto-dismiss after 3 s.
 */

"use strict";

const ICONS = {
  success: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
  </svg>`,
  error: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
  </svg>`,
};

/**
 * Displays a transient toast notification.
 *
 * @param {string} message - Text to show.
 * @param {"success"|"error"} [type="success"] - Visual variant.
 */
function toast(message, type = "success") {
  const root = document.getElementById("toast-root");
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.innerHTML = `${ICONS[type] ?? ""}<span>${message}</span>`;
  root.appendChild(el);

  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(6px)";
    el.style.transition = "opacity .25s, transform .25s";
    setTimeout(() => el.remove(), 260);
  }, 3000);
}
