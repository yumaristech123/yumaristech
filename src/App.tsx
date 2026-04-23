import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Trophy, Layout, ChevronLeft, LogIn, Star, Zap, LogOut, User as UserIcon } from 'lucide-react';
import { Level, Module } from './types';
import { LEVELS } from './constants';
import { LevelCard, ModuleCard } from './components/Cards';
import { QuizSession } from './components/Quiz';
import { MathSprint } from './components/MathSprint';
import { MathSprintV2 } from './components/MathSprintV2';
import { SquareCraft } from './components/SquareCraft';
import { AuthPage } from './components/AuthPage';
import { AdminPanel } from './components/AdminPanel';
import { ScoreList } from './components/ScoreList';
import { auth, signInWithGoogle, logout, db, saveQuizResult, handleFirestoreError, OperationType } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { Settings } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'siswa' | 'guru' | 'admin' | null>(null);
  const [userKelas, setUserKelas] = useState('');
  const [userXp, setUserXp] = useState(0);
  const [userStars, setUserStars] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [activeView, setActiveView] = useState<'lessons' | 'scores'>('lessons');
  const [adminClickCount, setAdminClickCount] = useState(0);

  useEffect(() => {
    if (adminClickCount >= 7 && userRole === 'admin') {
      setIsAdminPanelOpen(true);
      setAdminClickCount(0);
    }
  }, [adminClickCount, userRole]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAuthReady(true);
      if (!u) {
        setUserXp(0);
        setUserStars(0);
        setCompletedModules([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setUserXp(data.xp || 0);
          setUserStars(data.stars || 0);
          setCompletedModules(data.completedModules || []);
          
          const isAdmin = user.email === 'yumaristech@gmail.com';
          setUserRole(data.role || (isAdmin ? 'admin' : 'siswa'));
          setUserKelas(data.kelas || '');
        } else {
          // If doc doesn't exist, check email for admin
          if (user.email === 'yumaristech@gmail.com') {
            setUserRole('admin');
          } else {
            setUserRole('siswa');
          }
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      });
      return () => unsub();
    }
  }, [user]);

  const handleLevelSelect = (level: Level) => {
    setCurrentLevel(level);
    setCurrentModule(null);
    setIsQuizActive(false);
  };

  const handleModuleSelect = (module: Module) => {
    setCurrentModule(module);
    setIsQuizActive(true);
  };

  const handleQuizComplete = async (score: number, level?: string, timeTaken?: number) => {
    if (user && currentModule) {
      // For Topik Matematika levels, only record if score >= 90
      const isTopikMatematika = currentLevel?.id === 'lvl-topik' || currentLevel?.title.toLowerCase().includes('matematika');
      
      if (isTopikMatematika && score < 90) {
        console.log('Score too low for Topik Matematika, not recording.');
      } else {
        await saveQuizResult(user.uid, currentModule.id, score, level, timeTaken);
      }
    } else if (!user) {
      // Offline/Guest local state update
      const passingScore = (currentLevel?.id === 'lvl-topik' || currentLevel?.title.toLowerCase().includes('matematika')) ? 90 : 70;
      if (score >= passingScore && currentModule) {
        if (!completedModules.includes(currentModule.id)) {
          setCompletedModules(p => [...p, currentModule.id]);
          setUserXp(p => p + 50);
        }
      }
    }
    setIsQuizActive(false);
  };

  const resetToHome = () => {
    setCurrentLevel(null);
    setCurrentModule(null);
    setIsQuizActive(false);
    setActiveView('lessons');
  };

  if (isAuthReady && !user) {
    return <AuthPage onSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-200">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => {
            if (userRole === 'admin') {
              setAdminClickCount(prev => prev + 1);
              // Reset count after 2 seconds of inactivity
              setTimeout(() => setAdminClickCount(0), 2000);
            }
            resetToHome();
          }}>
            <div className="bg-brand-600 text-white p-2.5 rounded-2xl shadow-lg shadow-brand-200 group-hover:scale-110 transition-transform duration-300">
              <Zap size={24} className="fill-yellow-300 text-yellow-300" />
            </div>
            <h1 className="text-2xl font-bold heading-font tracking-tight">ZONA <span className="text-brand-600">PRESTASI</span></h1>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveView(activeView === 'lessons' ? 'scores' : 'lessons')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-xs transition-all shadow-sm",
                activeView === 'scores' 
                  ? "bg-brand-600 text-white border-brand-500 hover:bg-brand-700" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              )}
            >
              <Trophy size={18} className={activeView === 'scores' ? "text-yellow-300 fill-yellow-300" : ""} />
              <span className="hidden sm:inline">{activeView === 'scores' ? 'Lihat Pelajaran' : 'Papan Nilai'}</span>
            </button>

            {/* Admin Panel button is now hidden behind 7 secret clicks on the logo */}

            <div className="hidden sm:flex items-center gap-2.5 bg-white border border-slate-300 px-4 py-2 rounded-2xl shadow-md">
              <Star size={18} className="text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-700">{userStars}</span>
            </div>
            {isAuthReady && (
              user ? (
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <p className="font-medium text-[10px] uppercase tracking-widest text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md mb-0.5 inline-block capitalize">
                      {userRole === 'admin' ? 'Verifikasi' : (userRole || 'Siswa')}
                    </p>
                    <p className="font-bold heading-font text-slate-700 leading-none">{user.displayName?.split(' ')[0]}</p>
                  </div>
                  <button onClick={logout} className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : null
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {activeView === 'scores' ? (
            <motion.div
              key="scores"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-[calc(100vh-160px)]"
            >
               <ScoreList currentUserRole={userRole} />
            </motion.div>
          ) : !currentLevel ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="max-w-3xl">
                <h2 className="text-5xl font-bold heading-font mb-4 tracking-tight text-slate-900 leading-[1.1]">
                  Pelajaran <span className="text-brand-600 italic">Matematika</span> Makin Seru!
                </h2>
                <p className="text-xl font-medium text-slate-500">Tingkatkan kemampuan matematikamu dengan kuis interaktif dan tantangan kilat.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {LEVELS.map((level) => (
                  <LevelCard 
                    key={level.id} 
                    level={level} 
                    userXp={userXp} 
                    onSelect={handleLevelSelect} 
                  />
                ))}
              </div>
            </motion.div>
          ) : !isQuizActive ? (
            <motion.div
              key="level"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
              <div className="lg:col-span-1 space-y-6">
                <button onClick={resetToHome} className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] text-brand-600 hover:translate-x-[-4px] transition-transform">
                  <ChevronLeft size={16} /> Kembali ke Menu
                </button>
                <div className="bg-white border border-slate-300 p-8 rounded-[2rem] shadow-md">
                  <span className="bg-brand-50 text-brand-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-brand-100">Level {currentLevel.title}</span>
                  <h3 className="text-3xl font-bold heading-font mt-4 mb-2 tracking-tight text-slate-800">{currentLevel.title}</h3>
                  <p className="text-slate-500 font-medium mb-8 leading-relaxed text-sm">{currentLevel.description}</p>
                  <div className="space-y-4">
                    <p className="font-bold uppercase text-[10px] tracking-widest text-slate-400 border-b border-slate-100 pb-3">Daftar Modul</p>
                    {currentLevel.modules.map((m) => (
                      <ModuleCard 
                        key={m.id} 
                        module={m} 
                        isCompleted={completedModules.includes(m.id)}
                        onSelect={handleModuleSelect}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="h-full border-4 border-dashed border-slate-300 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center text-slate-300">
                  <Layout size={64} className="mb-4" />
                  <p className="text-xl font-black uppercase tracking-widest italic text-center">Pilih modul di sebelah kiri untuk mulai belajar!</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-10"
            >
              {currentModule && currentModule.id === 'mod-math-sprint' ? (
                <MathSprint 
                  playerName={user?.displayName || 'Pemain 1'}
                  onClose={() => setIsQuizActive(false)}
                  onComplete={handleQuizComplete}
                />
              ) : currentModule && currentModule.id === 'mod-math-sprint-v2' ? (
                <MathSprintV2 
                  playerName={user?.displayName || 'Pemain 1'}
                  onClose={() => setIsQuizActive(false)}
                  onComplete={handleQuizComplete}
                />
              ) : currentModule && currentModule.id === 'mod-kali' ? (
                <SquareCraft 
                  playerName={user?.displayName || 'Pemain 1'}
                  onClose={() => setIsQuizActive(false)}
                  onComplete={handleQuizComplete}
                />
              ) : currentModule ? (
                <QuizSession 
                  questions={currentModule.quiz} 
                  onComplete={handleQuizComplete}
                  onCancel={() => setIsQuizActive(false)}
                  hideFeedback={currentLevel?.id === 'lvl-topik' || currentLevel?.title.toLowerCase().includes('matematika')}
                />
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <div className="fixed -bottom-20 -left-20 w-80 h-80 bg-blue-100 rounded-full blur-[100px] -z-10 opacity-50" />
      <div className="fixed -top-20 -right-20 w-80 h-80 bg-yellow-100 rounded-full blur-[100px] -z-10 opacity-50" />

      {isAdminPanelOpen && (
        <AdminPanel onClose={() => setIsAdminPanelOpen(false)} />
      )}
    </div>
  );
}
