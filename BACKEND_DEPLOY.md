# 🚀 Backend Production Deployment Rehberi

## ⚠️ ÖNEMLİ: Backend Production'da Çalışmalı

GitHub Pages sadece **static dosyaları** serve eder. Backend Node.js uygulaması ayrı bir sunucuda çalışmalıdır.

## 📋 Backend Deployment Seçenekleri

### Seçenek 1: VPS/Cloud Server (Önerilen)

**Gereksinimler:**
- Ubuntu/Debian VPS
- Node.js 18+
- MongoDB (Atlas veya local)
- PM2 (process manager)

**Kurulum Adımları:**

1. **Sunucuya bağlan:**
```bash
ssh user@your-server.com
```

2. **Node.js kur:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **PM2 kur:**
```bash
sudo npm install -g pm2
```

4. **Projeyi klonla:**
```bash
cd /var/www
git clone https://github.com/eticin60/AnalyticaX.git
cd AnalyticaX/backend
```

5. **Dependencies kur:**
```bash
npm install
```

6. **.env dosyası oluştur:**
```bash
nano .env
```

İçeriği:
```env
PORT=5000
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
GEMINI_API_KEY=your-gemini-api-key
```

7. **PM2 ile başlat:**
```bash
pm2 start server.js --name analyticax-backend
pm2 save
pm2 startup
```

8. **Nginx yapılandırması:**
```nginx
server {
    listen 80;
    server_name analyticax.com.tr;

    # Frontend (GitHub Pages'den geliyor)
    location / {
        # Frontend zaten GitHub Pages'de
        return 301 https://$host$request_uri;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Seçenek 2: Railway / Render / Heroku

1. **Railway:**
   - Railway.app'e git
   - New Project → Deploy from GitHub
   - Backend klasörünü seç
   - Environment variables ekle
   - Deploy

2. **Render:**
   - render.com'a git
   - New Web Service
   - GitHub repo'yu bağla
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment variables ekle

### Seçenek 3: DigitalOcean App Platform

1. DigitalOcean'a git
2. Create App → GitHub repo seç
3. Backend klasörünü seç
4. Environment variables ekle
5. Deploy

## 🔧 Nginx Reverse Proxy Yapılandırması

Eğer kendi sunucunuzda çalıştırıyorsanız, Nginx yapılandırması:

```nginx
server {
    listen 443 ssl http2;
    server_name analyticax.com.tr;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Frontend static files (GitHub Pages)
    location / {
        # GitHub Pages'den geliyor, buraya gerek yok
        # Ama eğer kendi sunucunuzda serve ediyorsanız:
        root /var/www/analyticax/frontend;
        try_files $uri $uri/ /index.html;
    }

    # Backend API - ÇOK ÖNEMLİ!
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # CORS headers (backend'de de var ama ekstra güvenlik)
        add_header Access-Control-Allow-Origin $http_origin always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type, Authorization, x-device-id, x-device-fingerprint" always;
        add_header Access-Control-Allow-Credentials "true" always;
        
        # OPTIONS preflight
        if ($request_method = OPTIONS) {
            return 204;
        }
    }
}
```

## ✅ Kontrol Listesi

Backend production'da çalışıyor mu kontrol edin:

1. **Backend çalışıyor mu?**
   ```bash
   pm2 list
   # veya
   curl http://localhost:5000/api
   ```

2. **API endpoint'i çalışıyor mu?**
   - Tarayıcıda: `https://analyticax.com.tr/api`
   - Yanıt: `{"ok":true,"message":"AnalyticaX backend running 🚀"}`

3. **Login endpoint'i çalışıyor mu?**
   - Browser console'da: `POST https://analyticax.com.tr/api/auth/login`
   - 200 veya 401 dönmeli (405 değil!)

## 🐛 Sorun Giderme

**404 hatası:**
- Backend çalışmıyor → PM2 ile başlatın
- Nginx yapılandırması yanlış → `/api` location'ını kontrol edin

**405 hatası:**
- Nginx POST isteklerini bloke ediyor → Proxy yapılandırmasını kontrol edin
- Backend route'ları yanlış → Backend loglarını kontrol edin

**CORS hatası:**
- Backend CORS ayarlarını kontrol edin
- Nginx CORS headers ekleyin

## 📞 Destek

Backend deployment için yardıma ihtiyacınız varsa:
- Backend'in nerede çalıştığını belirtin (VPS, Railway, Render, vs.)
- Hata mesajlarını paylaşın
- Nginx yapılandırmanızı kontrol edin

