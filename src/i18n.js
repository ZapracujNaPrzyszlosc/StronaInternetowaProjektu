import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  isStorageAvailable,
  getFromStorage,
  saveToStorage,
} from "./utils/storageUtils";

// Import tłumaczeń
import commonPL from "./locales/pl/common.json";
import homePL from "./locales/pl/home.json";
import aboutPL from "./locales/pl/about.json";
import tiktokPL from "./locales/pl/tiktok.json";
import contactPL from "./locales/pl/contact.json";

import commonEN from "./locales/en/common.json";
import homeEN from "./locales/en/home.json";
import aboutEN from "./locales/en/about.json";
import tiktokEN from "./locales/en/tiktok.json";
import contactEN from "./locales/en/contact.json";

// Zasoby tłumaczeń
const resources = {
  pl: {
    common: commonPL,
    home: homePL,
    about: aboutPL,
    tiktok: tiktokPL,
    contact: contactPL,
  },
  en: {
    common: commonEN,
    home: homeEN,
    about: aboutEN,
    tiktok: tiktokEN,
    contact: contactEN,
  },
};

// Niestandardowy detektor języka używający istniejącego storageUtils
const customLanguageDetector = {
  name: "customStorageDetector",
  lookup() {
    // Sprawdź localStorage/cookies używając istniejącej funkcji
    const storedLanguage = getFromStorage("i18nextLng", null);

    if (storedLanguage) {
      return storedLanguage;
    }

    // Fallback do języka przeglądarki
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.split("-")[0]; // 'pl-PL' -> 'pl'
  },
  cacheUserLanguage(lng) {
    // Zapisz wybór języka używając istniejącej funkcji
    saveToStorage("i18nextLng", lng);
  },
};

// Konfiguracja i18next
i18n
  .use({
    type: "languageDetector",
    async: false,
    init: () => {},
    detect: customLanguageDetector.lookup,
    cacheUserLanguage: customLanguageDetector.cacheUserLanguage,
  })
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pl", // Domyślny język - polski
    supportedLngs: ["pl", "en"],
    defaultNS: "common",
    ns: ["common", "home", "about", "tiktok", "contact"],

    interpolation: {
      escapeValue: false, // React już zabezpiecza przed XSS
    },

    react: {
      useSuspense: true, // Włączamy suspense dla lazy loading
    },

    detection: {
      order: ["customStorageDetector", "navigator"],
      caches: [], // Cache jest zarządzany przez customStorageDetector
    },

    // Debug tylko w development
    debug: process.env.NODE_ENV === "development",
  });

export default i18n;
