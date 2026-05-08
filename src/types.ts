/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Difficulty = 'Dasar' | 'Menengah' | 'Mahir' | 'Aritmetika Dasar' | 'Topik Matematika' | 'OSN Matematika' | 'Sekolah Kedinasan' | 'UTBK-SNBT';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ChartDataPoint {
  name: string;
  [key: string]: any;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  quiz: QuizQuestion[];
  icon: string;
  subModules?: Module[];
  chartData?: ChartDataPoint[];
  chartConfig?: {
    type: 'bar' | 'line' | 'pie';
    keys: string[];
    colors?: string[];
  };
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
