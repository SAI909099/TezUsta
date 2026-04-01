export const serviceCategories = [
  {
    title: 'Santexnik',
    subtitle: 'Kran, truba va ulanish ishlari uchun tekshirilgan ustalar.',
    icon: 'drop',
  },
  {
    title: 'Elektrik',
    subtitle: "Uy va ofis tarmog'i uchun xavfsiz montaj hamda ta'mirlash.",
    icon: 'bolt',
  },
  {
    title: "Bog'bon",
    subtitle: 'Hovli, yashil hudud va mavsumiy parvarish xizmatlari.',
    icon: 'sparkles',
  },
  {
    title: 'Mexanik',
    subtitle: "Maishiy texnika va jihozlar uchun amaliy ta'mirlash.",
    icon: 'tool',
  },
];

export const landingStats = [
  { label: 'Faol ustalar', value: '1,200+', icon: 'tool' },
  { label: 'Birinchi javob', value: '14 daqiqa', icon: 'clock' },
  { label: 'Yakunlangan buyurtmalar', value: '28 ming+', icon: 'shield' },
];

export const landingTrustIndicators = [
  { label: '4.8/5 reyting', icon: 'star' },
  { label: '1,000+ faol foydalanuvchi', icon: 'users' },
  { label: '500+ ustalar', icon: 'tool' },
];

export const landingHeroPreview = {
  specialistId: 'jamshid-umarov',
  rating: '4.8',
  response: '5 daqiqa oldin javob berdi',
  title: "Kir yuvish mashinasini ta'mirlash",
  meta: 'Toshkent, Yunusobod - bugun 14:30',
  summary: "Nasos ishlamayapti, ustadan tezkor tekshiruv va ta'mirlash kerak.",
};

export const landingTestimonials = [
  {
    name: 'Madina Islomova',
    role: 'Chilonzor, mijoz',
    initials: 'MI',
    quote: "Bir necha daqiqada 3 ta usta javob berdi. Reytinglarni ko'rib, ishonch bilan tanladim.",
    rating: 5,
  },
  {
    name: 'Sardor Karimov',
    role: 'Yunusobod, ofis menejeri',
    initials: 'SK',
    quote: "Elektrik ustani tez topdik, narx va vaqt oldindan aniq ko'rindi. Juda qulay xizmat.",
    rating: 5,
  },
  {
    name: 'Dilnoza Murodova',
    role: 'Olmazor, mijoz',
    initials: 'DM',
    quote: "Usta profili, javob tezligi va sharhlar bir joyda bo'lgani uchun tanlash oson bo'ldi.",
    rating: 5,
  },
];

export const howItWorks = [
  {
    title: 'Muammoni yozing',
    text: "Qisqacha tavsif, manzil va kerakli vaqtni ko'rsating.",
  },
  {
    title: 'Takliflarni oling',
    text: "Yaqin atrofdagi ustalar javob beradi va o'z tajribasini ko'rsatadi.",
  },
  {
    title: 'Ishonch bilan tanlang',
    text: "Reyting, narx va tajribaga qarab mos mutaxassisni tanlang.",
  },
];

export const authBenefits = [
  {
    title: 'Xavfsiz',
    text: "Telefon orqali tezkor va himoyalangan kirish.",
    icon: 'shield',
  },
  {
    title: 'Tezkor',
    text: "OTP tasdiqlash orqali 1 daqiqada ishni boshlash.",
    icon: 'flash',
  },
];

export const customerMetrics = [
  { label: 'Faol buyurtmalar', value: '03', icon: 'orders' },
  { label: 'Javob bergan ustalar', value: '07', icon: 'star' },
  { label: "Hamyondagi balans", value: "50,000 so'm", icon: 'wallet' },
];

export const customerActions = [
  {
    title: 'Yangi ish joylash',
    text: "Muammoni yozing va tezkor ravishda ustalarni jalb qiling.",
    to: '/app/jobs/new',
    icon: 'plus',
  },
  {
    title: 'Ustani tanlash',
    text: "Taklif bergan mutaxassislarni ko'rib chiqing.",
    to: '/app/masters',
    icon: 'user',
  },
  {
    title: 'Hamyonni boshqarish',
    text: "Balans, bonus va tranzaksiyalarni nazorat qiling.",
    to: '/app/wallet',
    icon: 'wallet',
  },
];

export const customerOrders = [
  {
    id: 'washing-machine',
    status: 'USTALAR JAVOB BERDI',
    statusTone: 'lime',
    title: "Yuvish mashinasini ta'mirlash",
    people: ['A', 'S', '+2'],
    detail: '4 ta usta aloqaga chiqdi',
    meta: 'Bugun, 14:30',
    location: 'Toshkent, Yunusobod tumani',
  },
  {
    id: 'living-room-paint',
    status: 'KUTILMOQDA',
    statusTone: 'neutral',
    title: "Yashash xonasini bo'yash",
    detail: "Sizning so'rovingiz navbatda. 2 ta usta ko'rib chiqmoqda.",
    meta: '12 Oktabr, 10:00',
    location: 'Toshkent, Yashnobod tumani',
  },
  {
    id: 'siphon',
    status: 'YAKUNLANDI',
    statusTone: 'outline',
    title: "Santexnika: sifonni almashtirish",
    detail: "Buyurtma yakunlandi. Endi ustaga baho qoldirishingiz mumkin.",
    meta: '25 Sentabr, 18:10',
    location: 'Toshkent, Chilonzor tumani',
  },
];

