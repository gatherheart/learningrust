import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isQuizCompleted, markQuizCompleted } from "@/lib/store";

interface Props {
  lessonId: string;
  quizId: string;
  template: string;
  blanks: string[];
  onSolved: () => void;
}

export function FillInBlank({ lessonId, quizId, template, blanks, onSolved }: Props) {
  const { t } = useTranslation();
  const alreadyDone = isQuizCompleted(lessonId, quizId);
  const segments = template.split("___");
  const [values, setValues] = useState<string[]>(() =>
    alreadyDone ? blanks.slice() : blanks.map(() => ""),
  );
  const [state, setState] = useState<"idle" | "wrong" | "right">(
    alreadyDone ? "right" : "idle",
  );

  function check() {
    const ok = values.every((v, i) => v.trim() === blanks[i]);
    if (ok) {
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
      <pre className="font-mono text-sm bg-stone-50 border border-stone-200 rounded p-3 whitespace-pre-wrap leading-6">
        {segments.map((seg, i) => (
          <span key={i}>
            {seg}
            {i < blanks.length && (
              <input
                value={values[i]}
                onChange={(e) =>
                  setValues((vs) => vs.map((v, j) => (j === i ? e.target.value : v)))
                }
                readOnly={alreadyDone}
                size={Math.max(blanks[i].length + 2, 4)}
                className="inline-block px-1 mx-0.5 font-mono border-b-2 border-rust-500 bg-rust-50 focus:outline-none focus:bg-white"
              />
            )}
          </span>
        ))}
      </pre>
      <div className="flex items-center gap-3 mt-3">
        {!alreadyDone && (
          <button
            onClick={check}
            className="px-4 py-1.5 bg-rust-500 hover:bg-rust-600 text-white text-sm rounded font-medium"
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
