# Yayathon web — deploy rehberi

Uygulama `web/` içinde; üretim çıktısı `web/dist`.

---

## aaPanel + CentOS + Docker (ana senaryo)

Özet: Site **Docker** içinde çalışır (port **8083**). aaPanel’deki **nginx**, domain isteklerini bu porta **proxy** ile yollar.

## 1. Temizlik ve Yeniden Kurulum (Fresh Install)

Eğer mevcut dosyaları tamamen silip sıfırdan kurmak isterseniz (DİKKAT: Tüm veriler silinir):

```bash
# Bulunduğunuz klasördeki her şeyi siler (Gizli dosyalar .git dahil)
rm -rf ./* ./.*
```

## 2. Projeyi Klonlama

```bash
git clone https://github.com/keremzytn/yayathonKocaeli.git .
### Adım 1 — Projeyi sunucuya al

```bash
cd /path/to
git clone <repo-url> yayathonKocaeli
cd yayathonKocaeli
```

### Adım 2 — Docker’ı çalıştır

```bash
docker compose up --build -d
```

Kontrol:

```bash
curl -I http://127.0.0.1:8083/
```

**200 OK** görmelisin. Görmüyorsan önce bunu düzelt (port çakışması için `WEB_PORT=8084` vb. kullanılabilir, `docker-compose.yml`).

### Adım 3 — aaPanel nginx’e proxy dosyası ekle

Panel, site için şunu zaten include eder:

`/www/server/panel/vhost/nginx/extension/carmedlegal.com/*.conf`

Bu klasörde **yeni dosya** oluştur (örnek ad: `docker_proxy.conf`):

```bash
nano /www/server/panel/vhost/nginx/extension/carmedlegal.com/docker_proxy.conf
```

İçeriği repodaki dosyadan kopyala veya şunu yapıştır:

```nginx
location ^~ / {
    proxy_pass http://127.0.0.1:8083;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

**Not:** Domain klasörü `carmedlegal.com` değilse yolu kendi sitene göre değiştir (`extension/alanadiniz.com/`).

### Adım 4 — Nginx’i yeniden yükle

```bash
nginx -t && nginx -s reload
```

### Adım 5 — Domain test

```bash
curl -I https://carmedlegal.com/
```

Hâlâ **403** ise:

1. CentOS SELinux: `setsebool -P httpd_can_network_connect 1` sonra tekrar dene.
2. Ana vhost’taki **`location ~ .*\.(js|css)?$`** ve büyük resim `location ~` bloklarını panelden yorum satırı yap (istekler diske gitmesin).
3. `tail -n 30 /www/wwwlogs/carmedlegal.com.error.log` ile hatayı oku.

Hazır snippet: [`deploy/aaPanel-carmedlegal-proxy.conf`](deploy/aaPanel-carmedlegal-proxy.conf)

---

## Docker komutları (özet)

| Ne | Komut |
|----|--------|
| Çalıştır | `docker compose up --build -d` |
| Durdur | `docker compose down` |
| Port değiştir | `WEB_PORT=8084 docker compose up -d` veya `.env` içinde `WEB_PORT=8083` |

Port meşgulse: `WEB_PORT=8084` gibi ver.

---

## Yerelde build kontrolü

```bash
cd web
npm ci
npm run build
npm run preview
```
