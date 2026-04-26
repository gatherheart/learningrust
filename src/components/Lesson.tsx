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

interface Props {
  lessons: LessonT[];
}

export function Lesson({ lessons }: Props) {
  const { id } = useParams();
  const { t } = useTranslation();
  const [, setRefresh] = useState(0);
  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return <div className="p-8 text-stone-500">{t("ui.lessonNotFound")}</div>;
  }

  const refresh = () => setRefresh((n) => n + 1);

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto p-6 space-y-5">
        <div>
          <div className="text-xs uppercase tracking-wide text-rust-600 font-semibold mb-1">
            {t(`topics.${lesson.topic}`)}
          </div>
          <h1 className="text-2xl font-bold text-stone-900">
            {t(`lessons.${lesson.id}.title`)}
          </h1>
          <p className="text-stone-600 mt-2 leading-relaxed">
            {t(`lessons.${lesson.id}.description`)}
          </p>
        </div>

        <CodeBlock code={lesson.code} />

        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wide text-stone-500 font-semibold">
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
