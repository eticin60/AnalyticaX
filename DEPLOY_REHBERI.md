# 🚀 Backend Deployment Rehberi - ADIM ADIM

## ⚡ HIZLI DEPLOY (Railway - ÖNERİLEN)

### Adım 1: Railway'a Git
1. https://railway.app adresine git
2. "Start a New Project" butonuna tıkla
3. "Deploy from GitHub repo" seçeneğini seç
4. GitHub hesabını bağla
5. **`eticin60/AnalyticaX`** repo'sunu seç

### Adım 2: Backend'i Seç
1. Railway projeyi bulduktan sonra:
   - **Root Directory:** `backend` yaz
   - **Start Command:** `npm start` (otomatik gelecek)
   - **Build Command:** `npm install` (otomatik gelecek)

### Adım 3: Environment Variables Ekle
Railway dashboard'da **Variables** sekmesine git ve şunları ekle:

```
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
GEMINI_API_KEY=your-gemini-api-key
NODE_ENV=production
```

### Adım 4: Deploy Et
1. "Deploy" butonuna tıkla
2. Railway otomatik olarak deploy edecek
3. Deploy tamamlandığında bir URL alacaksın (örn: `https://analyticax-backend.railway.app`)

### Adım 5: Frontend'i Güncelle
Backend URL'ini aldıktan sonra, `frontend/js/api-config.js` dosyasını güncelle:

```javascript
window.API_BASE = isProduction 
  ? 'https://analyticax-backend.railway.app'  // Railway URL'in buraya
  : 'http://localhost:5000';
```

**VEYA** eğer backend'i `analyticax.com.tr/api` altında çalıştırmak istiyorsan (Nginx reverse proxy ile), o zaman frontend'i güncellemene gerek yok, sadece Nginx yapılandırması yap.

---

## 🌐 Nginx Reverse Proxy (Aynı Domain'de)

Eğer backend'i `analyticax.com.tr/api` altında çalıştırmak istiyorsan:

### 1. Backend'i VPS'te Çalıştır
```bash
cd /var/www/AnalyticaX/backend
npm install
pm2 start server.js --name analyticax-backend
pm2 save
```

### 2. Nginx Yapılandırması
`/etc/nginx/sites-available/analyticax.com.tr` dosyasını oluştur:

```nginx
server {
    listen 443 ssl http2;
    server_name analyticax.com.tr;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Frontend (GitHub Pages'den geliyor - zaten çalışıyor)
    # Frontend için bir şey yapmana gerek yok

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
    }
}
```

### 3. Nginx'i Yeniden Başlat
```bash
sudo nginx -t  # Test et
sudo systemctl reload nginx
```

---

## ✅ Kontrol Et

Backend deploy edildikten sonra:

1. **Backend çalışıyor mu?**
   - Railway: Railway dashboard'da "Deployments" sekmesinde "Active" görünmeli
   - VPS: `pm2 list` komutu ile kontrol et

2. **API endpoint'i çalışıyor mu?**
   - Tarayıcıda: `https://your-backend-url.com/api`
   - Yanıt: `{"ok":true,"message":"AnalyticaX backend running 🚀"}`

3. **Login çalışıyor mu?**
   - Frontend'de login sayfasına git
   - Browser console'u aç (F12)
   - Login yapmayı dene
   - Console'da hata var mı kontrol et

---

## 🐛 Sorun Giderme

### 404 Hatası
- Backend deploy edilmedi → Railway'da deploy butonuna bas
- Yanlış URL → `api-config.js` dosyasını kontrol et

### 405 Hatası
- Backend çalışmıyor → Railway loglarını kontrol et
- CORS hatası → Backend CORS ayarlarını kontrol et

### CORS Hatası
- Backend'de `analyticax.com.tr` CORS listesinde olmalı
- `backend/server.js` dosyasında CORS ayarlarını kontrol et

---

## 📞 Yardım

Sorun yaşıyorsan:
1. Railway loglarını kontrol et (Railway dashboard → Deployments → Logs)
2. Browser console'u kontrol et (F12)
3. Network tab'ında API isteklerini kontrol et

