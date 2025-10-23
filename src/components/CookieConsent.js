import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../styles/cookie-consent.css";
import {
  isStorageAvailable,
  saveToStorage,
  getFromStorage,
  setCookie,
  getCookie,
} from "../utils/storageUtils";

const CookieConsent = () => {
  const { t } = useTranslation("common");
  const [showConsent, setShowConsent] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [consentOptions, setConsentOptions] = useState({
    necessary: true,
    analytics: true,
  });

  const useLocalStorage = isStorageAvailable();

  const savePreference = (key, value) => {
    if (useLocalStorage) {
      return saveToStorage(key, value);
    } else {
      return setCookie(key, value);
    }
  };

  const getPreference = React.useCallback(
    (key, defaultValue = null) => {
      if (useLocalStorage) {
        return getFromStorage(key, defaultValue);
      } else {
        return getCookie(key, defaultValue);
      }
    },
    [useLocalStorage]
  );

  useEffect(() => {
    const fetchPreferences = () => {
      const cookieConsent = getPreference("cookieConsent");

      if (!cookieConsent) {
        const timer = setTimeout(() => {
          setShowConsent(true);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        try {
          const savedOptionsStr = getPreference("cookieOptions", "{}");
          const savedOptions = JSON.parse(savedOptionsStr);

          if (savedOptions && Object.keys(savedOptions).length > 0) {
            setConsentOptions({
              necessary: true,
              analytics: savedOptions.analytics === true,
            });
          }

          if (
            cookieConsent === "accepted" ||
            (cookieConsent === "customized" && savedOptions.analytics === true)
          ) {
            enableAnalytics({ analytics: true });
          } else {
            disableAnalytics();
          }
        } catch (error) {
          console.error("Error processing saved preferences:", error);
        }
      }
    };

    fetchPreferences();
  }, [getPreference]);

  const acceptAllCookies = () => {
    const options = {
      necessary: true,
      analytics: true,
    };

    savePreference("cookieConsent", "accepted");
    savePreference("cookieOptions", JSON.stringify(options));

    setConsentOptions(options);
    setShowConsent(false);
    enableAnalytics(options);
  };

  const acceptCustomized = () => {
    savePreference("cookieConsent", "customized");
    savePreference("cookieOptions", JSON.stringify(consentOptions));

    setShowConsent(false);
    setShowCustomize(false);

    if (consentOptions.analytics) {
      enableAnalytics(consentOptions);
    } else {
      disableAnalytics();
    }
  };

  const declineAllCookies = () => {
    const options = {
      necessary: true,
      analytics: false,
    };

    savePreference("cookieConsent", "declined");
    savePreference("cookieOptions", JSON.stringify(options));

    setConsentOptions(options);
    setShowConsent(false);
    disableAnalytics();
  };

  const disableNonEssential = () => {
    setConsentOptions({
      necessary: true,
      analytics: false,
    });
  };

  const handleOptionChange = (option) => {
    setConsentOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const enableAnalytics = (options) => {
    if (window.gtag && options.analytics) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: "cookie_consent_update",
        cookie_consent: {
          analytics: options.analytics,
        },
      });
    }

    if (window.hj && options.analytics) {
      window.hj("consent", true);
    }
  };

  const disableAnalytics = () => {
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: "cookie_consent_declined",
      });
    }

    if (window.hj) {
      window.hj("consent", false);
    }
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          className={`cookie-banner ${showCustomize ? "expanded" : ""}`}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {!showCustomize ? (
            <>
              <p>{t("cookies.message")}</p>
              <div className="cookie-actions">
                <button
                  className="cookie-btn secondary"
                  onClick={declineAllCookies}
                >
                  {t("cookies.decline")}
                </button>
                <button
                  className="cookie-btn secondary"
                  onClick={() => setShowCustomize(true)}
                >
                  {t("cookies.customize")}
                </button>
                <button
                  className="cookie-btn primary"
                  onClick={acceptAllCookies}
                >
                  {t("cookies.acceptAll")}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="cookie-customize-header">
                <h3>{t("cookies.settings.title")}</h3>
                <button
                  className="cookie-close"
                  onClick={() => setShowCustomize(false)}
                >
                  &times;
                </button>
              </div>

              <div className="cookie-options">
                <div className="cookie-option">
                  <div className="cookie-option-header">
                    <label className="cookie-option-label">
                      <input
                        type="checkbox"
                        checked={consentOptions.necessary}
                        disabled={true}
                        readOnly
                      />
                      <span className="cookie-option-title">
                        {t("cookies.settings.necessary.title")}
                      </span>
                      <span className="cookie-required-badge">
                        {t("cookies.settings.necessary.badge")}
                      </span>
                    </label>
                  </div>
                  <p className="cookie-option-description">
                    {t("cookies.settings.necessary.description")}
                  </p>
                </div>

                <div className="cookie-option">
                  <div className="cookie-option-header">
                    <label className="cookie-option-label">
                      <input
                        type="checkbox"
                        checked={consentOptions.analytics}
                        onChange={() => handleOptionChange("analytics")}
                      />
                      <span className="cookie-option-title">
                        {t("cookies.settings.analytics.title")}
                      </span>
                    </label>
                  </div>
                  <p className="cookie-option-description">
                    {t("cookies.settings.analytics.description")}
                  </p>
                </div>
              </div>

              <div className="cookie-customize-footer">
                <button
                  className="cookie-btn secondary"
                  onClick={disableNonEssential}
                >
                  {t("cookies.settings.disableAnalytics")}
                </button>
                <button
                  className="cookie-btn primary"
                  onClick={acceptCustomized}
                >
                  {t("cookies.settings.saveChoice")}
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
