import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { rust } from "@codemirror/lang-rust";
import { useTranslation } from "react-i18next";
import { playgroundUrl } from "@/lib/playground";

interface Props {
  code: string;
}

function isDark() {
  return document.documentElement.classList.contains("dark");
}

export function CodeBlock({ code }: Props) {
  const { t } = useTranslation();
  const [dark, setDark] = useState(isDark());

  // Watch for theme changes (toggled by Header) so CodeMirror re-themes live.
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(isDark()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="rounded-lg border border-stone-200 dark:border-stone-700 overflow-hidden bg-white dark:bg-stone-900">
      <div className="flex items-center justify-between px-3 py-2 bg-stone-100 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700">
        <span className="text-xs uppercase tracking-wide text-stone-500 dark:text-stone-400 font-semibold">
          main.rs
        </span>
        <a
          href={playgroundUrl(code)}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-rust-600 dark:text-rust-400 hover:underline"
        >
          {t("ui.tryInPlayground")} ↗
        </a>
      </div>
      <CodeMirror
        value={code}
        extensions={[rust()]}
        editable={false}
        basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: false }}
        theme={dark ? "dark" : "light"}
      />
    </div>
  );
}
