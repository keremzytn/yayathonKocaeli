# Yayathon web — deploy rehberi

Statik React (Vite) uygulaması `web/` klasöründe. Üretim çıktısı `web/dist`.

## 1. Docker ile (önerilen test / sunucu)

Proje kökünde:

```bash
docker compose up --build -d
```

- Site: **http://localhost:8080** (router hash kullandığı için örnek: `http://localhost:8080/#/`)

Durdurmak:

```bash
docker compose down
```

Sadece imaj derleyip elle çalıştırmak:

```bash
docker build -f web/Dockerfile -t yayathon-web ./web
docker run --rm -p 8080:80 yayathon-web
```

## 2. Netlify / statik hosting

Repo kökünde `web/netlify.toml` var. Netlify’da:

- **Base directory:** `web`
- **Build command:** `npm run build`
- **Publish directory:** `web/dist`

## 3. Domain (ör. carmedlegal.com)

Docker konteyneri **80** portunda HTTP sunar. Gerçek domain için:

1. Sunucuda reverse proxy (nginx, Caddy, Traefik) veya load balancer ile **HTTPS** açın.
2. `carmedlegal.com` isteğini konteynerin `80` portuna yönlendirin.

TLS sertifikası için genelde Let’s Encrypt (Caddy/Traefik otomatik yapar) kullanılır.

## 4. Yerelde sadece build kontrolü

```bash
cd web
npm ci
npm run build
npm run preview   # önizleme: genelde http://localhost:4173
```
