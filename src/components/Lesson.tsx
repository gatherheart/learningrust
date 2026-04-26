import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Lesson as LessonT } from "@/types";
import { CodeBlock } from "@/components/CodeBlock";
import { PredictOutput } from "@/components/quiz/PredictOutput";
import { MultipleChoice } from "@/components/quiz/MultipleChoice";
import { FillInBlank } from "@/components/quiz/FillInBlank";
import { SpotTheBug } from "@/components/quiz/SpotTheBug";
import { OrderStatements } from "@/components/quiz/OrderStatements";
import { useKeyboardNav } from "@/lib/keyboardNav";
import { lessonProgress } from "@/lib/store";

interface Props {
  lessons: LessonT[];
}

export function Lesson({ lessons }: Props) {
  const { id } = useParams();
  const { t } = useTranslation();
  const [, setRefresh] = useState(0);
  useKeyboardNav(lessons, id);

  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return (
      <div className="p-8 text-stone-500 dark:text-stone-400">
        {t("ui.lessonNotFound")}
      </div>
    );
  }

  const refresh = () => setRefresh((n) => n + 1);
  const prog = lessonProgress(lesson.id, lesson.quizzes.length);
  const allDone = lessons.every((l) => lessonProgress(l.id, l.quizzes.length).done);

  return (
    <main className="flex-1 overflow-y-auto bg-stone-50 dark:bg-stone-950">
      <div className="max-w-3xl mx-auto p-6 space-y-5">
        <div>
          <div className="text-xs uppercase tracking-wide text-rust-600 dark:text-rust-400 font-semibold mb-1">
            {t(`topics.${lesson.topic}`)}
          </div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {t(`lessons.${lesson.id}.title`)}
          </h1>
          <p className="text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
            {t(`lessons.${lesson.id}.description`)}
          </p>
        </div>

        {prog.done && (
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
            <span className="text-lg">🎉</span>
            <span>{t("ui.lessonComplete")}</span>
          </div>
        )}

        {allDone && (
          <div className="rounded-lg bg-rust-500 text-white px-5 py-4 shadow">
            <div className="text-sm uppercase tracking-wide font-semibold mb-1">
              {t("ui.courseCompleteBadge")}
            </div>
            <div className="font-bold">{t("ui.courseComplete")}</div>
          </div>
        )}

        <CodeBlock code={lesson.code} />

        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wide text-stone-500 dark:text-stone-400 font-semibold">
            {t("ui.quizzes")}
          </h2>
          {lesson.quizzes.map((q) => {
            switch (q.type) {
              case "predict-output":
                return (
                  <PredictOutput
                    key={q.id}
                    lessonId={lesson.id}
                    quizId={q.id}
                    expectedOutput={lesson.expectedOutput}
                    onSolved={refresh}
                  />
                );
              case "multiple-choice":
                return (
                  <MultipleChoice
                    key={q.id}
                    lessonId={lesson.id}
                    quizId={q.id}
                    answer={q.answer}
                    onSolved={refresh}
                  />
                );
              case "fill-in-blank":
                return (
                  <FillInBlank
                    key={q.id}
                    lessonId={lesson.id}
                    quizId={q.id}
                    template={q.template}
                    blanks={q.blanks}
                    onSolved={refresh}
                  />
                );
              case "spot-the-bug":
                return (
                  <SpotTheBug
                    key={q.id}
                    lessonId={lesson.id}
                    quizId={q.id}
                    code={q.code}
                    buggyLine={q.buggyLine}
                    onSolved={refresh}
                  />
                );
              case "order-statements":
                return (
                  <OrderStatements
                    key={q.id}
                    lessonId={lesson.id}
                    quizId={q.id}
                    answer={q.answer}
                    onSolved={refresh}
                  />
                );
            }
          })}
        </div>
      </div>
    </main>
  );
}
