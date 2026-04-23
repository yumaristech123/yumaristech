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
        isEnglish ? "bg-indigo-100" : "bg-brand-100"
      )} />
      <div className={cn(
        "fixed -bottom-20 -right-20 w-96 h-96 rounded-full blur-[120px] opacity-60",
        isEnglish ? "bg-purple-100" : "bg-indigo-100"
      )} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg z-10"
      >
        <div className="text-center mb-8">
          <div 
            onClick={handleSecretTrigger}
            className={cn(
              "inline-flex p-3 rounded-2xl shadow-xl mb-4 cursor-default active:scale-95 transition-transform",
              isEnglish ? "bg-indigo-600 shadow-indigo-100" : "bg-brand-600 shadow-brand-100"
            )}
          >
            {isEnglish ? <BookOpen size={32} className="text-white" /> : <GraduationCap className="text-white" size={32} />}
          </div>
          <h1 className="text-3xl font-bold heading-font tracking-tight text-slate-900">
            ZONA <span className={isEnglish ? "text-indigo-600" : "text-brand-600"}>{isEnglish ? 'ENGLISH' : 'PRESTASI'}</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Platform Pembelajaran {isEnglish ? 'Bahasa Inggris' : 'Matematika'} Masa Depan</p>
        </div>

        <div className={cn(
          "bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl overflow-hidden",
          isEnglish ? "shadow-indigo-100/50" : "shadow-brand-100/50"
        )}>
          <div className="p-10">
            <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">Masuk ke LMS</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-medium text-center">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text"
                    placeholder="Username atau Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 font-medium text-sm outline-none transition-all focus:bg-white",
                      isEnglish ? "focus:border-indigo-400" : "focus:border-brand-400"
                    )}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      "w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 font-medium text-sm outline-none transition-all focus:bg-white",
                      isEnglish ? "focus:border-indigo-400" : "focus:border-brand-400"
                    )}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none",
                  isEnglish ? "bg-indigo-600 shadow-indigo-100 hover:bg-indigo-700" : "bg-brand-600 shadow-brand-100 hover:bg-brand-700"
                )}
              >
                {loading ? 'Memproses...' : 'Masuk Sekarang'}
                {!loading && <ArrowRight size={16} />}
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
