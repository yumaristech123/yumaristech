import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, ChevronLeft, CheckCircle2, MessageSquare, BookOpen, Star } from 'lucide-react';
import { Module } from '../types';
import { ENGLISH_CONTENT, EnglishConversation } from '../englishConstants';
import { cn } from '../lib/utils';

interface EnglishModuleProps {
  module: Module;
  onComplete: (score: number) => void;
  onCancel: () => void;
}

export const EnglishModule: React.FC<EnglishModuleProps> = ({ module, onComplete, onCancel }) => {
  const content = ENGLISH_CONTENT[module.id] || [];
  const [playedLines, setPlayedLines] = useState<Set<string>>(new Set());
  const [isFinished, setIsFinished] = useState(false);

  const speak = (text: string) => {
    // Stop any current speaking
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for clarity
    
    window.speechSynthesis.speak(utterance);
    
    setPlayedLines(prev => {
      const next = new Set(prev);
      next.add(text);
      return next;
    });
  };

  const progress = content.length > 0 ? Math.min(100, Math.round((playedLines.size / content.length) * 100)) : 0;

  const handleFinish = () => {
    // For English modules, we reward 100% score if they interacted with most lines
    // or just 100% since it's a learning module
    onComplete(100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BookOpen size={120} />
          </div>
          <button 
            onClick={onCancel}
            className="flex items-center gap-2 text-indigo-100 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-4"
          >
            <ChevronLeft size={16} /> Kembali
          </button>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold heading-font tracking-tight mb-2">{module.title}</h2>
            <p className="text-indigo-100 font-medium text-sm max-w-xl">{module.description}</p>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">Progres Belajar</span>
              <span className="text-[10px] font-black text-white">{progress}%</span>
            </div>
            <div className="h-2 bg-indigo-900/30 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-yellow-400"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <MessageSquare size={20} />
            </div>
            <h4 className="font-bold text-slate-800 uppercase tracking-widest text-xs">Klik teks untuk mendengarkan audio</h4>
          </div>

          <div className="grid gap-4">
            {content.map((item, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => speak(item.en)}
                className={cn(
                  "flex items-center gap-6 p-5 rounded-2xl border-2 text-left transition-all group relative overflow-hidden",
                  playedLines.has(item.en) 
                    ? "bg-emerald-50 border-emerald-100" 
                    : "bg-slate-50 border-transparent hover:border-indigo-200 hover:bg-white"
                )}
              >
                <div className={cn(
                  "p-3 rounded-xl transition-colors",
                  playedLines.has(item.en) ? "bg-emerald-500 text-white" : "bg-white text-slate-400 group-hover:text-indigo-600 shadow-sm"
                )}>
                  <Volume2 size={24} />
                </div>
                
                <div className="flex-1">
                  <p className="text-xl font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                    {item.en}
                  </p>
                  <p className="text-slate-400 font-medium text-sm mt-1 italic">
                    {item.id}
                  </p>
                </div>

                {playedLines.has(item.en) && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-4 top-4 text-emerald-500"
                  >
                    <CheckCircle2 size={20} />
                  </motion.div>
                )}

                <div className="absolute left-0 bottom-0 top-0 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-amber-500">
              <Star size={24} className="fill-amber-500" />
            </div>
            <div>
              <p className="font-black text-[10px] uppercase tracking-widest text-slate-400 leading-none mb-1">Hadiah Belajar</p>
              <p className="font-bold text-slate-800">+1 Bintang Prestasi</p>
            </div>
          </div>

          <button
            onClick={handleFinish}
            disabled={progress < 50}
            className={cn(
              "px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg",
              progress >= 50 
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            )}
          >
            {progress < 50 ? 'Pelajari Lebih Banyak...' : 'Selesaikan & Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
};
