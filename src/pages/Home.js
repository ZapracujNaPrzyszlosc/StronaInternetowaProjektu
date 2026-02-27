import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  SITE_INFO,
  SOCIAL_LINKS,
  TIKTOK_VIDEOS,
  YOUTUBE,
  ROUTES,
} from "../config/constants";

/**
 * Hero component - landing section.
 */
const Hero = () => {
  const { t } = useTranslation("home");

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>{t("hero.title")}</h1>
            <p className="hero-subtitle">{t("hero.subtitle")}</p>
            <div className="hero-buttons">
              <Link to={ROUTES.about} className="btn btn-primary">
                {t("hero.aboutProject")}
              </Link>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="24"
                  height="24"
                  fill="currentColor"
                  style={{ marginRight: "8px" }}
                >
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
                {t("hero.seeTikToks")}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="blob-animation">
              <div className="tiktok-placeholder">
                <iframe
                  src={TIKTOK_VIDEOS.profileEmbed}
                  allowFullScreen={true}
                  allow="encrypted-media; fullscreen"
                  title="TikTok Zapracuj na przyszłość - osadzony profil"
                  style={{ overflow: "hidden" }}
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="hero-bg">
        <div className="gradient-overlay"></div>
      </div>
    </section>
  );
};

/**
 * Features component - project highlights.
 */
