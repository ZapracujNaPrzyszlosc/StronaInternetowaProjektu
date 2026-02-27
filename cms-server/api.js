/**
 * @fileoverview Thin wrapper around `fetch` that injects the Bearer token
 * stored in `window.AUTH_TOKEN` and throws on non-ok responses.
 */

"use strict";

/**
 * Makes an authenticated JSON request to the CMS API.
 *
 * @param {string} path - Endpoint path (e.g. "/api/content").
 * @param {RequestInit} [opts={}] - Additional fetch options.
 * @returns {Promise<Object>} Parsed JSON response body.
 * @throws {Error} On non-ok HTTP status.
 */
async function apiFetch(path, opts = {}) {
  const headers = { "Content-Type": "application/json" };

  if (window.AUTH_TOKEN) {
    headers["Authorization"] = `Bearer ${window.AUTH_TOKEN}`;
  }

  const res = await fetch(path, { ...opts, headers });
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}
