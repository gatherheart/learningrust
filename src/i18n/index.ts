import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import ko from "./locales/ko.json";

// Locale registry — every entry shows up in the language switcher.
// `en` is the source of truth; `ko` is a full translation. The remaining
// locales fall back to English until contributors fill them in. Add a file
// in ./locales/<code>.json and import + register it below to enable it.
export const LOCALES = [
  { code: "en", label: "English" },
  { code: "ko", label: "한국어" },
  { code: "ja", label: "日本語" },
  { code: "zh-CN", label: "简体中文" },
  { code: "ru", label: "Русский" },
  { code: "es", label: "Español" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "hi", label: "हिन्दी" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "pt-BR", label: "Português (BR)" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "th", label: "ไทย" },
  { code: "tr", label: "Türkçe" },
  { code: "ar", label: "العربية" },
  { code: "it", label: "Italiano" },
] as const;

const resources: Record<string, { translation: object }> = {
  en: { translation: en },
  ko: { translation: ko },
};

// Register stub resources for the remaining locales so language detection
// doesn't bail out. Missing keys fall back to English via fallbackLng.
for (const { code } of LOCALES) {
  if (!resources[code]) resources[code] = { translation: {} };
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: LOCALES.map((l) => l.code),
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "learningrust:lang",
    },
  });

export default i18n;
