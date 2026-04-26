import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isQuizCompleted, markQuizCompleted } from "@/lib/store";

interface Props {
  lessonId: string;
  quizId: string;
  answer: number[]; // expected order, e.g. [2, 0, 1]
  onSolved: () => void;
}

// Click-to-order UX: tap items in the order they should run.
// Tap an already-ordered item to remove it.
export function OrderStatements({ lessonId, quizId, answer, onSolved }: Props) {
  const { t } = useTranslation();
  const alreadyDone = isQuizCompleted(lessonId, quizId);

  const items = t(`lessons.${lessonId}.quizzes.${quizId}.options`, {
    returnObjects: true,
  }) as string[];

  const [order, setOrder] = useState<number[]>(alreadyDone ? answer.slice() : []);
  const [state, setState] = useState<"idle" | "wrong" | "right">(
    alreadyDone ? "right" : "idle",
  );

  function pick(idx: number) {
    if (alreadyDone) return;
    if (order.includes(idx)) return;
    setOrder([...order, idx]);
  }

  function remove(idx: number) {
    if (alreadyDone) return;
    setOrder(order.filter((i) => i !== idx));
  }

  function check() {
    const ok =
      order.length === answer.length && order.every((v, i) => v === answer[i]);
    if (ok) {
      setState("right");
      markQuizCompleted(lessonId, quizId);
      onSolved();
    } else {
      setState("wrong");
    }
  }

  if (!Array.isArray(items)) return null;

  return (
    <div className="border border-stone-200 rounded-lg p-4 bg-white">
      <div className="text-sm font-semibold text-stone-700 mb-3">
        {t(`lessons.${lessonId}.quizzes.${quizId}.question`)}
      </div>

      <div className="text-xs uppercase tracking-wide text-stone-500 mb-2">
        {t("ui.yourOrder")}
      </div>
      <ol className="min-h-[2.5rem] mb-3 border border-dashed border-stone-300 rounded p-2 space-y-1.5">
        {order.length === 0 && (
          <li className="text-stone-400 text-sm italic">{t("ui.tapItemsBelow")}</li>
        )}
        {order.map((itemIdx, pos) => (
          <li key={`${itemIdx}-${pos}`}>
            <button
              type="button"
              onClick={() => remove(itemIdx)}
              disabled={alreadyDone}
              className="w-full text-left flex items-start gap-2 px-3 py-1.5 rounded bg-rust-50 border border-rust-200 text-sm font-mono"
            >
              <span className="text-rust-600 font-semibold w-6 shrink-0">
                {pos + 1}.
              </span>
              <span className="flex-1">{items[itemIdx]}</span>
              {!alreadyDone && <span className="text-stone-400 text-xs">×</span>}
            </button>
          </li>
        ))}
      </ol>

      <div className="text-xs uppercase tracking-wide text-stone-500 mb-2">
        {t("ui.available")}
      </div>
      <div className="space-y-1.5">
        {items.map((label, i) => {
          const used = order.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => pick(i)}
              disabled={used || alreadyDone}
              className={`w-full text-left px-3 py-1.5 rounded border text-sm font-mono ${
                used
                  ? "bg-stone-100 border-stone-200 text-stone-300"
                  : "bg-white border-stone-300 hover:border-rust-500 hover:bg-rust-50"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-4">
        {!alreadyDone && (
          <button
            onClick={check}
            disabled={order.length !== items.length}
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
