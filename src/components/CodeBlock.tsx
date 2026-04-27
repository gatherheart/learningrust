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
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/20">
      <div className="flex items-center justify-between border-b border-white/10 bg-zinc-950/90 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-300/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">
            main.rs
          </span>
        </div>
        <a
          href={playgroundUrl(code)}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-100 transition hover:border-orange-300/45 hover:bg-orange-500/15"
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
