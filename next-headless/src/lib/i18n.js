import { isBrowser } from "utils/isBrowser";
import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import nextI18NextConfig from "../../next-i18next.config";

if (isBrowser()) {
  const LanguageDetector = require("i18next-browser-languagedetector").default;
  i18n.use(LanguageDetector);
}

i18n.use(initReactI18next).init({
  ...nextI18NextConfig,
  fallbackLng: "en",
  detection: {
    order: isBrowser()
      ? [
          // "cookie",
          "localStorage",
          // "navigator",
          // "htmlTag",
          // "path",
          // "subdomain",
        ]
      : [],
    caches: isBrowser()
      ? [
          // "cookie",
          "localStorage",
        ]
      : [],
  },
});

export default i18n;
