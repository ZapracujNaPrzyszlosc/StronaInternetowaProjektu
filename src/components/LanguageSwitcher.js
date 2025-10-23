import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../styles/language-switcher.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "pl" ? "en" : "pl";
    i18n.changeLanguage(newLanguage);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleLanguage();
    }
  };

  return (
    <motion.button
      className="language-switcher"
      onClick={toggleLanguage}
      onKeyPress={handleKeyPress}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Zmień język na ${
        currentLanguage === "pl" ? "angielski" : "polski"
      }`}
      tabIndex={0}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 8 6 6" />
        <path d="m4 14 6-6 2-3" />
        <path d="M2 5h12" />
        <path d="M7 2h1" />
        <path d="m22 22-5-10-5 10" />
        <path d="M14 18h6" />
      </svg>
      <span className="lang-text">{currentLanguage.toUpperCase()}</span>
    </motion.button>
  );
};

export default LanguageSwitcher;
