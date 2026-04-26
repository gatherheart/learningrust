import { Routes, Route } from "react-router-dom";
import lessonsData from "@/data/lessons.json";
import type { Lesson as LessonT } from "@/types";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Lesson } from "@/components/Lesson";
import { Home } from "@/components/Home";

const lessons = lessonsData as LessonT[];

export function App() {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar lessons={lessons} />
        <Routes>
          <Route path="/" element={<Home lessons={lessons} />} />
          <Route path="/lesson/:id" element={<Lesson lessons={lessons} />} />
        </Routes>
      </div>
    </div>
  );
}
