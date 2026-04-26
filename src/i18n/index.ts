import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ko from "./locales/ko.json";
import ja from "./locales/ja.json";
import zhCN from "./locales/zh-CN.json";
import ru from "./locales/ru.json";
import es from "./locales/es.json";
import id from "./locales/id.json";
import hi from "./locales/hi.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import ptBR from "./locales/pt-BR.json";
import vi from "./locales/vi.json";
import th from "./locales/th.json";
import tr from "./locales/tr.json";
import ar from "./locales/ar.json";
import it from "./locales/it.json";

// Locale registry — every entry shows up in the language switcher.
// `en` is the source of truth; the others are first-pass translations
// and may benefit from native-speaker review. Missing keys fall back
// to English at runtime via the fallbackLng setting below.
//
// `dir: "rtl"` flips text direction. Currently set on Arabic only.
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
  { code: "ar", label: "العربية", dir: "rtl" as const },
  { code: "it", label: "Italiano" },
] as const;

const resources = {
  en: { translation: en },
  ko: { translation: ko },
  ja: { translation: ja },
  "zh-CN": { translation: zhCN },
  ru: { translation: ru },
  es: { translation: es },
  id: { translation: id },
  hi: { translation: hi },
  fr: { translation: fr },
  de: { translation: de },
  "pt-BR": { translation: ptBR },
  vi: { translation: vi },
  th: { translation: th },
  tr: { translation: tr },
  ar: { translation: ar },
  it: { translation: it },
};

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

// Sync <html lang> and <html dir> to the active locale so screen readers
// and CSS :dir() selectors behave correctly (matters most for Arabic).
function applyDir(lng: string) {
  const meta = LOCALES.find((l) => l.code === lng);
  document.documentElement.lang = lng;
  document.documentElement.dir = meta && "dir" in meta ? meta.dir : "ltr";
}
applyDir(i18n.language);
i18n.on("languageChanged", applyDir);

export default i18n;
