export type QuizType = "predict-output" | "multiple-choice";

export interface QuizPredictOutput {
  id: string;
  type: "predict-output";
}

export interface QuizMultipleChoice {
  id: string;
  type: "multiple-choice";
  answer: number;
}

export type Quiz = QuizPredictOutput | QuizMultipleChoice;

export interface Lesson {
  id: string;
  bin: string;
  topic: string;
  code: string;
  expectedOutput: string;
  quizzes: Quiz[];
}
