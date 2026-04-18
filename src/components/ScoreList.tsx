import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { Trophy, Clock, User, BookOpen, Search, X, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

interface QuizResult {
  id: string;
  userId: string;
  userName?: string;
  userRole?: string;
  moduleId: string;
  score: number;
  level?: string;
  timeTaken?: number;
  timestamp: number;
}

interface UserData {
  uid: string;
  displayName: string;
  role: string;
  kelas?: string;
}

interface ClassData {
  id: string;
  name: string;
}

export function ScoreList() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [users, setUsers] = useState<Record<string, UserData>>({});
  const [classList, setClassList] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'siswa' | 'guru'>('all');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'time' | 'date'>('date');

  useEffect(() => {
    // Fetch users first to map names
    const fetchUsers = async () => {
      const userSnap = await getDocs(collection(db, 'users'));
      const userMap: Record<string, UserData> = {};
      userSnap.forEach(doc => {
        userMap[doc.id] = doc.data() as UserData;
      });
      setUsers(userMap);
    };

    const fetchClasses = async () => {
      const classSnap = await getDocs(collection(db, 'classes'));
      const classes: ClassData[] = [];
      classSnap.forEach(doc => {
        classes.push(doc.data() as ClassData);
      });
      setClassList(classes);
    };

    fetchUsers();
    fetchClasses();

    // Listen for results
    const q = query(collection(db, 'quiz_results'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const resultsData: QuizResult[] = [];
      snapshot.forEach((doc) => {
        resultsData.push({ id: doc.id, ...doc.data() } as QuizResult);
      });
      setResults(resultsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredResults = results
    .filter(res => {
      const user = users[res.userId];
      const nameMatch = user?.displayName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        res.moduleId.toLowerCase().includes(searchTerm.toLowerCase());
      const roleMatch = filterRole === 'all' || user?.role === filterRole;
      const classMatch = filterClass === 'all' || user?.kelas === filterClass;
      return nameMatch && roleMatch && classMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'time') return (a.timeTaken || 9999) - (b.timeTaken || 9999);
      return b.timestamp - a.timestamp;
    });

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return '-';
    if (seconds > 3600) return 'Jam-jaman';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  const getModuleLabel = (id: string) => {
    if (id === 'mod-kali') return 'Perkalian Kilat';
    if (id === 'mod-math-sprint') return 'Math Sprint';
    if (id === 'mod-math-sprint-v2') return 'Math Sprint V2';
    if (id === 'mod-square-craft') return 'Square Craft';
    if (id === 'matematika-dasar-1') return 'Penjumlahan & Pengurangan';
    return id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-8 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold heading-font tracking-tight text-slate-800">Papan Nilai Siswa</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Laporan Aktivitas & Rangking</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Urutkan:</span>
              <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                {(['date', 'score', 'time'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all",
                      sortBy === s ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {s === 'date' ? 'Terbaru' : s === 'score' ? 'Skor' : 'Waktu'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Cari Siswa/Modul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-bold outline-none focus:border-indigo-400 transition-all shadow-sm"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-bold outline-none focus:border-indigo-400 transition-all shadow-sm appearance-none"
              >
                <option value="all">Semua Kelas</option>
                {classList.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              {(['all', 'siswa', 'guru'] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setFilterRole(r)}
                  className={cn(
                    "flex-1 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                    filterRole === r ? "bg-brand-600 text-white shadow-md shadow-brand-100" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {r === 'all' ? 'Semua Peran' : r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-50/30">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
            <Trophy size={48} className="mx-auto text-slate-100 mb-4" />
            <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Belum ada data nilai</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 max-w-5xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredResults.map((res, index) => {
                const user = users[res.userId];
                return (
                  <motion.div
                    key={res.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-lg transition-all group relative overflow-hidden"
                  >
                    {/* Rank Number for Rank views */}
                    {sortBy !== 'date' && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}

                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center w-8">
                        {sortBy !== 'date' && (
                          <span className={cn(
                            "text-xl font-black italic",
                            index === 0 ? "text-amber-400" : index === 1 ? "text-slate-400" : index === 2 ? "text-amber-700" : "text-slate-200"
                          )}>
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm",
                        user?.role === 'admin' ? "bg-indigo-50 text-indigo-600" : 
                        user?.role === 'guru' ? "bg-purple-50 text-purple-600" : "bg-brand-50 text-brand-600"
                      )}>
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 leading-tight">{user?.displayName || 'Unknown User'}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn(
                            "text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border",
                            user?.role === 'guru' ? "bg-purple-50 border-purple-100 text-purple-600" : "bg-brand-50 border-brand-100 text-brand-600"
                          )}>
                            {user?.kelas || user?.role || 'Siswa'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                            <Clock size={10} /> {formatDate(res.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1 flex items-center justify-end gap-1">
                          <BookOpen size={10} /> Modul / Operasi
                        </p>
                        <p className="font-bold text-slate-600 truncate max-w-[150px]">{getModuleLabel(res.moduleId)}</p>
                        <div className="flex items-center justify-end gap-2 mt-1">
                           <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded lowercase border border-slate-100">Lv {res.level || '-'}</span>
                           <span className={cn(
                             "text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border",
                             sortBy === 'time' ? "bg-indigo-50 border-indigo-100 text-indigo-600" : "bg-slate-50 border-slate-100 text-slate-500"
                           )}>
                              <Clock size={8} /> {formatTime(res.timeTaken || 0)}
                           </span>
                        </div>
                      </div>
                      
                      <div className={cn(
                        "px-5 py-3 rounded-xl border transition-colors min-w-[90px] text-center",
                        sortBy === 'score' ? "bg-indigo-50 border-indigo-200 shadow-sm" : "bg-slate-50 border-slate-100"
                      )}>
                        <p className={cn(
                          "text-[9px] font-black uppercase tracking-widest mb-1",
                          sortBy === 'score' ? "text-indigo-400" : "text-slate-400"
                        )}>Skor</p>
                        <p className={cn(
                          "text-2xl font-black heading-font italic tracking-tighter tabular-nums drop-shadow-sm",
                          sortBy === 'score' ? "text-indigo-600" : "text-brand-600"
                        )}>
                          {Math.round(res.score)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

