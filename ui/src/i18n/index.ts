import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import zh from "./locales/zh.json";
import pagesEn from "./locales/en.json";
import pagesZh from "./locales/zh.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en, pages: pagesEn },
    zh: { translation: zh, pages: pagesZh },
  },
  lng: "zh",
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
