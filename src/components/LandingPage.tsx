import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, ArrowRight, LogIn, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onSelectCourse: (course: 'math' | 'english') => void;
}

export function LandingPage({ onSelectCourse }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50/30 font-sans text-slate-900 selection:bg-brand-100">
      {/* Header - Sticky with Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex items-center gap-2.5">
            <div className="bg-brand-600 p-2 rounded-xl text-white shadow-lg shadow-brand-100/50">
              <GraduationCap size={24} />
            </div>
            <h1 className="text-xl font-extrabold heading-font tracking-tight text-slate-900">
              Zona <span className="text-brand-600">Prestasi</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 md:py-16">
        {/* Hero Section - Centered and Bold */}
        <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-12 md:p-24 relative overflow-hidden mb-20 text-center">
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-200 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full blur-[100px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-600 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-6">
              Platform Pembelajaran Modern
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 heading-font mb-8 leading-[1.1] tracking-tight">
              Raih Prestasi Terbaikmu di <span className="text-brand-600">Zona Prestasi</span>
            </h2>
            <p className="text-lg md:text-2xl text-slate-500 font-semibold mb-12 leading-relaxed mx-auto max-w-2xl">
              Pembelajaran interaktif yang dirancang khusus untuk membantumu menguasai materi dengan cara yang seru dan menyenangkan.
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="w-12 h-1 bg-brand-600 rounded-full" />
              <div className="w-4 h-1 bg-yellow-400 rounded-full" />
              <div className="w-12 h-1 bg-brand-600 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Course Choices Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
             <div className="h-px w-8 bg-slate-200 md:w-16" />
             <div className="flex items-center gap-2">
                <span className="text-yellow-400">✨</span>
                <h4 className="text-lg font-black text-slate-400 uppercase tracking-widest text-[10px]">Pilih Kurikulum</h4>
                <span className="text-yellow-400">✨</span>
             </div>
             <div className="h-px w-8 bg-slate-200 md:w-16" />
          </motion.div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-800 heading-font">Mulai Belajar Sekarang</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* English Course */}
          <motion.div 
            whileHover={{ y: -12 }}
            className="group relative bg-white rounded-[3rem] p-10 lg:p-14 border border-slate-200/60 shadow-xl shadow-indigo-900/5 hover:shadow-indigo-900/10 transition-all flex flex-col items-center text-center overflow-hidden"
          >
            {/* Card Background Subtle Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-[60px] opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex-1 w-full">
              <h5 className="text-4xl lg:text-6xl font-black text-indigo-900 mb-6 heading-font">English</h5>
              <p className="text-slate-500 font-semibold mb-12 leading-relaxed max-w-sm mx-auto">
                Tingkatkan kemampuan bahasa Inggris Anda melalui materi interaktif dan latihan menarik.
              </p>
              
              <div className="relative w-48 h-60 mx-auto">
                <div className="absolute inset-0 bg-indigo-600 rounded-3xl shadow-2xl shadow-indigo-200 transform group-hover:rotate-6 transition-transform flex flex-col items-center justify-center text-white p-4">
                  <div className="bg-white/20 p-4 rounded-2xl mb-4 backdrop-blur-md">
                    <BookOpen size={64} className="text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Curriculum</span>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-12 bg-white p-5 rounded-3xl shadow-xl border border-indigo-100 transform -rotate-12 group-hover:scale-110 transition-transform">
                  <span className="text-4xl font-bold text-indigo-600">Aa</span>
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center overflow-hidden border border-indigo-100 p-1 group-hover:scale-110 transition-transform">
                  <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" className="w-full h-full object-cover rounded-lg" alt="UK" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => onSelectCourse('english')}
              className="mt-16 w-full max-w-xs flex cursor-pointer items-center justify-center gap-3 bg-indigo-600 text-white rounded-2xl py-5 font-black uppercase tracking-widest text-[11px] shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
            >
              Masuk ke Course <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Mathematics Course */}
          <motion.div 
            whileHover={{ y: -12 }}
            className="group relative bg-white rounded-[3rem] p-10 lg:p-14 border border-slate-200/60 shadow-xl shadow-brand-900/5 hover:shadow-brand-900/10 transition-all flex flex-col items-center text-center overflow-hidden"
          >
            {/* Card Background Subtle Pattern */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 rounded-full blur-[60px] opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex-1 w-full">
              <h5 className="text-4xl lg:text-6xl font-black text-brand-900 mb-6 heading-font">Math</h5>
              <p className="text-slate-500 font-semibold mb-12 leading-relaxed max-w-sm mx-auto">
                Pahami konsep matematika dengan cara yang mudah, menyenangkan, dan berstruktur.
              </p>
              
              <div className="relative w-48 h-60 mx-auto">
                <div className="absolute inset-0 bg-brand-600 rounded-3xl shadow-2xl shadow-brand-200 transform group-hover:-rotate-6 transition-transform flex flex-col items-center justify-center text-white p-4">
                  <div className="bg-white/20 p-4 rounded-2xl mb-4 backdrop-blur-md">
                    <Zap size={64} className="text-yellow-300 fill-yellow-300" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Curriculum</span>
                </div>

                {/* Design Elements */}
                <div className="absolute -top-8 -left-12 bg-white p-4 rounded-[2rem] shadow-xl border border-blue-50 transform rotate-12 group-hover:scale-110 transition-transform">
                  <div className="text-2xl font-mono font-black text-brand-600 italic">√x</div>
                </div>
                <div className="absolute -bottom-10 -right-8 bg-brand-50/80 backdrop-blur-md px-6 py-4 rounded-[2rem] shadow-lg border border-brand-100 transform -rotate-6 group-hover:scale-110 transition-transform">
                  <div className="text-lg font-bold text-brand-700">2x + 3 = 7</div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onSelectCourse('math')}
              className="mt-16 w-full max-w-xs flex cursor-pointer items-center justify-center gap-3 bg-brand-600 text-white rounded-2xl py-5 font-black uppercase tracking-widest text-[11px] shadow-lg shadow-brand-200 hover:bg-brand-700 transition-all active:scale-95"
            >
              Masuk ke Course <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">© 2026 Zona Prestasi - Level Up Your Skills</p>
      </footer>
    </div>
  );
}
