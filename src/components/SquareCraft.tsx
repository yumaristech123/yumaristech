import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, User, Users, ChevronLeft, BookOpen, PlayCircle, ShieldHalf, Hourglass, Star, Flag, Hammer } from 'lucide-react';
import { cn } from '../lib/utils';

interface SquareCraftProps {
  onClose: () => void;
  onComplete: (score: number, level?: string, timeTaken?: number) => void;
  playerName?: string;
}

type Screen = 'landing' | 'explore' | 'setup' | 'game' | 'summary';

interface Player {
  id: number;
  name: string;
  score: number;
  level: number;
  timeLeft: number;
  fort: string[];
  def: number;
  pool: number[];
  currentIndex: number;
  num: number;
  ans: string;
  done: boolean;
  showCeleb: boolean;
}

const fortressParts = ['🧱', '🏰', '🛡️', '🚩', '🔥', '⚔️', '🏛️', '💎', '👑', '🌌'];

export function SquareCraft({ onClose, onComplete, playerName = 'Pemain 1' }: SquareCraftProps) {
  const [screen, setScreen] = useState<Screen>('landing');
  const [lvl, setLvl] = useState(1);
  const [limit, setLimit] = useState(1);
  const [players, setPlayers] = useState<Player[]>([]);
  const [exploreRange, setExploreRange] = useState({ start: 1, end: 10 });
  const [startTime, setStartTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateQuestionPool = (level: number) => {
    const start = (level - 1) * 10 + 1;
    const end = level * 10;
    let pool = [];
    for (let i = start; i <= end; i++) pool.push(i);
    // Fisher-Yates Shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool;
  };

  const handleStartGame = (playerNames: string[]) => {
    const questionsPerLevel = 10;
    const timeLimit = questionsPerLevel * 5;
    
    const newPlayers = playerNames.map((name, i) => {
      const pool = generateQuestionPool(lvl);
      return {
        id: i,
        name: name || `Pemain ${i + 1}`,
        score: 0,
        level: lvl,
        timeLeft: timeLimit,
        fort: [],
        def: 0,
        pool: pool,
        currentIndex: 0,
        num: pool[0],
        ans: '',
        done: false,
        showCeleb: false
      };
    });
    
    setPlayers(newPlayers);
    setStartTime(Date.now());
    setScreen('game');

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPlayers(prev => {
        let stillPlaying = 0;
        const next = prev.map(p => {
          if (!p.done && !p.showCeleb) {
            if (p.timeLeft > 0) {
              p.timeLeft--;
              stillPlaying++;
            } else {
              p.done = true;
            }
          }
          return p;
        });

        if (stillPlaying === 0 && !next.some(p => p.showCeleb)) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimeout(() => setScreen('summary'), 1500);
        }
        return next;
      });
    }, 1000);
  };

  const handleKey = (id: number, val: string) => {
    setPlayers(prev => {
      return prev.map(p => {
        if (p.id !== id || p.done || p.showCeleb) return p;
        
        const updatedPlayer = { ...p };
        if (val === 'C') {
          updatedPlayer.ans = '';
        } else if (updatedPlayer.ans.length < 5) {
          updatedPlayer.ans += val;
        }
        return updatedPlayer;
      });
    });
  };

  const handleLevelUp = (id: number) => {
    setPlayers(prev => {
      const next = [...prev];
      const p = next[id];
      p.showCeleb = false;
      p.level++;
      p.pool = generateQuestionPool(p.level);
      p.currentIndex = 0;
      p.num = p.pool[0];
      p.timeLeft += 20;
      
      // Resume timer if it was potentially stopped by "no one playing" check
      if (!timerRef.current) {
         // Logic to restart global interval if needed would go here, 
         // but usually at least one player is still "playing" until level up is clicked.
      }
      return next;
    });
  };

  const checkAnswer = (id: number) => {
    setPlayers(prev => {
      const next = [...prev];
      const p = next[id];
      if (p.done || p.showCeleb) return prev;

      const correct = p.num * p.num;
      if (p.ans && parseInt(p.ans) === correct) {
        p.score += p.level * 10;
        p.currentIndex++;
        if (p.currentIndex < 10) {
          p.num = p.pool[p.currentIndex];
        } else {
          const partIndex = Math.min(p.level - 1, fortressParts.length - 1);
          p.fort.push(fortressParts[partIndex]);
          p.def += (p.level * 25);
          if (p.level < 10) p.showCeleb = true;
          else p.done = true;
        }
      }
      p.ans = '';
      return next;
    });
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="fixed inset-0 z-[80] bg-[#f3f4f6] flex flex-col font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-800 text-white"
          >
            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 w-full max-w-lg text-center relative overflow-hidden shadow-2xl">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
              
              <h1 className="text-6xl font-black italic tracking-tighter mb-2 scale-y-110">SQUARE<br/>CRAFT</h1>
              <div className="h-1 w-20 bg-indigo-400 mx-auto mb-6 rounded-full"></div>
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-indigo-200 mb-8 italic">Arsitektur Matematika</p>

              <div className="space-y-4">
                <button onClick={() => setScreen('explore')} className="w-full bg-white/10 hover:bg-white/20 border border-white/20 py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest transition-all">
                  <BookOpen size={18} /> Jelajah Tabel Kuadrat
                </button>

                <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
                  <p className="text-[10px] uppercase font-black text-indigo-300 mb-4 tracking-widest">Pilih Level Strategi</p>
                  <div className="grid grid-cols-5 gap-2">
                    {[1,2,3,4,5,6,7,8,9,10].map(i => (
                      <button 
                        key={i} 
                        onClick={() => setLvl(i)}
                        className={cn(
                          "py-3 rounded-xl font-black text-xs transition-all border",
                          lvl === i ? "bg-white text-indigo-700 border-white scale-110 shadow-lg" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                        )}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map(l => (
                    <button 
                      key={l}
                      onClick={() => setLimit(l)}
                      className={cn(
                        "py-4 rounded-2xl font-black text-[10px] uppercase transition-all border",
                        limit === l ? "bg-white text-indigo-700 border-white scale-105 shadow-md" : "bg-white/5 border-white/10 text-white/40"
                      )}
                    >
                      {l === 1 ? 'Single 1P' : l === 2 ? 'Duel 2P' : l === 3 ? 'Team 3P' : 'Squad 4P'}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setScreen('setup')}
                  className="w-full bg-white text-indigo-700 font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:bg-indigo-50 transition-all uppercase text-sm tracking-widest mt-4"
                >
                  <PlayCircle /> Mulai Ekspedisi
                </button>
                
                <button onClick={onClose} className="text-white/40 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors mt-4">
                  Batal
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'explore' && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="flex-1 flex flex-col bg-slate-50"
          >
            <div className="bg-white p-6 flex items-center justify-between border-b shrink-0">
              <button onClick={() => setScreen('landing')} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl"><ChevronLeft /></button>
              <h2 className="font-black uppercase text-xs tracking-[0.2em] text-gray-800">Perpustakaan Kuadrat</h2>
              <div className="w-10"></div>
            </div>

            <div className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
               <div className="flex overflow-x-auto gap-3 pb-3 no-scrollbar shrink-0">
                  {[0,1,2,3,4,5,6,7,8,9].map(i => {
                    const start = i * 10 + 1;
                    const end = (i + 1) * 10;
                    return (
                      <button 
                        key={i}
                        onClick={() => setExploreRange({ start, end })}
                        className={cn(
                          "shrink-0 px-6 py-3 rounded-2xl font-black text-[10px] uppercase transition-all border-2",
                          exploreRange.start === start ? "bg-indigo-600 border-indigo-600 text-white shadow-lg" : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                        )}
                      >
                        {start}-{end}
                      </button>
                    );
                  })}
               </div>

               <div className="flex-1 bg-white rounded-3xl border-2 border-indigo-50 p-8 shadow-inner grid grid-cols-2 md:grid-cols-5 gap-4 overflow-y-auto content-start">
                  {Array.from({ length: exploreRange.end - exploreRange.start + 1 }, (_, i) => {
                    const n = exploreRange.start + i;
                    return (
                      <div key={n} className="bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100 flex flex-col items-center justify-center hover:bg-indigo-50 transition-colors">
                        <span className="text-xs text-indigo-400 font-bold mb-2">{n}²</span>
                        <span className="text-3xl font-black text-indigo-700 tracking-tighter italic">{n * n}</span>
                      </div>
                    );
                  })}
               </div>
            </div>
            
            <div className="p-8 bg-white border-t text-center">
               <button onClick={() => setScreen('landing')} className="w-full max-w-md mx-auto bg-indigo-600 text-white font-black py-5 rounded-2xl text-[11px] uppercase shadow-xl hover:bg-indigo-700 transition-all">Selesai Belajar</button>
            </div>
          </motion.div>
        )}

        {screen === 'setup' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-6 bg-indigo-50"
          >
            <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl border border-indigo-100 text-center">
              <h2 className="text-2xl font-black text-gray-800 mb-8 uppercase italic tracking-tighter">Identitas Arsitek</h2>
              <div className="space-y-4 mb-10">
                {Array.from({ length: limit }, (_, i) => (
                  <div key={i} className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-300" size={18} />
                    <input 
                      id={`setup-p-${i}`}
                      type="text" 
                      placeholder={`Arsitek ${i + 1}`}
                      defaultValue={i === 0 ? playerName : ''}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-5 pl-14 pr-6 font-bold text-sm outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => setScreen('landing')} className="flex-1 bg-slate-100 text-slate-400 font-black py-4 rounded-2xl text-[10px] uppercase">Batal</button>
                <button 
                  onClick={() => {
                    const names = Array.from({ length: limit }, (_, i) => (document.getElementById(`setup-p-${i}`) as HTMLInputElement)?.value);
                    handleStartGame(names);
                  }} 
                  className="flex-[2] bg-indigo-600 text-white font-black py-4 rounded-2xl text-[10px] uppercase shadow-lg shadow-indigo-100 tracking-[0.2em]"
                >
                  Aktifkan!
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'game' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex-1 flex overflow-hidden bg-slate-200 gap-1 p-1"
          >
            {players.map(p => (
              <div key={p.id} className="flex-1 bg-white rounded-2xl overflow-hidden flex flex-col relative border-r last:border-r-0 shadow-lg">
                
                {/* Level Up Overlay */}
                <AnimatePresence>
                  {p.showCeleb && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-indigo-900/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center"
                    >
                      <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                          <div className="w-28 h-28 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.5)] mb-8 border-4 border-white/20">
                             <Star size={56} className="text-white fill-white" />
                          </div>
                          <h3 className="text-white font-black text-5xl uppercase italic tracking-tighter mb-2">Level Up!</h3>
                          <p className="text-indigo-200 text-xs font-bold uppercase tracking-[0.3em] mb-12">Benteng Lv. {p.level} Selesai</p>
                          <button onClick={() => handleLevelUp(p.id)} className="w-full max-w-[240px] bg-white text-indigo-900 font-black py-5 rounded-2xl text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-yellow-400 hover:text-white transition-all">Lanjut!</button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Status Overlays */}
                {p.done && (
                  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center text-white">
                      {p.timeLeft <= 0 ? (
                        <>
                          <Hourglass size={48} className="text-rose-400 mb-4 animate-pulse" />
                          <span className="bg-rose-600 px-6 py-2 rounded-full font-black text-xs uppercase italic tracking-widest shadow-xl">Waktu Habis</span>
                        </>
                      ) : (
                        <>
                          <Flag size={48} className="text-indigo-400 mb-4" />
                          <span className="bg-indigo-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">Ekspedisi Selesai</span>
                        </>
                      )}
                      <p className="text-white/40 text-[9px] font-black uppercase mt-6 tracking-[0.3em]">Menunggu Arsitek...</p>
                  </div>
                )}

                <div className="bg-indigo-700 p-4 text-white flex justify-between items-center text-xs font-black uppercase italic tracking-tight h-14 shrink-0 shadow-md z-10">
                   <span className="truncate flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>{p.name}</span>
                   <span className="bg-white/20 px-3 py-1 rounded-lg">Lv {p.level}</span>
                </div>

                <div className="flex justify-around bg-indigo-50/50 py-3 border-b text-xs font-black">
                   <div className={cn("flex items-center gap-2", p.timeLeft < 10 && !p.done ? "text-rose-600 animate-pulse scale-110" : "text-slate-600")}><Hourglass size={14} /> {p.timeLeft}s</div>
                   <div className="flex items-center gap-2 text-indigo-600"><ShieldHalf size={14} /> {p.def}</div>
                </div>

                <div className="bg-slate-900 p-4 shrink-0 flex flex-col justify-center min-h-[140px] border-b border-indigo-900">
                    <div className="flex flex-wrap justify-center gap-2 mb-2 overflow-hidden items-center min-h-[60px]">
                      {p.fort.length > 0 ? p.fort.map((part, i) => (
                        <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl">{part}</motion.span>
                      )) : (
                        <div className="flex flex-col items-center opacity-20">
                          <Hammer size={32} className="text-white mb-2" />
                          <span className="text-[10px] text-white font-black uppercase tracking-widest">Siap Bangun</span>
                        </div>
                      )}
                    </div>
                </div>

                <div key={p.currentIndex} className="flex-1 flex flex-col p-6 items-center justify-between overflow-hidden">
                   <div className="w-full text-center">
                      <div className="text-6xl md:text-8xl font-black text-indigo-700 italic tracking-tighter leading-none py-6 mb-2">
                        {p.num}<sup className="text-2xl not-italic ml-1">2</sup>
                      </div>
                      <div className="w-full max-w-[320px] h-24 bg-slate-50 border-4 border-indigo-100 rounded-[2rem] flex items-center justify-center text-6xl font-black text-indigo-900 italic shadow-inner mx-auto">
                        {p.ans || <span className="text-slate-200">?</span>}
                      </div>
                   </div>

                   <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] pb-4">
                      {[1,2,3,4,5,6,7,8,9].map(n => (
                        <button 
                          key={n} 
                          onPointerDown={(e) => { e.preventDefault(); handleKey(p.id, n.toString()); }}
                          className="h-14 bg-white border-2 border-slate-100 rounded-2xl font-black text-2xl shadow-sm active:bg-indigo-600 active:text-white transition-all hover:border-indigo-200 touch-none"
                        >
                          {n}
                        </button>
                      ))}
                      <button onPointerDown={(e) => { e.preventDefault(); handleKey(p.id, 'C'); }} className="h-14 bg-rose-50 border-2 border-rose-100 rounded-2xl text-rose-500 font-black text-sm uppercase touch-none">C</button>
                      <button onPointerDown={(e) => { e.preventDefault(); handleKey(p.id, '0'); }} className="h-14 bg-white border-2 border-slate-100 rounded-2xl font-black text-2xl touch-none">0</button>
                      <button onPointerDown={(e) => { e.preventDefault(); checkAnswer(p.id); }} className="h-14 bg-indigo-600 text-white rounded-2xl shadow-lg active:bg-indigo-700 flex items-center justify-center touch-none"><Flag /></button>
                   </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {screen === 'summary' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-6 bg-indigo-700 text-white"
          >
            <div className="bg-white rounded-[3rem] p-10 w-full max-w-md text-gray-800 shadow-2xl text-center border border-white/20">
               <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <Trophy size={56} className="text-yellow-500" />
               </div>
               <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Peringkat Arsitek</h2>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10 italic">Laporan Selesai</p>
               
               <div className="space-y-4 mb-12">
                  {[...players].sort((a,b) => b.score - a.score).map((p, i) => (
                    <div key={p.id} className={cn(
                      "flex items-center justify-between p-5 rounded-[2rem] border transition-all",
                      i === 0 ? "bg-indigo-50 border-indigo-200 scale-105 shadow-xl ring-2 ring-yellow-400" : "bg-slate-50 border-slate-100"
                    )}>
                       <div className="text-left">
                          <p className="font-black text-xs uppercase tracking-tight">{i === 0 ? '🏆' : `#${i+1}`} {p.name}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Def: {p.def} | Lvl: {p.level}</p>
                       </div>
                       <div className="text-3xl font-black text-indigo-700 italic tracking-tighter">{p.score}</div>
                    </div>
                  ))}
               </div>

               <div className="flex flex-col gap-3">
                 <button 
                  onClick={() => {
                    const maxScore = Math.max(...players.map(p => p.score));
                    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
                    const maxLvl = Math.max(...players.map(p => p.level));
                    if (players.length === 1) {
                      onComplete(maxScore, `Kuadrat - Level ${maxLvl}`, timeTaken);
                    }
                    onClose();
                  }}
                  className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl text-[11px] uppercase shadow-xl shadow-indigo-100 tracking-[0.2em] hover:bg-indigo-700 transition-all"
                 >
                   Simpan
                 </button>
                 <button 
                  onClick={() => handleStartGame(players.map(p => p.name))}
                  className="w-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 py-5 rounded-2xl font-black text-[11px] uppercase transition-all hover:bg-emerald-500/20"
                 >
                   Ulangi
                 </button>
                 <button onClick={() => setScreen('landing')} className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Batal & Menu Utama</button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
