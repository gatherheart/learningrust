# Learning Rust

Interactive, free, multilingual Rust quizzes — inspired by [learngitbranching.js.org](https://learngitbranching.js.org).

Each lesson is a real Rust program. The build pipeline compiles it with `cargo`, runs it, captures the actual stdout, and bakes that into the site as the answer key. So every "predict the output" question is grounded in a real, verified program — no hand-written expected outputs to drift out of sync with the code.

## Stack

- **Frontend**: Vite + React + TypeScript + Tailwind, CodeMirror 6 (Rust syntax)
- **i18n**: `react-i18next` with 17 locales registered (English + Korean fully translated; others fall back to English until contributors fill them in)
- **Lessons**: a Cargo workspace at `lessons/` — each `src/bin/*.rs` is one lesson
- **Hosting**: GitHub Pages (free), built and deployed by GitHub Actions on every push to `main`

## Project layout

```
.
├── lessons/                   # Cargo workspace; each src/bin/*.rs is a lesson
│   ├── Cargo.toml
│   ├── meta.json              # lesson id, topic, quiz definitions
│   └── src/bin/
│       ├── 01_hello.rs
│       ├── 02_variables.rs
│       └── 03_ownership.rs
├── scripts/
│   └── build-lessons.mjs      # cargo run → capture stdout → src/data/lessons.json
├── src/
│   ├── components/            # Header, Sidebar, Lesson, CodeBlock, quizzes
│   ├── i18n/                  # i18next setup + locale JSON files
│   ├── lib/                   # progress (localStorage), playground URL helper
│   └── data/lessons.json      # generated, gitignored
└── .github/workflows/deploy.yml
```

## Local development

Prerequisites: Node 18+, Rust (`rustup` + stable toolchain).

```bash
npm install
npm run build:lessons   # compiles each lesson once and writes src/data/lessons.json
npm run dev             # http://localhost:5173
```

When you change a lesson's `.rs` file, rerun `npm run build:lessons` to refresh the captured output.

## Adding a lesson

1. Create `lessons/src/bin/04_my_topic.rs` with a `fn main()` that prints something.
2. Add an entry to `lessons/meta.json`:
   ```json
   {
     "id": "04_my_topic",
     "bin": "04_my_topic",
     "topic": "basics",
     "quizzes": [
       { "id": "q1", "type": "predict-output" },
       { "id": "q2", "type": "multiple-choice", "answer": 1 }
     ]
   }
   ```
3. Add the matching strings to `src/i18n/locales/en.json` under `lessons.04_my_topic.*`. Other locales fall back to English until you translate them.
4. `npm run build:lessons && npm run dev` to verify.

## Adding a translation

`src/i18n/locales/en.json` is the source of truth. Use the scaffold script to generate or update a locale's file with `__TODO__` markers for any missing keys — translated entries are preserved.

```bash
# Find missing/stubbed keys in an existing locale
npm run i18n:check ja

# Generate (or refresh) a locale file from en.json. Each missing leaf
# becomes "__TODO__ <english value>" so you can grep and fill them in.
npm run i18n:scaffold ja

# Reset every value back to a stub (use sparingly).
npm run i18n:scaffold ja -- --force
```

After scaffolding, register the new file in `src/i18n/index.ts`:

```ts
import ja from "./locales/ja.json";
// ...
const resources = { en: ..., ja: { translation: ja } };
```

Untranslated keys automatically fall back to English at runtime.

## Publishing (free, on GitHub Pages)

The workflow at `.github/workflows/deploy.yml` does everything. One-time setup on GitHub:

1. Push the repo (`git push -u origin main`).
2. Repo **Settings → Pages → Source → "GitHub Actions"**.
3. Push any commit to `main`. The Action installs Node + Rust, runs `npm run build`, and deploys `dist/` to GitHub Pages.
4. Site lives at `https://<your-username>.github.io/<repo-name>/` — for this repo: `https://gatherheart.github.io/learningrust/`.

Custom domain (also free): add a `CNAME` file under `public/` containing your domain, point a CNAME DNS record to `<your-username>.github.io`, and enable HTTPS in repo Settings → Pages.

## Notes

- "Try in Playground" buttons open `play.rust-lang.org` with the code preloaded — used for exploration only, not for answer checking, so the official playground is never hit programmatically.
- Progress is stored in `localStorage` only. There's no backend, no account, no tracking.
