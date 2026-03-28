# Yayathon web — mimari, tasarım ve UX iyileştirme planı

Bu belge `web/` (Vite + React 19 + React Router 7 + Tailwind 4) kod tabanına dayanır. Hedef: eksikleri önceliklendirilmiş, uygulanabilir iş kalemlerine çevirmek.

---

## 1. Mimari ve teknik borç

| Konu | Durum | Öneri |
|------|--------|--------|
| **Üretim URL / SEO temeli** | `siteContent.ts` içinde `siteMeta.url` şu an `carmedlegal.com` — canonical, paylaşım ve olası `sitemap` için yanlış. | Gerçek yayın domain’i ile güncelle; `index.html` OG etiketlerini sayfa bazlı tamamlamak için tek kaynak haline getir. |
| **404 ve yönlendirme** | Router’da `*` veya bilinmeyen path için sayfa yok. | `createBrowserRouter` içine catch-all route + kullanıcı dilinde kısa 404 sayfası; mümkünse ana sayfa / SSS linkleri. |
| **Hata sınırı** | React `ErrorBoundary` yok; beklenmeyen render hatası beyaz ekrana düşer. | Kök veya layout seviyesinde `errorElement` (Router) veya sınıf bileşeni ile sınırlı kapsam + yeniden dene / ana sayfaya dön. |
| **Form / API** | `lib/api.ts` başvuru ve iletişim için sahte yanıt — bilinçli; üretim öncesi netleştirilmeli. | OpenAPI veya endpoint sözleşmesi; hata kodları; yükleme (multipart) stratejisi; kullanıcıya gerçek başarı/hata mesajları. Rate limit ve spam koruması notu. |
| **Ortam değişkenleri** | Harita: `VITE_GOOGLE_MAPS_EMBED_KEY` opsiyonel. | `.env.example` ile dokümante et; CI/build’de eksik anahtarın davranışını teyit et. |
| **Test ve kalite** | Otomatik test yok. | En azından vitest + React Testing Library ile kritik akışlar (ör. form validasyonu, router 404); `lint` CI’da zorunlu. |
| **Performans (isteğe bağlı)** | Tüm sayfalar tek bundle’da yüklenir olabilir. | `React.lazy` + `Suspense` ile sayfa bazlı kod bölme; debey üzerinde ölç. |
| **Erişilebilirlik altyapısı** | Kısmi iyi (nav `aria-label`, carousel klavye). | Tutarlı odak sırası, form hatalarında `aria-describedby` / `aria-invalid`, başarı mesajlarında `role="status"` veya `aria-live`. |

---

## 2. Tasarım ve kullanıcı deneyimi

| Konu | Durum | Öneri |
|------|--------|--------|
| **Üst menü keşfedilebilirlik** | Header’da yalnızca Anasayfa, Yayathon 2026, Duyurular. Başvuru / SSS / İletişim doğrudan görünmüyor. | “Daha fazla” açılır menü, ikincil nav şeridi veya mobilde olduğu gibi dar ekranda önemli CTA’ları (Başvuru) header’da tut. |
| **Duyurular sayfası düzeni** | `YayathonLayout` duyurularda sidebar’ı gizliyor; diğer iç sayfalarla tutarsız. | Aynı sidebar’ı daraltılmış / üstte yatay “sekme” olarak sun veya duyurulara mini içindekiler ekle. |
| **Mobil iç sayfa** | Sidebar üstte yığılıyor; uzun liste önce gelince içerik aşağı kayar. | “İçeriğe atla” linki (`SkipLink`) veya sidebar’ı collapse / drawer yap. |
| **Modal (`Modal.tsx`)** | Escape ile kapanıyor; odak tuzağı ve ilk odak içeriğe taşınmıyor. | Radix Dialog veya `focus-trap-react` benzeri ile odak yönetimi; arka plan scroll kilidi. |
| **Yüklenme ve geri bildirim** | Route geçişlerinde global yükleme göstergesi yok (lazy ile birlikte düşünün). | İsteğe bağlı üst ince progress çubuğu veya Suspense fallback. |
| **Marka tutarlılığı** | `accent` yeşil + mavi odak; genel olarak tutarlı. | Eksik sayfalarda (uzun metin) satır uzunluğu / okuma genişliği denetimi (`prose` veya `max-w-prose`). |

---

## 3. İçerik ve güven

- **Yasal / kurumsal:** Gerekirse KVKK kısa metni, çerez bilgisi, başvuru verilerinin işlenmesi için link (footer’da).
- **Duyuru detayı:** URL’de `?duyuru=` ile derin bağlantı iyi; paylaşım için OG başlığı sayfa özelinde üretilemiyor (SPA sınırı — SSR veya prerender değerlendirmesi uzun vadede).

---

## 4. Öncelik sırası (öneri)

**P0 — hızlı, düşük risk**

1. `siteMeta.url` ve statik OG/domain’in doğrulanması.  
2. 404 route.  
3. `Modal` odak iyileştirmesi (erişilebilirlik).

**P1 — kullanıcı yolu**

4. Header’da Başvuru (ve isteğe bağlı SSS/İletişim) görünürlüğü.  
5. Duyurular + sidebar / alternatif gezinme tutarlılığı.  
6. Form alanlarında `aria-*` ve ekran okuyucu uyumu.

**P2 — operasyon**

7. Error boundary + router `errorElement`.  
8. Backend entegrasyonu ve `.env.example`.  
9. Test altyapısı ve sayfa lazy yükleme.

---

## 5. Tamamlama ölçütleri (kısa)

- Tüm bilinmeyen URL’ler anlamlı 404 döner.  
- Lighthouse Erişilebilirlik: modal ve formlarda kritik uyarı yok (hedef: sürekli iyileştirme).  
- Canlı sitede paylaşılan bağlantılarda doğru başlık açıklaması ve domain.  
- Başvuru/iletişim üretimde ya gerçek API’ye bağlı ya da “bakım modu” net mesajı verir.

---

*Son güncelleme: kod incelemesi ile oluşturulmuştur; öncelikler ürün ve yayın tarihine göre ayarlanabilir.*
