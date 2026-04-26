import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isQuizCompleted, markQuizCompleted } from "@/lib/store";

interface Props {
  lessonId: string;
  quizId: string;
  expectedOutput: string;
  onSolved: () => void;
}

function normalize(s: string) {
  return s.replace(/\r\n/g, "\n").trimEnd();
}

export function PredictOutput({ lessonId, quizId, expectedOutput, onSolved }: Props) {
  const { t } = useTranslation();
  const alreadyDone = isQuizCompleted(lessonId, quizId);
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "wrong" | "right">(
    alreadyDone ? "right" : "idle",
  );

  function check() {
    if (normalize(value) === normalize(expectedOutput)) {
      setState("right");
      markQuizCompleted(lessonId, quizId);
      onSolved();
    } else {
      setState("wrong");
    }
  }

  return (
    <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 bg-white dark:bg-stone-900">
      <div className="text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
        {t(`lessons.${lessonId}.quizzes.${quizId}.question`)}
      </div>
      <textarea
        value={alreadyDone ? expectedOutput : value}
        onChange={(e) => setValue(e.target.value)}
        readOnly={alreadyDone}
        rows={Math.max(3, expectedOutput.split("\n").length)}
        className="w-full font-mono text-sm border border-stone-300 dark:border-stone-600 rounded p-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-rust-500"
        placeholder={t("ui.predictPlaceholder") ?? ""}
      />
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
          <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
            ✓ {t("ui.correct")}
          </span>
        )}
        {state === "wrong" && (
          <span className="text-red-600 dark:text-red-400 text-sm font-medium">
            ✗ {t("ui.tryAgain")}
          </span>
        )}
      </div>
    </div>
  );
}
