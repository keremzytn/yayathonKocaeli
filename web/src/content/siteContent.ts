/** Statik site içeriği — KBB / Yayathon web rehberi ve metodoloji raporundan türetilmiştir. */

export const siteMeta = {
  title: 'Yayathon 2026 | Kocaeli Büyükşehir Belediyesi',
  description:
    'Kocaeli Yaya Ulaşımı Eylem Planı kapsamında İzmit ve Darıca için yaya odaklı fikir maratonu. 5–6 Haziran 2026.',
  url: 'https://www.carmedlegal.com',
  locale: 'tr_TR',
} as const

/** Son başvuru (başvuru sayfası geri sayımı). Etkinlik 5–6 Haziran 2026. */
export const applicationDeadlineIso = '2026-05-25T23:59:59+03:00'

export type NavItem = { to: string; label: string }

export const navItems: NavItem[] = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/yarismaci-kunyesi', label: 'Yarışma künyesi' },
  { to: '/etkinlik-suresi', label: 'Etkinlik süreci' },
  { to: '/katilim-kosullari', label: 'Katılım koşulları' },
  { to: '/oduller-ve-kurallar', label: 'Ödüller ve kurallar' },
  { to: '/takvim', label: 'Takvim' },
  { to: '/sss', label: 'SSS' },
  { to: '/basvuru', label: 'Başvuru' },
  { to: '/iletisim', label: 'İletişim' },
]

export const hero = {
  kicker: 'Kocaeli Büyükşehir Belediyesi',
  title: 'YAYATHON 2026',
  subtitle:
    '“Kocaeli Yaya Ulaşımı Eylem Planı” ile Kocaeli SKUp vizyonu odaklı, yaya ulaşım için şehrin geleceğini birlikte adımlıyoruz.',
  stats: [
    { label: 'Başarı Ödülleri', value: "Kişi başı 10.000 TL'ye varan" },
    { label: 'Etkinlik Tarihi', value: '5–6 Haziran 2026' },
  ],
}

/** Ana sayfa hero: tam genişlik arka plan (yerel dosya için `/hero-bg.jpg` vb.) */
export const heroBackground = {
  imageSrc: '/images/kocaeli.jpg',
  imageAlt: 'Kocaeli kent görünümü',
} as const

/** Boş bırakılırsa video alanı yer tutucu gösterir; YouTube video kimliğini yazın. */
export const homeVideo: { title: string; lead: string; youtubeId: string } = {
  title: 'Kocaeli SKUp Projesi Kapanış Filmi',
  lead: 'SKUp Kocaeli',
  youtubeId: 'I38IVMBp_Ek',
}

export const introSection = {
  title: 'Bu Kentte Yürümek Nasıl Bir Deneyim?',
  lead:
    'Kocaeli Büyükşehir Belediyesi ve Kaiser Mühendislik iş birliğiyle düzenlenen Yayathon 2026, kentsel ulaşım omurgasını araç odaklı bir yapıdan kurtarmayı hedefleyen bir fikir maratonudur.',
  bullets: [
    'İzmit ve Darıca ilçe merkezleri için yaya odaklı iyileştirme fikirleri geliştir.',
    '10×10 modeli ile disiplinler arası hibrit takımlarda yer al.',
    'Saha keşif programı ile gerçek mekânsal verileri deneyimle.',
  ],
}

export const pillarSections = [
  {
    icon: 'walk' as const,
    title: 'Ulaşım Vizyonu',
    body:
      'Yaya öncelikli bir kent dokusu oluşturmak için Kocaeli’nin kritik noktalarına odaklanan stratejik planlar geliştiriyoruz.',
  },
  {
    icon: 'design' as const,
    title: 'Tasarım Odaklı',
    body:
      'Sadece fikir değil; uygulanabilir ve teknik olarak desteklenmiş kentsel tasarım projelerini ödüllendiriyoruz.',
  },
]

