import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, User, ShieldCheck, Mail, Lock, UserCircle, X, CheckCircle2, Users, Search, GraduationCap, Edit2, Trash2, Save, RotateCcw, Plus, Trash } from 'lucide-react';
import { db, registerWithEmail, updateUser, deleteUserDoc, addClass, deleteClass } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { cn } from '../lib/utils';

interface AdminPanelProps {
  onClose: () => void;
}

interface UserData {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  kelas?: string;
  password?: string;
  xp: number;
}

interface ClassData {
  id: string;
  name: string;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'register' | 'users' | 'classes'>('register');
  const [userList, setUserList] = useState<UserData[]>([]);
  const [classList, setClassList] = useState<ClassData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [kelas, setKelas] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [role, setRole] = useState<'siswa' | 'guru'>('siswa');
  const [newClassName, setNewClassName] = useState('');
  const [classSuccess, setClassSuccess] = useState(false);

  useEffect(() => {
    const qUsers = query(collection(db, 'users'), orderBy('displayName'));
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
      const users: UserData[] = [];
      snapshot.forEach((doc) => {
        users.push(doc.data() as UserData);
      });
      setUserList(users);
    });

    const qClasses = query(collection(db, 'classes'), orderBy('name'));
    const unsubClasses = onSnapshot(qClasses, (snapshot) => {
      const classes: ClassData[] = [];
      snapshot.forEach((doc) => {
        classes.push(doc.data() as ClassData);
      });
      setClassList(classes);
    });

