import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, User, Users, ChevronLeft, Search, Zap, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

interface MathSprintProps {
  onClose: () => void;
  onComplete: (score: number, level?: string, timeTaken?: number) => void;
  playerName?: string;
}

type Operation = 'add' | 'sub' | 'mul' | 'div';
type Mode = 'single' | 'multi';

interface Player {
  id: number;
  name: string;
  score: number;
  currentAnswer: string;
  pool: any[];
  idx: number;
  finished: boolean;
}

export function MathSprint({ onClose, onComplete, playerName = 'Pemain 1' }: MathSprintProps) {
  const [screen, setScreen] = useState<'setup' | 'game' | 'result'>('setup');
  const [op, setOp] = useState<Operation>('mul');
  const [mode, setMode] = useState<Mode>('single');
  const [lvId, setLvId] = useState<number | null>(null);
  const [showExplore, setShowExplore] = useState(false);
  const [gameTimer, setGameTimer] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: playerName, score: 0, currentAnswer: '', pool: [], idx: 0, finished: false },
    { id: 2, name: 'Lawan 1', score: 0, currentAnswer: '', pool: [], idx: 0, finished: false },
    { id: 3, name: 'Lawan 2', score: 0, currentAnswer: '', pool: [], idx: 0, finished: false },
    { id: 4, name: 'Lawan 3', score: 0, currentAnswer: '', pool: [], idx: 0, finished: false }
  ]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSoal = lvId ? lvId * 10 : 0;

  const generateProblemPool = (operation: Operation, levelId: number) => {
    let basePool = [];
    const startTable = 2;
    const endTable = levelId + 1;
    const symbols = { add: '＋', sub: '－', mul: '×', div: '÷' };

    for (let a = startTable; a <= endTable; a++) {
      for (let b = 1; b <= 10; b++) {
        let qA, qB, ans;
        if (operation === 'add') { qA = a; qB = b; ans = qA + qB; }
        else if (operation === 'sub') { qA = a + b; qB = a; ans = b; }
        else if (operation === 'mul') { qA = a; qB = b; ans = qA * qB; }
        else { qA = a * b; qB = a; ans = b; }
        basePool.push({ a: qA, b: qB, ans, sym: symbols[operation] });
      }
    }
    // Fisher-Yates Shuffle
    for (let i = basePool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [basePool[i], basePool[j]] = [basePool[j], basePool[i]];
    }
    return basePool;
  };

  const startGame = () => {
    if (!lvId) return;
    const newPlayers = players.map((p, i) => ({
      ...p,
      score: 0,
      idx: 0,
      finished: mode === 'single' && i > 0,
      pool: generateProblemPool(op, lvId),
      currentAnswer: ''
    }));
    setPlayers(newPlayers);
    setGameTimer(lvId * 10 * 6);
    setStartTime(Date.now());
    setScreen('game');

    timerRef.current = setInterval(() => {
      setGameTimer(t => {
        if (t <= 1) {
          endGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setScreen('result');
  };

  const handleInput = (pId: number, val: string | number) => {
    if (screen !== 'game' || gameTimer <= 0) return;
    
    setPlayers(prev => {
      const newPlayers = prev.map(p => {
        if (p.id !== pId || p.finished) return p;

        const updatedPlayer = { ...p };
        if (val === 'C') {
          updatedPlayer.currentAnswer = '';
        } else if (val === 'OK') {
          if (updatedPlayer.currentAnswer === '') return p;
          const isCorrect = parseInt(updatedPlayer.currentAnswer) === updatedPlayer.pool[updatedPlayer.idx].ans;
          if (isCorrect) updatedPlayer.score += (100 / totalSoal);
          updatedPlayer.idx++;
          updatedPlayer.currentAnswer = '';
          if (updatedPlayer.idx >= totalSoal) updatedPlayer.finished = true;
        } else {
          if (updatedPlayer.currentAnswer.length < 5) updatedPlayer.currentAnswer += val.toString();
        }
        return updatedPlayer;
      });

      // Check if all active players finished
      const activePlayers = mode === 'single' ? [newPlayers[0]] : newPlayers;
      if (activePlayers.every(pl => pl.finished)) {
        setTimeout(endGame, 500);
      }

      return newPlayers;
    });
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-white overflow-hidden flex flex-col font-sans">
      <AnimatePresence mode="wait">
        {screen === 'setup' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 relative overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-6 left-6 p-2 bg-white border-2 border-black rounded-xl hover:bg-gray-100 transition-colors">
              <ChevronLeft />
            </button>

            <div className="text-center mb-8">
              <h1 className="text-5xl font-black uppercase tracking-tighter">MATH<span className="text-indigo-600">SPRINT V1</span></h1>
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-indigo-400 mt-1">Multi Operation & Gamified Edition</p>
            </div>

            <div className="bg-white border-4 border-black p-8 rounded-[2.5rem] w-full max-w-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              {/* Explore Tables Button */}
              <button 
                onClick={() => setShowExplore(true)}
                className="w-full mb-8 py-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-100 transition-all group"
              >
                <Search className="group-hover:scale-125 transition-transform" />
                Jelajah Tabel Matematika
              </button>

              {/* Operation Selection */}
              <div className="mb-8">
                <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Pilih Operasi</p>
                <div className="grid grid-cols-4 gap-3">
                  {(['add', 'sub', 'mul', 'div'] as Operation[]).map(o => (
                    <button
                      key={o}
                      onClick={() => setOp(o)}
                      className={cn(
                        "py-4 rounded-2xl font-black text-2xl transition-all border-2 border-black",
                        op === o ? "bg-black text-white scale-105 shadow-lg" : "bg-white text-black hover:bg-gray-50"
                      )}
                    >
                      {o === 'add' ? '＋' : o === 'sub' ? '－' : o === 'mul' ? '×' : '÷'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Selection */}
              <div className="mb-8">
                <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Pilih Mode</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setMode('single')}
                    className={cn(
                      "flex-1 p-4 rounded-2xl border-4 transition-all flex flex-col items-center",
                      mode === 'single' ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-gray-100 bg-white grayscale text-gray-400"
                    )}
                  >
                    <User size={32} />
                    <span className="font-black uppercase text-xs mt-2">Single</span>
                  </button>
                  <button 
                    onClick={() => setMode('multi')}
                    className={cn(
                      "flex-1 p-4 rounded-2xl border-4 transition-all flex flex-col items-center",
                      mode === 'multi' ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-gray-100 bg-white grayscale text-gray-400"
                    )}
                  >
                    <Users size={32} />
                    <span className="font-black uppercase text-xs mt-2">Multi</span>
                  </button>
                </div>
              </div>

              {/* Level Selection */}
              <div className="mb-8 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Pilih Tingkat Level</p>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(l => (
                    <button
                      key={l}
                      onClick={() => setLvId(l)}
                      className={cn(
                        "p-3 rounded-xl border-2 font-black transition-all",
                        lvId === l ? "bg-black text-white border-black" : "bg-white text-slate-500 border-slate-100 hover:border-slate-300"
                      )}
                    >
                      Lv {l}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                disabled={!lvId}
                onClick={startGame}
                className={cn(
                  "w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xl transition-all shadow-lg",
                  lvId ? "bg-indigo-600 text-white hover:scale-[1.02] active:scale-95" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
              >
                MULAI PERTANDINGAN
              </button>
            </div>
          </motion.div>
        )}

        {screen === 'game' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex-1 flex overflow-hidden bg-white"
          >
            {(mode === 'single' ? [players[0]] : players).map((p, idx) => (
              <div key={p.id} className={cn(
                "flex-1 flex flex-col border-black overflow-hidden",
                idx > 0 ? "border-l-4" : ""
              )}>
                <div className={cn(
                  "px-6 py-4 text-white flex justify-between items-center shrink-0",
                  idx % 4 === 0 ? "bg-indigo-600" : idx % 4 === 1 ? "bg-rose-600" : idx % 4 === 2 ? "bg-emerald-600" : "bg-amber-600"
                )}>
                  <span className="font-black uppercase tracking-tighter truncate">{p.name}</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full font-black text-sm">{Math.round(p.score)} PTS</span>
                </div>

                <div className="flex-grow flex flex-col p-6 items-center justify-center">
                  {!p.finished ? (
                    <div key={`${p.id}-${p.idx}`} className="w-full flex flex-col items-center">
                      <div className="mb-4 text-slate-400 font-black text-3xl">0:{gameTimer.toString().padStart(2, '0')}</div>
                      <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-300">Soal {p.idx + 1} / {totalSoal}</div>
                      <div className="text-6xl font-black mb-10 uppercase tracking-tighter text-slate-900">
                        {p.pool[p.idx]?.a} {p.pool[p.idx]?.sym} {p.pool[p.idx]?.b}
                      </div>
                      
                      <div className="w-48 h-20 bg-slate-50 border-4 border-black rounded-2xl flex items-center justify-center text-5xl font-black italic text-indigo-600 shadow-inner mb-10 ml-0 mr-auto lg:mx-auto">
                        {p.currentAnswer}
                      </div>

                      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                          <button 
                            key={n} 
                            onPointerDown={(e) => { e.preventDefault(); handleInput(p.id, n); }}
                            className="h-16 bg-white border-2 border-black rounded-xl font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all touch-none"
                          >
                            {n}
                          </button>
                        ))}
                        <button onPointerDown={(e) => { e.preventDefault(); handleInput(p.id, 'C'); }} className="h-16 bg-white border-2 border-black rounded-xl font-black text-2xl text-rose-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none touch-none">C</button>
                        <button onPointerDown={(e) => { e.preventDefault(); handleInput(p.id, 0); }} className="h-16 bg-white border-2 border-black rounded-xl font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none touch-none">0</button>
                        <button 
                          onPointerDown={(e) => { e.preventDefault(); handleInput(p.id, 'OK'); }} 
                          className={cn(
                            "h-16 text-white border-2 border-black rounded-xl font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none touch-none",
                            idx % 4 === 0 ? "bg-indigo-600" : idx % 4 === 1 ? "bg-rose-600" : idx % 4 === 2 ? "bg-emerald-600" : "bg-amber-600"
                          )}
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <Trophy size={80} className="mx-auto mb-4 text-yellow-500" />
                      <div className="text-5xl font-black mb-2">{Math.round(p.score)}</div>
                      <p className="font-black uppercase tracking-widest text-slate-400">Poin Berhasil</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md"
          >
            <div className="bg-white border-4 border-black rounded-[2.5rem] p-10 w-full max-w-lg shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] text-center">
              <Trophy size={64} className="mx-auto mb-6 text-yellow-500" />
              <h2 className="text-4xl font-black uppercase mb-8 italic">Hasil Akhir</h2>
              
              <div className="space-y-4 mb-10">
                {(mode === 'single' ? [players[0]] : players)
                  .sort((a, b) => b.score - a.score)
                  .map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-slate-50 border-2 border-black rounded-2xl">
                    <span className="font-black text-slate-400">#{i + 1}</span>
                    <span className="font-bold text-lg flex-1 mx-4 text-left">{p.name}</span>
                    <span className="font-black text-2xl text-indigo-600">{Math.round(p.score)}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    const finalScore = Math.max(...players.map(p => p.score));
                    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
                    const opLabels = { 
                      add: 'Penjumlahan (+)', 
                      sub: 'Pengurangan (-)', 
                      mul: 'Perkalian (x)', 
                      div: 'Pembagian (:)' 
                    };
                    if (mode === 'single') {
                      onComplete(finalScore, `${opLabels[op]} - Level ${lvId || 1}`, timeTaken);
                    }
                    onClose();
                  }}
                  className="bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition-all"
                >
                  Selesai
                </button>
                <button 
                  onClick={() => setScreen('setup')}
                  className="bg-white border-2 border-black py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gray-100"
                >
                  Lagi!
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explore Tables Overlay */}
      <AnimatePresence>
        {showExplore && (
          <motion.div 
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-70 bg-white flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-white py-2 z-10 border-b-2 border-black">
              <h2 className="text-3xl font-black italic">Tabel Matematika</h2>
              <button onClick={() => setShowExplore(false)} className="p-2 border-2 border-black rounded-lg bg-black text-white">
                <X />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                <div key={i} className="border-4 border-black p-6 rounded-3xl group hover:bg-indigo-50 transition-colors">
                  <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center text-2xl font-black mb-6 italic">{i}</div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(j => (
                      <div key={j} className="flex justify-between border-b-2 border-slate-100 pb-1 font-bold">
                        <span className="text-slate-500">{i} {op === 'add' ? '＋' : op === 'sub' ? '－' : op === 'mul' ? '×' : '÷'} {j}</span>
                        <span className="text-black font-black">
                          {op === 'add' ? i + j : op === 'sub' ? i + j : op === 'mul' ? i * j : i * j / i}
                          {op === 'sub' && " (Hasil: "+j+")"}
                          {op === 'div' && " (Hasil: "+j+")"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
