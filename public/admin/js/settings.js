/**
 * @fileoverview Settings section — password change.
 *
 * API contract (server.js):
 *   POST /api/auth/change-password  (requires Bearer token)
 *   Body: { newPassword: string }
 *
 * The server validates the token (so current password isn't re-sent),
 * but the form still requires local confirmation before submitting.
 *
 * Depends on: apiFetch, toast (globals).
 */

"use strict";

const Settings = (() => {
  /** Minimum acceptable password length. */
  const MIN_LENGTH = 8;

  /**
   * Shows an inline error message.
   *
   * @param {string} msg
   */
  function _showError(msg) {
    const el = document.getElementById("settings-error");
    if (el) {
      el.textContent = msg;
      el.hidden = false;
    } else toast(msg, "error");
  }

  /** Clears the inline error. */
  function _clearError() {
    const el = document.getElementById("settings-error");
    if (el) {
      el.textContent = "";
      el.hidden = true;
    }
  }

  /**
   * Validates inputs and submits a password change request.
   *
   * @returns {Promise<void>}
   */
  async function changePassword() {
    const newEl = document.getElementById("settings-new-password");
    const confirmEl = document.getElementById("settings-confirm-password");

    const next = newEl?.value ?? "";
    const confirm = confirmEl?.value ?? "";

    _clearError();

    if (next.length < MIN_LENGTH)
      return _showError(
        `New password must be at least ${MIN_LENGTH} characters.`,
      );
    if (next !== confirm) return _showError("Passwords do not match.");

    try {
      await apiFetch("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ newPassword: next }),
      });

      if (newEl) newEl.value = "";
      if (confirmEl) confirmEl.value = "";

      toast("Password updated successfully.", "success");
    } catch (err) {
      _showError(err.message);
    }
  }

  return { changePassword };
})();
