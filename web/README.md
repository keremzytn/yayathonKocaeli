# Yayathon 2026 — Web ön yüzü

React (Vite) + TypeScript + Tailwind CSS v4. İçerik `src/content/` altında statiktir; başvuru gönderimi `src/lib/api.ts` içinde sahte yanıt döner — backend bağlandığında bu dosyada `fetch` ile değiştirin.

## Geliştirme

```bash
cd web
npm install
npm run dev
```

Tarayıcı: `http://localhost:5173/#/` (hash router, Netlify’daki mevcut bağlantı stiline uyumlu).

## Üretim derlemesi

```bash
npm run build
npm run preview
```

Çıktı: `dist/`.

## Netlify

- **Base directory:** `web` (repo kökünden deploy ediyorsanız)
- **Build command:** `npm run build`
- **Publish directory:** `web/dist`

Proje kökündeki `web/netlify.toml` aynı komutları kullanır; panelde base `web` seçilirse `publish` de `dist` olarak kalır.

## İçerik ve varlıklar

- Metinler: `src/content/siteContent.ts`, `src/content/formSchema.ts`
- İndirilebilir PDF/ZIP: `public/downloads/` — `resourcesPage.assets` içinde `available: true` yapın
- Görseller: `public/` (ör. galeri PNG’leri)
