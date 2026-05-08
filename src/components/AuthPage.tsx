import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, GraduationCap, ArrowRight, Mail, Lock } from 'lucide-react';
import { CourseId, getCollName, loginWithEmail, registerWithEmail, signInWithGoogle } from '../lib/firebase';
import { cn } from '../lib/utils';

interface AuthPageProps {
  onSuccess: () => void;
  courseId: CourseId;
}

export function AuthPage({ onSuccess, courseId }: AuthPageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showGoogle, setShowGoogle] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEnglish = courseId === 'english';
  const isKedinasan = courseId === 'kedinasan';
  const isUtbk = courseId === 'utbk';

  const getTagline = () => {
    switch (courseId) {
      case 'english': return 'Platform Pembelajaran Modern bikin Jago Bahasa Inggris';
      case 'kedinasan': return 'Platform Pembelajaran Modern untuk masuk Sekolah Kedinasan';
      case 'utbk': return 'Platform Pembelajaran Modern untuk persiapan UTBK SNBT';
      default: return 'Platform Pembelajaran Modern bikin Jago Matematika';
    }
  };

  const themeColor = isEnglish ? 'indigo' : (isKedinasan ? 'amber' : (isUtbk ? 'rose' : 'brand'));

  const handleSecretTrigger = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 7) {
        setShowGoogle(true);
        return 0;
      }
      return newCount;
    });
    const timer = setTimeout(() => setClickCount(0), 2000);
    return () => clearTimeout(timer);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginWithEmail(email.trim(), password.trim());
      onSuccess();
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/operation-not-allowed' || err.message?.includes('operation-not-allowed')) {
        setError('Fitur Login Email/Password belum diaktifkan oleh Admin di Firebase Console.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Kredensial tidak valid. Silakan cek username/email dan password Anda.');
      } else {
        setError(`Terjadi kesalahan: ${err.message || 'Gagal masuk.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className={cn(
        "fixed -top-20 -left-20 w-96 h-96 rounded-full blur-[120px] opacity-60 animate-pulse",
        `bg-${themeColor}-100`
      )} />
      <div className={cn(
        "fixed -bottom-20 -right-20 w-96 h-96 rounded-full blur-[120px] opacity-60",
        `bg-${isEnglish ? 'purple' : (isKedinasan ? 'orange' : (isUtbk ? 'red' : 'indigo'))}-100`
      )} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg z-10"
      >
        <div className="text-center mb-6">
          <div 
            onClick={handleSecretTrigger}
            className={cn(
              "inline-flex p-2.5 rounded-2xl shadow-lg mb-3 cursor-default active:scale-95 transition-transform",
              `bg-${themeColor}-600 shadow-${themeColor}-100`
            )}
          >
            {isEnglish ? <BookOpen size={24} className="text-white" /> : <GraduationCap className="text-white" size={24} />}
          </div>
          <h1 className="text-2xl font-bold heading-font tracking-tight text-slate-900 flex flex-col items-center">
            <div>
              <span className="text-red-600">ZONA PRESTASI</span> <span className="text-emerald-600">YUMARIS</span>
            </div>
          </h1>
          <p className="text-slate-500 font-bold mt-2 text-[10px] uppercase tracking-widest">{getTagline()}</p>
        </div>

        <div className={cn(
          "bg-white border border-slate-100 rounded-[2rem] shadow-xl overflow-hidden",
          `shadow-${themeColor}-100/50`
        )}>
          <div className="p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-5 text-center">Masuk ke LMS</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-[10px] font-medium text-center">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input 
                    type="text"
                    placeholder="Username atau Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 font-medium text-sm outline-none transition-all focus:bg-white",
                      `focus:border-${themeColor}-400`
                    )}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input 
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      "w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 font-medium text-sm outline-none transition-all focus:bg-white",
                      `focus:border-${themeColor}-400`
                    )}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none",
                  `bg-${themeColor}-600 shadow-${themeColor}-100 hover:bg-${themeColor}-700`
                )}
              >
                {loading ? 'Memproses...' : 'Masuk Sekarang'}
                {!loading && <ArrowRight size={14} />}
              </button>

              {showGoogle && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-6"
                >
                  <div className="relative flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-slate-100"></div>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Atau</span>
                    <div className="flex-1 h-px bg-slate-100"></div>
                  </div>

                  <button 
                    type="button"
                    onClick={async () => {
                      setLoading(true);
                      try {
                        await signInWithGoogle(courseId);
                        onSuccess();
                      } catch (err) {
                        setError('Gagal masuk dengan Google.');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="w-full bg-white border border-slate-200 py-3.5 rounded-xl font-bold text-slate-600 text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
                    Masuk via Google
                  </button>
                </motion.div>
              )}
            </form>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed px-10">
          Registrasi Akun Baru Hanya DAPAT DILAKUKAN Melalui Administrator.
        </p>
      </motion.div>
    </div>
  );
}
