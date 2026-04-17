/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Difficulty = 'Dasar' | 'Menengah' | 'Mahir' | 'Aritmetika Dasar' | 'Topik Matematika';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  quiz: QuizQuestion[];
  icon: string;
}

export interface Level {
  id: string;
  title: Difficulty;
  description: string;
  modules: Module[];
  minXp: number;
}

export interface UserProgress {
  uid: string;
  xp: number;
  completedModules: string[];
  quizResults: {
    moduleId: string;
    score: number;
    timestamp: number;
  }[];
}
