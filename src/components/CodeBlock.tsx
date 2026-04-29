import { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { rust } from "@codemirror/lang-rust";
import { EditorState } from "@codemirror/state";
import { indentUnit } from "@codemirror/language";
import { useTranslation } from "react-i18next";
import { executeRust, playgroundUrl } from "@/lib/playground";

interface Props {
  code: string;
}

function isDark() {
  return document.documentElement.classList.contains("dark");
}

export function CodeBlock({ code }: Props) {
  const { t } = useTranslation();
  const abortRef = useRef<AbortController | null>(null);
  const [dark, setDark] = useState(isDark());
  const [draft, setDraft] = useState(code);
  const [output, setOutput] = useState("");
  const [stderr, setStderr] = useState("");
  const [runState, setRunState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [runError, setRunError] = useState("");

  // Watch for theme changes (toggled by Header) so CodeMirror re-themes live.
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(isDark()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    setDraft(code);
    setOutput("");
    setStderr("");
    setRunState("idle");
    setRunError("");
    abortRef.current?.abort();
    abortRef.current = null;
  }, [code]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function runCode() {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    setRunState("running");
    setRunError("");
    setOutput("");
    setStderr("");

    try {
      const result = await executeRust(draft, controller.signal);
      setOutput(result.stdout);
      setStderr(result.stderr);
      setRunState("done");
    } catch (error) {
      const message = error instanceof Error && error.name === "AbortError"
        ? t("ui.runTimedOut")
        : t("ui.runFailed");
      setRunError(message);
      setRunState("error");
    } finally {
      window.clearTimeout(timeoutId);
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
    }
  }

  function resetCode() {
    abortRef.current?.abort();
    abortRef.current = null;
    setDraft(code);
    setOutput("");
    setStderr("");
    setRunState("idle");
    setRunError("");
  }

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/20">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-zinc-950/90 px-4 py-3">
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
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={runCode}
            disabled={runState === "running"}
            className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-orange-400 disabled:cursor-wait disabled:bg-orange-500/60"
          >
            {runState === "running" ? t("ui.running") : t("ui.runHere")}
          </button>
          <button
            type="button"
            onClick={resetCode}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
          >
            {t("ui.resetCode")}
          </button>
          <a
            href={playgroundUrl(draft)}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-100 transition hover:border-orange-300/45 hover:bg-orange-500/15"
          >
            {t("ui.tryInPlayground")} ↗
          </a>
        </div>
      </div>
      <div className="border-b border-white/10 bg-orange-500/8 px-4 py-2 text-xs text-orange-100">
        {t("ui.runInlineHint")}
      </div>
      <CodeMirror
        value={draft}
        extensions={[EditorState.tabSize.of(2), indentUnit.of("  "), rust()]}
        editable
        onChange={setDraft}
        basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: false }}
        theme={dark ? "dark" : "light"}
      />
      <div className="border-t border-white/10 bg-zinc-950/95 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            {t("ui.output")}
          </div>
          <div className="text-[11px] text-zinc-500">
            {runState === "running" ? t("ui.running") : t("ui.outputReady")}
          </div>
        </div>
        {runError ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {runError}
          </div>
        ) : (
          <div className="grid gap-3 lg:grid-cols-2">
            <section className="rounded-[22px] border border-white/10 bg-black/25 p-4">
              <div className="mb-2 text-xs uppercase tracking-[0.16em] text-zinc-500">
                {t("ui.stdout")}
              </div>
              <pre className="app-scrollbar min-h-28 overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-emerald-100">
                {output || t("ui.outputPlaceholder")}
              </pre>
            </section>
            <section className="rounded-[22px] border border-white/10 bg-black/25 p-4">
              <div className="mb-2 text-xs uppercase tracking-[0.16em] text-zinc-500">
                {t("ui.stderr")}
              </div>
              <pre className="app-scrollbar min-h-28 overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-amber-100">
                {stderr || t("ui.stderrPlaceholder")}
              </pre>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
