/**
 * @fileoverview Admin panel client-side logic for the Create the Future CMS.
 *
 * Handles authentication, content fetching/saving, TikTok management,
 * theme editing, gradient preview, and UI utilities (toasts, navigation).
 *
 * Expects the server to be running at the same origin.
 * All API calls attach the JWT stored in sessionStorage as a Bearer token.
 */

"use strict";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Base path for all API endpoints. */
const API = "/api";

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

/**
 * In-memory JWT token.  Populated on successful login and cleared on logout.
 * @type {string|null}
 */
let TOKEN = sessionStorage.getItem("ctf_token");

/**
 * Cached content object returned by GET /api/content.
 * @type {Object|null}
 */
let currentContent = null;

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

/**
 * Shows a transient toast notification at the bottom-right of the viewport.
 *
 * @param {string} message - Text to display inside the toast.
 * @param {"success"|"error"} [type="success"] - Visual variant.
 */
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  const icon =
    type === "success"
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
         </svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
         </svg>`;

  toast.className = `toast toast-${type}`;
  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Makes an authenticated API request.
 *
 * @param {string} path - Endpoint path, e.g. "/api/content".
 * @param {RequestInit} [options={}] - Fetch options (method, body, …).
 * @returns {Promise<Object>} Parsed JSON response body.
 * @throws {Error} If the response status is not ok.
 */
async function apiFetch(path, options = {}) {
  const headers = { "Content-Type": "application/json" };
  if (TOKEN) headers["Authorization"] = `Bearer ${TOKEN}`;

  const res = await fetch(path, { ...options, headers });
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

/**
 * Activates a named section and updates the sidebar nav accordingly.
 *
 * @param {string} sectionId - The `data-section` value of the target section.
 */
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((s) => {
    s.style.display = s.dataset.section === sectionId ? "block" : "none";
  });
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.section === sectionId);
  });
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

/**
 * Attempts to log in with the supplied password.
 * On success stores the JWT and transitions to the main panel.
 *
 * @param {string} password - Plain-text password entered by the user.
 */
async function login(password) {
  try {
    const { token } = await apiFetch(`${API}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    TOKEN = token;
    sessionStorage.setItem("ctf_token", token);
    document.getElementById("login-error").textContent = "";
    await enterPanel();
  } catch (err) {
    document.getElementById("login-error").textContent =
      err.message === "Wrong password" ? "Incorrect password." : err.message;
  }
}

/**
 * Clears the stored token and returns the user to the login screen.
 */
function logout() {
  TOKEN = null;
  sessionStorage.removeItem("ctf_token");
  document.getElementById("login-screen").style.display = "flex";
  document.getElementById("panel").style.display = "none";
  document.getElementById("login-password").value = "";
}

// ---------------------------------------------------------------------------
// Content loading
// ---------------------------------------------------------------------------

/**
 * Fetches site content from the API and populates all panel sections.
 *
 * @returns {Promise<void>}
 */
async function loadContent() {
  currentContent = await apiFetch(`${API}/content`);
  populateTikToks(currentContent.tiktoks || []);
  populateTheme(currentContent.theme || {});
  populateTexts(currentContent.texts || {});
}

/**
 * Transitions from the login screen to the main panel and loads content.
 *
 * @returns {Promise<void>}
 */
async function enterPanel() {
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("panel").style.display = "flex";
  await loadContent();
  showSection("tiktoks");
}

// ---------------------------------------------------------------------------
// TikTok section
// ---------------------------------------------------------------------------

/**
 * Renders the TikTok list in the sidebar card.
 *
 * @param {Array<{id: number, title: string, titlePl?: string, description?: string, descriptionPl?: string, embedUrl: string, profileUrl?: string}>} tiktoks
 */
