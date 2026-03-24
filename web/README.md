# Yayathon 2026 — Web ön yüzü

React (Vite) + TypeScript + Tailwind CSS v4. İçerik `src/content/` altında statiktir; başvuru gönderimi `src/lib/api.ts` içinde sahte yanıt döner — backend bağlandığında bu dosyada `fetch` ile değiştirin.

## Geliştirme

```bash
cd web
npm install
npm run dev
```

Tarayıcı: `http://localhost:5173/`

## Üretim derlemesi

```bash
npm run build
npm run preview
```

Çıktı: `dist/`. Üretim sunucusu (Docker/nginx/aaPanel) için kökteki `DEPLOY.md` dosyasına bakın.

## İçerik ve varlıklar

- Metinler: `src/content/siteContent.ts`, `src/content/formSchema.ts`
- İndirilebilir PDF/ZIP: `public/downloads/` — `resourcesPage.assets` içinde `available: true` yapın
- Görseller: `public/` (ör. galeri PNG’leri)
