import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, User, Users, ChevronLeft, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface MathSprintV2Props {
  onClose: () => void;
  onComplete: (score: number, level?: string, timeTaken?: number) => void;
  playerName?: string;
}

type Operation = '+' | '-' | 'x' | ':';
type Screen = 'setup' | 'game' | 'result';

interface Question {
  a: number | string;
  b: number | string;
  answer: number | null;
}

class PlayerState {
  id: number;
  name: string;
  correctAnswers: number;
  questionsAnswered: number;
  score: number;
  currentQuestion: Question | null;
  input: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.correctAnswers = 0;
    this.questionsAnswered = 0;
    this.score = 0;
    this.currentQuestion = null;
    this.input = "";
  }
}

export function MathSprintV2({ onClose, onComplete, playerName = 'Pemain 1' }: MathSprintV2Props) {
  const [screen, setScreen] = useState<Screen>('setup');
  const [playerCount, setPlayerCount] = useState(1);
  const [operation, setOperation] = useState<Operation>('+');
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [activePlayers, setActivePlayers] = useState<PlayerState[]>([]);
  const [startTime, setStartTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalQuestions = 30;
  const TIME_PER_QUESTION = 15;

  const getRanges = (l: number) => {
    switch (l) {
      case 1: return { r1: [2, 9], r2: [11, 99] };
      case 2: return { r1: [2, 9], r2: [101, 999] };
      case 3: return { r1: [11, 99], r2: [11, 99] };
      case 4: return { r1: [11, 99], r2: [101, 999] };
      default: return { r1: [2, 9], r2: [11, 99] };
    }
  };

  const generateQuestion = (l: number, op: Operation): Question => {
    const r = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const range = getRanges(l);
    let a, b, answer;

    if (op === '+') {
      a = r(range.r1[0], range.r1[1]);
      b = r(range.r2[0], range.r2[1]);
      answer = a + b;
    } else if (op === '-') {
      b = r(range.r1[0], range.r1[1]);
      a = r(range.r2[0], range.r2[1]);
      if (b > a) [a, b] = [b, a];
      answer = a - b;
    } else if (op === 'x') {
      a = r(range.r1[0], range.r1[1]);
      b = r(range.r2[0], range.r2[1]);
      answer = a * b;
    } else {
      let quotient = r(range.r1[0], range.r1[1]);
      b = r(range.r2[0], range.r2[1]);
      a = quotient * b;
      answer = quotient;
    }

    return { a, b, answer };
  };

  const startGame = () => {
    const initialPlayers = Array.from({ length: playerCount }, (_, i) => {
      const name = i === 0 ? playerName : `Lawan ${i}`;
      const p = new PlayerState(i + 1, name);
      p.currentQuestion = generateQuestion(level, operation);
      return p;
    });
    setActivePlayers(initialPlayers);
    setTimeLeft(totalQuestions * TIME_PER_QUESTION);
    setStartTime(Date.now());
    setScreen('game');

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          concludeGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const concludeGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setScreen('result');
  };

  const handleInput = (pid: number, val: string) => {
    setActivePlayers(prev => {
      const next = prev.map(p => {
        if (p.id !== pid || p.questionsAnswered >= totalQuestions) return p;

        const updatedPlayer = { ...p };
        if (val === 'C') {
          updatedPlayer.input = "";
        } else if (val === 'OK') {
          if (updatedPlayer.input && updatedPlayer.currentQuestion) {
            if (parseInt(updatedPlayer.input) === updatedPlayer.currentQuestion.answer) {
              updatedPlayer.correctAnswers++;
              updatedPlayer.questionsAnswered++;
              updatedPlayer.score = Math.round((updatedPlayer.correctAnswers / totalQuestions) * 100);

              if (updatedPlayer.questionsAnswered < totalQuestions) {
                updatedPlayer.currentQuestion = generateQuestion(level, operation);
                updatedPlayer.input = "";
              } else {
                updatedPlayer.currentQuestion = { a: '✓', b: '', answer: null };
              }
            } else {
              updatedPlayer.input = "";
            }
          }
        } else {
          if (updatedPlayer.input.length < 8) updatedPlayer.input += val;
        }
        return updatedPlayer;
      });

      if (next.every(pl => pl.questionsAnswered >= totalQuestions)) {
        setTimeout(concludeGame, 500);
      }
      return next;
    });
  };

  const quitToMenu = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setScreen('setup');
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const opInfo = {
    '+': { sym: '+', color: 'text-sky-400' },
    '-': { sym: '−', color: 'text-rose-400' },
    'x': { sym: '×', color: 'text-amber-400' },
    ':': { sym: '÷', color: 'text-emerald-400' }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-[#020617] text-white overflow-hidden flex flex-col font-mono selection:bg-sky-500">
      {/* Background Animation */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] opacity-50 -z-10 animate-pulse" />

      <AnimatePresence mode="wait">
        {screen === 'setup' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            className="flex-1 flex flex-col max-w-7xl mx-auto p-6 overflow-y-auto no-scrollbar"
          >
            <header className="text-center py-6">
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">MATH SPRINT</span>
                <span className="text-white opacity-20 text-xl ml-2 uppercase">V2</span>
              </h1>
              <p className="text-sky-400/60 text-[10px] font-black tracking-[0.4em] uppercase">Simulasi Kecepatan Kognitif</p>
            </header>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
              {/* Step 1: Players */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-black border border-sky-500/20">1</div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-sky-200">Jumlah Pemain</h2>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[1, 2, 3, 4].map(c => (
                    <button
                      key={c}
                      onClick={() => setPlayerCount(c)}
                      className={cn(
                        "py-4 rounded-2xl font-black transition-all border-2",
                        playerCount === c ? "bg-sky-500/20 border-sky-400 text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]" : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
                      )}
                    >
                      {c}P
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Operation */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-black border border-purple-500/20">2</div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-purple-200">Operasi</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {(['+', '-', 'x', ':'] as Operation[]).map(o => (
                    <button
                      key={o}
                      onClick={() => setOperation(o)}
                      className={cn(
                        "py-6 rounded-[1.5rem] font-black text-4xl transition-all border-2 shadow-inner",
                        operation === o 
                          ? o === '+' ? "bg-sky-500/20 border-sky-400 text-sky-400" : o === '-' ? "bg-rose-500/20 border-rose-400 text-rose-400" : o === 'x' ? "bg-amber-500/20 border-amber-400 text-amber-400" : "bg-emerald-500/20 border-emerald-400 text-emerald-400"
                          : "bg-white/5 border-white/5 text-white/20"
                      )}
                    >
                      {o === '+' ? '＋' : o === '-' ? '－' : o === 'x' ? '×' : '÷'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Difficulty & Start */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-black border border-pink-500/20">3</div>
                    <h2 className="text-xs font-black uppercase tracking-widest text-pink-200">Kesulitan</h2>
                  </div>
                  <div className="space-y-3 mb-10">
                    {[1, 2, 3, 4].map(l => (
                      <button
                        key={l}
                        onClick={() => setLevel(l)}
                        className={cn(
                          "w-full p-4 rounded-2xl flex flex-col items-start transition-all border-2",
                          level === l ? "bg-pink-500/20 border-pink-400 text-pink-400" : "bg-white/5 border-white/5 text-white/30 hover:bg-white/10"
                        )}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest">Level {l}</span>
                        <span className="text-[8px] opacity-60 font-bold uppercase">{l === 1 ? "1 Digit & 2 Digit" : l === 2 ? "1 Digit & 3 Digit" : l === 3 ? "2 Digit & 2 Digit" : "2 Digit & 3 Digit"}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={onClose} className="p-5 border-2 border-white/10 rounded-2xl text-white/40 hover:bg-white/5">
                    <ChevronLeft />
                  </button>
                  <button 
                    onClick={startGame}
                    className="flex-1 bg-gradient-to-r from-sky-400 to-indigo-500 py-5 rounded-2xl font-black text-xs tracking-[0.4em] uppercase shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    MULAI
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'game' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex-1 flex flex-col"
          >
            <header className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-6 shrink-0">
              <div className="text-[10px] font-black uppercase tracking-widest text-sky-400">Level {level}</div>
              <div className="text-2xl font-black italic tracking-tighter">
                {Math.floor(timeLeft / 60)}:{Math.floor(timeLeft % 60).toString().padStart(2, '0')}
              </div>
              <button onClick={quitToMenu} className="text-[10px] font-black uppercase tracking-widest text-rose-500">Batal</button>
            </header>

            <div className="flex-1 flex gap-0.5 p-0.5 bg-white/5">
              {activePlayers.map((p, idx) => (
                <div key={p.id} className="flex-1 bg-[#020617] flex flex-col overflow-hidden relative border border-white/5">
                   <div className="px-4 py-1.5 bg-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest shrink-0">
                      <span className="truncate">{p.name}</span>
                      <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-sky-400" initial={{ width: 0 }} animate={{ width: `${(p.questionsAnswered/totalQuestions)*100}%` }} />
                      </div>
                   </div>

                   <div key={p.questionsAnswered} className="flex-1 flex flex-col items-center justify-center p-4">
                      {p.questionsAnswered < totalQuestions ? (
                        <>
                          <div className="text-center mb-8">
                            <div className="text-[10px] text-white/20 font-black uppercase tracking-widest mb-2">Soal {p.idx + 1} / {totalQuestions}</div>
                            <div className="text-5xl md:text-7xl font-black italic tracking-tighter flex items-center justify-center gap-3">
                              <span>{p.currentQuestion?.a}</span>
                              <span className={opInfo[operation].color}>{opInfo[operation].sym}</span>
                              <span>{p.currentQuestion?.b}</span>
                            </div>
                          </div>

                          <div className="w-full max-w-[240px] h-20 bg-white/5 border-2 border-sky-400/30 rounded-2xl flex items-center justify-center text-5xl font-black text-sky-400 italic mb-10 shadow-inner">
                            {p.input || ""}
                          </div>

                          <div className="grid grid-cols-3 gap-2 w-full max-w-[280px]">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                              <button key={n} onPointerDown={(e) => { e.preventDefault(); handleInput(p.id, n.toString()); }} className="h-14 bg-white/5 border border-white/10 rounded-xl font-black text-2xl hover:bg-white/10 active:scale-90 transition-all touch-none">
                                {n}
                              </button>
                            ))}
                            <button onPointerDown={(e) => { e.preventDefault(); handleInput(p.id, 'C'); }} className="h-14 bg-rose-500/20 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-black uppercase touch-none">C</button>
                            <button onPointerDown={(e) => { e.preventDefault(); handleInput(p.id, '0'); }} className="h-14 bg-white/5 border border-white/10 rounded-xl font-black text-2xl touch-none">0</button>
                            <button onPointerDown={(e) => { e.preventDefault(); handleInput(p.id, 'OK'); }} className="h-14 bg-sky-500/20 border border-sky-400/30 rounded-xl text-sky-400 text-xs font-black uppercase touch-none">OK</button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center">
                          <Trophy size={80} className="mx-auto text-yellow-500 mb-6 drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]" />
                          <h3 className="text-4xl font-black italic mb-2 tracking-tighter uppercase">Selesai!</h3>
                          <p className="text-xl font-black text-sky-400">{p.score} PTS</p>
                        </div>
                      )}
                   </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center bg-[#020617] p-6"
          >
            <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 text-center shadow-2xl relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-[#020617] shadow-xl">
                 <Trophy size={48} className="text-white" />
              </div>

              <h2 className="text-5xl font-black italic tracking-tighter mb-2 mt-6">SKOR AKHIR</h2>
              <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mb-10">
                Peringkat Champion
              </div>

              <div className="space-y-4 mb-10">
                {[...activePlayers].sort((a, b) => b.score - a.score).map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/5 shadow-inner">
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center font-black text-sm italic",
                        i === 0 ? "border-yellow-500 text-yellow-500" : "border-white/10 text-white/40"
                      )}>#{i + 1}</span>
                      <div className="text-left font-bold">{p.name}</div>
                    </div>
                    <div className="text-3xl font-black italic text-sky-400">{p.score}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                 <button 
                  onClick={() => {
                    const bestScore = Math.max(...activePlayers.map(p => p.score));
                    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
                    const opLabels: Record<Operation, string> = { 
                      '+': 'Penjumlahan (+)', 
                      '-': 'Pengurangan (-)', 
                      'x': 'Perkalian (x)', 
                      ':': 'Pembagian (:)' 
                    };
                    if (playerCount === 1) {
                      onComplete(bestScore, `${opLabels[operation]} - Level ${level}`, timeTaken);
                    }
                    onClose();
                  }}
                  className="w-full bg-white text-black py-5 rounded-[1.5rem] font-black tracking-widest uppercase text-xs hover:scale-[1.02] active:scale-95 transition-all"
                 >
                   {playerCount === 1 ? 'Simpan & Selesai' : 'Selesai'}
                 </button>
                 <button onClick={quitToMenu} className="w-full border-2 border-white/10 py-5 rounded-[1.5rem] font-black tracking-widest uppercase text-xs hover:bg-white/5 transition-all text-white/40">
                   Menu Utama
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
