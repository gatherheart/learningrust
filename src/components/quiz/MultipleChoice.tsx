import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isQuizCompleted, markQuizCompleted } from "@/lib/store";

interface Props {
  lessonId: string;
  quizId: string;
  answer: number;
  onSolved: () => void;
}

export function MultipleChoice({ lessonId, quizId, answer, onSolved }: Props) {
  const { t } = useTranslation();
  const alreadyDone = isQuizCompleted(lessonId, quizId);
  const [selected, setSelected] = useState<number | null>(alreadyDone ? answer : null);
  const [state, setState] = useState<"idle" | "wrong" | "right">(
    alreadyDone ? "right" : "idle",
  );

  // Options live in i18n as an array under lessons.<lessonId>.quizzes.<quizId>.options
  const options = t(`lessons.${lessonId}.quizzes.${quizId}.options`, {
    returnObjects: true,
  }) as string[];

  function check() {
    if (selected === answer) {
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
      <div className="space-y-2">
        {Array.isArray(options) &&
          options.map((opt, i) => (
            <label
              key={i}
              className={`flex items-start gap-2 p-2 rounded border cursor-pointer text-sm ${
                selected === i
                  ? "border-rust-500 bg-rust-50"
                  : "border-stone-200 hover:border-stone-300"
              } ${alreadyDone ? "cursor-default" : ""}`}
            >
              <input
                type="radio"
                name={`${lessonId}-${quizId}`}
                checked={selected === i}
                disabled={alreadyDone}
                onChange={() => setSelected(i)}
                className="mt-0.5"
              />
              <span className="font-mono whitespace-pre-wrap">{opt}</span>
            </label>
          ))}
      </div>
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
          <span className="text-emerald-600 text-sm font-medium">
            ✓ {t("ui.correct")}
          </span>
        )}
        {state === "wrong" && (
          <span className="text-red-600 text-sm font-medium">
            ✗ {t("ui.tryAgain")}
          </span>
        )}
      </div>
    </div>
  );
}
