/**
 * @fileoverview Live preview panel.
 *
 * Renders a scaled-down mobile mockup of the public site using the current
 * draft state. Updates in real-time whenever State.onChange() fires.
 *
 * Key names match content.json:
 *   texts.heroTitle, texts.heroSubtitle, texts.heroTitlePl, texts.heroSubtitlePl,
 *   texts.ctaTitle, texts.ctaTitlePl,
 *   texts.statsFollowers, texts.statsViews, texts.statsInterviews, texts.statsIndustries
 *   theme.primaryColor, theme.primaryLight, theme.secondaryColor
 *
 * Depends on: esc, State (globals).
 */

"use strict";

const Preview = (() => {
  /** @type {"en"|"pl"} */
  let _lang = "en";

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  /**
   * Formats a raw number into a K/M-abbreviated display string.
   *
   * @param {number|string} n
   * @returns {string}
   */
  function _fmt(n) {
    const v = Number(n);
    if (isNaN(v)) return String(n ?? "—");
    if (v >= 1_000_000)
      return (v / 1_000_000).toFixed(1).replace(".0", "") + "M";
    if (v >= 1_000) return (v / 1_000).toFixed(1).replace(".0", "") + "K";
    return String(v);
  }

  /**
   * Builds the inner HTML of the preview viewport from a draft state object.
   *
   * @param {Object} draft
   * @returns {string}
   */
  function _html(draft) {
    const theme = draft.theme ?? {};
    const texts = draft.texts ?? {};
    const tiktoks = draft.tiktoks ?? [];

    const primary = theme.primaryColor ?? "#7e22ce";
    const primaryLight = theme.primaryLight ?? "#a855f7";
    const secondary = theme.secondaryColor ?? "#e11d48";

    const heroTitle =
      _lang === "en" ? (texts.heroTitle ?? "") : (texts.heroTitlePl ?? "");

    const heroSub =
      _lang === "en"
        ? (texts.heroSubtitle ?? "")
        : (texts.heroSubtitlePl ?? "");

    const ctaTitle =
      _lang === "en" ? (texts.ctaTitle ?? "") : (texts.ctaTitlePl ?? "");

    const statsHtml = `
      <div class="pv-stats">
        <div class="pv-stat">
          <span class="pv-stat-n">${_fmt(texts.statsFollowers)}</span>
          <span class="pv-stat-l">${_lang === "en" ? "Followers" : "Obserwujący"}</span>
        </div>
        <div class="pv-stat">
          <span class="pv-stat-n">${_fmt(texts.statsViews)}</span>
          <span class="pv-stat-l">${_lang === "en" ? "Views" : "Wyświetlenia"}</span>
        </div>
        <div class="pv-stat">
          <span class="pv-stat-n">${_fmt(texts.statsInterviews)}</span>
          <span class="pv-stat-l">${_lang === "en" ? "Interviews" : "Wywiady"}</span>
        </div>
        <div class="pv-stat">
          <span class="pv-stat-n">${_fmt(texts.statsIndustries)}</span>
          <span class="pv-stat-l">${_lang === "en" ? "Industries" : "Branże"}</span>
        </div>
      </div>`;

    const cardsHtml =
      tiktoks
        .slice(0, 4)
        .map(
          (t) => `
        <div class="pv-card">
          <div class="pv-card-thumb"
               style="background:linear-gradient(135deg,${esc(primary)},${esc(secondary)})">
          </div>
          <div class="pv-card-title">
            ${esc((_lang === "en" ? t.title : t.titlePl) ?? t.title ?? "")}
          </div>
        </div>`,
        )
        .join("") ||
      '<p style="color:#888;font-size:.7rem;text-align:center;padding:1rem">No videos yet</p>';

    return `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: sans-serif; font-size: 12px; line-height: 1.4; color: #111; }
        .pv-nav  { display:flex; align-items:center; justify-content:space-between;
                   padding:.5rem .75rem; background:#fff; border-bottom:1px solid #eee; }
        .pv-nav-brand { font-weight:700; font-size:.75rem; color:${esc(primary)}; }
        .pv-nav-lang  { font-size:.65rem; color:#888; }
        .pv-hero { padding:1.25rem .75rem 1rem;
                   background:linear-gradient(135deg,
                     ${esc(primary)} 0%,${esc(primaryLight)} 60%,${esc(secondary)} 100%);
                   color:#fff; }
        .pv-hero-title { font-size:.95rem; font-weight:800; letter-spacing:-.01em; margin-bottom:.3rem; }
        .pv-hero-sub   { font-size:.7rem; opacity:.85; }
        .pv-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:.25rem;
                    padding:.75rem; background:#f8f8fa; border-bottom:1px solid #eee; }
        .pv-stat  { text-align:center; }
        .pv-stat-n { display:block; font-size:.8rem; font-weight:700; color:${esc(primary)}; }
        .pv-stat-l { display:block; font-size:.58rem; color:#888; }
        .pv-section-title { padding:.6rem .75rem .3rem; font-size:.7rem; font-weight:700;
                             text-transform:uppercase; letter-spacing:.06em; color:#555; }
        .pv-grid  { display:grid; grid-template-columns:1fr 1fr; gap:.5rem;
                    padding:0 .75rem .75rem; }
        .pv-card  { border-radius:6px; overflow:hidden; border:1px solid #eee; }
        .pv-card-thumb { height:52px; }
        .pv-card-title { padding:.25rem .35rem; font-size:.62rem; font-weight:600;
                          white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .pv-cta  { padding:1rem .75rem; text-align:center;
                   background:linear-gradient(135deg,${esc(secondary)},${esc(primary)});
                   color:#fff; }
        .pv-cta-title { font-size:.85rem; font-weight:700; margin-bottom:.25rem; }
        .pv-footer { padding:.5rem .75rem; background:#111; color:#888;
                     font-size:.6rem; text-align:center; }
      </style>
      <div class="pv-nav">
        <span class="pv-nav-brand">Create the Future</span>
        <span class="pv-nav-lang">${_lang.toUpperCase()}</span>
      </div>
      <div class="pv-hero">
        <div class="pv-hero-title">${esc(heroTitle) || "Hero title…"}</div>
        <div class="pv-hero-sub">${esc(heroSub) || "Hero subtitle…"}</div>
      </div>
      ${statsHtml}
      <div class="pv-section-title">Videos</div>
      <div class="pv-grid">${cardsHtml}</div>
      <div class="pv-cta">
        <div class="pv-cta-title">${esc(ctaTitle) || "CTA title…"}</div>
      </div>
      <div class="pv-footer">© Create the Future</div>`;
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  /**
   * Wires the EN/PL language-toggle buttons in the preview header.
   * Call once after the DOM is ready.
   */
  function init() {
    document.querySelectorAll(".btn-lang").forEach((btn) => {
      btn.addEventListener("click", () => {
        _lang = btn.dataset.lang ?? "en";
        document
          .querySelectorAll(".btn-lang")
          .forEach((b) => b.classList.toggle("active", b === btn));
        render(State.get());
      });
    });
  }

  /**
   * Renders the draft state into the preview iframe.
   *
   * @param {Object} draft - Current draft from State.get().
   */
  function render(draft) {
    const frame = /** @type {HTMLIFrameElement|null} */ (
      document.getElementById("preview-frame")
    );
    if (!frame) return;

    const doc = frame.contentDocument ?? frame.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(
      `<!doctype html><html><body style="margin:0">${_html(draft)}</body></html>`,
    );
    doc.close();
  }

  /**
   * Toggles the preview panel open/closed.
   */
  function toggle() {
    const app = document.getElementById("app");
    const panel = document.getElementById("preview-panel");
    const btn = document.getElementById("btn-preview");

    const isOpen = app?.classList.toggle("preview-open");
    if (panel) panel.hidden = !isOpen;
    if (btn) btn.classList.toggle("active-preview", !!isOpen);

    if (isOpen) render(State.get());
  }

  return { init, render, toggle };
})();
