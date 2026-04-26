import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isQuizCompleted, markQuizCompleted } from "@/lib/store";

interface Props {
  lessonId: string;
  quizId: string;
  code: string;
  buggyLine: number; // 1-indexed
  onSolved: () => void;
}

export function SpotTheBug({ lessonId, quizId, code, buggyLine, onSolved }: Props) {
  const { t } = useTranslation();
  const alreadyDone = isQuizCompleted(lessonId, quizId);
  const [selected, setSelected] = useState<number | null>(
    alreadyDone ? buggyLine : null,
  );
  const [state, setState] = useState<"idle" | "wrong" | "right">(
    alreadyDone ? "right" : "idle",
  );

  const lines = code.replace(/\n$/, "").split("\n");

  function check() {
    if (selected === buggyLine) {
      setState("right");
      markQuizCompleted(lessonId, quizId);
      onSolved();
    } else {
      setState("wrong");
    }
  }

  return (
    <div className="border border-stone-200 rounded-lg p-4 bg-white">
      <div className="text-sm font-semibold text-stone-700 mb-3">
        {t(`lessons.${lessonId}.quizzes.${quizId}.question`)}
      </div>
      <pre className="font-mono text-sm bg-stone-50 border border-stone-200 rounded overflow-hidden">
        {lines.map((line, i) => {
          const lineNum = i + 1;
          const isSelected = selected === lineNum;
          return (
            <button
              key={i}
              type="button"
              disabled={alreadyDone}
              onClick={() => setSelected(lineNum)}
              className={`flex w-full text-left px-3 py-0.5 ${
                isSelected
                  ? "bg-rust-100 ring-1 ring-rust-500"
                  : "hover:bg-stone-100"
              } ${alreadyDone ? "cursor-default" : "cursor-pointer"}`}
            >
              <span className="text-stone-400 select-none w-8 shrink-0">{lineNum}</span>
              <span className="whitespace-pre">{line || " "}</span>
            </button>
          );
        })}
      </pre>
      <div className="flex items-center gap-3 mt-3">
        {!alreadyDone && (
          <button
            onClick={check}
            disabled={selected === null}
            className="px-4 py-1.5 bg-rust-500 hover:bg-rust-600 disabled:bg-stone-300 text-white text-sm rounded font-medium"
          >
            {t("ui.check")}
          </button>
        )}
        {state === "right" && (
          <span className="text-emerald-600 text-sm font-medium">✓ {t("ui.correct")}</span>
        )}
        {state === "wrong" && (
          <span className="text-red-600 text-sm font-medium">✗ {t("ui.tryAgain")}</span>
        )}
      </div>
    </div>
  );
}
