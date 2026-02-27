import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useAnalytics } from "../context/AnalyticsContext";
import { SITE_INFO, SOCIAL_LINKS, TIKTOK_VIDEOS } from "../config/constants";
import { useCmsContent } from "../hooks/useCmsContent";

/**
 * Builds the hardcoded fallback video list from i18n translations + constants.
 * Used when the CMS has no videos configured yet.
 *
 * @param {Function} t - i18next translation function for the "tiktok" namespace.
 * @returns {Array<Object>} Array of video descriptor objects.
 */
const buildFallbackVideos = (t) => [
  {
    id: 1,
    title: t("videos.weddingPlanner.title"),
    description: t("videos.weddingPlanner.description"),
    embedUrl: TIKTOK_VIDEOS.weddingPlanner,
    profileUrl: SOCIAL_LINKS.tiktok,
  },
  {
    id: 2,
    title: t("videos.pilot.title"),
    description: t("videos.pilot.description"),
    embedUrl: TIKTOK_VIDEOS.pilot,
    profileUrl: SOCIAL_LINKS.tiktok,
  },
  {
    id: 3,
    title: t("videos.salesDirector.title"),
    description: t("videos.salesDirector.description"),
    embedUrl: TIKTOK_VIDEOS.salesDirector,
    profileUrl: SOCIAL_LINKS.tiktok,
  },
  {
    id: 4,
    title: t("videos.graphicDesigner.title"),
    description: t("videos.graphicDesigner.description"),
    embedUrl: TIKTOK_VIDEOS.graphicDesigner,
    profileUrl: SOCIAL_LINKS.tiktok,
  },
  {
    id: 5,
    title: t("videos.furnitureSales.title"),
    description: t("videos.furnitureSales.description"),
    embedUrl: TIKTOK_VIDEOS.furnitureSales,
    profileUrl: SOCIAL_LINKS.tiktok,
  },
  {
    id: 6,
    title: t("videos.aboutUs.title"),
    description: t("videos.aboutUs.description"),
    embedUrl: TIKTOK_VIDEOS.aboutUs,
    profileUrl: SOCIAL_LINKS.tiktok,
  },
];

/**
 * Maps a CMS video record to the shape expected by the render loop.
 * Picks PL or EN fields based on the active i18n language.
 *
 * @param {Object} cmsVideo  - Raw CMS video object.
 * @param {string} language  - Active i18n language code ('pl' | 'en').
 * @returns {Object} Normalised video descriptor.
 */
const normaliseCmsVideo = (cmsVideo, language) => ({
  id: cmsVideo.id,
  title:
    language === "pl"
      ? cmsVideo.titlePl || cmsVideo.title
      : cmsVideo.title || cmsVideo.titlePl,
  description:
    language === "pl"
      ? cmsVideo.descriptionPl || cmsVideo.description
      : cmsVideo.description || cmsVideo.descriptionPl,
  embedUrl: cmsVideo.embedUrl,
  profileUrl: cmsVideo.profileUrl || SOCIAL_LINKS.tiktok,
});

function TikTok() {
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation("tiktok");
  const analytics = useAnalytics();
  const { content } = useCmsContent();

  /**
   * Active video list — CMS data takes precedence over hardcoded fallback.
   * When the CMS returns videos, they are normalised for the current language.
   */
  const tiktokData =
    content.tiktoks.length > 0
      ? content.tiktoks.map((v) => normaliseCmsVideo(v, i18n.language))
      : buildFallbackVideos(t);

  useEffect(() => {
    document.title = t("meta.title");
  }, [t, i18n.language]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Pushes a TikTok view event to the data layer.
   *
   * @param {Object} tiktok - Video descriptor object.
   */
  const handleTikTokInView = (tiktok) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "tiktok_video_viewed",
        tiktok_data: { title: tiktok.title, id: tiktok.id },
      });
    }
  };

  /**
   * Tracks a click on a TikTok link.
   *
   * @param {Object} tiktok - Video descriptor object.
   */
  const handleTikTokClick = (tiktok) => {
    analytics.trackTikTokClick(tiktok.title, tiktok.profileUrl);
  };

  return (
    <div className="tiktok-page">
      <Helmet>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <meta name="keywords" content={t("meta.keywords")} />

        <link rel="canonical" href={`${SITE_INFO.domain}/tiktok`} />
        <link
          rel="alternate"
          hrefLang="pl"
          href={`${SITE_INFO.domain}/tiktok`}
        />
        <link
          rel="alternate"
          hrefLang="en"
          href={`${SITE_INFO.domain}/tiktok`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${SITE_INFO.domain}/tiktok`}
        />

        <meta property="og:title" content={t("meta.title")} />
        <meta property="og:description" content={t("meta.description")} />
        <meta property="og:url" content={`${SITE_INFO.domain}/tiktok`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:locale"
          content={i18n.language === "pl" ? "pl_PL" : "en_US"}
        />
        <meta
          property="og:locale:alternate"
          content={i18n.language === "pl" ? "en_US" : "pl_PL"}
        />
        <html lang={i18n.language} />
      </Helmet>

      <section className="tiktok-hero">
        <div className="container">
          <motion.div
            className="tiktok-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>{t("hero.title")}</h1>
            <p className="tiktok-subtitle">{t("hero.subtitle")}</p>
          </motion.div>
        </div>
        <div className="tiktok-hero-bg">
          <div className="gradient-overlay"></div>
        </div>
      </section>

      <section className="tiktok-content">
        <div className="container">
          {isLoading ? (
            <div className="loading-container">
              <div className="loader"></div>
              <p>{t("loading.text")}</p>
            </div>
          ) : (
            <>
              <div className="tiktok-list">
                {tiktokData.map((tiktok, index) => (
                  <motion.div
                    key={tiktok.id}
                    className={`tiktok-item ${index % 2 === 0 ? "left-video" : "right-video"}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                    onViewportEnter={() => handleTikTokInView(tiktok)}
                  >
                    {/* ── Video column ── */}
                    <div className="tiktok-video">
                      <div className="tiktok-video-inner">
                        <iframe
                          src={tiktok.embedUrl}
                          height="730"
                          frameBorder="0"
                          allowFullScreen
                          scrolling="no"
                          allow="encrypted-media;"
                          title={tiktok.title}
                        ></iframe>
                      </div>
                    </div>

                    {/* ── Info column ── */}
                    <div className="tiktok-info">
                      <h3 className="tiktok-title">{tiktok.title}</h3>

                      {tiktok.description && (
                        <p className="tiktok-description">
                          {tiktok.description}
                        </p>
                      )}

                      <a
                        href={tiktok.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tiktok-cta-btn"
                        onClick={() => handleTikTokClick(tiktok)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                        </svg>
                        {t("videoButton")}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="tiktok-follow">
                <motion.div
                  className="follow-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h2>{t("follow.title")}</h2>
                  <p>{t("follow.description")}</p>
                  <a
                    href={SOCIAL_LINKS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    onClick={() =>
                      handleTikTokClick({
                        title: "Profil TikTok",
                        profileUrl: SOCIAL_LINKS.tiktok,
                      })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="24"
                      height="24"
                      fill="currentColor"
                      style={{ marginRight: "12px" }}
                    >
                      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                    </svg>
                    {t("follow.button")}
                  </a>
                </motion.div>
              </div>
            </>
          )}
        </div>
        <div className="tiktok-content-bg">
          <div className="glass-effect"></div>
        </div>
      </section>
    </div>
  );
}

export default TikTok;
