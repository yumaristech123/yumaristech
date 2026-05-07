import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, ArrowRight, LogIn, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onSelectCourse: (course: 'math' | 'english' | 'kedinasan') => void;
}

export function LandingPage({ onSelectCourse }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50/30 font-sans text-slate-900 selection:bg-brand-100">
      {/* Header - Sticky with Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-start">
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

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-16">
        {/* Hero Section - Centered and Bold */}
        <div className="bg-slate-50 border border-slate-100 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 relative overflow-hidden mb-8 md:mb-12 text-center">
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
            <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-600 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
              Platform Pembelajaran Modern
            </span>
            <h2 className="text-2xl md:text-5xl font-black text-slate-900 heading-font mb-4 md:mb-6 leading-[1.2] md:leading-[1.1] tracking-tight">
              Raih Prestasi Terbaikmu di <br className="hidden md:block" /> <span className="text-brand-600">Zona Prestasi</span>
            </h2>
            <p className="text-sm md:text-xl text-slate-500 font-semibold mb-6 md:mb-8 leading-relaxed mx-auto max-w-2xl px-4 md:px-0">
              Pembelajaran interaktif yang dirancang khusus untuk membantumu menguasai materi dengan cara yang seru dan menyenangkan.
            </p>
            <div className="flex justify-center items-center gap-3">
              <div className="w-8 md:w-12 h-1 bg-brand-600 rounded-full" />
              <div className="w-3 md:w-4 h-1 bg-yellow-400 rounded-full" />
              <div className="w-8 md:w-12 h-1 bg-brand-600 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Course Choices Header */}
        <div className="text-center mb-6 md:mb-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-2"
          >
             <div className="h-px w-4 md:w-12 bg-slate-200" />
             <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xs md:text-base">✨</span>
                <h4 className="text-[9px] md:text-lg font-black text-slate-400 uppercase tracking-widest">Pilih Kurikulum</h4>
                <span className="text-yellow-400 text-xs md:text-base">✨</span>
             </div>
             <div className="h-px w-4 md:w-12 bg-slate-200" />
          </motion.div>
          <h3 className="text-xl md:text-3xl font-black text-slate-800 heading-font px-4">Mulai Belajar Sekarang</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {/* Mathematics Course */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-slate-200/60 shadow-xl shadow-brand-900/5 hover:shadow-brand-900/10 transition-all flex flex-col items-center text-center overflow-hidden"
          >
            {/* Card Background Subtle Pattern */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-blue-50 rounded-full blur-[50px] opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex-1 w-full flex flex-col items-center justify-center text-center">
              <h5 className="text-3xl lg:text-4xl font-black text-brand-900 mb-3 md:mb-4 heading-font">Math</h5>
              <p className="text-slate-500 font-semibold mb-6 leading-relaxed max-w-xs mx-auto text-xs md:text-sm px-2">
                Pahami konsep matematika dengan cara yang mudah, menyenangkan, dan berstruktur.
              </p>
              
              <div className="relative w-28 md:w-32 h-36 md:h-40 mx-auto">
                <div className="absolute inset-0 bg-brand-600 rounded-2xl shadow-xl shadow-brand-200 transform group-hover:-rotate-6 transition-transform flex flex-col items-center justify-center text-white p-3">
                  <div className="bg-white/20 p-2 md:p-3 rounded-xl mb-2 md:mb-3 backdrop-blur-md">
                    <Zap size={32} className="text-yellow-300 fill-yellow-300 md:hidden" />
                    <Zap size={40} className="text-yellow-300 fill-yellow-300 hidden md:block" />
                  </div>
                  <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em]">Curriculum</span>
                </div>

                {/* Design Elements */}
                <div className="absolute -top-5 -left-6 md:-top-6 md:-left-8 bg-white p-2 md:p-3 rounded-xl md:rounded-[1.5rem] shadow-lg border border-blue-50 transform rotate-12 group-hover:scale-110 transition-transform">
                  <div className="text-lg md:text-xl font-mono font-black text-brand-600 italic">√x</div>
                </div>
                <div className="absolute -bottom-6 -right-3 md:-bottom-8 md:-right-4 bg-brand-50/80 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-[1.5rem] shadow-md border border-brand-100 transform -rotate-6 group-hover:scale-110 transition-transform">
                  <div className="text-sm md:text-base font-bold text-brand-700">2x + 3 = 7</div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onSelectCourse('math')}
              className="mt-8 md:mt-10 w-full max-w-[280px] flex cursor-pointer items-center justify-center gap-2 bg-brand-600 text-white rounded-xl py-4 md:py-4 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-brand-200 hover:bg-brand-700 transition-all active:scale-95"
            >
              Masuk ke Course <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* English Course */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-slate-200/60 shadow-xl shadow-indigo-900/5 hover:shadow-indigo-900/10 transition-all flex flex-col items-center text-center overflow-hidden"
          >
            {/* Card Background Subtle Pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full blur-[50px] opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex-1 w-full flex flex-col items-center justify-center">
              <h5 className="text-3xl lg:text-4xl font-black text-indigo-900 mb-3 md:mb-4 heading-font">English</h5>
              <p className="text-slate-500 font-semibold mb-6 leading-relaxed max-w-xs mx-auto text-xs md:text-sm px-2">
                Tingkatkan kemampuan bahasa Inggris Anda melalui materi interaktif dan latihan menarik.
              </p>
              
              <div className="relative w-28 md:w-32 h-36 md:h-40 mx-auto">
                <div className="absolute inset-0 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 transform group-hover:rotate-6 transition-transform flex flex-col items-center justify-center text-white p-3">
                  <div className="bg-white/20 p-2 md:p-3 rounded-xl mb-2 md:mb-3 backdrop-blur-md">
                    <BookOpen size={32} className="text-white md:hidden" />
                    <BookOpen size={40} className="text-white hidden md:block" />
                  </div>
                  <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em]">Curriculum</span>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-3 -right-6 md:-top-4 md:-right-8 bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-lg border border-indigo-100 transform -rotate-12 group-hover:scale-110 transition-transform">
                  <span className="text-xl md:text-2xl font-bold text-indigo-600">Aa</span>
                </div>
                <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-12 md:w-14 h-7 md:h-8 bg-white rounded-lg md:rounded-xl shadow-lg flex items-center justify-center overflow-hidden border border-indigo-100 p-0.5 group-hover:scale-110 transition-transform">
                  <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" className="w-full h-full object-cover rounded-lg" alt="UK" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => onSelectCourse('english')}
              className="mt-8 md:mt-10 w-full max-w-[280px] flex cursor-pointer items-center justify-center gap-2 bg-indigo-600 text-white rounded-xl py-4 md:py-4 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
            >
              Masuk ke Course <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Sekolah Kedinasan Course */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-slate-200/60 shadow-xl shadow-amber-900/5 hover:shadow-amber-900/10 transition-all flex flex-col items-center text-center overflow-hidden"
          >
            {/* Card Background Subtle Pattern */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-amber-50 rounded-full blur-[50px] opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex-1 w-full flex flex-col items-center justify-center text-center">
              <h5 className="text-3xl lg:text-3xl font-black text-amber-900 mb-3 md:mb-4 heading-font uppercase">Kedinasan</h5>
              <p className="text-slate-500 font-semibold mb-6 leading-relaxed max-w-xs mx-auto text-xs md:text-sm px-2">
                Persiapan Seleksi Kompetensi Dasar (SKD) untuk Sekolah Kedinasan (IPDN, STAN, dll).
              </p>
              
              <div className="relative w-28 md:w-32 h-36 md:h-40 mx-auto">
                <div className="absolute inset-0 bg-amber-600 rounded-2xl shadow-xl shadow-amber-200 transform group-hover:-rotate-3 transition-transform flex flex-col items-center justify-center text-white p-3">
                  <div className="bg-white/20 p-2 md:p-3 rounded-xl mb-2 md:mb-3 backdrop-blur-md">
                    <GraduationCap size={32} className="text-white md:hidden" />
                    <GraduationCap size={40} className="text-white hidden md:block" />
                  </div>
                  <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em]">Curriculum</span>
                </div>

                {/* Design Elements */}
                <div className="absolute -top-5 -left-6 md:-top-6 md:-left-8 bg-white p-2 md:p-3 rounded-xl md:rounded-[1.5rem] shadow-lg border border-amber-50 transform rotate-12 group-hover:scale-110 transition-transform">
                   <div className="text-lg md:text-xl font-black text-amber-600">SKD</div>
                </div>
                <div className="absolute -bottom-6 -right-3 md:-bottom-8 md:-right-4 bg-amber-50/80 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-[1.5rem] shadow-md border border-amber-100 transform -rotate-6 group-hover:scale-110 transition-transform">
                  <div className="text-xs md:text-sm font-bold text-amber-700">TWK • TIU • TKP</div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onSelectCourse('kedinasan')}
              className="mt-8 md:mt-10 w-full max-w-[280px] flex cursor-pointer items-center justify-center gap-2 bg-amber-600 text-white rounded-xl py-4 md:py-4 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-amber-200 hover:bg-amber-700 transition-all active:scale-95"
            >
              Masuk ke Course <ArrowRight size={16} />
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
