import { useState, useEffect, useCallback } from "react";

/** Base URL for the CMS API. Falls back to same-origin (prod) or localhost (dev). */
const API_BASE =
  process.env.REACT_APP_CMS_API_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3001" : "");

/**
 * Default content values used when the API is unavailable or hasn't loaded yet.
 * These mirror what is stored in server/content.json so the app always works
 * even without a running CMS server.
 *
 * @type {Object}
 */
const DEFAULT_CONTENT = {
  theme: {
    primaryColor: "#7e22ce",
    primaryLight: "#a855f7",
    primaryDark: "#6b21a8",
    secondaryColor: "#e11d48",
    secondaryLight: "#fb7185",
    backgroundHeroGradient:
      "radial-gradient(circle at 20% 20%, rgba(126, 34, 206, 0.08) 0%, rgba(225, 29, 72, 0.08) 90%)",
  },
  tiktoks: [],
  texts: {
    heroTitle: "Create the Future",
    heroSubtitle:
      "Explore different career paths through conversations with professionals",
    heroTitlePl: "Zapracuj na przyszłość",
    heroSubtitlePl:
      "Poznaj różne ścieżki kariery poprzez rozmowy z profesjonalistami",
    statsInterviews: 20,
    statsIndustries: 15,
    statsFollowers: 5500,
    statsViews: 1500000,
  },
};

/**
 * @typedef {Object} CmsContent
 * @property {Object} theme   - CSS variable overrides from the CMS.
 * @property {Array}  tiktoks - List of TikTok video entries managed via admin.
 * @property {Object} texts   - Key text strings editable in the admin.
 */

/**
 * @typedef {Object} UseCmsContentResult
 * @property {CmsContent} content - The loaded (or default) content.
 * @property {boolean}    loading - True while the first fetch is in flight.
 * @property {string|null} error  - Error message if the fetch failed.
 * @property {Function}   reload  - Manually re-fetch content from the API.
 */

/**
 * Fetches dynamic site content from the CMS server and returns it alongside
 * loading / error state. Falls back to DEFAULT_CONTENT if the server is
 * unreachable so the React app always renders correctly.
 *
 * @returns {UseCmsContentResult}
 *
 * @example
 * const { content, loading } = useCmsContent();
 * // content.texts.heroTitle → "Create the Future"
 * // content.tiktoks → [...] (from admin panel)
 */
export function useCmsContent() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/content`, {
        signal: AbortSignal.timeout(5000), // don't block the UI if CMS is slow
      });

      if (!res.ok) throw new Error(`CMS responded with ${res.status}`);

      const data = await res.json();

      // Deep-merge with defaults so missing keys never break the app.
      setContent({
        theme: { ...DEFAULT_CONTENT.theme, ...(data.theme || {}) },
        tiktoks: data.tiktoks?.length ? data.tiktoks : DEFAULT_CONTENT.tiktoks,
        texts: { ...DEFAULT_CONTENT.texts, ...(data.texts || {}) },
      });
      setError(null);
    } catch (err) {
      // CMS unavailable — silently fall back to defaults.
      console.warn("[CMS] Could not reach API, using defaults:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, loading, error, reload: fetchContent };
}
