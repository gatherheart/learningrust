import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LOCALES } from "@/i18n";

export function Header() {
  const { t, i18n } = useTranslation();
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block w-7 h-7 rounded-full bg-rust-500 text-white grid place-items-center font-bold font-mono">
            R
          </span>
          <span className="font-semibold text-stone-800">{t("ui.appName")}</span>
        </Link>
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="text-sm border border-stone-300 rounded px-2 py-1 bg-white"
          aria-label="Language"
        >
          {LOCALES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
