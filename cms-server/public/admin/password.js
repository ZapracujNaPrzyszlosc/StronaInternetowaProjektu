"use strict";

/**
 * @fileoverview Admin password change panel with real-time UX feedback:
 * - password strength meter (weak / fair / strong)
 * - live match indicator on the confirm field
 * - submit button disabled until requirements are met
 * - clears both fields and resets UI on success
 *
 * Depends on: api() from api.js, toast() from utils.js.
 */

// ── DOM references ─────────────────────────────────────────────────────────────

const pwNewEl = /** @type {HTMLInputElement} */ (
  document.getElementById("pw-new")
);
const pwConfirmEl = /** @type {HTMLInputElement} */ (
  document.getElementById("pw-confirm")
);
const pwSaveBtn = document.getElementById("pw-save-btn");
const pwErrorEl = document.getElementById("pw-error");
const strengthBar = document.getElementById("pw-strength-fill");
const strengthLabel = document.getElementById("pw-strength-label");
const strengthWrap = document.getElementById("pw-strength");
const confirmHint = document.getElementById("pw-confirm-hint");

// ── Strength scoring ───────────────────────────────────────────────────────────

/**
 * Calculates a password strength score from 0 to 3.
 * Checks: minimum length, mixed case, digits/symbols.
 *
 * @param {string} pw
 * @returns {{score: number, label: string, color: string}}
 */
function scorePassword(pw) {
  if (!pw) return { score: 0, label: "", color: "" };

  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw) || /[^A-Za-z0-9]/.test(pw)) score++;

  // cap to 3 levels
  const capped = Math.min(score, 3);
  const levels = [
    null,
    { label: "Weak", color: "#ef4444" },
    { label: "Fair", color: "#f97316" },
    { label: "Strong", color: "#16a34a" },
  ];

  return { score: capped, ...(levels[capped] ?? { label: "", color: "" }) };
}

// ── Real-time listeners ────────────────────────────────────────────────────────

/**
 * Updates the strength bar and label whenever the new-password field changes.
 */
pwNewEl.addEventListener("input", () => {
  const pw = pwNewEl.value;
  const { score, label, color } = scorePassword(pw);

  if (pw.length > 0) {
    strengthWrap.style.display = "block";
    strengthBar.style.width = `${(score / 3) * 100}%`;
    strengthBar.style.background = color;
    strengthLabel.textContent = label;
    strengthLabel.style.color = color;
  } else {
    strengthWrap.style.display = "none";
  }

  // Re-run confirm match check if user already typed there
  if (pwConfirmEl.value) updateConfirmHint();
  updateSaveButton();
});

/**
 * Updates the match indicator whenever the confirm field changes.
 */
pwConfirmEl.addEventListener("input", () => {
  updateConfirmHint();
  updateSaveButton();
});

/**
 * Shows a green "Passwords match" or red "Passwords do not match" hint below
 * the confirm field.
 */
function updateConfirmHint() {
  const match =
    pwNewEl.value === pwConfirmEl.value && pwConfirmEl.value.length > 0;
  const empty = pwConfirmEl.value.length === 0;

  pwConfirmEl.classList.toggle("input-ok", match);
  pwConfirmEl.classList.toggle("input-error", !match && !empty);

  if (empty) {
    confirmHint.textContent = "";
    confirmHint.className = "field-hint";
  } else if (match) {
    confirmHint.textContent = "✓ Passwords match";
    confirmHint.className = "field-hint ok";
  } else {
    confirmHint.textContent = "Passwords do not match";
    confirmHint.className = "field-hint error";
  }
}

/**
 * Enables the save button only when both fields pass validation:
 * new password ≥ 8 chars and both fields match.
 */
function updateSaveButton() {
  const valid =
    pwNewEl.value.length >= 8 && pwNewEl.value === pwConfirmEl.value;
  pwSaveBtn.disabled = !valid;
}

// ── Submit ─────────────────────────────────────────────────────────────────────

/**
 * Submits the password change request to the API.
 * On success: clears the form, resets all indicators, shows a toast.
 * On failure: shows the server error message inline.
 *
 * @returns {Promise<void>}
 */
async function changePassword() {
  const newPassword = pwNewEl.value;

  // Guard — button should already be disabled, but double-check
  if (newPassword.length < 8 || newPassword !== pwConfirmEl.value) return;

  pwErrorEl.style.display = "none";
  pwSaveBtn.disabled = true;
  pwSaveBtn.textContent = "Saving…";

  try {
    await api("/api/auth/change-password", {
      method: "POST",
      body: JSON.stringify({ newPassword }),
    });

    // Reset form and all visual states
    pwNewEl.value = "";
    pwConfirmEl.value = "";
    strengthWrap.style.display = "none";
    confirmHint.textContent = "";
    confirmHint.className = "field-hint";
    pwConfirmEl.classList.remove("input-ok", "input-error");
    pwNewEl.classList.remove("input-ok", "input-error");

    toast("Password updated. You will stay logged in.");
  } catch (err) {
    pwErrorEl.textContent = err.message;
    pwErrorEl.style.display = "block";
  } finally {
    // Restore button label; disabled state comes from updateSaveButton
    pwSaveBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14" stroke-width="2">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
      Update password`;
    updateSaveButton();
  }
}

// Initialise button state (disabled until form is valid)
updateSaveButton();

document
  .getElementById("pw-save-btn")
  .addEventListener("click", changePassword);