function populateTikToks(tiktoks) {
  const list = document.getElementById("tiktok-list");
  const count = document.getElementById("tiktok-count");
  count.textContent = tiktoks.length;

  if (tiktoks.length === 0) {
    list.innerHTML =
      '<p style="color:var(--text-muted);font-size:.875rem;padding:.5rem 0">No TikToks yet.</p>';
    return;
  }

  list.innerHTML = tiktoks
    .map(
      (t) => `
      <div class="tiktok-item">
        <div class="tiktok-item-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M3 8h12a2 2 0 012 2v4a2 2 0 01-2 2H3a2 2 0 01-2-2v-4a2 2 0 012-2z"/>
          </svg>
        </div>
        <div class="tiktok-item-body">
          <div class="tiktok-item-title">${escapeHtml(t.title)}</div>
          ${t.titlePl ? `<div class="tiktok-item-title" style="font-weight:400;color:var(--text-muted)">${escapeHtml(t.titlePl)}</div>` : ""}
          <div class="tiktok-item-url">${escapeHtml(t.embedUrl)}</div>
          ${t.description ? `<div class="tiktok-item-desc">${escapeHtml(t.description)}</div>` : ""}
        </div>
        <div class="tiktok-item-actions">
          <button class="btn btn-danger" onclick="deleteTikTok(${t.id})">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Delete
          </button>
        </div>
      </div>`,
    )
    .join("");
}

/**
 * Submits the add-TikTok form and refreshes the list on success.
 *
 * @returns {Promise<void>}
 */
async function addTikTok() {
  const fields = [
    "title",
    "titlePl",
    "description",
    "descriptionPl",
    "embedUrl",
    "profileUrl",
  ];
  const body = Object.fromEntries(
    fields.map((f) => [
      f,
      document.getElementById(`tiktok-${f}`)?.value?.trim() ?? "",
    ]),
  );

  if (!body.title || !body.embedUrl) {
    showToast("Title and Embed URL are required.", "error");
    return;
  }

  try {
    await apiFetch(`${API}/content/tiktoks`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    fields.forEach((f) => {
      const el = document.getElementById(`tiktok-${f}`);
      if (el) el.value = "";
    });
    await loadContent();
    showToast("TikTok added successfully.");
  } catch (err) {
    showToast(err.message, "error");
  }
}

/**
 * Deletes a TikTok by ID after a confirmation prompt.
 *
 * @param {number} id - Numeric TikTok entry ID.
 * @returns {Promise<void>}
 */
async function deleteTikTok(id) {
  if (!confirm("Delete this TikTok?")) return;
  try {
    await apiFetch(`${API}/content/tiktoks/${id}`, { method: "DELETE" });
    await loadContent();
    showToast("TikTok deleted.");
  } catch (err) {
    showToast(err.message, "error");
  }
}

// ---------------------------------------------------------------------------
// Theme section
// ---------------------------------------------------------------------------

/**
 * Populates the theme color inputs with values from the content object.
 *
 * @param {Object} theme - Theme object with color keys and hex values.
 */
function populateTheme(theme) {
  const colorMap = {
    "theme-primary": theme.primary || "#7e22ce",
    "theme-secondary": theme.secondary || "#e11d48",
    "theme-background": theme.background || "#09090b",
    "theme-text": theme.text || "#f4f4f5",
    "theme-accent": theme.accent || "#a855f7",
  };

  Object.entries(colorMap).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.value = value;
  });

  updateGradientPreview();
}

/**
 * Saves the current theme color values to the API.
 *
 * @returns {Promise<void>}
 */
async function saveTheme() {
  const theme = {
    primary: document.getElementById("theme-primary")?.value,
    secondary: document.getElementById("theme-secondary")?.value,
    background: document.getElementById("theme-background")?.value,
    text: document.getElementById("theme-text")?.value,
    accent: document.getElementById("theme-accent")?.value,
  };

  try {
    await apiFetch(`${API}/content`, {
      method: "PUT",
      body: JSON.stringify({ theme }),
    });
    currentContent = { ...currentContent, theme };
    showToast("Theme saved.");
  } catch (err) {
    showToast(err.message, "error");
  }
}

/**
 * Updates the live gradient preview strip based on the current primary and
 * secondary color inputs.
 */
