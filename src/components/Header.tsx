import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LOCALES } from "@/i18n";
import { getTheme, setTheme, type Theme } from "@/lib/theme";

export function Header() {
  const { t, i18n } = useTranslation();
  const [theme, setLocal] = useState<Theme>(getTheme());

  function cycle() {
    const next: Theme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setLocal(next);
    setTheme(next);
  }

  const themeIcon = theme === "dark" ? "☾" : theme === "light" ? "☀" : "⌖";

  return (
    <header className="border-b border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block w-7 h-7 rounded-full bg-rust-500 text-white grid place-items-center font-bold font-mono">
            R
          </span>
          <span className="font-semibold text-stone-800 dark:text-stone-100">
            {t("ui.appName")}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={cycle}
            title={t("ui.theme") + ": " + theme}
            className="text-base w-8 h-8 grid place-items-center border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700"
          >
            {themeIcon}
          </button>
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="text-sm border border-stone-300 dark:border-stone-600 rounded px-2 py-1 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100"
            aria-label="Language"
          >
            {LOCALES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
