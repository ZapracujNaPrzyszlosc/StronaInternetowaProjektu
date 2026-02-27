"use strict";

/**
 * @fileoverview Authentication flow: login, logout, and auto-restore from
 * a stored session token.
 * Depends on: api() / TOKEN_KEY / AUTH_TOKEN from api.js,
 *             setTikToks() from tiktoks.js,
 *             populateTexts() from texts.js,
 *             toast() from utils.js.
 */

// ── Session ────────────────────────────────────────────────────────────────────

/**
 * Fetches fresh content from the API and transitions to the main app view.
 * Called both after a successful login and on page load if a token is stored.
 *
 * @returns {Promise<void>}
 */
async function enterPanel() {
  const content = await api("/api/content");
  setTikToks(content.tiktoks ?? []);
  populateTexts(content.texts ?? {});

  document.getElementById("login-screen").style.display = "none";
  document.getElementById("app").style.display = "block";
}

// ── Login ──────────────────────────────────────────────────────────────────────

/**
 * Reads the password field, calls the login endpoint, and on success stores
 * the JWT and enters the panel.
 *
 * @returns {Promise<void>}
 */
async function login() {
  const errEl = document.getElementById("login-error");
  const password = document.getElementById("login-password")?.value ?? "";
  errEl.style.display = "none";

  try {
    const { token } = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    window.AUTH_TOKEN = token;
    sessionStorage.setItem(TOKEN_KEY, token);
    await enterPanel();
  } catch (err) {
    errEl.textContent =
      err.message === "Wrong password" ? "Incorrect password." : err.message;
    errEl.style.display = "block";
  }
}

// ── Logout ─────────────────────────────────────────────────────────────────────

/** Clears the stored token and returns to the login screen. */
function logout() {
  window.AUTH_TOKEN = null;
  sessionStorage.removeItem(TOKEN_KEY);
  document.getElementById("app").style.display = "none";
  document.getElementById("login-screen").style.display = "flex";
  document.getElementById("login-password").value = "";
}

// ── Event listeners ────────────────────────────────────────────────────────────

document.getElementById("login-btn").addEventListener("click", login);
document.getElementById("login-password").addEventListener("keydown", (e) => {
  if (e.key === "Enter") login();
});
document.getElementById("logout-btn").addEventListener("click", logout);

// ── Auto-restore session ───────────────────────────────────────────────────────

if (window.AUTH_TOKEN) {
  enterPanel().catch(logout);
}