function updateGradientPreview() {
  const primary = document.getElementById("theme-primary")?.value || "#7e22ce";
  const secondary =
    document.getElementById("theme-secondary")?.value || "#e11d48";
  const accent = document.getElementById("theme-accent")?.value || "#a855f7";
  const preview = document.getElementById("gradient-preview");
  if (preview) {
    preview.style.background = `linear-gradient(135deg, ${primary}, ${accent}, ${secondary})`;
  }
}

// ---------------------------------------------------------------------------
// Texts section
// ---------------------------------------------------------------------------

/**
 * Populates text inputs with values from the content object.
 *
 * @param {Object} texts - Flat map of text key → translated string pairs.
 */
function populateTexts(texts) {
  Object.entries(texts).forEach(([key, value]) => {
    const el = document.getElementById(`text-${key}`);
    if (el) el.value = value;
  });
}

/**
 * Saves all text inputs to the API.
 *
 * @returns {Promise<void>}
 */
async function saveTexts() {
  const inputs = document.querySelectorAll("[id^='text-']");
  const texts = {};
  inputs.forEach((el) => {
    const key = el.id.replace(/^text-/, "");
    texts[key] = el.value;
  });

  try {
    await apiFetch(`${API}/content`, {
      method: "PUT",
      body: JSON.stringify({ texts }),
    });
    currentContent = { ...currentContent, texts };
    showToast("Texts saved.");
  } catch (err) {
    showToast(err.message, "error");
  }
}

// ---------------------------------------------------------------------------
// Settings section — change password
// ---------------------------------------------------------------------------

/**
 * Submits a password change request to the API.
 *
 * @returns {Promise<void>}
 */
async function changePassword() {
  const newPw = document.getElementById("new-password")?.value ?? "";
  const confirmPw = document.getElementById("confirm-password")?.value ?? "";

  if (newPw.length < 8) {
    showToast("Password must be at least 8 characters.", "error");
    return;
  }
  if (newPw !== confirmPw) {
    showToast("Passwords do not match.", "error");
    return;
  }

  try {
    await apiFetch(`${API}/auth/change-password`, {
      method: "POST",
      body: JSON.stringify({ newPassword: newPw }),
    });
    document.getElementById("new-password").value = "";
    document.getElementById("confirm-password").value = "";
    showToast("Password changed successfully.");
  } catch (err) {
    showToast(err.message, "error");
  }
}

// ---------------------------------------------------------------------------
// HTML escaping
// ---------------------------------------------------------------------------

/**
 * Escapes a string for safe insertion into HTML content.
 *
 * @param {string} str - Raw string that may contain HTML special characters.
 * @returns {string} HTML-escaped version of the string.
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // --- Login form ---
  const loginBtn = document.getElementById("login-btn");
  const loginInput = document.getElementById("login-password");

  loginBtn?.addEventListener("click", () => login(loginInput.value));
  loginInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") login(loginInput.value);
  });

  // --- Sidebar navigation ---
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => showSection(item.dataset.section));
  });

  // --- Logout ---
  document.getElementById("logout-btn")?.addEventListener("click", logout);

  // --- TikTok form ---
  document
    .getElementById("add-tiktok-btn")
    ?.addEventListener("click", addTikTok);

  // --- Theme ---
  document
    .getElementById("save-theme-btn")
    ?.addEventListener("click", saveTheme);
  ["theme-primary", "theme-secondary", "theme-accent"].forEach((id) => {
    document
      .getElementById(id)
      ?.addEventListener("input", updateGradientPreview);
  });

  // --- Texts ---
  document
    .getElementById("save-texts-btn")
    ?.addEventListener("click", saveTexts);

  // --- Password change ---
  document
    .getElementById("change-password-btn")
    ?.addEventListener("click", changePassword);

  // --- Auto-login if token already exists ---
  if (TOKEN) {
    enterPanel().catch(() => {
      // Token invalid or expired — force re-login.
      logout();
    });
  }
});
