import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Lesson } from "@/types";
import { isLessonUnlocked, lessonProgress } from "@/lib/store";

interface Props {
  lessons: Lesson[];
}

export function Sidebar({ lessons }: Props) {
  const { t } = useTranslation();
  return (
    <aside className="w-72 shrink-0 border-r border-stone-200 bg-white overflow-y-auto">
      <div className="px-4 py-3 border-b border-stone-200">
        <h2 className="text-xs uppercase tracking-wide text-stone-500 font-semibold">
          {t("ui.lessons")}
        </h2>
      </div>
      <ul>
        {lessons.map((lesson, i) => {
          const unlocked = isLessonUnlocked(i, lessons);
          const prog = lessonProgress(lesson.id, lesson.quizzes.length);
          return (
            <li key={lesson.id}>
              <NavLink
                to={unlocked ? `/lesson/${lesson.id}` : "#"}
                onClick={(e) => !unlocked && e.preventDefault()}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 px-4 py-2.5 text-sm border-b border-stone-100",
                    !unlocked && "opacity-40 cursor-not-allowed",
                    unlocked && "hover:bg-stone-50",
                    isActive && "bg-rust-50 border-l-4 border-l-rust-500",
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                <span className="font-mono text-xs text-stone-400 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 truncate">
                  {t(`lessons.${lesson.id}.title`)}
                </span>
                <span className="text-xs text-stone-400">
                  {prog.done ? "✓" : `${prog.completed}/${prog.total}`}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
