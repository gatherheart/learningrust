import { useMemo, useState } from "react";
import { playgroundUrl } from "@/lib/playground";
import { markProblemSolved, problemSolved } from "@/lib/store";
import { problems } from "@/data/problems";
import { useProgressVersion } from "@/lib/useProgressVersion";

function difficultyTone(level: "easy" | "medium" | "hard") {
  if (level === "easy") {
    return "border-emerald-400/25 bg-emerald-500/10 text-emerald-100";
  }
  if (level === "medium") {
    return "border-amber-400/25 bg-amber-500/10 text-amber-100";
  }
  return "border-rose-400/25 bg-rose-500/10 text-rose-100";
}

export function ProblemSolving() {
  const progressVersion = useProgressVersion();
  const totalSolved = useMemo(
    () => problems.filter((problem) => problemSolved(problem.id)).length,
    [progressVersion],
  );

  return (
    <main className="app-scrollbar flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_24%),linear-gradient(180deg,rgba(9,9,11,0.86),rgba(9,9,11,0.98))]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 lg:px-6 lg:py-6">
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
          <div className="rounded-[30px] border border-white/10 bg-zinc-950/85 p-6 shadow-2xl shadow-black/25">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-sky-100">
                Problem solving
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-zinc-400">
                {problems.length} drills
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-50 lg:text-4xl">
              Solve input/output problems with Rust
            </h1>
            <div className="mt-4 space-y-3 text-base leading-8 text-zinc-300">
              <p>Use these drills when you want algorithm practice but cannot run Rust locally.</p>
              <p>The set now mixes warm-up tasks with harder patterns like prefix sums, stack validation, and sliding windows.</p>
              <p>Each problem gives you sample input, a starter Rust template, and answer boxes where you can validate expected output by reasoning through the logic.</p>
              <p>When you are ready to code, open the same starter template in Rust Playground.</p>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#0d1117] p-5 shadow-2xl shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                PS progress
              </div>
              <div className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-zinc-300">
                {totalSolved}/{problems.length}
              </div>
            </div>
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-300"
                style={{
                  width: `${Math.round((totalSolved / problems.length) * 100) || 0}%`,
                }}
              />
            </div>
            <div className="space-y-3 font-mono text-sm leading-7 text-zinc-300">
              <div>
                <span className="text-emerald-300">$</span> plan -&gt; reason -&gt; validate -&gt; code
              </div>
              <div className="text-zinc-500">1. Read the input format carefully.</div>
              <div className="text-zinc-500">2. Predict the sample outputs by hand.</div>
              <div className="text-zinc-500">3. Move to Rust Playground with the starter code.</div>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          {problems.map((problem) => (
            <ProblemCard key={problem.id} problemId={problem.id} />
          ))}
        </section>
      </div>
    </main>
  );
}

function ProblemCard({ problemId }: { problemId: string }) {
  const problem = problems.find((entry) => entry.id === problemId)!;
  const [answers, setAnswers] = useState<string[]>(() => problem.samples.map(() => ""));
  const [checked, setChecked] = useState(false);
  const solved = problemSolved(problem.id);

  const isCorrect = checked && problem.samples.every((sample, index) =>
    answers[index].replace(/\r\n/g, "\n").trim() === sample.output.trim(),
  );

  function validate() {
    setChecked(true);
    const ok = problem.samples.every((sample, index) =>
      answers[index].replace(/\r\n/g, "\n").trim() === sample.output.trim(),
    );
    if (ok) markProblemSolved(problem.id);
  }

  return (
    <article className="rounded-[30px] border border-white/10 bg-zinc-950/80 p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
            {problem.id}
          </div>
          <h2 className="mt-1 text-2xl font-semibold text-zinc-50">{problem.title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-300">{problem.summary}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.14em] ${difficultyTone(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
          {solved && (
            <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-emerald-100">
              solved
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
        <div className="space-y-5">
          <SectionList title="Input" items={problem.inputFormat} />
          <SectionList title="Output" items={problem.outputFormat} />
          <SectionList title="Approach" items={problem.approach} />

          <div className="rounded-[24px] border border-white/10 bg-[#0d1117] p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-zinc-100">Starter code</div>
              <a
                href={playgroundUrl(problem.starterCode)}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-sky-400/25 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-100 transition hover:border-sky-300/45 hover:bg-sky-500/15"
              >
                Open in Rust Playground ↗
              </a>
            </div>
            <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 font-mono text-sm leading-7 text-zinc-100">
              <code>{problem.starterCode}</code>
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-1 text-xs uppercase tracking-[0.14em] text-zinc-500">
              Sample validation
            </div>
            <h3 className="text-lg font-semibold text-zinc-50">Enter the expected outputs</h3>
            <p className="mt-2 text-sm leading-7 text-zinc-300">
              Read each sample input, reason about the logic, and type the exact output you expect.
            </p>
          </div>

          {problem.samples.map((sample, index) => {
            const wrong =
              checked &&
              answers[index].replace(/\r\n/g, "\n").trim() !== sample.output.trim();

            return (
              <div key={index} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-3 text-sm font-semibold text-zinc-100">
                  Sample {index + 1}
                </div>
                <div className="mb-3 grid gap-3 lg:grid-cols-2">
                  <div>
                    <div className="mb-1 text-xs uppercase tracking-[0.14em] text-zinc-500">Input</div>
                    <pre className="rounded-2xl border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 whitespace-pre-wrap">
                      {sample.input}
                    </pre>
                  </div>
                  <div>
                    <div className="mb-1 text-xs uppercase tracking-[0.14em] text-zinc-500">Your output</div>
                    <textarea
                      value={answers[index]}
                      onChange={(event) =>
                        setAnswers((current) =>
                          current.map((value, answerIndex) =>
                            answerIndex === index ? event.target.value : value,
                          ),
                        )
                      }
                      rows={Math.max(2, sample.output.split("\n").length)}
                      className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-sky-400/40"
                      placeholder="Type the exact output"
                    />
                  </div>
                </div>
                {wrong && (
                  <div className="rounded-2xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-sm text-red-100">
                    Not quite. Compare your answer with the input carefully and check line breaks.
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={validate}
              className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-400"
            >
              Validate outputs
            </button>
            {checked && isCorrect && (
              <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
                Correct. Your sample outputs match.
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function SectionList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-2 text-xs uppercase tracking-[0.14em] text-zinc-500">{title}</div>
      <ul className="space-y-2 text-sm leading-7 text-zinc-300">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
