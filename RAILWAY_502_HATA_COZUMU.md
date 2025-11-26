# 🐛 Railway 502 Bad Gateway Hatası - Çözüm

## ❌ Sorun
Backend çalışmıyor, 502 hatası veriyor.

## 🔍 Kontrol Et

### 1. Railway Deploy Loglarını Kontrol Et
1. Railway dashboard'da **"Deployments"** sekmesine git
2. Son deployment'a tıkla
3. **"Logs"** sekmesine bak
4. Hata mesajını oku

**Olası hatalar:**
- MongoDB bağlantı hatası
- Port yanlış yapılandırılmış
- Environment variables eksik
- npm install hatası

### 2. Variables Kontrolü
**Settings** → **Variables** sekmesinde şunlar olmalı:
- ✅ `MONGO_URI` = MongoDB connection string
- ✅ `JWT_SECRET` = Secret key
- ✅ `GEMINI_API_KEY` = API key
- ✅ `HOST` = `0.0.0.0`
- ✅ `AUTO_OPEN` = `false`
- ✅ `NODE_ENV` = `production`

### 3. Port Kontrolü
Railway otomatik olarak PORT environment variable'ını ayarlar. Backend'in `process.env.PORT` kullanması gerekiyor.

### 4. Root Directory Kontrolü
**Settings** → **Source** bölümünde:
- **Root Directory** = `backend` olmalı

---

## 🔧 Çözüm Adımları

### Adım 1: Logları Kontrol Et
Railway'da **Deployments** → **Logs** sekmesine git ve hata mesajını oku.

### Adım 2: Yaygın Hatalar ve Çözümleri

**Hata: "Cannot find module"**
- Root Directory = `backend` olmalı
- Redeploy yap

**Hata: "MongoDB connection failed"**
- MONGO_URI'yi kontrol et
- MongoDB Atlas'ta IP whitelist'e Railway IP'lerini ekle (0.0.0.0/0)

**Hata: "Port already in use"**
- PORT variable'ını SİL (Railway otomatik ayarlar)

**Hata: "Application failed to start"**
- Logları kontrol et
- Genellikle environment variable eksikliği

### Adım 3: Redeploy
1. **Deployments** sekmesine git
2. **"Redeploy"** butonuna tıkla
3. Logları izle

---

## 📋 Kontrol Listesi

- [ ] Root Directory = `backend` ✅
- [ ] 6 variable eklendi ✅
- [ ] Deploy loglarında hata var mı? (Kontrol et)
- [ ] MongoDB bağlantısı çalışıyor mu? (Kontrol et)
- [ ] Port yanlış yapılandırılmış mı? (Kontrol et)

---

**Railway'da Deployments → Logs sekmesine git ve hata mesajını bana söyle! 🔍**

