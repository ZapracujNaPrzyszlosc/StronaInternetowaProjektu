import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useAnalytics } from "../context/AnalyticsContext";

function TikTok() {
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation("tiktok");
  const analytics = useAnalytics();

  // Dane TikToków z bezpośrednimi linkami do wideo
  const tiktokData = [
    {
      id: 1,
      title: t("videos.weddingPlanner.title"),
      description: t("videos.weddingPlanner.description"),
      embedUrl: "https://www.tiktok.com/embed/v2/7455328205524831510",
      profileUrl: "https://www.tiktok.com/@zapracuj.na.przyszlosc",
    },
    {
      id: 2,
      title: t("videos.pilot.title"),
      description: t("videos.pilot.description"),
      embedUrl: "https://www.tiktok.com/embed/v2/7456826488516644118",
      profileUrl: "https://www.tiktok.com/@zapracuj.na.przyszlosc",
    },
    {
      id: 3,
      title: t("videos.salesDirector.title"),
      description: t("videos.salesDirector.description"),
      embedUrl: "https://www.tiktok.com/embed/v2/7440874750055828758",
      profileUrl: "https://www.tiktok.com/@zapracuj.na.przyszlosc",
    },
    {
      id: 4,
      title: t("videos.graphicDesigner.title"),
      description: t("videos.graphicDesigner.description"),
      embedUrl: "https://www.tiktok.com/embed/v2/7453490391128526102",
      profileUrl: "https://www.tiktok.com/@zapracuj.na.przyszlosc",
    },
    {
      id: 5,
      title: t("videos.furnitureSales.title"),
      description: t("videos.furnitureSales.description"),
      embedUrl: "https://www.tiktok.com/embed/v2/7449853144714005793",
      profileUrl: "https://www.tiktok.com/@zapracuj.na.przyszlosc",
    },
    {
      id: 6,
      title: t("videos.aboutUs.title"),
      description: t("videos.aboutUs.description"),
      embedUrl: "https://www.tiktok.com/embed/v2/7437882349603310870",
      profileUrl: "https://www.tiktok.com/@zapracuj.na.przyszlosc",
    },
  ];

  useEffect(() => {
    document.title = t("meta.title");
  }, [t, i18n.language]);

  useEffect(() => {
    // Symulacja ładowania
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Funkcja śledząca widoczność filmów TikTok
  const handleTikTokInView = (tiktok) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "tiktok_video_viewed",
        tiktok_data: {
          title: tiktok.title,
          id: tiktok.id,
        },
      });
    }
  };

  // Funkcja śledząca kliknięcia w link do TikToka
  const handleTikTokClick = (tiktok) => {
    analytics.trackTikTokClick(tiktok.title, tiktok.profileUrl);
  };

  return (
    <div className="tiktok-page">
      <Helmet>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <meta name="keywords" content={t("meta.keywords")} />
        <link rel="canonical" href="https://zapracujnaprzyszlosc.pl/tiktok" />
        <meta property="og:title" content={t("meta.title")} />
        <meta property="og:description" content={t("meta.description")} />
        <meta
          property="og:url"
          content="https://zapracujnaprzyszlosc.pl/tiktok"
        />
        <meta property="og:type" content="website" />
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
                    className={`tiktok-item ${
                      index % 2 === 0 ? "left-video" : "right-video"
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                    onViewportEnter={() => handleTikTokInView(tiktok)}
                  >
                    <div className="tiktok-video">
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
                    <div className="tiktok-info">
                      <h3 className="tiktok-title">{tiktok.title}</h3>
                      <p className="tiktok-description">{tiktok.description}</p>
                      <a
                        href={tiktok.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleTikTokClick(tiktok)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          width="20"
                          height="20"
                          fill="currentColor"
                          style={{ marginRight: "8px" }}
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
                    href="https://www.tiktok.com/@zapracuj.na.przyszlosc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    onClick={() =>
                      handleTikTokClick({
                        title: "Profil TikTok",
                        profileUrl:
                          "https://www.tiktok.com/@zapracuj.na.przyszlosc",
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