export const ctaBand = {
  title: 'Projenizle Kocaeli’yi Bir Adım Öteye Taşıyın',
  text: 'Tüm sorularınız için SSS’yi inceleyebilir veya iletişim kanallarımızdan bize ulaşabilirsiniz.',
}

export const aboutPage = {
  title: 'Vizyon ve Stratejik Çerçeve',
  sections: [
    {
      h: 'Eylem planı ve yarışma',
      p:
        'Kocaeli Yaya Ulaşımı Eylem Planı; kentsel ulaşım omurgasını araç odaklı yapıdan kurtararak güvenli, erişilebilir, kapsayıcı ve sürdürülebilir bir yaya ekosistemi inşasını hedefler. Hackathon, bu sürece katılımcı ve yenilikçi bir boyut kazandıran fikir maratonudur.',
    },
    {
      h: 'Amaç ve kapsam',
      p:
        'Odağımız İzmit ve Darıca ilçe merkezleri için yaya odaklı mekânsal ve işlevsel iyileştirme fikirleridir. Katılımcılardan kent içi erişilebilirlik, yaya güvenliği, kamusal alan kalitesi ve yaya–toplu taşıma entegrasyonu ekseninde somut çözümler (kavramsal tasarım, prototip veya dijital arayüz) üretmeleri beklenir.',
    },
    {
      h: 'Kurumsal iş birliği',
      p:
        'Etkinlik Kocaeli Büyükşehir Belediyesi ve Kaiser Mühendislik koordinasyonunda; Kocaeli Üniversitesi, Gebze Teknik Üniversitesi ve ilgili meslek odalarıyla multidisipliner yürütülmektedir.',
    },
    {
      h: 'Tematik odak',
      p:
        '“Bu Kentte Yürümek Nasıl Bir Deneyim?” sorusuyla sokakları yalnızca geçiş değil deneyim alanı olarak ele alıyoruz. Çocuklar, yaşlılar ve dezavantajlı bireyler için güvenli rotalar Kocaeli’nin kentsel kimliğini geleceğe taşıyan vizyonumuzun merkezindedir.',
    },
  ],
}

export const participatePage = {
  title: 'Katılım: 10 × 10 modeli',
  lead:
    'Etkinlik, disiplinler arası etkileşimi güçlendiren 10×10 modeli üzerine kuruludur: 100 seçkin katılımcı, organizasyon komitesince oluşturulan 10 hibrit takıma dağıtılır.',
  eligibility: {
    title: 'Uygunluk kriterleri',
    items: [
      'Akademik: Üniversitelerin lisans ve lisansüstü öğrencileri ile akademisyenler.',
      'Profesyonel: Şehir planlama, mimarlık, mühendislik, sosyoloji ve yazılım alanlarında uzmanlar.',
      'Disiplin çeşitliliği: Mimarlık, şehir ve bölge planlama, yazılım mühendisliği, sosyoloji, grafik tasarım ve ilgili branşlar.',
    ],
  },
  teamModel: {
    title: 'Karma takım ve başvuru',
    p:
      'Katılım bireysel başvuru esasındadır. Hazır ekip başvuruları, yarışma dengesi ve farklı disiplinlerin zorunlu etkileşimi nedeniyle kabul edilmemektedir. Takımlar; uzmanlık, deneyim ve cinsiyet dengesi gözetilerek profesyonelce oluşturulur.',
  },
}

export const scheduleFieldDay = {
  title: 'Saha Keşif Programı — 5 Haziran 2026',
  location: 'İzmit kent merkezi',
  paragraphs: [
    'Tramvay turu, rehberli yürüyüşler ve kullanıcı davranışı analizlerini kapsayan teknik gezi ile tasarım kararlarını gerçek mekânsal verilere dayandırmayı hedefliyoruz.',
  ],
}

export type ProgramRow = { time: string; session: string; detail: string }

