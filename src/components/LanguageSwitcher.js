import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../styles/language-switcher.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Funkcja zmiany języka
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "pl" ? "en" : "pl";
    i18n.changeLanguage(newLanguage);
  };

  // Obsługa klawiatury (Enter i Space)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleLanguage();
    }
  };

  return (
    <div className="language-switcher-container">
      <motion.button
        className="language-switcher"
        onClick={toggleLanguage}
        onKeyPress={handleKeyPress}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Zmień język na ${
          currentLanguage === "pl" ? "angielski" : "polski"
        }`}
        aria-pressed={currentLanguage === "en"}
        role="switch"
        tabIndex={0}
      >
        {/* Tło przełącznika z animowanym gradientem */}
        <motion.div
          className="switcher-background"
          animate={{
            background:
              currentLanguage === "pl"
                ? "linear-gradient(135deg, #7e22ce, #a855f7)"
                : "linear-gradient(135deg, #e11d48, #fb7185)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Animowany slider */}
        <motion.div
          className="switcher-slider"
          animate={{
            x: currentLanguage === "pl" ? 0 : 48,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />

        {/* Opcja PL */}
        <motion.div
          className={`language-option ${
            currentLanguage === "pl" ? "active" : ""
          }`}
          animate={{
            color: currentLanguage === "pl" ? "#ffffff" : "#64748b",
            scale: currentLanguage === "pl" ? 1 : 0.9,
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="flag" role="img" aria-label="Polska">
            🇵🇱
          </span>
          <span className="lang-code">PL</span>
        </motion.div>

        {/* Opcja EN */}
        <motion.div
          className={`language-option ${
            currentLanguage === "en" ? "active" : ""
          }`}
          animate={{
            color: currentLanguage === "en" ? "#ffffff" : "#64748b",
            scale: currentLanguage === "en" ? 1 : 0.9,
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="flag" role="img" aria-label="English">
            🇬🇧
          </span>
          <span className="lang-code">EN</span>
        </motion.div>
      </motion.button>
    </div>
  );
};

export default LanguageSwitcher;
