"use strict";

/**
 * @fileoverview Authenticated API client for the admin panel.
 * All requests go through the `api()` helper which attaches the JWT token
 * and provides human-readable errors when the server returns non-JSON bodies.
 */

const TOKEN_KEY = "ctf_token";

/**
 * Base URL of the CMS API.
 * In local dev (React on :3000, Express on :3001) we point directly at the
 * Express port. In production both are served from the same origin.
 *
 * @type {string}
 */
const API_BASE = window.location.port === "3000" ? "http://localhost:3001" : "";

/** @type {string|null} Currently active JWT token. */
window.AUTH_TOKEN = sessionStorage.getItem(TOKEN_KEY) ?? null;

/**
 * Authenticated JSON fetch wrapper.
 * Reads the response as plain text first so non-JSON bodies (HTML error pages,
 * empty 204s, etc.) produce a clear error instead of a cryptic JSON.parse failure.
 *
 * @param {string} path - API path, e.g. "/api/content".
 * @param {RequestInit} [opts={}] - Standard fetch options.
 * @returns {Promise<Object>} Parsed JSON response body.
 * @throws {Error} On network failure, non-JSON response, or HTTP error status.
 */
async function api(path, opts = {}) {
  const headers = { "Content-Type": "application/json" };
  if (window.AUTH_TOKEN)
    headers["Authorization"] = `Bearer ${window.AUTH_TOKEN}`;

  let res;
  try {
    res = await fetch(API_BASE + path, { ...opts, headers });
  } catch (err) {
    throw new Error(`Network error: ${err.message}`);
  }

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      `Unexpected server response (${res.status}): ${text.slice(0, 120)}`,
    );
  }

  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}