export const scheduleHackathon: ProgramRow[] = [
  { time: '08:00 – 09:30', session: 'Kayıt ve Açılış', detail: 'Belediye ve Kaiser Mühendislik vizyon sunumları.' },
  { time: '09:30 – 10:00', session: 'Problem Tanımlama', detail: 'Veri paketleri ve tasarım sorusunun aktarımı.' },
  { time: '10:00 – 12:30', session: 'Fikir Üretimi', detail: 'Takım içi beyin fırtınası ve konsept geliştirme.' },
  { time: '12:30 – 13:30', session: 'Öğle Yemeği', detail: 'Networking ve mentorlarla hızlı istişareler.' },
  { time: '13:30 – 17:30', session: 'Prototipleme', detail: 'Mentor desteğiyle yoğun çalışma ve modelleme.' },
  { time: '17:30 – 18:00', session: 'Sunum Hazırlığı', detail: '5 dk. nihai sunumların (PPT, video, poster) teslimi.' },
  { time: '18:00 – 19:30', session: 'Jüri Sunumları', detail: '7 kişilik hibrit jüriye proje sunumları.' },
  { time: '19:30 – 20:30', session: 'Ödül ve Kapanış', detail: 'Değerlendirme sonuçları ve ödül töreni.' },
]

export const scheduleMeta = {
  hackathonDate: '6 Haziran 2026',
  venue: 'Luxor Garden Park Hotel (Safir ve Kafkas salonları)',
}

export const evaluationPage = {
  title: 'Değerlendirme ve ödüller',
  intro:
    'Değerlendirme; akademik derinlik, kamu yönetimi deneyimi ve mesleki uzmanlığı birleştiren 7 kişilik hibrit jüri tarafından yapılır.',
  jury: {
    title: 'Jüri kompozisyonu',
    items: [
      'Akademi temsilcileri (KOÜ ve GTÜ’den birer akademisyen — 2 kişi)',
      'Kocaeli Büyükşehir Belediyesi temsilcileri (2 kişi)',
      'Meslek odaları: Mimarlar Odası, Şehir Plancıları Odası, İnşaat Mühendisleri Odası (3 kişi)',
    ],
  },
  weights: {
    title: 'Puanlama ağırlıkları',
    items: [
      { label: 'Yenilikçilik ve özgünlük', percent: 30 },
      { label: 'Uygulanabilirlik ve fizibilite', percent: 30 },
      { label: 'Sosyal etki ve kapsayıcılık', percent: 20 },
      { label: 'Teknik sunum kalitesi', percent: 20 },
    ],
  },
  prizes: {
    title: 'Başarı ödülleri',
    subtitle:
      'Ödüller, jüri değerlendirmesiyle belirlenen derecelere göre kazanan ekiplerin tüm üyelerine kişi başı hediye çeki olarak tanımlanır.',
    rows: [
      { rank: 'Birinci ekip', amount: '10.000 TL' },
      { rank: 'İkinci ekip', amount: '5.000 TL' },
      { rank: 'Üçüncü ekip', amount: '2.500 TL' },
    ],
  },
}

export const homePrizesSection = {
  title: 'Başarı ödülleri',
  lead:
    'Üç derece için kişi başı hediye çekleri. Jüri yapısı, puanlama ve diğer kurallar için ödüller sayfasına göz atın.',
}

