import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Lesson } from "@/types";
import { isLessonUnlocked, lessonProgress } from "@/lib/store";

interface Props {
  lessons: Lesson[];
}

export function Sidebar({ lessons }: Props) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  const totalDone = useMemo(
    () =>
      lessons.filter(
        (l) => lessonProgress(l.id, l.quizzes.length).done,
      ).length,
    // Re-evaluate whenever progress changes are reflected through React renders.
    // The Lesson view forces re-renders via setRefresh after each solve.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lessons, query],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return lessons.map((l, i) => ({ lesson: l, index: i }));
    return lessons
      .map((l, i) => ({ lesson: l, index: i }))
      .filter(({ lesson }) => {
        const title = (t(`lessons.${lesson.id}.title`) as string).toLowerCase();
        return title.includes(q) || lesson.id.toLowerCase().includes(q);
      });
  }, [lessons, query, t]);

  const pct = lessons.length === 0 ? 0 : Math.round((totalDone / lessons.length) * 100);

  return (
    <aside className="w-72 shrink-0 border-r border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 overflow-y-auto flex flex-col">
      <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-700">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="text-xs uppercase tracking-wide text-stone-500 dark:text-stone-400 font-semibold">
            {t("ui.lessons")}
          </h2>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
            {totalDone}/{lessons.length}
          </span>
        </div>
        <div className="h-1.5 bg-stone-200 dark:bg-stone-700 rounded overflow-hidden mb-2">
          <div
            className="h-full bg-rust-500 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("ui.search") as string}
          className="w-full text-sm px-2 py-1.5 border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 placeholder:text-stone-400"
        />
      </div>
      <ul>
        {filtered.map(({ lesson, index }) => {
          const unlocked = isLessonUnlocked(index, lessons);
          const prog = lessonProgress(lesson.id, lesson.quizzes.length);
          return (
            <li key={lesson.id}>
              <NavLink
                to={unlocked ? `/lesson/${lesson.id}` : "#"}
                onClick={(e) => !unlocked && e.preventDefault()}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 px-4 py-2.5 text-sm border-b border-stone-100 dark:border-stone-800",
                    !unlocked && "opacity-40 cursor-not-allowed",
                    unlocked &&
                      "hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200",
                    isActive &&
                      "bg-rust-50 dark:bg-rust-900/20 border-l-4 border-l-rust-500",
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                <span className="font-mono text-xs text-stone-400 w-6">
                  {String(index + 1).padStart(2, "0")}
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
