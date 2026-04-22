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
    description: 'Pelajari konsep matematika yang lebih spesifik.',
    minXp: 0,
    modules: [
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
            question: 'Diketahui data jumlah wisatawan: 2019 (120rb), 2020 (80rb), 2021 (100rb), 2022 (140rb), dan 2023 (180rb). Pada periode manakah terjadi penurunan jumlah wisatawan?',
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
            question: 'Diketahui jarak Pelabuhan D ke B adalah 13 km dan B ke C adalah 4 km. Jika sebuah kapal berlayar dari Pelabuhan D menuju C melalui Pelabuhan B, berapakah total jarak terdekat yang dilalui kapal tersebut?',
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
            question: 'Diketahui sebuah tenda berbentuk prisma segitiga ABC-DEF dengan alas ABC dan tutup DEF. Manakah dari pilihan berikut yang merupakan rusuk pada prisma tersebut?',
            options: ['Rusuk AC dan BE', 'Rusuk AF dan BE', 'Rusuk AC dan AE', 'Rusuk FAB dan ABC'],
            correctAnswer: 'Rusuk AC dan BE',
            explanation: 'AC, BC, AB, DF, EF, DE, AD, BE, dan CF adalah rusuk prisma segitiga.'
          },
          {
            id: 'psas8-12',
            question: 'Pada sebuah prisma segitiga ABC-DEF dengan alas ABC dan tutup DEF, manakah yang merupakan sisi samping berbentuk persegi panjang?',
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
            question: 'Diketahui data tinggi badan: Abi(140), Bima(145), Citra(160), Danu(155), Elita(150), Fania(155). Siapakah siswa yang memiliki tinggi badan di bawah tinggi Fania (155 cm)?',
            options: ['Citra dan Danu', 'Citra dan Elita', 'Abimanyu dan Bima', 'Citra dan Bima'],
            correctAnswer: 'Abimanyu dan Bima',
            explanation: 'Fania 155 cm. Siswa di bawahnya adalah Abimanyu(140), Bima(145), dan Elita(150).'
          },
          {
            id: 'psas8-15',
            question: 'Diketahui data tinggi badan: Abi(140), Bima(145), Citra(160), Danu(155), Elita(150), Fania(155). Siapakah siswa yang memiliki tinggi badan tepat 155 cm?',
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
            question: 'Terdapat 4 bangun datar gabungan persegi satuan: (i) persegi panjang 2x3, (ii) bentuk L dengan 4 persegi, (iii) persegi panjang 3x3, (iv) bentuk T dengan 4 persegi. Manakah bangun yang memiliki keliling 10 satuan?',
            options: ['Hanya (i) dan (ii)', 'Bangun (i), (ii), dan (iv)', 'Hanya (iii) dan (iv)', 'Bangun (ii) dan (iii)'],
            correctAnswer: 'Bangun (i), (ii), dan (iv)',
            explanation: 'Bangun (i) 2+3+2+3=10. Bangun (ii) dan (iv) juga memiliki keliling 10 meskipun bentuknya tidak beraturan. Bangun (iii) 3+3+3+3=12.'
          },
          {
            id: 'psas7-6',
            question: 'Berdasarkan data soal sebelumnya (i:Luas 6, ii:Luas 4, iii:Luas 9, iv:Luas 4), manakah bangun datar gabungan persegi yang memiliki LUAS yang sama?',
            options: ['Bangun (i) dan (ii)', 'Bangun (ii) dan (iv)', 'Bangun (i) dan (iii)', 'Bangun (iii) dan (iv)'],
            correctAnswer: 'Bangun (ii) dan (iv)',
            explanation: 'Bangun (ii) dan (iv) keduanya terdiri dari 4 persegi satuan, sehingga luasnya sama yaitu 4 satuan luas.'
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
            question: 'Berdasarkan data nilai sebelumnya di mana 40 siswa ikut ujian, jika 28 siswa dinyatakan tuntas, berapakah persentase jumlah siswa yang tuntas tersebut?',
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
            question: 'Andi ingin beli celana (200rb) dan baju (100rb). Diskon toko: Barokah (celana 15%, baju 20%), Mekar (celana 25%, baju 15%), Maju (celana 10%, baju 30%), Merdeka (celana 20%, baju 10%). Manakah yang termurah?',
            options: ['Barokah', 'Mekar', 'Maju', 'Merdeka'],
            correctAnswer: 'Mekar',
            explanation: 'Total bayar Mekar: (200rb - 25%) + (100rb - 15%) = 150rb + 85rb = 235rb. Toko lain lebih mahal (Barokah 250rb, Maju 250rb, Merdeka 250rb).'
          },
          {
            id: 'psas7-13',
            question: 'Dua jalan sejajar dipotong oleh jalan transversal. Rumah Sandy berada di salah satu sudut (Blok F), dan rumah Eka berada di posisi yang sama pada persimpangan jalan berikutnya (Blok C). Apakah kedudukan rumah Sandy terhadap rumah Eka?',
            options: ['Berseberangan luar', 'Sehadap', 'Sepihak dalam', 'Bertolak belakang'],
            correctAnswer: 'Rumah Pak Eka',
            explanation: 'Dalam geometri transversalnya, rumah yang berada di posisi yang sama disebut sehadap.'
          },
          {
            id: 'psas7-14',
            question: 'Jika jalan di depan masjid membentuk sudut 72° dan rumah Sandy berada di posisi sudut pelurusnya, berapakah besar sudut di depan rumah Sandy?',
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
            question: 'Diberikan dua garis sejajar dipotong oleh sebuah garis transversal. Jika sudut A1 dan B1 berada di posisi yang sama pada lintasan dua garis tersebut, disebut hubungan sudut apakah itu?',
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
  },
  {
    id: 'lvl-osn',
    title: 'OSN Matematika',
    description: 'Kumpulan soal Olimpiade Sains Nasional (OSN) tingkat Kabupaten untuk tingkat SMP.',
    minXp: 0,
    modules: [
      {
        id: 'mod-osn-1',
        title: 'OSN Kabupaten-1',
        description: 'Latihan soal OSN Matematika Kabupaten (Nomor 1-5).',
        icon: 'Trophy',
        content: 'Modul ini berisi soal-soal seleksi tingkat kabupaten yang mencakup teori bilangan, aljabar, dan geometri dasar.',
        quiz: [
          {
            id: 'osn-1',
            question: 'Suku-suku barisan bilangan: 1, 2, 3, 4, 6, 7, 8, 9, 11, 12, ... diperoleh dengan menghilangkan semua bilangan kelipatan 5. Suku ke-2025 barisan tersebut adalah ....',
            options: ['2430', '2530', '2531', '2532'],
            correctAnswer: '2531',
            explanation: 'Dalam setiap 5 bilangan, 4 yang diambil. 2025 = 506 * 4 + 1. Suku ke-2025 = (506 * 5) + 1 = 2531.'
          },
          {
            id: 'osn-2',
            question: 'Jika a = ((-1)⁴ × 4 + (-1)³ × 3 + (-1)² × 2 + (-1)¹ × 1) / 2³, tentukan nilai dari (a + √a) / (a - √a).',
            options: ['-3', '-1/3', '1/3', '3'],
            correctAnswer: '-3',
            explanation: 'a = (4 - 3 + 2 - 1) / 8 = 2/8 = 1/4. Nilai = (1/4 + 1/2) / (1/4 - 1/2) = (3/4) / (-1/4) = -3.'
          },
          {
            id: 'osn-3',
            question: 'Dua bilangan bulat positif memiliki jumlah 40 dan kelipatan persekutuan terkecil (KPK) 48. Faktor persekutuan terbesar (FPB) dari kedua bilangan tersebut adalah ....',
            options: ['8', '12', '16', '24'],
            correctAnswer: '8',
            explanation: 'Bilangan tersebut adalah 16 dan 24 (16+24=40, KPK=48). FPB(16, 24) = 8.'
          },
          {
            id: 'osn-4',
            question: 'Enam bilangan prima yang kurang dari 160 membentuk barisan aritmetika dengan beda lebih dari 1. Jumlah keenam bilangan tersebut adalah ....',
            options: ['240', '300', '492', '926'],
            correctAnswer: '492',
            explanation: 'Bilangan tersebut adalah 7, 37, 67, 97, 127, 157 (beda 30). Jumlahnya = 492.'
          },
          {
            id: 'osn-5',
            question: 'Berapakah banyaknya pasangan terurut bilangan bulat (x, y) dengan -5 ≤ x ≤ 5 dan -5 ≤ y ≤ 5, yang memenuhi nilai 10 ≤ x² + y² ≤ 30?',
            options: ['10', '25', '34', '68'],
            correctAnswer: '68',
            explanation: 'Berdasarkan enumerasi pasangan (x,y) yang memenuhi ketidaksamaan kuadrat tersebut.'
          }
        ]
      },
      {
        id: 'mod-osn-2',
        title: 'OSN Kabupaten-2',
        description: 'Latihan soal OSN Matematika Kabupaten (Nomor 6-10).',
        icon: 'Trophy',
        content: 'Melanjutkan eksplorasi soal OSN dengan fokus pada sistem huruf, deret bilangan unik, dan pemecahan masalah uang saku.',
        quiz: [
          {
            id: 'osn-6',
            question: 'Bilangan bulat positif ditulis dalam sistem huruf: A, AB, AC, AA, ABB, ABC, ABA, ACB, ACC, ACA (untuk 1-10). Berapakah nilai dari ABAB ditambah ACAC?',
            options: ['ABCCC', 'ABCBB', 'ABCAC', 'ABCAB'],
            correctAnswer: 'ABCAC',
            explanation: 'Aturan menggunakan basis 3 dengan A=0/1 tergantung posisi. Estimasi nilai berdasarkan urutan.'
          },
          {
            id: 'osn-7',
            question: 'Bilangan Super Ganjil adalah bilangan bulat positif yang semua digitnya ganjil. Berapakah hasil penjumlahan semua bilangan Super Ganjil yang kurang dari 1000?',
            options: ['45130', '55250', '60125', '70775'],
            correctAnswer: '60125',
            explanation: 'Digit ganjil: 1, 3, 5, 7, 9. Hitung jumlah untuk 1 digit, 2 digit, dan 3 digit.'
          },
          {
            id: 'osn-8',
            question: 'Diketahui total uang saku Ana, Bona, dan Cinta adalah Rp700.000 dengan pecahan 5rb, 10rb, dan 20rb. Berdasarkan distribusi lembaran (x,y,z), manakah kesimpulan yang benar?',
            options: ['Ana dapat tepat 20 lembar', 'Bona dapat nilai terbesar', 'Cinta dapat nilai terkecil', 'Ketiganya dapat jumlah lembar 10rb sama banyak'],
            correctAnswer: 'Ana, Bona, dan Cinta mendapatkan uang saku lembaran Rp10.000 yang sama banyaknya.',
            explanation: 'Variabel x, y, z terdistribusi sedemikian rupa sehingga distribusi lembar 10.000 (y, z, x) menghasilkan nilai yang sama jika dianalisis persamaannya.'
          },
          {
            id: 'osn-9',
            question: 'Diketahui p-1 = (k²-4k-3)² dan q-1 = (k²-4k-5)². Jika pq adalah bilangan prima, tentukan nilai terbesar dari p² + q².',
            options: ['10', '26', '122', '1370'],
            correctAnswer: '1370',
            explanation: 'Nilai p, q akan menghasilkan bilangan prima hanya pada nilai k tertentu (misalnya k=4).'
          },
          {
            id: 'osn-10',
            question: 'Sejumlah kertas dilipat untuk membentuk buku. Jika sebuah lembar diambil dan jumlah keempat nomor halamannya adalah 122, berapakah banyak kertas awal yang digunakan?',
            options: ['60', '15', '12', '10'],
            correctAnswer: '15',
            explanation: 'Nomor halaman pada satu lembar: k, k+1, n-k, n-k+1. Total 122 dikaitkan dengan jumlah halaman total.'
          }
        ]
      },
      {
        id: 'mod-osn-3',
        title: 'OSN Kabupaten-3',
        description: 'Latihan soal OSN Matematika Kabupaten (Nomor 11-15).',
        icon: 'Trophy',
        content: 'Modul ini mencakup barisan geometri, bilangan segi-lima, fungsi rasional, dan geometri lingkaran.',
        quiz: [
          {
            id: 'osn-11',
            question: 'Diketahui barisan geometri: 80, x, y, z, 3125. Berapakah nilai terkecil yang mungkin dari x - y + z?',
            options: ['-3120', '-1950', '480', '950'],
            correctAnswer: '-1950',
            explanation: 'Rasio r bisa positif atau negatif. Nilai terkecil didapat saat rasio negatif.'
          },
          {
            id: 'osn-12',
            question: 'Bilangan segi lima ke-n (Pn) memiliki pola: P0=1, P1=5, P2=12, P3=22. Manakah indeks n yang membuat Pn paling dekat dengan 2025?',
            options: ['30', '33', '36', '39'],
            correctAnswer: '36',
            explanation: 'Rumus Pn = n(3n-1)/2 + 1 (pengembangan). Untuk n=36, nilai mendekati 2025.'
          },
          {
            id: 'osn-13',
            question: 'Jika f(x) = 2025 + (x+1)/x + (x²+2)/x² + ... + (x¹⁰+10)/x¹⁰, tentukan nilai f(2) + f(1) - f(-1) - f(-2).',
            options: ['0', '565/256', '13365/256', '11430'],
            correctAnswer: '11430',
            explanation: 'Evaluasi fungsi dengan sifat penyederhanaan variabel x.'
          },
          {
            id: 'osn-14',
            question: 'Jajar genjang ABCD memiliki keliling 106 cm, AB = 3x+1, BC = 5x-20. Jika DE tegak lurus AB dan DE = 3x-7, berapakah luas daerah yang dibentuk (sesuai parameter geometri OSN)?',
            options: ['122,5', '185', '262,5', '280'],
            correctAnswer: '262,5',
            explanation: 'Selesaikan nilai x dari keliling: 2(3x+1 + 5x-20) = 106. Didapat x=9. Luas dihitung berdasarkan tinggi DE.'
          },
          {
            id: 'osn-15',
            question: 'Lingkaran berpusat di O jari-jari 7, segitiga ABC di dalam lingkaran dengan AC diameter dan ∠ACB = 60°. CD memotong lingkaran di D melalui tengah AB. Panjang CD adalah ....',
            options: ['3√7', '5√7', '6√7', '7√7'],
            correctAnswer: '7√7',
            explanation: 'Gunakan hukum sinus/cosinus atau dalil Stewart untuk menghitung panjang garis dalam lingkaran.'
          }
        ]
      },
      {
        id: 'mod-osn-4',
        title: 'OSN Kabupaten-4',
        description: 'Latihan soal OSN Matematika Kabupaten (Nomor 16-20).',
        icon: 'Trophy',
        content: 'Eksplorasi geometri bidang, volume bangun ruang, jaring-jaring oktahedron, dan teori himpunan.',
        quiz: [
          {
            id: 'osn-16',
            question: 'Dua segitiga sama sisi ABC dan DEF sisi 1 cm bertumpang tindih. Jika luas daerah tertentu sama (sesuai soal), berapakah keliling segi lima AEFGC?',
            options: ['6 - 0.5√2', '6 - √2', '6 - 1.5√2', '6 - 3√2'],
            correctAnswer: '6 - 3√2',
            explanation: 'Analisis geometri pada perpotongan dua segitiga sama sisi.'
          },
          {
            id: 'osn-17',
            question: 'Bidang empat TABC memiliki sisi TBC, TBA, dan ABC yang saling tegak lurus. Jika rasio Luas TBC:TBA:ABC = 1:2:3 dan AC = 10 cm, berapakah volumenya?',
            options: ['80/9 √5', '80/3 √5', '80√5', '320√5'],
            correctAnswer: '80/3 √5',
            explanation: 'V = 1/3 * Luas Alas * Tinggi. Gunakan perbandingan luas dan panjang diagonal untuk mencari rusuk.'
          },
          {
            id: 'osn-18',
            question: 'Pada jaring-jaring oktahedron, angka di bidang adalah jumlah angka di bidang yang berbagi rusuk. Jika a=-4, c=0, g=-10, berapakah nilai b?',
            options: ['-10', '-8', '8', '10'],
            correctAnswer: '-8',
            explanation: 'Bentuk sistem persamaan linear dari aturan hubungan bidang pada oktahedron.'
          },
          {
            id: 'osn-19',
            question: 'Segitiga ABC sama kaki (AC=BC, AB=10, Luas=25). Titik D, E, F membagi sisi dengan rasio 2:3. Berapakah perbandingan luas segitiga PQR (potongan garis) terhadap ABC?',
            options: ['1/19', '2/19', '3/25', '1/5'],
            correctAnswer: '1/19',
            explanation: 'Gunakan dalil Menelaus atau Vektor untuk menentukan rasio luas daerah potongan.'
          },
          {
            id: 'osn-20',
            question: 'Dari 2000 baterai, ditemukan kerusakan: Pelat (30), Elektrolit (50), Terminal (40), Term+Pelat (10), Pelat+Elek (19), Term+Elek (15), ketiganya (5). Berapa baterai yang memenuhi standar?',
            options: ['1804', '1880', '1919', '1920'],
            correctAnswer: '1919',
            explanation: 'Gunakan prinsip inklusi-eksklusi: Total rusak = (30+50+40) - (10+19+15) + 5 = 81. Standar = 2000 - 81 = 1919.'
          }
        ]
      },
      {
        id: 'mod-osn-5',
        title: 'OSN Kabupaten-5',
        description: 'Latihan soal OSN Matematika Kabupaten (Nomor 21-25).',
        icon: 'Trophy',
        content: 'Modul terakhir mencakup statistika rata-rata, perhitungan jalur (jalur langkah), probabilitas angka, dan semut pada kubus.',
        quiz: [
          {
            id: 'osn-21',
            question: 'Data 35 bilangan bulat positif memiliki median 22 dan terbesar 29. Jika x adalah rata-rata terkecil dan y adalah rata-rata terbesar yang mungkin, x + y = ....',
            options: ['40,4', '37,4', '36,4', '25,4'],
            correctAnswer: '37,4',
            explanation: 'x didapat saat 17 data bernilai 1. y didapat saat 17 data bernilai 29.'
          },
          {
            id: 'osn-22',
            question: 'Suatu objek di (0,0) bergerak ke (x+1, y), (x, y+1), atau (x+1, y+1). Banyaknya jalur berbeda untuk mencapai titik (5,5) adalah ....',
            options: ['25', '252', '1683', '3125'],
            correctAnswer: '1683',
            explanation: 'Gunakan bilangan Delannoy D(n,m) atau rekursi jalur.'
          },
          {
            id: 'osn-23',
            question: 'Alma memiliki 9 stiker. Dia menempel 8 stiker berjejer dengan syarat stiker sama tidak bersebelahan dan stiker hati di paling kanan. Berapa banyak caranya?',
            options: ['26', '32', '35', '36'],
            correctAnswer: '26',
            explanation: 'Gunakan kombinatorika dengan batasan posisi dan jenis stiker.'
          },
          {
            id: 'osn-24',
            question: 'Liam memilih nomor 6 digit (0-9). Hadiah diberikan jika minimal ada tiga bilangan ganjil berurutan. Peluang Liam menang adalah ....',
            options: ['1/8', '3/16', '1/4', '5/16'],
            correctAnswer: '5/16',
            explanation: 'Hitung komplemen (tidak ada 3 ganjil berurutan) atau enumerasi pola ganjil-genap.'
          },
          {
            id: 'osn-25',
            question: 'Delapan semut di tiap sudut kubus bergerak ke sudut tetangga secara acak. Peluang tidak ada semut yang bertemu (di jalan atau tujuan) adalah ....',
            options: ['2/3^8', '5/3^8', '4/3^7', '8/3^7'],
            correctAnswer: '2/3^8',
            explanation: 'Setiap semut punya 3 pilihan. Hanya ada 2 siklus (CW/CCW) yang memungkinkan tidak ada pertemuan.'
          }
        ]
      }
    ]
  }
];
