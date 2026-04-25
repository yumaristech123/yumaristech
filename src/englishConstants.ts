import { Level } from './types';

export const ENGLISH_LEVELS: Level[] = [
  {
    id: 'lvl-english-kickstart',
    title: 'English Kickstart' as any,
    description: 'Modul dasar untuk memulai percakapan dalam Bahasa Inggris.',
    minXp: 0,
    modules: [
      {
        id: 'eng-topic-1',
        title: 'Topic 1: Greeting',
        description: 'Belajar menyapa orang lain dalam berbagai situasi.',
        icon: 'Handshake',
        content: 'Greeting (Salam)',
        quiz: [] // We'll use custom rendering for English topics
      },
      {
        id: 'eng-topic-2',
        title: 'Topic 2: Introduction',
        description: 'Belajar memperkenalkan diri sendiri kepada orang lain.',
        icon: 'User',
        content: 'Introduction',
        quiz: []
      },
      {
        id: 'eng-topic-3',
        title: 'Topic 3: Daily Routine',
        description: 'Menceritakan kegiatan sehari-hari dari bangun tidur.',
        icon: 'Clock',
        content: 'Daily Routine',
        quiz: []
      },
      {
        id: 'eng-topic-4',
        title: 'Topic 4: Describing Person',
        description: 'Belajar mendeskripsikan ciri-ciri fisik seseorang.',
        icon: 'Eye',
        content: 'Describing Person',
        quiz: []
      },
      {
        id: 'eng-topic-5',
        title: 'Topic 5: Days and Date',
        description: 'Menyebutkan nama hari, bulan, dan tanggal.',
        icon: 'Calendar',
        content: 'Days and Date',
        quiz: []
      },
      {
        id: 'eng-topic-6',
        title: 'Topic 6: Time',
        description: 'Belajar cara menyebutkan waktu (jam) dalam Bahasa Inggris.',
        icon: 'Watch',
        content: 'Time',
        quiz: []
      },
      {
        id: 'eng-topic-7',
        title: 'Topic 7: Activity in the Class',
        description: 'Membicarakan kegiatan yang sedang dilakukan di kelas.',
        icon: 'School',
        content: 'Activity in the Class',
        quiz: []
      },
      {
        id: 'eng-topic-8',
        title: 'Topic 8: Then and Now',
        description: 'Membicarakan tentang pekerjaan dan sekolah.',
        icon: 'History',
        content: 'Then and Now',
        quiz: []
      },
      {
        id: 'eng-topic-9',
        title: 'Topic 9: Achievement',
        description: 'Menceritakan pencapaian yang sudah diraih.',
        icon: 'Trophy',
        content: 'Achievement',
        quiz: []
      }
    ]
  }
];

export interface EnglishConversation {
  en: string;
  id: string;
  type?: 'formal' | 'informal' | 'slang' | 'sentence' | 'question' | 'answer' | 'vocabulary';
  category?: string;
}

