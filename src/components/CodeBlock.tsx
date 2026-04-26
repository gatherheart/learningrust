import CodeMirror from "@uiw/react-codemirror";
import { rust } from "@codemirror/lang-rust";
import { useTranslation } from "react-i18next";
import { playgroundUrl } from "@/lib/playground";

interface Props {
  code: string;
}

export function CodeBlock({ code }: Props) {
  const { t } = useTranslation();
  return (
    <div className="rounded-lg border border-stone-200 overflow-hidden bg-white">
      <div className="flex items-center justify-between px-3 py-2 bg-stone-100 border-b border-stone-200">
        <span className="text-xs uppercase tracking-wide text-stone-500 font-semibold">
          main.rs
        </span>
        <a
          href={playgroundUrl(code)}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-rust-600 hover:text-rust-700 hover:underline"
        >
          {t("ui.tryInPlayground")} ↗
        </a>
      </div>
      <CodeMirror
        value={code}
        extensions={[rust()]}
        editable={false}
        basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: false }}
        theme="light"
      />
    </div>
  );
}
