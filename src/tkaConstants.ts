import { Level } from './types';

export const TKA_LEVELS: Level[] = [
  {
    id: 'lvl-tka-dasar',
    title: 'Topik Matematika' as any, // Reusing existing Difficulty type or using any if needed
    description: 'Kurikulum TKA untuk berbagai jenjang pendidikan.',
    minXp: 0,
    modules: [
      {
        id: 'mod-tka-sd',
        title: 'Jenjang SD',
        description: 'Materi pembelajaran untuk tingkat Sekolah Dasar.',
        icon: 'GraduationCap',
        content: 'Pilih mata pelajaran untuk tingkat Sekolah Dasar.',
        quiz: [],
        subModules: [
          {
            id: 'mod-tka-sd-math',
            title: 'Matematika SD',
            description: 'Latihan soal matematika untuk jenjang SD.',
            icon: 'Calculator',
            content: 'Selamat datang di modul Matematika SD. Di sini kamu akan melatih kemampuan numerasimu.',
            quiz: [
              {
                id: 'tka-sd-m-1',
                question: 'Berapakah hasil dari 25 + 17?',
                options: ['32', '42', '52', '62'],
                correctAnswer: '42',
                explanation: '25 ditambah 17 adalah 42.'
              }
            ]
          },
          {
            id: 'mod-tka-sd-indo',
            title: 'Bahasa Indonesia SD',
            description: 'Latihan soal Bahasa Indonesia untuk jenjang SD.',
            icon: 'Book',
            content: 'Selamat datang di modul Bahasa Indonesia SD. Mari tingkatkan kemampuan literasimu.',
            quiz: [
              {
                id: 'tka-sd-bi-1',
                question: 'Antonim dari kata "Besar" adalah...',
                options: ['Luas', 'Kecil', 'Tinggi', 'Lebar'],
                correctAnswer: 'Kecil',
                explanation: 'Lawan kata (antonim) dari besar adalah kecil.'
              }
            ]
          }
        ]
      },
      {
        id: 'mod-tka-smp',
        title: 'Jenjang SMP',
        description: 'Materi pembelajaran untuk tingkat Sekolah Menengah Pertama.',
        icon: 'GraduationCap',
        content: 'Pilih mata pelajaran untuk tingkat Sekolah Menengah Pertama.',
        quiz: [],
        subModules: [
          {
            id: 'mod-tka-smp-math',
            title: 'Matematika SMP',
            description: 'Latihan soal matematika untuk jenjang SMP.',
            icon: 'Calculator',
            content: 'Selamat datang di modul Matematika SMP. Mari perdalam konsep matematikanu.',
            quiz: [
              {
                id: 'tka-smp-m-1',
                question: 'Jika x + 5 = 12, berapakah nilai x?',
                options: ['5', '6', '7', '8'],
                correctAnswer: '7',
                explanation: 'x = 12 - 5, maka x = 7.'
              }
            ]
          },
          {
            id: 'mod-tka-smp-indo',
            title: 'Bahasa Indonesia SMP',
            description: 'Latihan soal Bahasa Indonesia untuk jenjang SMP.',
            icon: 'Book',
            content: 'Selamat datang di modul Bahasa Indonesia SMP. Mari tingkatkan pemahaman bacaanmu.',
            quiz: [
              {
                id: 'tka-smp-bi-1',
                question: 'Ide pokok paragraf biasanya terletak di...',
                options: ['Awal kalimat', 'Tengah kalimat', 'Akhir kalimat', 'Awal atau akhir paragraf'],
                correctAnswer: 'Awal atau akhir paragraf',
                explanation: 'Ide pokok biasanya terdapat pada kalimat utama yang bisa terletak di awal (deduktif) atau akhir (induktif) paragraf.'
              }
            ]
          }
        ]
      },
      {
        id: 'mod-tka-sma',
        title: 'Jenjang SMA',
        description: 'Materi pembelajaran untuk tingkat Sekolah Menengah Atas.',
        icon: 'GraduationCap',
        content: 'Pilih mata pelajaran untuk tingkat Sekolah Menengah Atas.',
        quiz: [],
        subModules: [
          {
            id: 'mod-tka-sma-math',
            title: 'Matematika SMA',
            description: 'Latihan soal matematika untuk jenjang SMA.',
            icon: 'Calculator',
            content: 'Selamat datang di modul Matematika SMA. Persiapkan dirimu untuk materi yang lebih kompleks.',
            quiz: [
              {
                id: 'tka-sma-m-1',
                question: 'Turunan pertama dari f(x) = x^2 adalah...',
                options: ['x', '2x', '2', 'x^2'],
                correctAnswer: '2x',
                explanation: 'Menggunakan rumus turunan d/dx(x^n) = nx^(n-1), maka d/dx(x^2) = 2x.'
              }
            ]
          },
          {
            id: 'mod-tka-sma-indo',
            title: 'Bahasa Indonesia SMA',
            description: 'Latihan soal Bahasa Indonesia untuk jenjang SMA.',
            icon: 'Book',
            content: 'Selamat datang di modul Bahasa Indonesia SMA. Mari analisis teks dengan lebih dalam.',
            quiz: [
              {
                id: 'tka-sma-bi-1',
                question: 'Manakah yang merupakan kalimat efektif?',
                options: ['Bagi semua siswa-siswa diharapkan tenang.', 'Para siswa diharapkan tenang.', 'Semua para siswa diharapkan tenang.', 'Bagi para siswa-siswa diharapkan tenang.'],
                correctAnswer: 'Para siswa diharapkan tenang.',
                explanation: '"Para" sudah bermakna jamak, tidak perlu diulang dengan "siswa-siswa". "Bagi" juga tidak diperlukan di awal kalimat tersebut.'
              }
            ]
          },
          {
            id: 'mod-tka-sma-eng',
            title: 'Bahasa Inggris SMA',
            description: 'Latihan soal Bahasa Inggris untuk jenjang SMA.',
            icon: 'Languages',
            content: 'Welcome to SMA English module. Let\'s improve your English proficiency.',
            quiz: [
              {
                id: 'tka-sma-e-1',
                question: 'I ______ to the market yesterday.',
                options: ['go', 'goes', 'went', 'gone'],
                correctAnswer: 'went',
                explanation: 'Keterangan waktu "yesterday" menunjukkan Simple Past Tense, maka menggunakan V2 (went).'
              }
            ]
          }
        ]
      }
    ]
  }
];