export const designPage = {
  title: 'Tasarım ilkeleri ve çözüm çerçevesi',
  intro:
    'Katılımcılardan Tasarım Odaklı Düşünce (Design Thinking) ve Taktiksel Şehircilik (Tactical Urbanism) yaklaşımlarını sentezlemeleri beklenir.',
  focus: {
    title: 'Stratejik odak noktaları',
    items: [
      {
        h: 'Bağlam duyarlılığı',
        p: 'İzmit’in tarihi/ticari dokusu ve Darıca’nın sahil ve aile odaklı yapısı projelere yansıtılmalıdır.',
      },
      {
        h: 'Düşük maliyet — yüksek etki',
        p: 'Geçici boyalar, modüler kent mobilyaları ve pop-up alanlar gibi hızlı uygulanabilir çözümler.',
      },
      {
        h: 'Dijital entegrasyon',
        p: 'Sensörlü geçitler, akıllı yönlendirme ve oyunlaştırılmış rotalar gibi akıllı şehir bileşenleri.',
      },
      {
        h: 'Kapsayıcılık',
        p: 'Çocuklar, yaşlılar ve engelliler için evrensel tasarım prensipleri.',
      },
    ],
  },
  gallery: {
    title: 'İlham galerisi',
    caption: 'Taktik şehircilik ve yaya öncelikli müdahale örneklerinden kareler (özet görseller).',
    images: [
      {
        src: '/images/tactical-urbanism%20(1).png',
        alt: 'Taktik şehircilik — ilham görseli 1',
      },
      {
        src: '/images/tactical-urbanism%20(2).png',
        alt: 'Taktik şehircilik — ilham görseli 2',
      },
      {
        src: '/images/tactical-urbanism%20(3).png',
        alt: 'Taktik şehircilik — ilham görseli 3',
      },
      {
        src: '/images/tactical-urbanism%20(4).png',
        alt: 'Taktik şehircilik — ilham görseli 4',
      },
    ],
  },
}

export const methodologyPage = {
  title: 'Hackathon metodolojisi',
  sections: [
    {
      h: 'Giriş',
      p:
        'Kocaeli Yaya Ulaşımı Eylem Planı; yaya hareketliliğini güvenli, erişilebilir, kapsayıcı ve sürdürülebilir kılmayı amaçlar. 6 Haziran 2026’da düzenlenecek 12 saatlik yoğun Hackathon ile gençlerin ve öğrencilerin yaratıcı potansiyeli sürece dahil edilir.',
    },
    {
      h: 'Beklenen çıktılar',
      items: [
        'İki alt merkez için yaya odaklı sorun alanlarının analizi',
        'Kısa, orta ve uzun vadeli müdahale önerileri',
        'Mekânsal tasarım + politika + uygulama araçlarını birlikte ele alan bütüncül fikirler',
        'Yaya güvenliği, erişilebilirlik ve kamusal alan kalitesinde yenilikçi çözümler',
        'Eylem planı için proje fikir havuzu',
      ],
    },
    {
      h: 'Hazırlık',
      p:
        'Katılımcı kayıtlarının etkinlikten en az üç ay önce açılması ve hazırlıkların takvimden en az iki ay önce tamamlanması hedeflenir. Veri setleri (haritalar, trafik, nüfus, ilke özetleri, yasal kısıtlar) sadeleştirilerek takımlara sunulur.',
    },
    {
      h: 'Tasarım yaklaşımları',
      items: [
        'Design Thinking ile kullanıcı ve paydaş odaklı problem çerçevesi',
        'Tactical Urbanism ile hızlı pilot ve düşük riskli müdahaleler',
        'Dijital ve fiziksel çözümlerin birlikte düşünülmesi',
      ],
    },
    {
      h: 'Mekânsal organizasyon',
      p:
        'Etkinlik alanında çalışma masaları, mentor bölgeleri, malzeme ve sunum alanı; projeksiyon ve ses sistemleri jüri sunumları için ayrılır.',
    },
  ],
}

export const resourcesPage = {
  title: 'İndirilebilir kaynaklar',
  intro:
    'Aşağıdaki dosyalar yayınlandığında bu sayfadan indirilebilir. Şu an statik ön yüz aşamasında bağlantılar yer tutucudur.',
  assets: [
    { title: 'Yarışma şartnamesi', description: 'PDF', filename: 'yarisma-sartnamesi.pdf', available: false },
    { title: 'Teknik veri rehberi ve analiz paftaları', description: 'ZIP', filename: 'teknik-veri.zip', available: false },
    { title: 'Tasarım sorusu ve senaryo taslağı', description: 'PDF', filename: 'tasarim-sorusu.pdf', available: false },
    { title: 'Sunum şablonu', description: 'PPTX', filename: 'sunum-sablonu.pptx', available: false },
  ],
}

