"use strict";

/**
 * @fileoverview Website text content editing panel.
 * Manages all editable copy shown on the public-facing site.
 * Depends on: api() from api.js, toast() from utils.js.
 */

/**
 * Maps each form input ID to the corresponding API content key.
 * Labels in the HTML use plain language so non-technical editors understand
 * what each field controls on the live site.
 *
 * @type {Array<{id: string, key: string}>}
 */
const TEXT_FIELDS = [
  { id: "tx-hero-title-en", key: "heroTitle" },
  { id: "tx-hero-title-pl", key: "heroTitlePl" },
  { id: "tx-hero-sub-en", key: "heroSubtitle" },
  { id: "tx-hero-sub-pl", key: "heroSubtitlePl" },
  { id: "tx-cta-en", key: "ctaTitle" },
  { id: "tx-cta-pl", key: "ctaTitlePl" },
  { id: "tx-followers", key: "statsFollowers" },
  { id: "tx-views", key: "statsViews" },
  { id: "tx-interviews", key: "statsInterviews" },
  { id: "tx-industries", key: "statsIndustries" },
];

/**
 * Populates all text input fields from a content texts object received from
 * the API.
 *
 * @param {Object} texts - Key/value map of content fields.
 */
function populateTexts(texts) {
  TEXT_FIELDS.forEach(({ id, key }) => {
    const el = document.getElementById(id);
    if (el) el.value = texts[key] ?? "";
  });
}

/**
 * Reads all text inputs and persists them to the API via PUT.
 *
 * @returns {Promise<void>}
 */
async function saveTexts() {
  const values = Object.fromEntries(
    TEXT_FIELDS.map(({ id, key }) => [
      key,
      document.getElementById(id)?.value ?? "",
    ]),
  );

  try {
    await api("/api/content", {
      method: "PUT",
      body: JSON.stringify({ texts: values }),
    });
    toast("All texts saved successfully.");
  } catch (err) {
    toast(err.message, "error");
  }
}

document.getElementById("texts-save-btn").addEventListener("click", saveTexts);
