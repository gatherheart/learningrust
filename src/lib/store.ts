const KEY = "learningrust:progress:v1";

interface Progress {
  completedQuizzes: Record<string, true>; // key: `${lessonId}:${quizId}`
  solvedProblems?: Record<string, true>;
}

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { completedQuizzes: {} };
    return JSON.parse(raw) as Progress;
  } catch {
    return { completedQuizzes: {} };
  }
}

function write(p: Progress) {
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("learningrust:progress"));
}

export function isQuizCompleted(lessonId: string, quizId: string): boolean {
  return read().completedQuizzes[`${lessonId}:${quizId}`] === true;
}

export function markQuizCompleted(lessonId: string, quizId: string): void {
  const p = read();
  p.completedQuizzes[`${lessonId}:${quizId}`] = true;
  write(p);
}

export function lessonProgress(lessonId: string, quizCount: number): {
  completed: number;
  total: number;
  done: boolean;
} {
  const p = read();
  let completed = 0;
  for (const key of Object.keys(p.completedQuizzes)) {
    if (key.startsWith(`${lessonId}:`)) completed++;
  }
  return { completed, total: quizCount, done: completed >= quizCount };
}

export function isLessonUnlocked(
  lessonIndex: number,
  lessons: { id: string; quizzes: { id: string }[] }[],
): boolean {
  if (lessonIndex === 0) return true;
  const prev = lessons[lessonIndex - 1];
  return lessonProgress(prev.id, prev.quizzes.length).done;
}

export function resetProgress(): void {
  localStorage.removeItem(KEY);
}

export function problemSolved(problemId: string): boolean {
  return read().solvedProblems?.[problemId] === true;
}

export function markProblemSolved(problemId: string): void {
  const p = read();
  p.solvedProblems ??= {};
  p.solvedProblems[problemId] = true;
  write(p);
}