export const faqItems = [
  { q: 'Etkinlik katılımı ücretli midir?', a: 'Hayır, katılım tamamen ücretsizdir.' },
  {
    q: 'Kendi bilgisayarımı getirmeli miyim?',
    a: 'Evet, katılımcıların kendi donanımlarıyla gelmeleri beklenir. Masaüstü yazılım desteği (QGIS, SketchUp, Canva vb.) kısıtlı alanlarda sunulacaktır.',
  },
  {
    q: 'Yemek ve ulaşım organizasyonu nasıl olacak?',
    a: '5 Haziran saha gezisi ve 6 Haziran etkinlik günü iaşe (öğle/akşam yemeği ve ara ikramlar) organizasyon tarafından karşılanacaktır.',
  },
  {
    q: 'Hangi yazılımları kullanabiliriz?',
    a: 'QGIS, ArcGIS, SketchUp, AutoCAD, Figma, Canva ve Adobe serisi araçların kullanımı teşvik edilmektedir.',
  },
]

export type Announcement = {
  slug: string
  title: string
  dateIso: string
  summary: string
  body: string[]
}

/** Ana sayfadaki duyuru listesi: tüm kayıtlar; görünür alan yüksekliği `visibleRows` satıra göre. */
export const homeAnnouncementsConfig = {
  visibleRows: 3,
} as const

export const announcements: Announcement[] = [
  {
    slug: 'basvurular-acildi',
    title: 'Başvurular açıldı',
    dateIso: '2026-03-27',
    summary: 'Yayathon 2026 bireysel başvuruları açıldı. Takımlar organizasyon komitesi tarafından oluşturulacaktır.',
    body: [
      'Başvurular bireysel olarak alınır. Hazır takım başvuruları kabul edilmez.',
      'Katılımcı profilleri; disiplin çeşitliliği ve denge kriterleri gözetilerek 10×10 modeliyle hibrit takımlara dağıtılır.',
      'Başvuru adımlarını tamamladıktan sonra gönderim ekranında “Başvuruyu gönder” ile işlemi bitirebilirsiniz.',
    ],
  },
  {
    slug: 'saha-kesfi-programi-duyurusu',
    title: 'Saha keşfi programı duyurusu',
    dateIso: '2026-04-10',
    summary: '5 Haziran saha keşfi programının ana akışı ve buluşma noktaları duyuruldu.',
    body: [
      'Saha keşfi, İzmit kent merkezi odaklı tramvay turu ve rehberli yürüyüşleri kapsar.',
      'Katılımcıların rahat yürüyüş ayakkabısı ve hava koşullarına uygun ekipmanla gelmeleri önerilir.',
      'Detaylı program “Takvim” sayfasında güncellenecektir.',
    ],
  },
  {
    slug: 'sss-guncellemesi',
    title: 'SSS güncellemesi',
    dateIso: '2026-04-18',
    summary: 'Lojistik ve etkinlik kuralları hakkında yeni sorular eklendi, yanıtlar güncellendi.',
    body: [
      'Kendi bilgisayarınızı getirmeniz beklenir; sınırlı sayıda yazılım/donanım desteği sağlanabilir.',
      'Etkinlik günü iaşe organizasyon tarafından karşılanacaktır.',
      'Yeni sorular için “SSS” sayfasını ziyaret edebilirsiniz.',
    ],
  },
  {
    slug: 'mentor-takvimi',
    title: 'Mentor görüşme takvimi',
    dateIso: '2026-04-22',
    summary: 'Hackathon günü mentorluk slotları ve branş bazlı masa düzeni duyuruldu.',
    body: [
      'Mimarlık, ulaşım planlama ve yazılım mentorları için ayrı istişare alanları belirlendi.',
      'Slotlar, kayıt sonrası katılımcı panelinden görüntülenebilecek.',
    ],
  },
  {
    slug: 'kayit-hatirlatma',
    title: 'Son başvuru tarihi hatırlatması',
    dateIso: '2026-05-01',
    summary: 'Bireysel başvurular 25 Mayıs 2026 saat 23:59’a kadar alınmaya devam edecek.',
    body: [
      'Başvuru formunda zorunlu alanların tamamlandığından emin olun.',
      'Onay e-postası gönderiminde gecikme yaşanmaması için iletişim bilgilerinizi kontrol edin.',
    ],
  },
  {
    slug: 'veri-paketi-guncelleme',
    title: 'Teknik veri paketi güncellemesi',
    dateIso: '2026-05-08',
    summary: 'İzmit ve Darıca için güncel pafta özetleri ve yaya güvenliği istatistikleri pakete eklendi.',
    body: [
      'İndirilebilir kaynaklar sayfasından yeni sürüme erişebilirsiniz (yayınlandığında).',
      'Önceki çalışmalarınızı yeni katmanlarla uyumlu hale getirmeniz önerilir.',
    ],
  },
  {
    slug: 'ulasim-ve-otopark',
    title: 'Ulaşım ve otopark bilgisi',
    dateIso: '2026-05-12',
    summary: 'Luxor Garden Park Hotel çevresi toplu taşıma hatları ve misafir otopark yönlendirmesi paylaşıldı.',
    body: [
      'İzmit merkezden tramvay ve otobüs bağlantıları için özet harita eklendi.',
      'Etkinlik günü vale ve alternatif park alanları organizasyon tarafından iletilecek.',
    ],
  },
  {
    slug: 'sunum-formati',
    title: 'Jüri sunum formatı',
    dateIso: '2026-05-15',
    summary: '5 dakikalık sunumda beklenen başlıklar ve yedek materyal (poster / kısa video) kuralları netleştirildi.',
    body: [
      'Sunum şablonu indirilebilir kaynaklar bölümünde yer alacaktır.',
      'Teknik aksaklıklar için USB yedek ve PDF çıktı getirmeniz tavsiye edilir.',
    ],
  },
  {
    slug: 'saha-kesfi-uyarisi',
    title: 'Saha keşfi hava ve ekipman',
    dateIso: '2026-05-20',
    summary: '5 Haziran saha programı için hava durumuna uygun kıyafet ve rahat ayakkabı zorunluluğu hatırlatması.',
    body: [
      'Uzun süre ayakta ve yürüyüş içeren programda su ve şapka bulundurmanız önerilir.',
      'Özel sağlık durumunuzu kayıt sırasında bildirmeniz önemlidir.',
    ],
  },
]

