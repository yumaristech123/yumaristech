import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, deleteQuizResult, CourseId, getCollName, UserData } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { Trophy, Clock, User, BookOpen, Search, X, Filter, Trash2, Star } from 'lucide-react';
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

interface ClassData {
  id: string;
  name: string;
}

interface ScoreListProps {
  currentUserRole?: 'siswa' | 'guru' | 'admin' | null;
  courseId?: CourseId | null;
}

export function ScoreList({ currentUserRole, courseId = 'math' }: ScoreListProps) {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [users, setUsers] = useState<Record<string, UserData>>({});
  const [classList, setClassList] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'siswa' | 'guru'>('all');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'time' | 'date' | 'name' | 'kelas' | 'stars'>('date');

  useEffect(() => {
    const userColl = getCollName('users', courseId);
    const classColl = getCollName('classes', courseId);
    const resultsColl = getCollName('quiz_results', courseId);

    // Listen for users live to keep mapping updated
    const unsubUsers = onSnapshot(collection(db, userColl), (snapshot) => {
      const userMap: Record<string, UserData> = {};
      snapshot.forEach(doc => {
        userMap[doc.id] = doc.data() as UserData;
      });
      setUsers(userMap);
    });

    const unsubClasses = onSnapshot(collection(db, classColl), (snapshot) => {
      const classes: ClassData[] = [];
      snapshot.forEach(doc => {
        classes.push(doc.data() as ClassData);
      });
      setClassList(classes);
    });

    // Listen for results
    const q = query(collection(db, resultsColl), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const resultsData: QuizResult[] = [];
      snapshot.forEach((doc) => {
        resultsData.push({ id: doc.id, ...doc.data() } as QuizResult);
      });
      setResults(resultsData);
      setLoading(false);
    });

    return () => {
      unsubUsers();
      unsubClasses();
      unsubscribe();
    };
  }, [courseId]);

  const filteredResults = results
    .filter(res => {
      const user = users[res.userId];
      const nameMatch = user?.displayName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        res.moduleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (res.level && res.level.toLowerCase().includes(searchTerm.toLowerCase()));
      const roleMatch = filterRole === 'all' || user?.role === filterRole;
      const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
      const targetClassNorm = normalize(filterClass);
      const userKelas = user?.kelas || '';
      
      const classMatch = filterClass === 'all' || (
        userKelas && (
          normalize(userKelas) === targetClassNorm ||
          userKelas.split(/[,\s;]+/).some(k => normalize(k) === targetClassNorm) ||
          normalize(userKelas).includes(targetClassNorm)
        )
      );
      return nameMatch && roleMatch && classMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'stars') {
        const starsA = users[a.userId]?.stars || 0;
        const starsB = users[b.userId]?.stars || 0;
        if (starsB !== starsA) return starsB - starsA;
        return b.timestamp - a.timestamp;
      }
      if (sortBy === 'time') return (a.timeTaken || 9999) - (b.timeTaken || 9999);
      if (sortBy === 'name') {
        const nameA = users[a.userId]?.displayName || '';
        const nameB = users[b.userId]?.displayName || '';
        return nameA.localeCompare(nameB);
      }
      if (sortBy === 'kelas') {
        const classA = users[a.userId]?.kelas || 'ZZZ';
        const classB = users[b.userId]?.kelas || 'ZZZ';
        return classA.localeCompare(classB);
      }
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

  const handleDeleteResult = async (id: string, userName: string) => {
    if (window.confirm(`Hapus nilai milik "${userName}"? Tindakan ini tidak dapat dibatalkan.`)) {
      try {
        await deleteQuizResult(id, courseId as CourseId);
      } catch (err: any) {
        alert('Gagal menghapus: ' + err.message);
      }
    }
  };

  const getModuleLabel = (id: string) => {
    if (id === 'mod-kali') return 'Perkalian Kilat';
    if (id === 'mod-math-sprint') return 'Math Sprint';
    if (id === 'mod-math-sprint-v2') return 'Math Sprint V2';
    if (id === 'mod-square-craft') return 'Square Craft';
    if (id === 'mod-psas-9') return 'Latihan PSAS Kelas 9';
    if (id === 'mod-psas-8') return 'Latihan PSAS Kelas 8';
    if (id === 'mod-psas-7') return 'Latihan PSAS Kelas 7';
    if (id === 'matematika-dasar-1') return 'Penjumlahan & Pengurangan';
    return id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-[2rem] shadow-xl border border-slate-300 overflow-hidden">
      <div className="p-8 border-b border-slate-200 bg-slate-100/50">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold heading-font tracking-tight text-slate-800">Papan Nilai Siswa</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Laporan Aktivitas & Rangking</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Urutkan:</span>
              <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm overflow-x-auto no-scrollbar max-w-full">
                {(['date', 'score', 'stars', 'time', 'name', 'kelas'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                      sortBy === s ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {s === 'date' ? 'Terbaru' : s === 'score' ? 'Skor' : s === 'stars' ? 'Bintang' : s === 'name' ? 'Nama' : s === 'kelas' ? 'Kelas' : 'Waktu'}
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
                    className="flex items-center justify-between p-5 bg-white border border-slate-300 rounded-2xl hover:border-indigo-400 hover:shadow-lg transition-all group relative overflow-hidden"
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
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-800 leading-tight">{user?.displayName || 'Unknown User'}</h4>
                          {user?.stars !== undefined && (
                            <div className={cn(
                              "flex items-center gap-1 px-2 py-0.5 rounded-full border shadow-sm transform scale-90 transition-all",
                              sortBy === 'stars' 
                                ? "bg-amber-400 border-amber-500 scale-100 shadow-amber-200" 
                                : "bg-amber-50 border-amber-100"
                            )}>
                              <Star size={10} className={cn(
                                sortBy === 'stars' ? "text-white fill-white" : "text-amber-500 fill-amber-500"
                              )} />
                              <span className={cn(
                                "text-[10px] font-black",
                                sortBy === 'stars' ? "text-white" : "text-amber-700"
                              )}>{user.stars}</span>
                            </div>
                          )}
                        </div>
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
                        <p className="font-bold text-slate-600 truncate max-w-[200px]">
                          {(() => {
                            const fullLevel = res.level || '';
                            const hasOp = fullLevel.includes(' - ');
                            const moduleLabel = getModuleLabel(res.moduleId);
                            if (hasOp) {
                              const [opPart] = fullLevel.split(' - ');
                              return `${moduleLabel}, ${opPart}`;
                            }
                            return moduleLabel;
                          })()}
                        </p>
                        <div className="flex items-center justify-end gap-2 mt-1">
                           <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded uppercase border border-slate-100 italic">
                             {(() => {
                               const fullLevel = res.level || '';
                               const hasOp = fullLevel.includes(' - ');
                               if (hasOp) {
                                 const [, lvPart] = fullLevel.split(' - ');
                                 return lvPart;
                               }
                               return fullLevel.includes('Level') ? fullLevel : `Lv ${fullLevel || '-'}`;
                             })()}
                           </span>
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
                        sortBy === 'score' ? "bg-indigo-50 border-indigo-300 shadow-sm" : "bg-slate-100 border-slate-300"
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

                      {(currentUserRole === 'guru' || currentUserRole === 'admin') && (
                        <button 
                          onClick={() => handleDeleteResult(res.id, user?.displayName || 'Siswa')}
                          className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                          title="Hapus Nilai"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
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

