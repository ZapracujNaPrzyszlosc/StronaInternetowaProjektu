/**
 * @fileoverview Authentication: login, logout, and panel entry.
 *
 * The JWT is stored in `sessionStorage` and exposed as `window.AUTH_TOKEN`
 * so `apiFetch` can read it without an import.
 */

"use strict";

/** sessionStorage key for the JWT. */
const TOKEN_KEY = "ctf_token";

/** Initialise AUTH_TOKEN from storage on page load. */
window.AUTH_TOKEN = sessionStorage.getItem(TOKEN_KEY) ?? null;

const Auth = (() => {
  /**
   * Persists the token and transitions to the main panel.
   *
   * @param {string} token - Valid JWT returned by the login endpoint.
   * @returns {Promise<void>}
   */
  async function _storeAndEnter(token) {
    window.AUTH_TOKEN = token;
    sessionStorage.setItem(TOKEN_KEY, token);
    await _enterPanel();
  }

  /**
   * Fetches content, hydrates state, and switches from login to app.
   *
   * @returns {Promise<void>}
   */
  async function _enterPanel() {
    const content = await apiFetch("/api/content");
    State.init(content);

    TikToks.populate(content.tiktoks ?? []);
    Theme.populate(content.theme ?? {});
    Texts.populate(content.texts ?? {});

    Preview.init();
    State.onChange((draft) => Preview.render(draft));
    Preview.render(State.get());

    document.getElementById("login-screen").hidden = true;
    document.getElementById("app").hidden = false;

    Nav.show("tiktoks");
  }

  /**
   * Attempts to log in with the supplied password.
   *
   * @param {string} password
   * @returns {Promise<void>}
   */
  async function login(password) {
    const errEl = document.getElementById("login-error");
    errEl.style.display = "none";

    try {
      const { token } = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      await _storeAndEnter(token);
    } catch (err) {
      errEl.textContent =
        err.message === "Wrong password" ? "Incorrect password." : err.message;
      errEl.style.display = "block";
    }
  }

  /**
   * Clears the stored token and returns to the login screen.
   */
  function logout() {
    window.AUTH_TOKEN = null;
    sessionStorage.removeItem(TOKEN_KEY);

    document.getElementById("app").hidden = true;
    document.getElementById("login-screen").hidden = false;
    document.getElementById("login-password").value = "";
  }

  /**
   * Auto-login from stored token on page load.
   *
   * @returns {Promise<void>}
   */
  async function tryAutoLogin() {
    if (!window.AUTH_TOKEN) return;
    try {
      await _enterPanel();
    } catch {
      logout(); // token expired or invalid
    }
  }

  return { login, logout, tryAutoLogin };
})();