export const contactPage = {
  title: 'İletişim ve destek',
  email: 'hackathon@kocaeli.bel.tr',
  channels: [
    { name: 'E-posta', detail: 'hackathon@kocaeli.bel.tr', href: 'mailto:hackathon@kocaeli.bel.tr' },
    { name: 'Discord', detail: 'Kanal bağlantısı yayınlandığında burada olacak.', href: null },
    { name: 'WhatsApp', detail: 'Destek hattı yayınlandığında burada olacak.', href: null },
  ],
}

/** Etkinlik yeri — harita embed + Google Haritalar yönlendirmesi */
export const contactVenue = {
  mapTitle: 'Hackathon maratonu konumu (Luxor Garden Hotel)',
  addressLine: 'Yahyakaptan, Kara Yolu Cd. No: 6, 41050 İzmit/Kocaeli',
  /** Google Maps Embed API `q` parametresi (.env: VITE_GOOGLE_MAPS_EMBED_KEY) */
  googleMapsPlaceQuery: 'Luxor Garden Hotel, Kara Yolu Cd. No: 6, 41050 İzmit, Kocaeli, Türkiye',
  /** Anahtar yokken yedek: OpenStreetMap embed */
  mapEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=29.963%2C40.773%2C29.980%2C40.782&layer=mapnik&marker=40.777592%2C29.97171',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Luxor+Garden+Hotel%2C+Kara+Yolu+Cd.+No%3A+6%2C+41050+%C4%B0zmit%2FKocaeli',
} as const
