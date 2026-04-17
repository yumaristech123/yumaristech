import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserPlus, User, ShieldCheck, Mail, Lock, UserCircle, X, CheckCircle2 } from 'lucide-react';
import { registerWithEmail } from '../lib/firebase';
import { cn } from '../lib/utils';

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'siswa' | 'guru'>('siswa');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await registerWithEmail(email, password, name, role);
      setSuccess(true);
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed' || err.message?.includes('operation-not-allowed')) {
        setError('PENTING: Fitur "Email/Password" belum diaktifkan di Console Firebase. Silakan buka Firebase Console > Authentication > Sign-in method dan aktifkan "Email/Password".');
      } else {
        setError(err.message || 'Gagal mendaftarkan pengguna baru.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="bg-indigo-600 p-8 text-white flex justify-between items-center">
           <div>
              <h2 className="text-2xl font-bold heading-font tracking-tight">Manajemen Pengguna</h2>
              <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest mt-1">Panel Administrasi LMS</p>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <X size={24} />
           </button>
        </div>

        <div className="p-10">
           {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center gap-3"
              >
                 <CheckCircle2 size={20} />
                 <span className="text-xs font-bold uppercase">Pengguna Berhasil Diterbitkan!</span>
              </motion.div>
           )}

           {error && (
              <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-bold text-center">
                 {error}
              </div>
           )}

           <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-4">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Tentukan Peran Akun</p>
                 <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setRole('siswa')}
                      className={cn(
                        "flex-1 p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                        role === 'siswa' ? "border-brand-500 bg-brand-50 text-brand-600" : "border-slate-100 text-slate-400 hover:border-slate-200"
                      )}
                    >
                       <User size={24} />
                       <span className="text-xs font-bold">Siswa</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setRole('guru')}
                      className={cn(
                        "flex-1 p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                        role === 'guru' ? "border-indigo-500 bg-indigo-50 text-indigo-600" : "border-slate-100 text-slate-400 hover:border-slate-200"
                      )}
                    >
                       <ShieldCheck size={24} />
                       <span className="text-xs font-bold">Guru</span>
                    </button>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="relative">
                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text"
                      placeholder="Nama Lengkap Pengguna"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 font-medium text-sm outline-none focus:border-indigo-400 transition-all focus:bg-white"
                    />
                 </div>
                 <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text"
                      placeholder="Username atau Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 font-medium text-sm outline-none focus:border-indigo-400 transition-all focus:bg-white"
                    />
                 </div>
                 <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="password"
                      placeholder="Password Akun"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 font-medium text-sm outline-none focus:border-indigo-400 transition-all focus:bg-white"
                    />
                 </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:bg-slate-300"
              >
                {loading ? 'Sedang Memproses...' : 'Daftarkan Akun Sekarang'}
              </button>
           </form>
        </div>
      </motion.div>
    </div>
  );
}