    return () => {
      unsubUsers();
      unsubClasses();
    };
  }, []);

  const handleRegisterOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const cleanEmail = email.trim();
      const cleanPass = password.trim();
      const cleanName = name.trim();
      
      let finalKelas = role === 'guru' ? selectedClasses.join(', ') : kelas.trim();

      if (isEditMode && editingUserId) {
        await updateUser(editingUserId, {
          displayName: cleanName,
          email: cleanEmail,
          password: cleanPass,
          role: role,
          kelas: finalKelas
        });
        setSuccess(true);
        setTimeout(() => setIsEditMode(false), 2000);
      } else {
        await registerWithEmail(cleanEmail, cleanPass, cleanName, role, finalKelas);
        setSuccess(true);
      }
      
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
      setKelas('');
      setSelectedClasses([]);
      setEditingUserId(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    setLoading(true);
    setError('');
    setClassSuccess(false);
    try {
      await addClass(newClassName);
      setNewClassName('');
      setClassSuccess(true);
      setTimeout(() => setClassSuccess(false), 3000);
    } catch (err: any) {
      console.error('Add Class Error:', err);
      if (err.message.includes('permission-denied')) {
        setError('Akses Ditolak: Hanya Admin yang dapat menambah kelas.');
      } else {
        setError(err.message || 'Gagal menambah kelas.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClass = async (id: string, name: string) => {
    if (window.confirm(`Hapus kelas "${name}"? Siswa yang terdaftar di kelas ini tidak akan terhapus, namun label kelas mereka mungkin perlu diperbarui.`)) {
      try {
        await deleteClass(id);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const startEdit = (u: UserData) => {
    setIsEditMode(true);
    setEditingUserId(u.uid);
    setName(u.displayName);
    setEmail(u.email);
    setPassword(u.password || '');
    const currentRole = u.role as 'siswa' | 'guru';
    setRole(currentRole);
    if (currentRole === 'guru') {
      setSelectedClasses((u.kelas || '').split(', ').filter(Boolean));
    } else {
      setKelas(u.kelas || '');
    }
    setActiveTab('register');
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setEditingUserId(null);
    setName('');
    setEmail('');
    setPassword('');
    setKelas('');
    setSelectedClasses([]);
    setRole('siswa');
  };

  const handleDelete = async (uid: string, name: string) => {
    if (window.confirm(`Hapus akun "${name}" secara permanen? Tindakan ini tidak dapat dibatalkan.`)) {
      try {
        await deleteUserDoc(uid);
      } catch (err: any) {
        alert('Gagal menghapus: ' + err.message);
      }
    }
  };

  const filteredUsers = userList.filter(u => 
    u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.kelas || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="bg-indigo-600 p-6 md:p-8 text-white flex justify-between items-center shrink-0">
           <div>
              <h2 className="text-xl md:text-2xl font-bold heading-font tracking-tight">Pusat Kendali Admin</h2>
              <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest mt-1">Sistem Manajemen ZONA PRESTASI</p>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <X size={24} />
           </button>
        </div>

        <div className="flex border-b border-slate-100 shrink-0 overflow-x-auto custom-scrollbar">
          <button 
            onClick={() => setActiveTab('register')}
            className={cn(
              "flex-1 min-w-[140px] py-4 font-bold text-xs uppercase tracking-widest transition-all border-b-2",
              activeTab === 'register' ? "border-indigo-600 text-indigo-600 bg-indigo-50/50" : "border-transparent text-slate-400 hover:text-slate-600"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              {isEditMode ? <Edit2 size={16} /> : <UserPlus size={16} />} 
              {isEditMode ? 'Edit Pengguna' : 'Registrasi Baru'}
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={cn(
              "flex-1 min-w-[140px] py-4 font-bold text-xs uppercase tracking-widest transition-all border-b-2",
              activeTab === 'users' ? "border-indigo-600 text-indigo-600 bg-indigo-50/50" : "border-transparent text-slate-400 hover:text-slate-600"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <Users size={16} /> Daftar Pengguna ({userList.length})
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('classes')}
            className={cn(
              "flex-1 min-w-[140px] py-4 font-bold text-xs uppercase tracking-widest transition-all border-b-2",
              activeTab === 'classes' ? "border-indigo-600 text-indigo-600 bg-indigo-50/50" : "border-transparent text-slate-400 hover:text-slate-600"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <GraduationCap size={16} /> Kelola Kelas ({classList.length})
            </div>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'register' ? (
              <motion.div 
                key="register-tab"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="max-w-xl mx-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                    {isEditMode ? 'Form Perubahan Data' : 'Form Pembuatan Akun'}
                  </h3>
                  {isEditMode && (
                    <button onClick={cancelEdit} className="text-[10px] font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 uppercase tracking-widest">
                      <RotateCcw size={14} /> Batalkan Edit
                    </button>
                  )}
                </div>

                {success && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center gap-3"
                  >
                    <CheckCircle2 size={20} />
                    <span className="text-xs font-bold uppercase">Berhasil {isEditMode ? 'Diperbarui' : 'Diterbitkan'}!</span>
                  </motion.div>
                )}

                {error && (
                  <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-bold text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleRegisterOrUpdate} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setRole('siswa')}
                      className={cn(
                        "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                        role === 'siswa' ? "border-brand-500 bg-brand-50 text-brand-600" : "border-slate-100 text-slate-400 hover:border-slate-200"
                      )}
                    >
                      <User size={24} />
                      <span className="text-xs font-bold uppercase">Siswa</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setRole('guru')}
                      className={cn(
                        "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                        role === 'guru' ? "border-indigo-500 bg-indigo-50 text-indigo-600" : "border-slate-100 text-slate-400 hover:border-slate-200"
                      )}
                    >
                      <ShieldCheck size={24} />
                      <span className="text-xs font-bold uppercase">Guru</span>
                    </button>
                  </div>

                  {isEditMode && (
                    <div className="mb-6 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                      <p className="text-[9px] font-bold text-amber-700 leading-tight">
                        CATATAN: Mengubah "Username/Email" di sini hanya akan mengubah tampilan di dashboard. 
                        Untuk mengubah data login akun sebenarnya, silakan hapus dan buat akun baru.
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="relative">
                      <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text" placeholder="Nama Lengkap" required
                        value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 font-medium text-sm outline-none focus:border-indigo-400 transition-all focus:bg-white"
                      />
                    </div>
                    <div className="relative">
                      {role === 'guru' ? (
                        <div className="space-y-3 bg-slate-50 border border-slate-100 rounded-xl p-4">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-2">
                            <GraduationCap size={14} /> Pilih Beberapa Kelas
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 overflow-y-auto max-h-[160px] p-1">
                            {classList.map(c => (
                              <label key={c.id} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-100 cursor-pointer hover:border-indigo-200 transition-all">
                                <input 
                                  type="checkbox"
                                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                  checked={selectedClasses.includes(c.name)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedClasses(prev => [...prev, c.name]);
                                    } else {
                                      setSelectedClasses(prev => prev.filter(cn => cn !== c.name));
                                    }
                                  }}
                                />
                                <span className="text-xs font-bold text-slate-600">{c.name}</span>
                              </label>
                            ))}
                            {classList.length === 0 && (
                              <p className="col-span-full text-center py-2 text-[10px] font-bold text-slate-400 italic">Belum ada daftar kelas</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <>
                          <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <select
                            required
                            value={kelas}
                            onChange={(e) => setKelas(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 font-medium text-sm outline-none focus:border-indigo-400 transition-all focus:bg-white appearance-none"
                          >
                            <option value="">Pilih Kelas / Kelompok</option>
                            {classList.map(c => (
                              <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                            {classList.length === 0 && <option value="" disabled>Belum ada daftar kelas</option>}
                          </select>
                        </>
                      )}
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text" placeholder="Username atau Email" required
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 font-medium text-sm outline-none focus:border-indigo-400 transition-all focus:bg-white"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text" placeholder="Password Akun" required
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 font-medium text-sm outline-none focus:border-indigo-400 transition-all focus:bg-white"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" disabled={loading}
                    className={cn(
                      "w-full text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg transition-all disabled:bg-slate-300 flex items-center justify-center gap-2",
                      isEditMode ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100"
                    )}
                  >
                    {loading ? 'Sedang Memproses...' : isEditMode ? <><Save size={16} /> Simpan Perubahan</> : 'Daftarkan Akun'}
                  </button>
                </form>
              </motion.div>
            ) : activeTab === 'users' ? (
              <motion.div 
                key="users-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text"
                    placeholder="Cari nama, email, atau kelas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 pl-12 pr-4 text-sm font-medium focus:bg-white focus:border-indigo-400 outline-none transition-all"
                  />
                </div>

                <div className="border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-100">
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Nama & Peran</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Kelas</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Login Info</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredUsers.map((u) => (
                          <tr key={u.uid} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-6 py-4">
                              <p className="font-bold text-slate-800 text-sm whitespace-nowrap">{u.displayName}</p>
                              <span className={cn(
                                "text-[9px] font-black uppercase px-2 py-0.5 rounded-md",
                                u.role === 'guru' ? "bg-indigo-50 text-indigo-600" : u.role === 'admin' ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                              )}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-bold text-xs text-slate-500 whitespace-nowrap">{u.kelas || '-'}</span>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-xs font-semibold text-slate-600 mb-1 leading-none">{u.email}</p>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <Lock size={12} className="text-slate-300" />
                                <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded tracking-tighter">{u.password || '••••••'}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <button 
                                  onClick={() => startEdit(u)}
                                  className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all"
                                  title="Edit Data"
                                >
                                  <Edit2 size={16} />
                                </button>
                                {u.role !== 'admin' && (
                                  <button 
                                    onClick={() => handleDelete(u.uid, u.displayName)}
                                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                    title="Hapus Akun"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredUsers.length === 0 && (
                    <div className="p-10 text-center text-slate-400">
                      <p className="text-sm font-bold uppercase tracking-widest">Tidak ada data ditemukan</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="classes-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-xl mx-auto"
              >
                <form onSubmit={handleAddClass} className="flex gap-2 mb-8">
                  <input 
                    type="text" 
                    placeholder="Masukkan Nama Kelas (contoh: 4B)"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    required
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-sm"
                  />
                  <button 
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100 disabled:bg-slate-300"
                  >
                    <Plus size={16} /> Tambah
                  </button>
                </form>

                {classSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center gap-3"
                  >
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-bold uppercase">Kelas Berhasil Ditambahkan!</span>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {classList.map(c => (
                    <div key={c.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-indigo-200 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <GraduationCap size={16} />
                        </div>
                        <span className="font-bold text-slate-700">{c.name}</span>
                      </div>
                      <button 
                        onClick={() => handleDeleteClass(c.id, c.name)}
                        className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                  {classList.length === 0 && (
                    <div className="col-span-full py-10 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Belum ada daftar kelas</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}