export const specialists = [
  {
    id: 'shavkat-karimov',
    name: 'Shavkat Karimov',
    specialty: 'Elektrik',
    experience: '8 yillik tajriba',
    rating: '4.9',
    badges: ['Tezkor', 'Kafolat'],
    variant: 'emerald',
    responseTime: '8 daqiqa ichida javob berdi',
    completedJobs: '214 ta yakunlangan ish',
    phone: '+998 97 300 45 67',
    telegram: '@shavkat_elektrik',
    whatsapp: '+998973004567',
    location: 'Toshkent, Yunusobod tumani',
    hours: '08:00 - 22:00',
    note: "Elektr tarmog'i, rozetka va maishiy texnika diagnostikasi bo'yicha mutaxassis.",
  },
  {
    id: 'azizbek-nazarov',
    name: 'Azizbek Nazarov',
    specialty: 'Santexnik',
    experience: '12 yillik tajriba',
    rating: '4.7',
    badges: ['Uskunalar bor', 'Sifat nazorati'],
    variant: 'amber',
    responseTime: '12 daqiqa ichida javob berdi',
    completedJobs: '306 ta yakunlangan ish',
    phone: '+998 93 118 20 18',
    telegram: '@azizbek_santexnik',
    whatsapp: '+998931182018',
    location: 'Toshkent, Olmazor tumani',
    hours: '09:00 - 21:00',
    note: "Suv sizishi, truba yangilash va bosim bilan bog'liq ishlarni tez hal qiladi.",
  },
  {
    id: 'jamshid-umarov',
    name: 'Jamshid Umarov',
    specialty: 'Universal usta',
    experience: '15 yillik tajriba',
    rating: '5.0',
    badges: ['Premium', '500+ xizmatlar', '120+ sharhlar'],
    variant: 'slate',
    responseTime: '5 daqiqa ichida javob berdi',
    completedJobs: '540 ta yakunlangan ish',
    phone: '+998 90 707 55 70',
    telegram: '@jamshid_universal',
    whatsapp: '+998907075570',
    location: 'Toshkent, Mirzo Ulugbek tumani',
    hours: '07:00 - 23:00',
    note: "Uy ichki ta'miri, kichik montaj va ekspress chaqiruvlar uchun qulay tanlov.",
  },
];

export const unlockOffer = {
  price: "10,000 so'm",
  balance: "50,000 so'm",
  freeCredits: '2 ta bepul kredit',
};

export const walletSummary = {
  balance: "50,000 so'm",
  bonus: '2 ta bepul kredit',
  card: 'Visa / Uzcard',
};

export const walletStats = [
  {
    label: "Oxirgi 30 kun ichida joylangan buyurtmalar",
    value: '12',
    icon: 'sparkles',
  },
  {
    label: 'Umumiy xarajatlar',
    value: '4.2 mln',
    icon: 'clock',
  },
];

export const transactions = [
  {
    title: 'Santexnika xizmati',
    date: '14 Oktabr, 2023',
    amount: '-120,000',
    tone: 'negative',
  },
  {
    title: "Balans to'ldirildi",
    date: '12 Oktabr, 2023',
    amount: '+200,000',
    tone: 'positive',
  },
  {
    title: 'Tozalash xizmati',
    date: '08 Oktabr, 2023',
    amount: '-85,000',
    tone: 'negative',
  },
  {
    title: 'Bonus keshbek',
    date: '05 Oktabr, 2023',
    amount: '+5,000',
    tone: 'positive',
  },
];

export const masterMetrics = [
  { label: 'Yangi leadlar', value: '12', icon: 'jobs' },
  { label: 'Bugungi daromad', value: '1.8 mln', icon: 'wallet' },
  { label: "O'rtacha javob", value: '8 daqiqa', icon: 'clock' },
];

export const masterFilters = ['Barchasi', 'Santexnika', 'Elektrik', "Narx bo'yicha"];

export const featuredLead = {
  badge: 'SHOSHILINCH',
  title: "Yangi turar-joy majmuasida to'liq elektr montaj ishlari",
  description:
    "3 xonali xonadon uchun barcha elektr nuqtalarini o'rnatish va shiftni yig'ish. Materiallar obyektda mavjud.",
  location: 'Toshkent, Yunusobod tumani',
  time: '3 soat oldin joylangan',
  price: '4,500,000 UZS',
};

export const masterLeads = [
  {
    id: 'kitchen-faucet',
    category: 'Bugun',
    title: 'Kran va mikserni almashtirish',
    description: "Oshxonadagi krandan suv tommoqda, yangi mikser o'rnatilishi kerak.",
    budget: '150,000 UZS',
  },
  {
    id: 'air-conditioner',
    category: 'Yangilandi',
    title: 'Konditsioner profilaktikasi',
    description: "Split tizimni yuvish va freon holatini tekshirish bo'yicha buyurtma.",
    budget: '300,000 UZS',
  },
  {
    id: 'paint-room',
    category: 'Hududingizda',
    title: "Devorlarni bo'yash (1 xona)",
    description: '20 kv.m maydon, materiallar buyurtmachida mavjud.',
    budget: '600,000 UZS',
  },
  {
    id: 'wardrobe',
    category: 'Mehnat bozori',
    title: "Mebel yig'ish (shkaf-kupe)",
    description: "2 metrlik kupe shkafni yig'ish va relslarni sozlash kerak.",
    budget: '250,000 UZS',
  },
];
