import * as Icons from 'lucide-react';
import { motion } from 'motion/react';
import { BookOpen, Trophy, Star, ChevronRight, Lock } from 'lucide-react';
import { Level, Module } from '../types';
import { cn } from '../lib/utils';

interface LevelCardProps {
  key?: string | number;
  level: Level;
  userXp: number;
  onSelect: (level: Level) => void;
}

export function LevelCard({ level, userXp, onSelect }: LevelCardProps) {
  const isLocked = userXp < level.minXp;

  return (
    <motion.div
      whileHover={!isLocked ? { y: -8 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      className={cn(
        "relative p-8 rounded-[2.5rem] transition-all duration-300 border-2",
        isLocked 
          ? "bg-slate-200/50 border-slate-300 opacity-60 grayscale cursor-not-allowed" 
          : "bg-white cursor-pointer border-slate-200 shadow-xl shadow-slate-300/40 hover:shadow-2xl hover:shadow-brand-100 hover:border-brand-300"
      )}
      onClick={() => !isLocked && onSelect(level)}
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-3xl font-bold heading-font tracking-tight text-slate-800">{level.title}</h3>
        {isLocked ? (
          <div className="bg-slate-200 text-slate-500 p-3 rounded-2xl">
            <Lock size={20} />
          </div>
        ) : (
          <div className="bg-brand-50 text-brand-600 p-3 rounded-2xl">
            <Trophy size={20} />
          </div>
        )}
      </div>
      
      <p className="text-slate-500 mb-8 font-bold leading-relaxed">
        {level.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-3">
          {level.modules.map((m, i) => (
            <div key={m.id} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
          <BookOpen size={14} className="text-slate-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {level.modules.length} Modul
          </span>
        </div>
      </div>

      {isLocked && (
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-center gap-2 text-brand-600">
            <Lock size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Minimal {level.minXp} XP</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

interface ModuleCardProps {
  key?: string | number;
  module: Module;
  isCompleted: boolean;
  onSelect: (module: Module) => void;
}

export function ModuleCard({ module, isCompleted, onSelect }: ModuleCardProps) {
  const IconComponent = (Icons as any)[module.icon] || Icons.BookOpen;

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className={cn(
        "p-4 rounded-2xl cursor-pointer flex items-center gap-4 border transition-all duration-200",
        isCompleted 
          ? "bg-emerald-50 border-emerald-200 hover:bg-emerald-100" 
          : "bg-white border-slate-300 hover:border-brand-400 shadow-md"
      )}
      onClick={() => onSelect(module)}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
        isCompleted ? "bg-emerald-500 text-white" : "bg-brand-50 text-brand-600"
      )}>
        <IconComponent size={20} />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-slate-800 leading-tight mb-0.5">{module.title}</h4>
        <p className="text-xs text-slate-500 font-bold line-clamp-1">{module.description}</p>
      </div>
      <div className="shrink-0">
        {isCompleted ? (
          <div className="bg-emerald-100 p-1.5 rounded-full">
            <Star className="text-emerald-600 fill-emerald-600" size={16} />
          </div>
        ) : (
          <ChevronRight size={18} className="text-slate-300" />
        )}
      </div>
    </motion.div>
  );
}
