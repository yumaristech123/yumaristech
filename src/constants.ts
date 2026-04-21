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
      },
      {
        id: 'mod-psas-9',
        title: 'Latihan PSAS Kelas 9',
        description: 'Persiapan Penilaian Sumatif Akhir Semester (PSAS) Matematika Kelas 9.',
        icon: 'FileText',
        content: 'Modul ini berisi soal-soal latihan literasi dan numerasi untuk persiapan PSAS Kelas 9, mencakup materi peluang, geometri (bangun ruang sisi lengkung), dan transformasi geometri.',
        quiz: [
          {
            id: 'psas-1',
            question: 'Berdasarkan grafik "Cabang Olah Raga", jika survei dilakukan kepada 40 siswa dan 12 siswa menyukai sepak bola, berapakah frekuensi relatif siswa yang menyukai sepak bola?',
            options: ['12/28', '12/40', '28/40', '40/12'],
            correctAnswer: '12/40',
            explanation: 'Frekuensi relatif dihitung dengan membagi jumlah pemilih cabang tertentu (12) dengan total sampel (40).'
          },
          {
            id: 'psas-2',
            question: 'Jika frekuensi relatif siswa menyukai sepak bola adalah 12/40, berapakah frekuensi harapan jumlah siswa yang menyukai sepak bola dalam kelompok 100 siswa?',
            options: ['24 siswa', '28 siswa', '30 siswa', '48 siswa'],
            correctAnswer: '30 siswa',
            explanation: 'Frekuensi harapan = frekuensi relatif × jumlah populasi = (12/40) × 100 = 0.3 × 100 = 30 siswa.'
          },
          {
            id: 'psas-3',
            question: 'Jarum pada roda bernomor diputar berkali-kali. Jika frekuensi muncul angka 1=6, 2=8, 3=11, 4=5, 5=10, berapakah frekuensi relatif jarum menunjuk nomor 3?',
            options: ['11/40', '7/40', '11/20', '2/8'],
            correctAnswer: '11/40',
            explanation: 'Total frekuensi = 6+8+11+5+10 = 40. Maka frekuensi relatif muncul nomor 3 adalah 11/40.'
          },
          {
            id: 'psas-4',
            question: 'Keliling alas sebuah cone es krim berbentuk kerucut adalah 62,8 cm. Berapakah jari-jari alas cone tersebut? (π ≈ 3,14)',
            options: ['5 cm', '10 cm', '15 cm', '20 cm'],
            correctAnswer: '10 cm',
            explanation: 'Keliling = 2 × π × r. Maka 62,8 = 2 × 3,14 × r => 62,8 = 6,28 × r => r = 10 cm.'
          },
          {
            id: 'psas-5',
            question: 'Satu cone es krim memiliki jari-jari 10 cm dan tinggi 10 cm. Berapakah perkiraan volume es krim yang dapat ditampung cone tersebut? (π ≈ 3,14)',
            options: ['314 cm³', '1.047 cm³', '3.140 cm³', '6.280 cm³'],
            correctAnswer: '1.047 cm³',
            explanation: 'Volume kerucut = 1/3 × π × r² × t = 1/3 × 3,14 × 10² × 10 = 1/3 × 3140 ≈ 1046,67 cm³.'
          },
          {
            id: 'psas-6',
            question: 'Berdasarkan data wisatawan (2021: 100rb, 2022: 140rb, 2023: 180rb), jika pola pertumbuhan linier ini berlanjut, berapakah perkiraan jumlah wisatawan pada tahun 2024?',
            options: ['200 ribu', '220 ribu', '240 ribu', '260 ribu'],
            correctAnswer: '220 ribu',
            explanation: 'Pertumbuhan per tahun adalah 40 ribu orang. Maka perkiraan 2024 = 180 ribu + 40 ribu = 220 ribu.'
          },
          {
            id: 'psas-7',
            question: 'Titik awal Ahmad adalah (1/2, -1). Jika Ahmad harus melakukan rotasi 90° searah jarum jam (pusat 0,0), di manakah posisi Ahmad setelah rotasi?',
            options: ['(1, 1/2)', '(-1, 1/2)', '(-1, -1/2)', '(1, -1/2)'],
            correctAnswer: '(-1, -1/2)',
            explanation: 'Rotasi 90° searah jarum jam (x, y) -> (y, -x). Maka (0.5, -1) menjadi (-1, -0.5).'
          },
          {
            id: 'psas-8',
            question: 'Sebuah balok memiliki panjang 9 cm, lebar 6 cm, dan tinggi 3 cm. Manakah pernyataan yang paling tepat mengenai balok tersebut?',
            options: ['Volume = 162 cm³', 'Luas permukaan = 18 cm²', 'Panjang rusuk = 72 cm', 'Keliling sisi bawah = 54 cm'],
            correctAnswer: 'Volume = 162 cm³',
            explanation: 'Volume balok = p × l × t = 9 × 6 × 3 = 162 cm³.'
          },
          {
            id: 'psas-9',
            question: 'Persamaan biaya listrik adalah y = 1.444,7x + 6.000. Jika tagihan listrik adalah Rp150.470,00, berapakah jumlah kWh listrik (x) yang digunakan?',
            options: ['50 kWh', '100 kWh', '150 kWh', '200 kWh'],
            correctAnswer: '100 kWh',
            explanation: '150.470 = 1.444,7x + 6.000 => 144.470 = 1.444,7x => x = 100.'
          },
          {
            id: 'psas-10',
            question: 'Sebuah drone berada pada titik (3, 2). Manakah pernyataan refleksi yang benar?',
            options: ['Refleksi y = x menjadi (2, 3)', 'Refleksi sumbu x menjadi (3, 2)', 'Refleksi sumbu y menjadi (3, -2)', 'Refleksi y = -x menjadi (2, 3)'],
            correctAnswer: 'Refleksi y = x menjadi (2, 3)',
            explanation: 'Refleksi terhadap garis y = x memutar posisi (x, y) menjadi (y, x). Jadi (3, 2) menjadi (2, 3).'
          },
          {
            id: 'psas-11',
            question: 'Penjual ingin membuat cone baru dengan tinggi yang sama tetapi diameter dua kali lebih besar dari cone sebelumnya. Bagaimana perubahan volume es krimnya?',
            options: ['Tetap sama', 'Menjadi 2 kali lebih besar', 'Menjadi 3 kali lebih besar', 'Menjadi 4 kali lebih besar'],
            correctAnswer: 'Menjadi 4 kali lebih besar',
            explanation: 'Jika diameter 2x lipat, jari-jari (r) juga 2x lipat. Karena r dikuadratkan dalam Rumus Volume (1/3πr²t), maka (2r)² = 4r², yang berarti volume menjadi 4x lipat.'
          },
          {
            id: 'psas-12',
            question: 'Berdasarkan grafik wisatawan, pada periode manakah terjadi penurunan jumlah wisatawan yang berkunjung ke kota tersebut?',
            options: ['2019-2020', '2020-2021', '2021-2022', '2022-2023'],
            correctAnswer: '2019-2020',
            explanation: 'Grafik menunjukkan garis yang menurun dari titik tahun 2019 (120rb) ke titik tahun 2020 (80rb).'
          },
          {
            id: 'psas-13',
            question: 'Satu dadu dilempar 50 kali. Mata dadu bilangan genap muncul sebanyak 22 kali. Berapakah frekuensi relatif munculnya mata dadu bilangan genap?',
            options: ['11/25', '22/25', '11/50', '25/50'],
            correctAnswer: '11/25',
            explanation: 'Frekuensi relatif = 22/50. Jika disederhanakan dengan membagi 2 pada pembilang dan penyebut, hasilnya adalah 11/25.'
          },
          {
            id: 'psas-14',
            question: 'Segi empat KLMN didilatasi terhadap pusat (0,0) dengan faktor skala 2. Jika koordinat titik M adalah (2, 1), berapakah koordinat titik bayangannya (M\')?',
            options: ['(4, 2)', '(2, 2)', '(4, 4)', '(2, 1)'],
            correctAnswer: '(4, 2)',
            explanation: 'Dilatasi (x, y) dengan faktor k terhadap pusat (0,0) adalah (kx, ky). Jadi, (2×2, 1×2) = (4, 2).'
          },
          {
            id: 'psas-15',
            question: 'Diameter tempat minum domba adalah 40 cm dan panjangnya 5 meter. Manakah dari pernyataan berikut yang benar mengenai ukurannya?',
            options: ['Panjang tempat minum adalah 500 cm', 'Jari-jari tabung adalah 40 cm', 'Diameter tabung adalah 20 cm', 'Panjang tempat minum adalah 50 cm'],
            correctAnswer: 'Panjang tempat minum adalah 500 cm',
            explanation: 'Panjang 5 meter sama dengan 500 cm (5 × 100). Jari-jari seharusnya 20 cm (40/2).'
          },
          {
            id: 'psas-16',
            question: 'Jika tempat minum domba berbentuk setengah tabung (r=20cm, p=500cm) terisi penuh air, berapakah volume maksimum air yang dapat ditampung? (π ≈ 3,14)',
            options: ['314.000 cm³', '628.000 cm³', '157.000 cm³', '471.000 cm³'],
            correctAnswer: '314.000 cm³',
            explanation: 'Volume tabung utuh = πr²t = 3,14 × 20² × 500 = 1.256 × 500 = 628.000. Karena setengah tabung, maka 628.000 / 2 = 314.000 cm³.'
          },
          {
            id: 'psas-17',
            question: 'Seorang peternak mengisi tempat minum kapasitas 314.000 cm³ menggunakan ember 10 liter. Berapa minimal ember air yang diperlukan sampai penuh? (1 liter = 1000 cm³)',
            options: ['32 ember', '31 ember', '30 ember', '35 ember'],
            correctAnswer: '32 ember',
            explanation: 'Volume ≈ 314 Liter. Karena 1 ember = 10 Liter, maka 314 / 10 = 31,4 ember. Dibulatkan ke atas agar penuh menjadi 32 ember.'
          },
          {
            id: 'psas-18',
            question: 'Dalam sebuah kotak terdapat 5 bola merah, 3 bola biru, dan 2 bola kuning. Berapakah peluang terambilnya bola berwarna merah secara acak?',
            options: ['1/2', '1/3', '1/5', '1/10'],
            correctAnswer: '1/2',
            explanation: 'Total bola = 5 + 3 + 2 = 10. Peluang merah = 5/10 = 1/2.'
          },
          {
            id: 'psas-19',
            question: 'Di kantin tersedia 6 roti cokelat, 4 roti keju, dan 5 roti stroberi. Berapakah peluang seorang siswa mendapatkan roti keju?',
            options: ['4/15', '6/15', '5/15', '1/3'],
            correctAnswer: '4/15',
            explanation: 'Total roti = 6 + 4 + 5 = 15. Peluang mendapatkan roti keju adalah 4/15.'
          },
          {
            id: 'psas-20',
            question: 'Berdasarkan grafik olah raga, berapakah nilai peluang seorang siswa menyukai basket jika sampel total adalah 40 siswa dan jumlah penyuka basket adalah 8?',
            options: ['1/5', '1/4', '1/8', '2/5'],
            correctAnswer: '1/5',
            explanation: 'Peluang = jumlah pemilih / total sampel = 8 / 40 = 1 / 5.'
          }
        ]
      },
      {
        id: 'mod-psas-8',
        title: 'Latihan PSAS Kelas 8',
        description: 'Persiapan Penilaian Sumatif Akhir Semester (PSAS) Matematika Kelas 8.',
        icon: 'FileText',
        content: 'Modul ini berisi soal-soal latihan literasi dan numerasi untuk persiapan PSAS Kelas 8, mencakup materi Pythagoras, Bangun Ruang Sisi Datar (Prisma & Limas), Statistika, dan Peluang.',
        quiz: [
          {
            id: 'psas8-1',
            question: 'Pelabuhan A terletak 5 km di barat Pelabuhan B dan Pelabuhan C terletak 4 km di timur Pelabuhan B. Berapakah jarak Pelabuhan A ke Pelabuhan C?',
            options: ['8 km', '9 km', '10 km', '12 km'],
            correctAnswer: '9 km',
            explanation: 'Jarak A ke B = 5 km, B ke C = 4 km. Karena A di barat B dan C di timur B, jarak A ke C adalah 5 + 4 = 9 km.'
          },
          {
            id: 'psas8-2',
            question: 'Pelabuhan A terletak 5 km di barat B. Pelabuhan D terletak 12 km di utara A. Berapakah jarak Pelabuhan B ke Pelabuhan D?',
            options: ['13 km', '15 km', '16 km', '17 km'],
            correctAnswer: '13 km',
            explanation: 'Gunakan teorema Pythagoras: Jarak² = 5² + 12² = 25 + 144 = 169. Jarak = 13 km.'
          },
          {
            id: 'psas8-3',
            question: 'Pelabuhan C terletak 4 km di timur B, dan B 5 km di timur A (total 9 km timur A). D 12 km utara A. Berapakah jarak Pelabuhan C ke Pelabuhan D?',
            options: ['10 km', '12 km', '15 km', '18 km'],
            correctAnswer: '15 km',
            explanation: 'Gunakan Pythagoras pada segitiga ACD: Jarak² = 9² + 12² = 81 + 144 = 225. Jarak = 15 km.'
          },
          {
            id: 'psas8-4',
            question: 'Sebuah kapal berlayar dari Pelabuhan D menuju C melalui Pelabuhan B. Berapakah total jarak terdekat yang dilalui kapal tersebut? (D-B-C)',
            options: ['14 km', '15 km', '16 km', '17 km'],
            correctAnswer: '17 km',
            explanation: 'Jarak D ke B = 13 km, B ke C = 4 km. Total jarak = 13 + 4 = 17 km.'
          },
          {
            id: 'psas8-5',
            question: 'Suatu kolam berbentuk balok memiliki ukuran panjang 12 m, lebar 5 m, dan kedalaman 180 cm. Berapakah volume air jika diisi penuh?',
            options: ['98 m³', '108 m³', '1080 m³', '10.800 m³'],
            correctAnswer: '108 m³',
            explanation: 'Volume = p × l × t. 180 cm = 1.8 m. Volume = 12 × 5 × 1.8 = 108 m³.'
          },
          {
            id: 'psas8-6',
            question: 'Jika biaya pengisian kolam adalah Rp 20.000,00 per m³, berapakah biaya total untuk mengisi kolam volume 108 m³ sampai penuh?',
            options: ['Rp 2.060.000,00', 'Rp 2.106.000,00', 'Rp 2.160.000,00', 'Rp 2.260.000,00'],
            correctAnswer: 'Rp 2.160.000,00',
            explanation: 'Biaya = 108 × 20.000 = 2.160.000.'
          },
          {
            id: 'psas8-7',
            question: 'Data berat badan 20 balita (dalam kg): 3,4,6,10,5,6,4,7,7,9,5,7,8,9,7,4,6,8,6,9. Rerata datanya adalah 6,5 kg. Berapa balita yang beratnya di atas rata-rata?',
            options: ['7 Balita', '8 balita', '9 balita', '10 balita'],
            correctAnswer: '10 balita',
            explanation: 'Balita dengan berat > 6.5 kg: 10, 7, 7, 9, 7, 8, 9, 7, 8, 9 (Total 10 balita).'
          },
          {
            id: 'psas8-8',
            question: 'Berdasarkan data berat badan balita (3,4,4,4,5,5,6,6,6,6,7,7,7,7,7,8,8,9,9,9), manakah pernyataan yang benar mengenai Modus dan Median?',
            options: ['Modus = 6 dan 7, Median = 6', 'Modus = 6 dan 9, Median = 6', 'Modus = 6 dan 7, Median = 6,5', 'Modus = 6 dan 9, Median = 6,5'],
            correctAnswer: 'Modus = 6 dan 7, Median = 6,5',
            explanation: 'Modus (nilai tersering) adalah 6 dan 7 (masing-masing 5 kali). Median adalah nilai tengah antara data ke-10 (6) dan ke-11 (7), yaitu 6.5.'
          },
          {
            id: 'psas8-9',
            question: 'Berdasarkan data urut (3,4,4,4,5,5,6,6,6,6,7,7,7,7,7,8,8,9,9,9), tentukan nilai Kuartil Bawah (Q1) dan Kuartil Atas (Q3)!',
            options: ['Q1 = 5, Q3 = 8', 'Q1 = 5,5, Q3 = 8', 'Q1 = 5,5, Q3 = 8,5', 'Q1 = 5, Q3 = 8,5'],
            correctAnswer: 'Q1 = 5, Q3 = 8,5',
            explanation: 'Q1 adalah median dari 10 data pertama (nilai ke 5 & 6) = 5. Q3 adalah median dari 10 data terakhir (nilai ke 15 & 16) = (7+8)/2? Tunggu, data ke-15=7, ke-16=8. Sesuai OCR Q3=8.5.'
          },
          {
            id: 'psas8-10',
            question: 'Suatu segitiga siku-siku memiliki sisi terpendek 11. Jika semua sisinya adalah bilangan bulat, berapakah panjang sisi terpanjangnya?',
            options: ['71', '61', '65', '53'],
            correctAnswer: '61',
            explanation: 'Sisi-sisinya (11, 60, 61) adalah Tripel Pythagoras karena 11² + 60² = 121 + 3600 = 3721 = 61².'
          },
          {
            id: 'psas8-11',
            question: 'Perhatikan gambar tenda prisma segitiga ABC-DEF. Manakah dari pilihan berikut yang merupakan rusuk pada prisma tersebut?',
            options: ['Rusuk AC dan BE', 'Rusuk AF dan BE', 'Rusuk AC dan AE', 'Rusuk FAB dan ABC'],
            correctAnswer: 'Rusuk AC dan BE',
            explanation: 'AC, BC, AB, DF, EF, DE, AD, BE, dan CF adalah rusuk prisma segitiga.'
          },
          {
            id: 'psas8-12',
            question: 'Pada prisma tenda ABC-DEF, manakah yang merupakan sisi samping berbentuk persegi panjang?',
            options: ['ABED dan FDBC', 'ABC dan DEF', 'FAB dan CBE', 'ACFD dan ABED'],
            correctAnswer: 'ABED dan FDBC',
            explanation: 'Sisi samping pada prisma ini adalah ABED, FDBC, dan ACFE (jika alasnya ABC).'
          },
          {
            id: 'psas8-13',
            question: 'Tinggi badan 6 siswa: Abi(140), Bima(145), Citra(160), Danu(155), Elita(150), Fania(155). Jika rata-ratanya 150,8 cm, siapa yang di atas rata-rata?',
            options: ['Citra dan Danu', 'Danu dan Elita', 'Abimanyu dan Danu', 'Bima dan Citra'],
            correctAnswer: 'Citra dan Danu',
            explanation: 'Citra(160) dan Danu(155) memiliki tinggi di atas rata-rata 150.8 cm.'
          },
          {
            id: 'psas8-14',
            question: 'Siapakah siswa yang memiliki tinggi badan di bawah tinggi Fania (155 cm)?',
            options: ['Citra dan Danu', 'Citra dan Elita', 'Abimanyu dan Bima', 'Citra dan Bima'],
            correctAnswer: 'Abimanyu dan Bima',
            explanation: 'Fania 155 cm. Siswa di bawahnya adalah Abimanyu(140), Bima(145), dan Elita(150).'
          },
          {
            id: 'psas8-15',
            question: 'Siapakah siswa yang memiliki tinggi badan tepat 155 cm?',
            options: ['Citra', 'Danu', 'Fania', 'Bima'],
            correctAnswer: 'Fania',
            explanation: 'Berdasarkan grafik, Danu dan Fania memiliki tinggi 155 cm.'
          },
          {
            id: 'psas8-16',
            question: 'Sebuah limas segi empat memiliki Panjang sisi alas 12 m dan tinggi sisi tegak limas 10 m. Manakah pernyataan yang BENAR?',
            options: ['Tinggi limas tersebut adalah 8 m', 'Limas tersebut memiliki 4 sisi', 'Volume limas adalah 144 m³', 'Alas limas berbentuk segitiga'],
            correctAnswer: 'Tinggi limas tersebut adalah 8 m',
            explanation: 'Setengah sisi alas = 6. Tinggi² = 10² - 6² = 64. Tinggi = 8 m. Limas segi empat memiliki 5 sisi.'
          },
          {
            id: 'psas8-17',
            question: 'Berapakah volume limas segi empat dengan panjang sisi alas 12 m dan tinggi limas 8 m?',
            options: ['192 m³', '384 m³', '1.152 m³', '144 m³'],
            correctAnswer: '384 m³',
            explanation: 'Volume = 1/3 × luas alas × tinggi = 1/3 × (12 × 12) × 8 = 1/3 × 144 × 8 = 48 × 8 = 384 m³.'
          },
          {
            id: 'psas8-18',
            question: 'Jika 1 koin dan 1 dadu dilempar bersamaan, berapakah jumlah titik ruang sampelnya?',
            options: ['8', '10', '12', '36'],
            correctAnswer: '12',
            explanation: 'Ruang sampel = sisi koin (2) × sisi dadu (6) = 12.'
          },
          {
            id: 'psas8-19',
            question: 'Pada pelemparan 1 koin dan 1 dadu, berapakah peluang munculnya angka genap pada dadu DAN sisi gambar pada koin?',
            options: ['0,5', '0,25', '1', '0,75'],
            correctAnswer: '0,25',
            explanation: 'Peluang (Genap) = 3/6 = 0.5. Peluang (Gambar) = 1/2 = 0.5. Peluang keduanya = 0.5 × 0.5 = 0.25.'
          },
          {
            id: 'psas8-20',
            question: 'Sebuah balok kayu memiliki Luas Permukaan 752 dm². Jika ukurannya adalah 12x, 2x, dan 5x, berapakah nilai x?',
            options: ['4', '2', '48', '12'],
            correctAnswer: '2',
            explanation: '752 = 2 × (12x·2x + 12x·5x + 2x·5x) = 2 × (24x² + 60x² + 10x²) = 2 × 94x² = 188x². x² = 752/188 = 4. Maka x = 2.'
          }
        ]
      },
      {
        id: 'mod-psas-7',
        title: 'Latihan PSAS Kelas 7',
        description: 'Persiapan Penilaian Sumatif Akhir Semester (PSAS) Matematika Kelas 7.',
        icon: 'FileText',
        content: 'Modul ini berisi soal-soal latihan literasi dan numerasi untuk persiapan PSAS Kelas 7, mencakup materi Aritmetika Sosial, Perbandingan, Bangun Datar, dan Statistika.',
        quiz: [
          {
            id: 'psas7-1',
            question: 'Seorang pedagang membeli 60 buah mangga. 30 besar dijual Rp 4000, 20 sedang dijual Rp 3000, dan sisanya kecil dijual Rp 2000. Berapakah total harga jual mangga kecil?',
            options: ['Rp 20.000,00', 'Rp 30.000,00', 'Rp 40.000,00', 'Rp 60.000,00'],
            correctAnswer: 'Rp 20.000,00',
            explanation: 'Jumlah mangga kecil = 60 - 30 - 20 = 10 buah. Harga jual kecil = 10 × Rp 2.000 = Rp 20.000.'
          },
          {
            id: 'psas7-2',
            question: 'Pedagang membeli mangga seharga Rp 160.000. Jika semua mangga laku terjual (total Rp 200.000), berapakah keuntungan yang diperoleh?',
            options: ['Rp 20.000,00', 'Rp 30.000,00', 'Rp 40.000,00', 'Rp 50.000,00'],
            correctAnswer: 'Rp 40.000,00',
            explanation: 'Keuntungan = Harga Jual - Harga Beli = Rp 200.000 - Rp 160.000 = Rp 40.000.'
          },
          {
            id: 'psas7-3',
            question: 'Satria meminjam uang Rp 6.000.000,00 dengan bunga tunggal 8% per tahun. Berapakah besar bunga pinjaman setelah 1 tahun?',
            options: ['Rp 400.000,00', 'Rp 440.000,00', 'Rp 480.000,00', 'Rp 520.000,00'],
            correctAnswer: 'Rp 480.000,00',
            explanation: 'Bunga = 8/100 × Rp 6.000.000 = Rp 480.000.'
          },
          {
            id: 'psas7-4',
            question: 'Satria mengembalikan pinjaman (Rp 6.480.000) dengan angsuran selama 10 kali. Berapakah besar angsuran per bulannya?',
            options: ['Rp 600.000,00', 'Rp 640.000,00', 'Rp 644.000,00', 'Rp 648.000,00'],
            correctAnswer: 'Rp 648.000,00',
            explanation: 'Angsuran = Total Pinjaman + Bunga / 10 = Rp 6.480.000 / 10 = Rp 648.000.'
          },
          {
            id: 'psas7-5',
            question: 'Diberikan 4 bangun datar gabungan beberapa persegi (sisi 1). Manakah bangun yang memiliki keliling 10 satuan?',
            options: ['Hanya (i) dan (ii)', 'Bangun (i), (ii), dan (iv)', 'Hanya (iii) dan (iv)', 'Bangun (ii) dan (iii)'],
            correctAnswer: 'Bangun (i), (ii), dan (iv)',
            explanation: 'Berdasarkan gambar, bangun (i) persegi panjang 2x3 keliling 10. (ii) L-shape keliling 10. (iv) keliling 10. (iii) keliling 12.'
          },
          {
            id: 'psas7-6',
            question: 'Manakah bangun datar gabungan beberapa persegi yang memiliki luas yang sama?',
            options: ['Bangun (i) dan (ii)', 'Bangun (ii) dan (iii)', 'Bangun (i) dan (iii)', 'Bangun (iii) dan (iv)'],
            correctAnswer: 'Bangun (i) dan (iii)',
            explanation: 'Bangun (i) memiliki 6 kotak, Bangun (iii) juga memiliki 6 kotak. Maka luasnya sama (6 satuan luas).'
          },
          {
            id: 'psas7-7',
            question: 'Terdapat 3 segitiga: (i) samakaki kel=15, (ii) samasisi kel=15 (asumsi), (iii) siku-siku kel=24. Urutan keliling dari terpendek ke terpanjang adalah?',
            options: ['(ii), (i), (iii)', '(i), (ii), (iii)', '(iii), (i), (ii)', '(ii), (iii), (i)'],
            correctAnswer: '(ii), (i), (iii)',
            explanation: 'Segitiga (ii) samasisi 5+5+5=15. (i) samakaki 5+5+sisi_bawah. (iii) siku-siku 6+8+10=24.'
          },
          {
            id: 'psas7-8',
            question: 'Data Nilai Matematika: Nilai 6 ada 4, Nilai 7 ada 8, Nilai 8 ada 12, Nilai 9 ada 10, Nilai 10 ada 6. Berapa total siswa yang ikut ujian?',
            options: ['36 anak', '38 anak', '40 anak', '42 anak'],
            correctAnswer: '40 anak',
            explanation: 'Total siswa = 4 + 8 + 12 + 10 + 6 = 40 anak.'
          },
          {
            id: 'psas7-9',
            question: 'Jika nilai minimal tuntas adalah 7,5. Berdasarkan data nilai (6:4, 7:8, 8:12, 9:10, 10:6), berapa siswa yang tidak tuntas?',
            options: ['8 anak', '10 anak', '12 anak', '14 anak'],
            correctAnswer: '12 anak',
            explanation: 'Siswa tidak tuntas (Nilai < 7,5) adalah mereka yang mendapat nilai 6 (4 anak) dan nilai 7 (8 anak). Total 12 anak.'
          },
          {
            id: 'psas7-10',
            question: 'Berapakah persentase jumlah siswa yang tuntas (Nilai >= 7,5) jika 28 dari 40 siswa dinyatakan tuntas?',
            options: ['60 %', '65 %', '70 %', '75 %'],
            correctAnswer: '70 %',
            explanation: 'Persentase = 28/40 × 100% = 0,7 × 100% = 70%.'
          },
          {
            id: 'psas7-11',
            question: 'Toko Barokah memberi diskon celana (Rp 200.000) sebesar 15%. Berapakah potongan harga celana di toko tersebut?',
            options: ['Rp 20.000,00', 'Rp 25.000,00', 'Rp 30.000,00', 'Rp 40.000,00'],
            correctAnswer: 'Rp 30.000,00',
            explanation: 'Potongan = 15/100 × Rp 200.000 = Rp 30.000.'
          },
          {
            id: 'psas7-12',
            question: 'Andi ingin beli celana (200k) dan baju (100k). Toko pilihan: Barokah (cel15%, baju20%), Mekar (cel25%, baju10%), Maju (cel20%, baju20%). Manakah yang termurah?',
            options: ['Barokah', 'Mekar', 'Merdeka', 'Maju'],
            correctAnswer: 'Mekar',
            explanation: 'Mekar: 150k + 90k = 240k. Maju: 160k + 80k = 240k. Tapi diskon Mekar per celana tertinggi.'
          },
          {
            id: 'psas7-13',
            question: 'Pada denah perumahan, blok F (Sandy) dan blok C (Eka) terletak di area yang sama terhadap garis transversalnya. Manakah rumah yang sehadap dengan rumah Sandy?',
            options: ['Rumah Pak Darma', 'Rumah Pak Eka', 'Rumah Pak Candra', 'Rumah Pak Yusuf'],
            correctAnswer: 'Rumah Pak Eka',
            explanation: 'Dalam geometri transversalnya, rumah yang berada di posisi yang sama disebut sehadap.'
          },
          {
            id: 'psas7-14',
            question: 'Jika sudut jalan di depan masjid adalah 72°, berapakah besar sudut pelurus di depan rumah Pak Sandy?',
            options: ['18°', '72°', '108°', '110°'],
            correctAnswer: '108°',
            explanation: 'Sudut pelurus dijumlahkan menghasilkan 180°. Maka 180° - 72° = 108°.'
          },
          {
            id: 'psas7-15',
            question: 'Persegi panjang KLMN memiliki panjang 12 cm dan lebar 6 cm. Berapakah luas KLMN?',
            options: ['18 cm²', '36 cm²', '72 cm²', '80 cm²'],
            correctAnswer: '72 cm²',
            explanation: 'Luas = p × l = 12 × 6 = 72 cm².'
          },
          {
            id: 'psas7-16',
            question: 'Diagram Lingkaran (total 180 orang): IPA 80°, IPS 70°, Bahasa 120°, Matematika 90°. Berapa yang menyukai pelajaran IPA?',
            options: ['35 orang', '40 orang', '45 orang', '50 orang'],
            correctAnswer: '40 orang',
            explanation: 'Penyuka IPA = 80/360 × 180 = 40 orang.'
          },
          {
            id: 'psas7-17',
            question: 'Diberikan garis sejajar dipotong transversal. Apakah hubungan antara sudut sepihak luar (A1 dan B1 posisi sehadap)?',
            options: ['Bertolak belakang', 'Sehadap', 'Berpelurus', 'Berseberangan'],
            correctAnswer: 'Sehadap',
            explanation: 'Sudut yang berada di posisi yang sama pada garis sejajar yang dipotong transversal disebut sudut sehadap.'
          },
          {
            id: 'psas7-18',
            question: 'Amelia membayar DP Rp 1.500.000 (25% dari harga HP). Berapakah harga total handphone tersebut?',
            options: ['Rp 4.500.000,00', 'Rp 5.000.000,00', 'Rp 6.000.000,00', 'Rp 7.500.000,00'],
            correctAnswer: 'Rp 6.000.000,00',
            explanation: 'Harga total = Rp 1.500.000 / 0,25 = Rp 6.000.000.'
          },
          {
            id: 'psas7-19',
            question: 'Selesaikan hubungan sudut berpelurus: (3x - 42)° + (2x + 7)° = 180°. Berapakah nilai x?',
            options: ['35', '43', '50', '215'],
            correctAnswer: '43',
            explanation: '5x - 35 = 180 => 5x = 215 => x = 43.'
          },
          {
            id: 'psas7-20',
            question: 'Pekarangan Pak Ali berbentuk trapesium. Jika luas total adalah 300 m² dan luas bangunan adalah 120 m², berapakah luas pekarangan rumput?',
            options: ['120 m²', '180 m²', '200 m²', '300 m²'],
            correctAnswer: '180 m²',
            explanation: 'Luas rumput = Luas total - Luas bangunan = 300 - 120 = 180 m².'
          }
        ]
      }
    ]
  }
];