export const ENGLISH_CONTENT: Record<string, EnglishConversation[]> = {
  'eng-topic-1': [
    { en: "Good morning", id: "Selamat pagi", type: 'formal' },
    { en: "Good afternoon", id: "Selamat sore", type: 'formal' },
    { en: "Good evening", id: "Selamat petang", type: 'formal' },
    { en: "Good night is not a greeting but a farewell", id: "Good night bukan salam tapi ucapan selamat tinggal", type: 'formal' },
    { en: "Hy / Hello", id: "Hai / Halo", type: 'informal' },
    { en: "Howdy", id: "Halo (Slang)", type: 'slang' },
    { en: "Hia", id: "Halo (Slang)", type: 'slang' },
    { en: "Whazzup?", id: "Apa kabar? (Slang)", type: 'slang' },
    { en: "Yo", id: "Yo (Slang)", type: 'slang' },
    { en: "G’day", id: "Selamat siang (Australia)", type: 'slang' },
    { en: "I am going to talk about ...", id: "Saya akan berbicara tentang ...", type: 'sentence' },
    { en: "That is all from me", id: "Sekian dari saya", type: 'sentence' },
    { en: "Thank you for your attention", id: "Terima kasih atas perhatian Anda", type: 'sentence' },
    { en: "See You", id: "Sampai jumpa", type: 'sentence' }
  ],
  'eng-topic-2': [
    { en: "Hello, Good Morning", id: "Halo, Selamat Pagi", type: 'formal' },
    { en: "Let me introduce myself to you", id: "Ijinkan saya memperkenalkan diri kepada anda", type: 'sentence' },
    { en: "What is your full name?", id: "Siapa nama lengkapmu?", type: 'question' },
    { en: "My full name is...", id: "Nama lengkap saya adalah...", type: 'answer' },
    { en: "What is your nick name?", id: "Siapa nama panggilanmu?", type: 'question' },
    { en: "My nick name is...", id: "Nama panggilan saya adalah...", type: 'answer' },
    { en: "How old are you?", id: "Berapa usiamu?", type: 'question' },
    { en: "I am ... years old", id: "Saya berusia ... tahun", type: 'answer' },
    { en: "Where are you from?", id: "Dari mana asalmu?", type: 'question' },
    { en: "I am from...", id: "Saya berasal dari...", type: 'answer' },
    { en: "Where do you live?", id: "Di mana kamu tinggal?", type: 'question' },
    { en: "I live at Mango street, No 66, Pare, Kediri", id: "Saya tinggal di Jalan Mangga, No 66, Pare, Kediri", type: 'answer' },
    { en: "Nice to meet you", id: "Senang bertemu denganmu", type: 'sentence' }
  ],
  'eng-topic-3': [
    { en: "I am going to talk about my morning routine", id: "Saya akan berbicara tentang rutinitas pagi saya", type: 'sentence' },
    { en: "What time do you usually wake up in the morning?", id: "Jam berapa biasanya kamu bangun di pagi hari?", type: 'question' },
    { en: "I usually wake up at 04.00 am", id: "Saya biasanya bangun pukul 04.00 pagi", type: 'answer' },
    { en: "What do you usually do after you wake up?", id: "Apa yang biasanya kamu lakukan setelah bangun?", type: 'question' },
    { en: "After I wake up, I usually take a bath and pray subuh", id: "Setelah saya bangun, saya biasanya mandi dan sholat subuh", type: 'answer' },
    { en: "What time do you usually take a bath?", id: "Jam berapa kamu biasanya mandi?", type: 'question' },
    { en: "I usually take a bath at 04.30 am", id: "Saya biasanya mandi pukul 04.30 pagi", type: 'answer' },
    { en: "What time do you usually have breakfast?", id: "Jam berapa biasanya kamu sarapan?", type: 'question' },
    { en: "I usually have breakfast at 06.00 a.m", id: "Saya biasanya sarapan jam 6 pagi", type: 'answer' },
    { en: "What time do you usually go to school?", id: "Jam berapa kamu biasanya berangkat sekolah?", type: 'question' },
    { en: "I usually go to school at 06.30 in the morning", id: "Saya biasanya pergi ke sekolah pukul 06.30 pagi", type: 'answer' }
  ],
  'eng-topic-4': [
    { en: "I am going to talk about my friend", id: "Saya akan berbicara tentang teman saya", type: 'sentence' },
    { en: "Eye: Slant eyes, brown, black, round", id: "Mata: Sipit, cokelat, hitam, bundar", type: 'vocabulary' },
    { en: "Nose: Sharp nose, flat nose, medium", id: "Hidung: Mancung, pesek, sedang", type: 'vocabulary' },
    { en: "Lips: Small, thin, thick, wide", id: "Bibir: Kecil, tipis, tebal, lebar", type: 'vocabulary' },
    { en: "Skin: black, black sweet, brown, bright brown, creamy yellow", id: "Kulit: hitam, hitam manis, cokelat, sawo matang, kuning langsat", type: 'vocabulary' },
    { en: "Hair: Straight, curly, wavy, long, Short, bald, wearing veil", id: "Rambut: lurus, keriting, ikal, panjang, pendek, gundul, pakai kerudung", type: 'vocabulary' },
    { en: "Body: Tall, short, medium, fat, skinny", id: "Tubuh: tinggi, pendek, sedang, gemuk, kurus", type: 'vocabulary' },
    { en: "Face: Round, oval, long, beautiful, handsome", id: "Wajah: bulat, oval, lonjong, cantik, tampan", type: 'vocabulary' },
    { en: "Kind, clever, diligent, polite", id: "Baik, pintar, rajin, sopan", type: 'vocabulary' },
    { en: "He has slant eyes", id: "Dia (laki-laki) punya mata sipit", type: 'answer' },
    { en: "He has sharp nose", id: "Dia punya hidung mancung", type: 'answer' },
    { en: "He has small lips", id: "Dia punya bibir yang kecil", type: 'answer' },
    { en: "He has brown skin", id: "Dia punya kulit coklat", type: 'answer' },
    { en: "He has short hair", id: "Dia punya rambut pendek", type: 'answer' },
    { en: "He is tall", id: "Dia tinggi", type: 'answer' },
    { en: "He has oval face", id: "Dia punya wajah oval", type: 'answer' },
    { en: "He is kind", id: "Dia baik", type: 'answer' }
  ],
  'eng-topic-5': [
    { en: "I am going to talk about days and Date", id: "Saya akan berbicara tentang Hari dan Tanggal", type: 'sentence' },
    { en: "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday", id: "Minggu, Senin, Selasa, Rabu, Kamis, Jumat, Sabtu", type: 'vocabulary' },
    { en: "Weekdays: Sunday- Friday", id: "Hari Kerja: Minggu - Jumat", type: 'vocabulary' },
    { en: "Weekend: Saturday- Sunday", id: "Akhir Pekan: Sabtu - Minggu", type: 'vocabulary' },
    { en: "What day is today?", id: "Hari apa ini?", type: 'question' },
    { en: "Today is Monday", id: "Ini hari Senin", type: 'answer' },
    { en: "What day is tomorrow?", id: "Hari apa besok?", type: 'question' },
    { en: "Tomorrow is Tuesday", id: "Besok hari Selasa", type: 'answer' },
    { en: "What day was yesterday?", id: "Hari apa kemarin?", type: 'question' },
    { en: "Yesterday was Sunday", id: "Kemarin hari Minggu", type: 'answer' },
    { en: "What date is it?", id: "Tanggal berapa sekarang?", type: 'question' },
    { en: "It is April sixth", id: "Ini tanggal enam April", type: 'answer' },
    { en: "January, February, March, April, May, June, July, August, September, October, November, December", id: "Januari s/d Desember", type: 'vocabulary' }
  ],
  'eng-topic-6': [
    { en: "I am going to talk about Time", id: "Saya akan berbicara tentang waktu", type: 'sentence' },
    { en: "It is two o'clock", id: "Sekarang jam dua tepat", type: 'answer' },
    { en: "It is five past two", id: "Jam dua lewat lima menit", type: 'answer' },
    { en: "It is quarter past two", id: "Jam dua lewat seperempat", type: 'answer' },
    { en: "It is half past two", id: "Jam dua lewat tiga puluh menit", type: 'answer' },
    { en: "It is twenty-five to three", id: "Jam tiga kurang dua puluh lima menit", type: 'answer' },
    { en: "What time is it?", id: "Jam berapa sekarang?", type: 'question' },
    { en: "What time is your class finished?", id: "Jam berapa kelasmu selesai?", type: 'question' },
    { en: "My class will finish at 4 o’clock", id: "Kelasku akan selesai jam 4 sore", type: 'answer' },
    { en: "What time will your father pick you up?", id: "Jam berapa ayahmu akan menjemputmu?", type: 'question' },
    { en: "My father will pick me up at five past four", id: "Ayahku akan menjemputku jam 16.05", type: 'answer' }
  ],
  'eng-topic-7': [
    { en: "I am going to talk about my activity in the class", id: "Saya akan berbicara tentang aktivitas di kelas saat ini", type: 'sentence' },
    { en: "What are you doing right now?", id: "Apa sedang kamu lakukan sekarang?", type: 'question' },
    { en: "I am studying English right now", id: "Aku sedang belajar Bahasa Inggris sekarang", type: 'answer' },
    { en: "What material are you learning right now?", id: "Materi apa yang sedang kamu pelajari sekarang?", type: 'question' },
    { en: "I am learning about activity in the class", id: "Saya sedang belajar tentang kegiatan di kelas", type: 'answer' },
    { en: "Who is your teacher?", id: "Siapa gurumu?", type: 'question' },
    { en: "My teacher is Mr Yumaris", id: "Guruku adalah Pak Yumaris", type: 'answer' },
    { en: "What is she doing right now?", id: "Apa yang dia lakukan sekarang?", type: 'question' },
    { en: "She is observing and helping my friends who get difficulty", id: "Dia sedang mengamati dan membantu temanku yang punya kesulitan", type: 'answer' },
    { en: "How is the condition of your class right now?", id: "Bagaimana kondisi kelas saat ini?", type: 'question' },
    { en: "The condition of my class right now is so exciting", id: "Kondisi kelas saat ini sangat mengasyikkan", type: 'answer' }
  ],
  'eng-topic-8': [
    { en: "I am going to talk about Then and Now", id: "Saya akan berbicara tentang Dulu dan sekarang", type: 'sentence' },
    { en: "What do you do?", id: "Apa pekerjaanmu?", type: 'question' },
    { en: "I am a student", id: "Saya seorang murid", type: 'answer' },
    { en: "Where do you study?", id: "Di mana kamu sekolah?", type: 'question' },
    { en: "I study at SMP Padamu Negeri", id: "Saya belajar di SMP Padamu Negeri", type: 'answer' },
    { en: "Do you have favorite place in your school?", id: "Apakah kamu punya tempat favorit di sekolah?", type: 'question' },
    { en: "Yes, I do", id: "Ya, saya punya", type: 'answer' },
    { en: "What is your favorite place in your school?", id: "Apa tempat favoritmu di sekolah?", type: 'question' },
    { en: "My favorite place is library", id: "Tempat favoritku adalah perpustakaan", type: 'answer' },
    { en: "What is your favorite subject?", id: "Pelajaran apa yang kamu suka saat ini?", type: 'question' },
    { en: "My favorite subject is English", id: "Pelajaran favoritku adalah Bahasa Inggris", type: 'answer' }
  ],
  'eng-topic-9': [
    { en: "I am going to talk about my achievement", id: "Saya akan berbicara tentang pencapaian", type: 'sentence' },
    { en: "What have you achieved as student?", id: "Apa sudah kamu capai sebagai pelajar?", type: 'question' },
    { en: "I have achieved many things", id: "Saya sudah mencapai banyak hal", type: 'answer' },
    { en: "The first, I can recite and memorize some surah from the holy Qur’an", id: "Pertama, saya bisa mengaji dan menghafalkan beberapa surat dari Al Quran", type: 'answer' },
    { en: "The second, I do prayer five times a day punctually", id: "Kedua, saya sholat lima waktu sehari tepat waktu", type: 'answer' },
    { en: "The third, I have won a Math Competition", id: "Ketiga, saya telah memenangkan sebuah lomba Matematika", type: 'answer' },
    { en: "The fourth, I can speak English", id: "Keempat, saya bisa berbicara Bahasa Inggris", type: 'answer' },
    { en: "The fifth, my confidence is improving", id: "Kelima, kepercayaan diriku semakin meningkat", type: 'answer' },
    { en: "How do you improve your confidence?", id: "Apa yang kamu lakukan untuk meningkatkan kepercayaan dirimu?", type: 'question' },
    { en: "By practicing in the speaking class", id: "Dengan praktek di kelas speaking", type: 'answer' }
  ]
};
