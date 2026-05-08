import { Level } from './types';

export const UTBK_LEVELS: Level[] = [
  {
    id: 'lvl-utbk-tps',
    title: 'Tes Potensi Skolastik' as any,
    description: 'Menguji kemampuan kognitif, penalaran matematika, literasi membaca, dan pengetahuan umum.',
    minXp: 0,
    modules: [
      {
        id: 'utbk-tps-pu',
        title: 'Penalaran Umum',
        description: 'Penalaran Induktif, Deduktif, dan Kuantitatif.',
        icon: 'Brain',
        content: 'Tes Penalaran Umum menguji kemampuan untuk memecahkan masalah baru yang belum pernah dipelajari sebelumnya, serta kemampuan bernalar secara induktif dan deduktif.',
        quiz: [
          {
            id: 'pu-1',
            question: 'Ketua IDI menilai bukan sebuah masalah jika Menkes bukan berlatar belakang tenaga kesehatan. Posisi Menkes adalah manajerial. Jika Menkes dinilai TIDAK bagus oleh Ketua IDI, manakah pernyataan berikut yang benar?',
            options: [
              'Menteri Kesehatan tidak memiliki kemampuan manajerial yang bagus',
              'Menteri Kesehatan tidak berasal dari kalangan tenaga kesehatan',
              'Menteri Kesehatan berasal dari kalangan tenaga kesehatan',
              'Menteri Kesehatan berusaha maksimal untuk memahami persoalan kesehatan',
              'Tidak ada pilihan yang benar'
            ],
            correctAnswer: 'Menteri Kesehatan tidak berasal dari kalangan tenaga kesehatan',
            explanation: 'Berdasarkan teks, IDI menganggap tidak masalah jika bukan dari nakes karena posisinya manajerial. Maka jika dinilai tidak bagus, kemungkinan karena latar belakangnya (menurut logika sebaliknya, meskipun teks tidak eksplisit menyatakan ini secara langsung, pilihan B adalah yang paling relevan dengan konteks teks tersebut).'
          },
          {
            id: 'pu-2',
            question: 'Semua pemain sepak bola dilarang memegang bola selama permainan. Penjaga gawang sepak bola boleh memegang bola. Kesimpulan yang tepat adalah...',
            options: [
              'Penjaga gawang bukan pemain sepak bola',
              'Semua pemain sepak bola adalah penjaga gawang',
              'Pemain sepakbola yang boleh memegang bola adalah penjaga gawang',
              'Penjaga gawang tidak boleh menendang bola',
              'Tidak dapat ditarik kesimpulan'
            ],
            correctAnswer: 'Pemain sepakbola yang boleh memegang bola adalah penjaga gawang',
            explanation: 'Pernyataan pertama adalah aturan umum, pernyataan kedua adalah pengecualian untuk spesifik sub-grup (penjaga gawang).'
          },
          {
            id: 'pu-3',
            question: 'Buah bit dianggap sebagai buah yang banyak memberikan manfaat. Namun, buah bit memiliki kandungan oksalat tinggi yang memicu pembentukan batu ginjal. Manakah pernyataan berikut yang PASTI SALAH?',
            options: [
              'Buah bit banyak dikonsumsi karena memiliki kalori yang rendah.',
              'Kandungan oksalat pada buah bit menyebabkan batu ginjal.',
              'Konsumsi buah bit berlebihan dapat menyebabkan gangguan pencernaan.',
              'Konsumsi buah bit tidak akan menyebabkan gangguan kesehatan.',
              'Walaupun dapat menyebabkan batu ginjal, buah bit tidak akan mengganggu pencernaan'
            ],
            correctAnswer: 'Konsumsi buah bit tidak akan menyebabkan gangguan kesehatan.',
            explanation: 'Pernyataan ini pasti salah karena teks menyebutkan adanya risiko batu ginjal akibat oksalat dalam buah bit.'
          },
          {
            id: 'pu-4',
            question: 'Sebagian negara tidak memiliki konstitusi. Suatu negara yang menjalankan pemerintahan pasti memiliki konstitusi yang tertulis. Manakah pernyataan berikut yang menggambarkan kualitas simpulan tersebut?',
            options: [
              'Simpulan pasti benar.',
              'Simpulan mungkin benar.',
              'Simpulan pasti salah.',
              'Simpulan mungkin salah.',
              'Simpulan tidak dapat dinilai karena informasi tidak cukup'
            ],
            correctAnswer: 'Simpulan pasti salah.',
            explanation: 'Karena ada negara yang tidak memiliki konstitusi, maka pernyataan bahwa "pasti memiliki konstitusi tertulis" adalah salah.'
          }
        ]
      },
      {
        id: 'utbk-tps-ppu',
        title: 'Pengetahuan dan Pemahaman Umum',
        description: 'Menguji pengetahuan umum dan pemahaman teks bahasa Indonesia.',
        icon: 'Globe',
        content: 'Pengetahuan dan Pemahaman Umum menguji kemampuan untuk memahami konsep dan informasi umum yang ada di dalam teks.',
        quiz: [
          {
            id: 'ppu-1',
            question: 'Siswa yang pandai dalam matematika lebih mudah belajar bahasa. Orang yang tinggal di negara asing lebih lancar dalam bahasa yang dipakai di negara tersebut. Rianto belajar bahasa Inggris. Kesimpulan yang tepat adalah...',
            options: [
              'Mungkin Rianto tidak bisa berbicara.',
              'Mungkin Rianto tidak pernah tinggal di luar negeri.',
              'Tidak mungkin Rianto pernah tinggal di luar negeri.',
              'Mungkin Rianto pandai dalam matematika.',
              'Rianto pandai berbahasa Inggris.'
            ],
            correctAnswer: 'Mungkin Rianto pandai dalam matematika.',
            explanation: 'Karena anak yang pandai matematika mudah belajar bahasa, dan Rianto sedang belajar bahasa, maka mungkin saja ia pandai matematika.'
          }
        ]
      },
      {
        id: 'utbk-tps-pbm',
        title: 'Pemahaman Bacaan dan Menulis',
        description: 'Ejaan, imbuhan, dan kepaduan paragraf.',
        icon: 'PenTool',
        content: 'Menguji kemampuan dalam memahami isi bacaan serta kemampuan menulis yang sesuai dengan kaidah bahasa Indonesia yang baik dan benar.',
        quiz: [
          {
            id: 'pbm-1',
            question: 'Kata "regulasi" pada sebuah teks dapat diganti dengan kata...',
            options: ['tujuan', 'prinsip', 'aturan', 'kesepakatan', 'syarat'],
            correctAnswer: 'aturan',
            explanation: 'Dalam KBBI, regulasi berarti pengaturan atau aturan.'
          }
        ]
      },
      {
        id: 'utbk-tps-pk',
        title: 'Pengetahuan Kuantitatif',
        description: 'Barisan bilangan, geometri, dan logika matematika.',
        icon: 'BarChart2',
        content: 'Pengetahuan Kuantitatif menguji kemampuan matematika dasar yang meliputi logika angka, aritmetika, aljabar, dan geometri.',
        quiz: [
          {
            id: 'pk-1',
            question: 'Didefinisikan operasi * pada bilangan real a dan b: a * b = a/(b+1) + b/(a+1). Bilangan real positif t yang memenuhi t * (1/2) = 3/2 adalah...',
            options: ['2', '3/4', '2/3', '1/2', '1/6'],
            correctAnswer: '2',
            explanation: 'Substitusi: t/(0.5+1) + 0.5/(t+1) = 1.5. Menghasilkan persamaan kuadrat 4t² - 5t - 6 = 0. Akar positifnya adalah t = 2.'
          },
          {
            id: 'pk-2',
            question: 'Manakah dari bilangan berikut yang merupakan bilangan kuadrat dan sekaligus bilangan pangkat tiga?',
            options: ['8', '27', '64', '81', '100'],
            correctAnswer: '64',
            explanation: '64 = 8² dan 64 = 4³.'
          },
          {
            id: 'pk-3',
            question: 'Nilai 7 merupakan 35% dari bilangan...',
            options: ['2,45', '20', '50', '200', '245'],
            correctAnswer: '20',
            explanation: '0.35 * x = 7 -> x = 7 / 0.35 = 20.'
          },
          {
            id: 'pk-4',
            question: 'Berapakah hasil dari 1/2 * (1/2 + 1/3 + 1/4)?',
            options: ['13/24', '2 2/12', '13/6', '13/12', '3/18'],
            correctAnswer: '13/24',
            explanation: '1/2 + 1/3 + 1/4 = (6+4+3)/12 = 13/12. Maka 1/2 * 13/12 = 13/24.'
          },
          {
            id: 'pk-5',
            question: 'Data: 3, 3, 2 -> 144; 4, 4, 3 -> 8.000; 5, 5, 4 -> Y. Berapakah nilai Y?',
            options: ['81', '810', '8.100', '81.000', '810.000'],
            correctAnswer: '810.000',
            explanation: 'Pola: (Col1 * (Col2 + 1))^Col3. (3 * 4)^2 = 12^2 = 144. (4 * 5)^3 = 20^3 = 8000. Maka (5 * 6)^4 = 30^4 = 810.000.'
          }
        ]
      }
    ]
  },
  {
    id: 'lvl-utbk-literasi',
    title: 'Tes Literasi' as any,
    description: 'Literasi Bahasa Indonesia, Bahasa Inggris, dan Penalaran Matematika.',
    minXp: 0,
    modules: [
      {
        id: 'utbk-lit-id',
        title: 'Literasi dalam Bahasa Indonesia',
        description: 'Memahami makna teks dan ide pokok.',
        icon: 'BookOpen',
        content: 'Menguji kemampuan untuk memahami, menggunakan, mengevaluasi, dan merefleksikan berbagai jenis teks untuk menyelesaikan masalah.',
        quiz: [
          {
            id: 'lit-id-1',
            question: 'Teks: Samudra Arktik... tertutup es... banyak ditinggali organisme... Gagasan pokok pada paragraf kedua adalah...',
            options: [
              'Suhu permukaan Samudra Arktik',
              'Samudra Arktik sebagai tempat tinggal',
              'Dasar rantai makanan Arktik',
              'Seluruh permukaan Samudra Arktik tertutup es',
              'Beruang kutub di permukaan Samudra Arktik'
            ],
            correctAnswer: 'Samudra Arktik sebagai tempat tinggal',
            explanation: 'Paragraf kedua fokus menjelaskan bagaimana Samudra Arktik ditinggali oleh berbagai organisme mulai dari plankton hingga beruang kutub.'
          }
        ]
      },
      {
        id: 'utbk-lit-en',
        title: 'Literasi dalam Bahasa Inggris',
        description: 'Reading comprehension and vocabulary.',
        icon: 'Languages',
        content: 'English literacy tests your ability to understand the main idea, vocabulary in context, and detailed information in English passages.',
        quiz: [
          {
            id: 'lit-en-1',
            question: 'Passage about forests: "Dramatically, littering is heading towards the decay process." The word "dramatically" is best replaced by...',
            options: ['gradually', 'naturally', 'amazingly', 'surprisingly', 'simultaneously'],
            correctAnswer: 'surprisingly',
            explanation: 'In the context of the sentence, "dramatically" implies a significant or unexpected turn in the process described.'
          }
        ]
      },
      {
        id: 'utbk-lit-pm',
        title: 'Penalaran Matematika',
        description: 'Latihan soal matematika dalam konteks kehidupan.',
        icon: 'Calculator',
        content: 'Tes Penalaran Matematika menguji kemampuan seseorang dalam merumuskan, menggunakan, dan menafsirkan matematika dalam berbagai konteks kehidupan sehari-hari.',
        quiz: [
          {
            id: 'lit-pm-1',
            question: 'Mbak Erni merintis usaha seblak. Modal awal Rp300.000. Pendapatan Rp6.000 per porsi. Setelah menjual 300 porsi, berapa keuntungannya jika biaya per porsi (modal kerja) adalah Rp a?',
            options: ['Rp525.000', 'Rp540.000', 'Rp580.000', 'Rp600.000', 'Rp675.000'],
            correctAnswer: 'Rp600.000',
            explanation: 'Total pendapatan = 300 * 6.000 = 1.800.000. Jika pendapatan tepat mengganti modal awal (di soal lain disebut a=2000), ini hanyalah logika dasar perbandingan.'
          }
        ]
      }
    ]
  }
];
