export interface Command {
  name: string;
  description: string;
  usage: string;
}

export interface Exercise {
  title: string;
  description: string;
  steps: string[];
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  question: string;
  options: QuizOption[];
  explanation?: string;
}

export interface Session {
  id: string;
  day: number;
  title: string;
  description: string;
  content: string;
  commands?: Command[];
  exercises?: Exercise[];
  quizzes?: Quiz[];
  category: string;
}

export interface Module {
  id: string;
  title: string;
  sessions: Session[];
}
