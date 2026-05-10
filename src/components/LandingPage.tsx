import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Zap, Trophy, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onSelectCourse: (course: 'math' | 'english' | 'kedinasan' | 'utbk' | 'tka') => void;
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
              <span className="text-red-600">ZONA PRESTASI</span> <span className="text-emerald-600">YUMARIS</span>
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
            <h2 className="text-2xl md:text-5xl font-black text-slate-900 heading-font mb-2 md:mb-4 leading-[1.2] md:leading-[1.1] tracking-tight">
              Raih Prestasi Terbaikmu di <br className="hidden md:block" /> <span className="text-red-600 uppercase">ZONA PRESTASI</span> <span className="text-emerald-600 uppercase">YUMARIS</span>
            </h2>
            <p className="text-brand-600 font-extrabold text-[10px] md:text-sm uppercase tracking-widest mb-4 md:mb-6">
              Membentuk Generasi Cerdas dan Berkarakter Berlandaskan Al-Qur’an
            </p>
            <p className="text-sm md:text-xl text-slate-500 font-bold mb-6 md:mb-8 leading-relaxed mx-auto max-w-2xl px-4 md:px-0">
              Pembelajaran interaktif yang dirancang khusus untuk membantumu menguasai materi dengan cara yang seru dan menyenangkan.
            </p>
          </motion.div>
        </div>

        <div className="mt-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto px-2">
          {/* Mathematics Course */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCourse('math')}
            className="group cursor-pointer relative bg-white rounded-[2rem] p-6 border border-slate-200/60 shadow-xl shadow-brand-900/5 hover:shadow-brand-900/10 transition-all flex flex-col items-center text-center overflow-hidden h-full"
          >
            {/* Card Background Subtle Pattern */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-blue-50 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex-1 w-full flex flex-col items-center justify-center text-center py-4">
              <h5 className="text-3xl font-black text-brand-900 mb-2 heading-font">MATH</h5>
              <p className="text-slate-500 font-bold mb-6 leading-tight max-w-xs mx-auto text-[11px]">
                Pahami konsep matematika dengan cara yang mudah.
              </p>
              
              <div className="relative w-24 h-28 mx-auto">
                <div className="absolute inset-0 bg-brand-600 rounded-2xl shadow-lg shadow-brand-200 transform group-hover:-rotate-3 transition-transform flex flex-col items-center justify-center text-white p-3">
                  <div className="bg-white/20 p-2 rounded-lg mb-2 backdrop-blur-md">
                    <Zap size={28} className="text-yellow-300 fill-yellow-300" />
                  </div>
                  <span className="text-[6px] font-black uppercase tracking-[0.2em]">Curriculum</span>
                </div>

                {/* Design Elements */}
                <div className="absolute -top-3 -left-4 bg-white p-1.5 rounded-lg shadow-md border border-blue-50 transform rotate-12 group-hover:scale-110 transition-transform">
                  <div className="text-sm font-mono font-black text-brand-600 italic">√x</div>
                </div>
                <div className="absolute -bottom-3 -right-3 bg-brand-50/80 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm border border-brand-100 transform -rotate-6 group-hover:scale-110 transition-transform">
                  <div className="text-[10px] font-bold text-brand-700">2x+3=7</div>
                </div>
              </div>
            </div>


          </motion.div>

          {/* English Course */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCourse('english')}
            className="group cursor-pointer relative bg-white rounded-[2rem] p-6 border border-slate-200/60 shadow-xl shadow-indigo-900/5 hover:shadow-indigo-900/10 transition-all flex flex-col items-center text-center overflow-hidden h-full"
          >
            {/* Card Background Subtle Pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex-1 w-full flex flex-col items-center justify-center py-4">
              <h5 className="text-3xl font-black text-indigo-900 mb-2 heading-font">ENGLISH</h5>
              <p className="text-slate-500 font-bold mb-6 leading-tight max-w-xs mx-auto text-[11px]">
                Tingkatkan kemampuan bahasa melalui materi interaktif.
              </p>
              
              <div className="relative w-24 h-28 mx-auto">
                <div className="absolute inset-0 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 transform group-hover:rotate-3 transition-transform flex flex-col items-center justify-center text-white p-3">
                  <div className="bg-white/20 p-2 rounded-lg mb-2 backdrop-blur-md">
                    <BookOpen size={28} className="text-white" />
                  </div>
                  <span className="text-[6px] font-black uppercase tracking-[0.2em]">Curriculum</span>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-2 -right-4 bg-white p-1.5 rounded-lg shadow-md border border-indigo-100 transform -rotate-12 group-hover:scale-110 transition-transform">
                  <span className="text-sm font-bold text-indigo-600">Aa</span>
                </div>
                <div className="absolute -bottom-2 -left-2 w-10 h-6 bg-white rounded flex items-center justify-center overflow-hidden border border-indigo-100 p-0.5 group-hover:scale-110 transition-transform">
                  <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" className="w-full h-full object-cover rounded shadow-sm" alt="UK" />
                </div>
              </div>
            </div>


          </motion.div>

          {/* Sekolah Kedinasan Course */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCourse('kedinasan')}
            className="group cursor-pointer relative bg-white rounded-[2rem] p-6 border border-slate-200/60 shadow-xl shadow-amber-900/5 hover:shadow-amber-900/10 transition-all flex flex-col items-center text-center overflow-hidden h-full"
          >
            {/* Card Background Subtle Pattern */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-amber-50 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex-1 w-full flex flex-col items-center justify-center text-center py-4">
              <h5 className="text-2xl font-black text-amber-900 mb-2 heading-font uppercase">Kedinasan</h5>
              <p className="text-slate-500 font-bold mb-6 leading-tight max-w-xs mx-auto text-[11px]">
                Persiapan SKD untuk masuk Sekolah Kedinasan impian.
              </p>
              
              <div className="relative w-24 h-28 mx-auto">
                <div className="absolute inset-0 bg-amber-600 rounded-2xl shadow-lg shadow-amber-200 transform group-hover:-rotate-3 transition-transform flex flex-col items-center justify-center text-white p-3">
                  <div className="bg-white/20 p-2 rounded-lg mb-2 backdrop-blur-md">
                    <GraduationCap size={28} className="text-white" />
                  </div>
                  <span className="text-[6px] font-black uppercase tracking-[0.2em]">Curriculum</span>
                </div>

                {/* Design Elements */}
                <div className="absolute -top-3 -left-4 bg-white p-1.5 rounded-lg shadow-md border border-amber-50 transform rotate-12 group-hover:scale-110 transition-transform">
                   <div className="text-xs font-black text-amber-600">SKD</div>
                </div>
                <div className="absolute -bottom-3 -right-3 bg-amber-50/80 backdrop-blur-md px-2 py-1 rounded-lg border border-amber-100 shadow-sm transform -rotate-6 group-hover:scale-110 transition-transform">
                  <div className="text-[8px] font-bold text-amber-700">TWK • TIU</div>
                </div>
              </div>
            </div>


          </motion.div>

          {/* UTBK-SNBT Course */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCourse('utbk')}
            className="group cursor-pointer relative bg-white rounded-[2rem] p-6 border border-slate-200/60 shadow-xl shadow-red-900/5 hover:shadow-red-900/10 transition-all flex flex-col items-center text-center overflow-hidden h-full"
          >
            {/* Card Background Subtle Pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex-1 w-full flex flex-col items-center justify-center text-center py-4">
              <h5 className="text-2xl font-black text-red-900 mb-2 heading-font uppercase text-nowrap">UTBK SNBT</h5>
              <p className="text-slate-500 font-bold mb-6 leading-tight max-w-xs mx-auto text-[11px]">
                Persiapan simulasi soal TPS dan Literasi terbaru.
              </p>
              
              <div className="relative w-24 h-28 mx-auto">
                <div className="absolute inset-0 bg-red-600 rounded-2xl shadow-lg shadow-red-200 transform group-hover:rotate-3 transition-transform flex flex-col items-center justify-center text-white p-3">
                  <div className="bg-white/20 p-2 rounded-lg mb-2 backdrop-blur-md">
                    <Trophy size={28} className="text-white" />
                  </div>
                  <span className="text-[6px] font-black uppercase tracking-[0.2em]">Curriculum</span>
                </div>

                {/* Design Elements */}
                <div className="absolute -top-3 -right-4 bg-white p-1.5 rounded-lg shadow-md border border-red-50 transform -rotate-12 group-hover:scale-110 transition-transform">
                   <div className="text-xs font-black text-red-600">SNBT</div>
                </div>
                <div className="absolute -bottom-3 -left-3 bg-red-50/80 backdrop-blur-md px-2 py-1 rounded-lg border border-red-100 shadow-sm transform rotate-6 group-hover:scale-110 transition-transform">
                   <div className="text-[7px] font-bold text-red-700">TPS • LIT</div>
                </div>
              </div>
            </div>


          </motion.div>

          {/* TKA Course */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCourse('tka')}
            className="group cursor-pointer relative bg-white rounded-[2rem] p-6 border border-slate-200/60 shadow-xl shadow-emerald-900/5 hover:shadow-emerald-900/10 transition-all flex flex-col items-center text-center overflow-hidden h-full"
          >
            {/* Card Background Subtle Pattern */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-50 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex-1 w-full flex flex-col items-center justify-center text-center py-4">
              <h5 className="text-3xl font-black text-emerald-900 mb-2 heading-font uppercase">TKA</h5>
              <p className="text-slate-500 font-bold mb-6 leading-tight max-w-xs mx-auto text-[11px]">
                Tes Kompetensi Akademik untuk semua jenjang.
              </p>
              
              <div className="relative w-24 h-28 mx-auto">
                <div className="absolute inset-0 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-200 transform group-hover:-rotate-3 transition-transform flex flex-col items-center justify-center text-white p-3">
                  <div className="bg-white/20 p-2 rounded-lg mb-2 backdrop-blur-md">
                    <Star size={28} className="text-yellow-300 fill-yellow-300" />
                  </div>
                  <span className="text-[6px] font-black uppercase tracking-[0.2em]">Curriculum</span>
                </div>

                {/* Design Elements */}
                <div className="absolute -top-3 -left-4 bg-white p-1.5 rounded-lg shadow-md border border-emerald-50 transform rotate-12 group-hover:scale-110 transition-transform">
                   <div className="text-xs font-black text-emerald-600">TKA</div>
                </div>
                <div className="absolute -bottom-3 -right-3 bg-emerald-50/80 backdrop-blur-md px-2 py-1 rounded-lg border border-emerald-100 shadow-sm transform -rotate-6 group-hover:scale-110 transition-transform">
                  <div className="text-[8px] font-bold text-emerald-700">SD • SMP • SMA</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 md:py-12 border-t border-slate-100 text-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest italic flex flex-wrap items-center justify-center gap-x-1 gap-y-0.5">
            <span>© 2026</span>
            <span className="text-red-600">ZONA PRESTASI</span>
            <span className="text-emerald-600">YUMARIS</span>
          </p>
          <div className="w-8 h-px bg-slate-200 md:hidden" />
          <p className="text-slate-300 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">
            Level Up Your Skills
          </p>
        </div>
      </footer>
    </div>
  );
}
