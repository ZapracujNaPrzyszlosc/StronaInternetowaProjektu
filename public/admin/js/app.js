/**
 * @fileoverview Application bootstrap.
 *
 * - Wires all event listeners (login, nav, save buttons, preview toggle).
 * - Registers State.onChange(Preview.render) so any draft change triggers
 *   a live preview update automatically.
 * - Attempts auto-login from a stored session token.
 *
 * Load order (must be last in HTML):
 *   api.js → toast.js → state.js → nav.js → auth.js →
 *   tiktoks.js → theme.js → texts.js → settings.js → preview.js → app.js
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------------------
  // Navigation
  // -------------------------------------------------------------------------
  Nav.init();

  // -------------------------------------------------------------------------
  // Login form
  // -------------------------------------------------------------------------
  const loginBtn = document.getElementById("login-btn");
  const loginPwd = document.getElementById("login-password");

  loginBtn?.addEventListener("click", () => Auth.login(loginPwd?.value ?? ""));
  loginPwd?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") Auth.login(loginPwd.value ?? "");
  });

  // -------------------------------------------------------------------------
  // Logout
  // -------------------------------------------------------------------------
  document.getElementById("logout-btn")?.addEventListener("click", Auth.logout);

  // -------------------------------------------------------------------------
  // TikToks
  // -------------------------------------------------------------------------
  document.getElementById("tt-add-btn")?.addEventListener("click", TikToks.add);

  // -------------------------------------------------------------------------
  // Theme
  // -------------------------------------------------------------------------
  document.getElementById("theme-save-btn")?.addEventListener("click", Theme.save);

  // -------------------------------------------------------------------------
  // Texts
  // -------------------------------------------------------------------------
  document.getElementById("texts-save-btn")?.addEventListener("click", Texts.save);

  // -------------------------------------------------------------------------
  // Settings
  // -------------------------------------------------------------------------
  document.getElementById("settings-save-btn")
    ?.addEventListener("click", Settings.changePassword);

  // -------------------------------------------------------------------------
  // Preview
  // -------------------------------------------------------------------------
  Preview.init();
  document.getElementById("btn-preview")?.addEventListener("click", Preview.toggle);

  // Wire state changes → live preview re-render
  State.onChange((draft) => {
    const panel = document.getElementById("preview-panel");
    if (panel && !panel.hidden) Preview.render(draft);
  });

  // -------------------------------------------------------------------------
  // Auto-login
  // -------------------------------------------------------------------------
  Auth.tryAutoLogin();
});