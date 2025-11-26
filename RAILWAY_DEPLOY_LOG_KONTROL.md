# 🔍 Railway Deploy Log Kontrolü

## ✅ Build Başarılı
Build loglarında sorun yok, build tamamlanmış.

## ❌ Sorun: Deploy/Start Aşamasında

502 hatası alıyorsun, bu demek oluyor ki:
- Build başarılı ✅
- Ama backend başlatılamıyor ❌

## 🔍 Yapılacaklar

### 1. Deploy Logs Sekmesine Git
1. Railway'da **"Deploy Logs"** sekmesine tıkla (Build Logs değil!)
2. Deploy loglarını oku
3. Hata mesajını bul

**Olası hatalar:**
- `❌ MongoDB Error:` → MongoDB bağlantı hatası
- `Error: Cannot find module` → Root directory yanlış
- `Error: listen EADDRINUSE` → Port sorunu
- `Application failed to respond` → Backend başlamadı

### 2. MongoDB Bağlantı Kontrolü
Eğer MongoDB hatası görüyorsan:
1. MongoDB Atlas'a git
2. **Network Access** → **Add IP Address**
3. **`0.0.0.0/0`** ekle (tüm IP'lere izin ver)
4. **Confirm** tıkla
5. Railway'da **Redeploy** yap

### 3. Root Directory Kontrolü
**Settings** → **Source** bölümünde:
- **Root Directory** = `backend` olmalı
- Eğer yoksa veya yanlışsa, düzelt ve redeploy yap

### 4. Variables Kontrolü
**Variables** sekmesinde şunlar olmalı:
- ✅ `MONGO_URI` = MongoDB connection string
- ✅ `JWT_SECRET` = Secret key
- ✅ `GEMINI_API_KEY` = API key
- ✅ `HOST` = `0.0.0.0`
- ✅ `AUTO_OPEN` = `false`
- ✅ `NODE_ENV` = `production`

---

## 📋 Deploy Loglarında Arayacağın Mesajlar

**Başarılı:**
```
✅ MongoDB Connected
🔥 Server running on 0.0.0.0:XXXX
📡 API: http://0.0.0.0:XXXX/api
```

**Hata:**
```
❌ MongoDB Error: ...
Error: Cannot find module ...
Application failed to respond
```

---

**Deploy Logs sekmesine git ve hata mesajını bana söyle! 🔍**

