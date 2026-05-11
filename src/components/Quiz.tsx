import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, Trophy } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import { QuizQuestion, ChartDataPoint } from '../types';
import { cn } from '../lib/utils';

interface QuizSessionProps {
  questions: QuizQuestion[];
  onComplete: (score: number, level?: string, timeTaken?: number) => void;
  onCancel: () => void;
  hideFeedback?: boolean;
  headerContent?: string;
  chartData?: ChartDataPoint[];
  chartConfig?: {
    type: 'bar' | 'line' | 'pie';
    keys: string[];
    colors?: string[];
  };
  course?: 'math' | 'english' | 'kedinasan' | 'utbk';
  passingScore?: number;
}

export function QuizSession({ 
  questions, 
  onComplete, 
  onCancel, 
  hideFeedback = false, 
  headerContent,
  chartData,
  chartConfig,
  course = 'math',
  passingScore = 70
}: QuizSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [startTime] = useState(Date.now());

  const accentColor = course === 'english' ? 'indigo' : (course === 'kedinasan' ? 'amber' : (course === 'utbk' ? 'red' : 'brand'));

  const currentQuestion = questions[currentIndex];
  const isAnswered = userAnswers[currentIndex] !== undefined;
  const selectedOption = userAnswers[currentIndex] || null;

  const handleAnswer = (option: string) => {
    setUserAnswers(prev => ({ ...prev, [currentIndex]: option }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      // Check if all answered
      const answeredCount = Object.keys(userAnswers).length;
      if (answeredCount < questions.length) {
        if (confirm(`Kamu baru menjawab ${answeredCount} dari ${questions.length} soal. Yakin ingin menyelesaikan?`)) {
          setShowResult(true);
        }
      } else {
        setShowResult(true);
      }
    }
  };

  if (showResult) {
    const scoreCount = Object.entries(userAnswers).reduce((acc, [idx, opt]) => {
      return opt === questions[parseInt(idx)].correctAnswer ? acc + 1 : acc;
    }, 0);
    const finalScore = Math.round((scoreCount / questions.length) * 100);
    const isTuntas = finalScore >= passingScore;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 text-center max-w-md mx-auto"
      >
        <div className={cn(
          "w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6",
          isTuntas ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          <Trophy size={48} />
        </div>
        <h2 className={cn(
          "text-4xl font-bold heading-font mb-2 tracking-tight",
          isTuntas ? "text-emerald-600" : "text-rose-600"
        )}>
          {isTuntas ? 'TUNTAS!' : 'BELUM TUNTAS'}
        </h2>
        <p className="text-lg font-medium text-slate-500 mb-2">
          Kamu telah menyelesaikan kuis dengan skor <span className="font-bold text-slate-800">{finalScore}</span>.
        </p>
        <p className="text-sm font-medium text-slate-400 mb-8">
          {isTuntas 
            ? 'Selamat! Nilaimu terekam di papan nilai.' 
            : 'Maaf, nilaimu belum mencapai batas minimal 90 untuk terekam.'}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              const timeTaken = Math.floor((Date.now() - startTime) / 1000);
              onComplete(finalScore, 'Umum', timeTaken);
            }}
            className={cn(
              "flex-1 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg",
              `bg-${accentColor}-600 hover:bg-${accentColor}-700 shadow-${accentColor}-100`
            )}
          >
            Simpan
          </button>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setUserAnswers({});
              setShowResult(false);
            }}
            className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all hover:bg-slate-200"
          >
            Ulangi
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Navigation Grid */}
      <div className="mb-8 p-6 bg-white border border-slate-300 rounded-[2rem] shadow-md">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 px-1">Navigasi Soal</p>
        <div className="flex flex-wrap gap-2">
          {questions.map((_, idx) => {
            const answered = userAnswers[idx] !== undefined;
            const current = currentIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "w-10 h-10 rounded-xl font-bold text-xs transition-all border-2",
                  current ? `bg-${accentColor}-600 border-${accentColor}-600 text-white shadow-lg shadow-${accentColor}-100 scale-110 z-10` : 
                  answered ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                )}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-end mb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Kemajuan Kuis</p>
            <h3 className="text-xl font-bold heading-font text-slate-800">Pertanyaan {currentIndex + 1} <span className="text-slate-300 font-medium">/ {questions.length}</span></h3>
          </div>
          <span className={cn("font-black text-sm", `text-${accentColor}-600`)}>{Math.round((Object.keys(userAnswers).length / questions.length) * 100)}% Diisi</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
          <motion.div
            className={cn("h-full", `bg-${accentColor}-500`)}
            initial={{ width: 0 }}
            animate={{ width: `${(Object.keys(userAnswers).length / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          className="bg-white border border-slate-300 p-10 rounded-[2.5rem] shadow-xl shadow-slate-300/40"
        >
          {headerContent && (
            <div className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-600 whitespace-pre-wrap leading-relaxed overflow-auto max-h-60">
              <div className="flex items-center gap-2 mb-3 border-b border-slate-200 pb-2">
                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", `bg-${accentColor}-500`)} />
                <span className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Informasi Referensi</span>
              </div>
              {headerContent.trim()}
            </div>
          )}
          {chartData && chartConfig && (
            <div className="mb-8 h-[300px] w-full bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden">
               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                 <div className={cn("w-2 h-2 rounded-full", `bg-${accentColor}-500`)} />
                 Visualisasi Data
               </p>
               <ResponsiveContainer width="100%" height="100%">
                 {chartConfig.type === 'bar' ? (
                   <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 20 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fontWeight: 800, fill: '#94a3b8' }}
                     />
                     <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fontWeight: 800, fill: '#94a3b8' }}
                     />
                     <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                        itemStyle={{ fontSize: '11px', fontWeight: '800', textTransform: 'capitalize' }}
                        labelStyle={{ fontSize: '10px', fontWeight: '900', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', tracking: '0.05em' }}
                     />
                     <Legend 
                        iconType="circle"
                        wrapperStyle={{ paddingTop: '20px', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }} 
                     />
                     {chartConfig.keys.map((key, i) => (
                       <Bar 
                          key={key} 
                          dataKey={key} 
                          fill={chartConfig.colors?.[i] || (course === 'english' ? '#6366f1' : (course === 'kedinasan' ? '#f59e0b' : (course === 'utbk' ? '#ef4444' : '#6366f1')))} 
                          radius={[6, 6, 0, 0]} 
                          barSize={chartConfig.keys.length > 1 ? 20 : 40}
                          name={key.replace(/([A-Z])/g, ' $1').trim()}
                       />
                     ))}
                   </BarChart>
                 ) : (
                   <div className="flex items-center justify-center h-full text-slate-400 text-xs font-bold uppercase">
                     Tipe grafik {chartConfig.type} belum didukung
                   </div>
                 )}
               </ResponsiveContainer>
            </div>
          )}
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
                  onClick={() => handleAnswer(option)}
                  className={cn(
                    "p-5 text-left border-2 rounded-2xl font-bold text-lg transition-all duration-200",
                    !isSelected && `bg-white border-slate-300 hover:border-${accentColor}-400 hover:bg-${accentColor}-50/10`,
                    isAnswered && !hideFeedback && isCorrect && "bg-emerald-50 border-emerald-500 text-emerald-800",
                    isAnswered && !hideFeedback && isSelected && !isCorrect && "bg-rose-50 border-rose-500 text-rose-800",
                    isAnswered && hideFeedback && isSelected && `bg-${accentColor}-50 border-${accentColor}-500 text-${accentColor}-800`,
                    isAnswered && !isSelected && "opacity-40 border-slate-100 hover:opacity-100"
                  )}
                >
                  <div className="flex justify-between items-center">
                    {option}
                    {!hideFeedback && isAnswered && isCorrect && <CheckCircle2 className="text-emerald-500" size={20} />}
                    {!hideFeedback && isAnswered && isSelected && !isCorrect && <XCircle className="text-rose-500" size={20} />}
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && !hideFeedback && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn("mb-10 p-6 border rounded-2xl", `bg-${accentColor}-50/50 border-${accentColor}-100`)}
              >
                <div className="flex items-center gap-2 mb-2">
                   <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center text-[10px] text-white", `bg-${accentColor}-600`)}>i</div>
                   <p className={cn("font-bold text-[10px] uppercase tracking-widest", `text-${accentColor}-900`)}>Penjelasan</p>
                </div>
                <p className={cn("font-medium leading-relaxed", `text-${accentColor}-800`)}>{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-4">
            {currentIndex > 0 && (
              <button
                onClick={() => setCurrentIndex(i => i - 1)}
                className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all hover:bg-slate-200"
              >
                Kembali
              </button>
            )}
            <button
              onClick={handleNext}
              className={cn(
                "py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-lg",
                isAnswered ? `flex-[2] bg-${accentColor}-600 text-white shadow-${accentColor}-100 hover:bg-${accentColor}-700` : "flex-[2] bg-slate-100 text-slate-400 cursor-not-allowed"
              )}
              disabled={!isAnswered}
            >
              <span>{currentIndex < questions.length - 1 ? 'Selanjutnya' : 'Selesaikan'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
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
