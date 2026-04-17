import { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 'lvl-aritmetika',
    title: 'Aritmetika Dasar',
    description: 'Kuasai operasi hitung dasar mulai dari kuis interaktif hingga tantangan kilat.',
    minXp: 0,
    modules: [
      {
        id: 'mod-math-sprint',
        title: 'MATH SPRINT V1: Tantangan Kilat',
        description: 'Game matematika interaktif untuk melatih kecepatan berhitungmu!',
        icon: 'Zap',
        content: 'MATH SPRINT V1 adalah tantangan matematika super cepat di mana kamu bisa memilih operasi penjumlahan, pengurangan, perkalian, atau pembagian. Kamu bisa bermain sendiri atau bersama temanmu di satu layar!',
        quiz: [] // Special module with custom logic
      },
      {
        id: 'mod-math-sprint-v2',
        title: 'MATH SPRINT V2: Ultra Modern',
        description: 'Versi terbaru dengan visual futuristik dan tantangan angka tingkat tinggi (1-3 digit).',
        icon: 'Zap',
        content: 'Selamat datang di simulasi kecepatan kognitif tingkat lanjut. Pilih mode permainan 1P-4P, tentukan tingkat kesulitanmu dari digit rendah ke ratusan, dan jadilah juara di antarmuka Ultra Modern.',
        quiz: [] // Special module
      },
      {
        id: 'mod-kali',
        title: 'Square Craft: Arsitektur Matematika',
        description: 'Bangun benteng terkuatmu dengan menguasai angka kuadrat!',
        icon: 'ShieldHalf',
        content: 'Square Craft adalah tantangan strategi di mana kamu berperan sebagai arsitek. Selesaikan soal kuadrat (x²) untuk mengumpulkan material dan membangun benteng pertahanan. Mainkan mode 1P hingga 4P untuk membuktikan siapa arsitek tercepat!',
        quiz: [] // Special game module
      }
    ]
  },
  {
    id: 'lvl-topik',
    title: 'Topik Matematika',
    description: 'Pelajari konsep matematika yang lebih spesifik seperti pecahan dan logika.',
    minXp: 0,
    modules: [
      {
        id: 'mod-pecahan',
        title: 'Dunia Pecahan',
        description: 'Membagi satu kesatuan menjadi bagian-bagian kecil.',
        icon: 'Divide',
        content: 'Pecahan mewakili bagian dari satu kesatuan yang utuh. Pecahan sangat sering digunakan dalam kehidupan sehari-hari, seperti saat membagi makanan.',
        quiz: [
          {
            id: 'q1',
            question: 'Manakah yang lebih besar: 1/2 atau 1/4?',
            options: ['1/2', '1/4', 'Sama saja', 'Tidak bisa dibandingkan'],
            correctAnswer: '1/2',
            explanation: 'Bayangkan pizza. 1/2 pizza lebih besar daripada 1/4 pizza karena dipotong menjadi bagian yang lebih sedikit.'
          }
        ]
      }
    ]
  }
];
