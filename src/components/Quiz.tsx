import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, Trophy } from 'lucide-react';
import { QuizQuestion } from '../types';
import { cn } from '../lib/utils';

interface QuizSessionProps {
  questions: QuizQuestion[];
  onComplete: (score: number, level?: string, timeTaken?: number) => void;
  onCancel: () => void;
}

export function QuizSession({ questions, onComplete, onCancel }: QuizSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [startTime] = useState(Date.now());

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const finalScore = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 text-center max-w-md mx-auto"
      >
        <div className="w-20 h-20 bg-brand-50 text-brand-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Trophy size={48} />
        </div>
        <h2 className="text-4xl font-bold heading-font mb-2 tracking-tight">Luar Biasa!</h2>
        <p className="text-lg font-medium text-slate-500 mb-8">
          Kamu telah menyelesaikan kuis dengan skor <span className="text-brand-600 font-bold">{finalScore}</span>.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              const timeTaken = Math.floor((Date.now() - startTime) / 1000);
              onComplete(finalScore, 'Umum', timeTaken);
            }}
            className="flex-1 bg-brand-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-700 transition-all shadow-lg shadow-brand-100"
          >
            Selesaikan
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10">
        <div className="flex justify-between items-end mb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Kemajuan Kuis</p>
            <h3 className="text-xl font-bold heading-font text-slate-800">Pertanyaan {currentIndex + 1} <span className="text-slate-300 font-medium">/ {questions.length}</span></h3>
          </div>
          <span className="text-brand-600 font-black text-sm">{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
          <motion.div
            className="h-full bg-brand-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/40"
        >
          <h3 className="text-2xl font-bold heading-font mb-10 leading-snug text-slate-800">
            {currentQuestion.question}
          </h3>

          <div className="grid grid-cols-1 gap-4 mb-10">
            {currentQuestion.options.map((option) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedOption;

              return (
                <button
                  key={option}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(option)}
                  className={cn(
                    "p-5 text-left border-2 rounded-2xl font-bold text-lg transition-all duration-200",
                    !isAnswered && "bg-white border-slate-100 hover:border-brand-300 hover:bg-brand-50/30",
                    isAnswered && isCorrect && "bg-emerald-50 border-emerald-500 text-emerald-800",
                    isAnswered && isSelected && !isCorrect && "bg-rose-50 border-rose-500 text-rose-800",
                    isAnswered && !isSelected && !isCorrect && "opacity-40 border-slate-100"
                  )}
                >
                  <div className="flex justify-between items-center">
                    {option}
                    {isAnswered && isCorrect && <CheckCircle2 className="text-emerald-500" size={20} />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="text-rose-500" size={20} />}
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-10 p-6 bg-brand-50/50 border border-brand-100 rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-6 h-6 bg-brand-600 rounded-lg flex items-center justify-center text-[10px] text-white">i</div>
                   <p className="font-bold text-brand-900 text-[10px] uppercase tracking-widest">Penjelasan</p>
                </div>
                <p className="text-brand-800 font-medium leading-relaxed">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {isAnswered && (
            <motion.button
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={handleNext}
              className="w-full bg-brand-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-brand-700 transition-all shadow-lg shadow-brand-100"
            >
              <span>{currentIndex < questions.length - 1 ? 'Pertanyaan Berikutnya' : 'Selesaikan Kuis'}</span>
              <ArrowRight size={18} />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={onCancel}
        className="mt-10 mx-auto flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
      >
        <RefreshCw size={12} /> Batalkan Sesi
      </button>
    </div>
  );
}