const Features = () => {
  const { t } = useTranslation("home");

  return (
    <section className="features-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{t("features.title")}</h2>
          <p>{t("features.subtitle")}</p>
        </motion.div>

        <div className="features-grid">
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 21a8 8 0 0 0-16 0" />
                <circle cx="10" cy="8" r="5" />
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
              </svg>
            </div>
            <h3>{t("features.interviews.title")}</h3>
            <p>{t("features.interviews.description")}</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
            </div>
            <h3>{t("features.inspiring.title")}</h3>
            <p>{t("features.inspiring.description")}</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
              </svg>
            </div>
            <h3>{t("features.community.title")}</h3>
            <p>{t("features.community.description")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/**
 * TikTok preview component.
 */
const TikTokPreview = () => {
  const { t } = useTranslation("home");
  const [activeTikTok] = useState(0);

  const tiktoks = [
    {
      id: 1,
      title: t("tiktokPreview.featured.title"),
      description: t("tiktokPreview.featured.description"),
      embedUrl: TIKTOK_VIDEOS.profileEmbed,
    },
  ];

  return (
    <section className="tiktok-preview-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{t("tiktokPreview.title")}</h2>
          <p>{t("tiktokPreview.subtitle")}</p>
        </motion.div>

        <div className="tiktok-content-wrapper">
          <motion.div
            className="tiktok-grid"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="tiktok-phone-container">
              <div className="tiktok-phone-frame">
                <div className="tiktok-phone-notch"></div>
                <div className="tiktok-phone-button-right"></div>
                <div className="tiktok-phone-button-left"></div>
                <div className="tiktok-phone-volume"></div>
                <div className="tiktok-embed-wrapper">
                  <iframe
                    src={tiktoks[activeTikTok].embedUrl}
                    allowFullScreen
                    allow="encrypted-media;"
                    title={t("tiktokPreview.title")}
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>

          {/*
           * FIX: renamed from "tiktok-description" to "tiktok-preview-card"
           * to avoid a class name collision with tiktok.css, which applies
           * `overflow: hidden` and `-webkit-line-clamp` to .tiktok-description,
           * causing the entire card to be clipped on the home page.
           */}
          <motion.div
            className="tiktok-description-container"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="tiktok-preview-card">
              <h3>{tiktoks[activeTikTok].title}</h3>
              <p>{tiktoks[activeTikTok].description}</p>
              <p>{t("tiktokPreview.featured.note")}</p>

              <div className="tiktok-buttons">
                <Link to={ROUTES.tiktok} className="btn btn-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: "8px" }}
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  {t("tiktokPreview.seeMoreInterviews")}
                </Link>
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="22"
                    height="22"
                    fill="currentColor"
                    style={{ marginRight: "8px" }}
                  >
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                  </svg>
                  {t("tiktokPreview.followOnTikTok")}
                </a>
              </div>

              {/* Statistics */}
              <div className="tiktok-stats">
                <div className="stat-item">
                  <div className="stat-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <div className="stat-content">
                    <p className="stat-value">70K+</p>
                    <p className="stat-label">
                      {t("tiktokPreview.stats.likes")}
                    </p>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M9 8h7" />
                      <path d="M8 12h8" />
                      <path d="M11 16h5" />
                    </svg>
                  </div>
                  <div className="stat-content">
                    <p className="stat-value">20+</p>
                    <p className="stat-label">
                      {t("tiktokPreview.stats.interviews")}
                    </p>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="stat-content">
                    <p className="stat-value">5.9K+</p>
                    <p className="stat-label">
                      {t("tiktokPreview.stats.followers")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="tiktok-bg-decoration-1"></div>
      <div className="tiktok-bg-decoration-2"></div>
      <div className="gradient-bg"></div>
    </section>
  );
};

/**
 * Call to Action component.
 */
const CallToAction = () => {
  const { t } = useTranslation("home");

  return (
    <section className="cta-section">
      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{t("cta.title")}</h2>
          <p>{t("cta.description")}</p>
          <div className="cta-buttons">
            {/*
             * FIX: was "btn btn-outline" (white text/border — designed for dark
             * backgrounds). This section has a light background, so we use
             * "btn btn-outline-light" (purple border/text, visible on white).
             */}
            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="22"
                height="22"
                fill="currentColor"
                style={{ marginRight: "8px" }}
              >
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
              </svg>
              {t("cta.followTikTok")}
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0V0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z" />
              </svg>
              {t("cta.followInstagram")}
            </a>
          </div>
        </motion.div>
      </div>
      <div className="cta-bg">
        <div className="glass-effect"></div>
      </div>
    </section>
  );
};

/**
 * YouTube section component.
 */
const YouTubeSection = () => {
  const { t } = useTranslation("home");
  return (
    <section className="youtube-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{t("youtube.title")}</h2>
          <p>{t("youtube.subtitle")}</p>
        </motion.div>
        <motion.div
          className="youtube-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)" }}
        >
          <div className="youtube-embed">
            <iframe
              width="100%"
              height="100%"
              src={YOUTUBE.projectSummary}
              title={t("youtube.title")}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        <motion.div
          className="project-completion-message"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>{t("youtube.completionMessage")}</p>
        </motion.div>
      </div>
      <div className="gradient-bg"></div>
    </section>
  );
};

/**
 * Main Home component.
 */
function Home() {
  const { t, i18n } = useTranslation("home");
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    document.title = t("meta.title");
  }, [t, i18n.language]);

  return (
    <div className="home-page">
      <Helmet>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <meta name="keywords" content={t("meta.keywords")} />

        <link rel="canonical" href={SITE_INFO.domain} />
        <link rel="alternate" hrefLang="pl" href={SITE_INFO.domain} />
        <link rel="alternate" hrefLang="en" href={SITE_INFO.domain} />
        <link rel="alternate" hrefLang="x-default" href={SITE_INFO.domain} />

        <meta property="og:title" content={t("meta.title")} />
        <meta property="og:description" content={t("meta.description")} />
        <meta property="og:url" content={SITE_INFO.domain} />
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

      <motion.div className="page-background" style={{ y: bgY }}></motion.div>

      <Hero />
      <Features />
      <TikTokPreview />
      <CallToAction />
      <YouTubeSection />

      <div className="bg-shape bg-shape-1"></div>
      <div className="bg-shape bg-shape-2"></div>
      <div className="bg-shape bg-shape-3"></div>
    </div>
  );
}

export default Home;
