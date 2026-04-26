import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Lesson } from "@/types";

interface Props {
  lessons: Lesson[];
}

export function Home({ lessons }: Props) {
  const { t } = useTranslation();
  const first = lessons[0];
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-3">
          {t("ui.heroTitle")}
        </h1>
        <p className="text-stone-600 leading-relaxed mb-6">
          {t("ui.heroBody")}
        </p>
        {first && (
          <Link
            to={`/lesson/${first.id}`}
            className="inline-block px-5 py-2.5 bg-rust-500 hover:bg-rust-600 text-white rounded font-medium"
          >
            {t("ui.startLearning")} →
          </Link>
        )}
      </div>
    </main>
  );
}
