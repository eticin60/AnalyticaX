# 📋 Railway Variables - TAM LİSTE (.env'den)

## ✅ Railway'da Olması Gereken Variables

`.env` dosyasındaki değerleri Railway'a ekle. **Tırnak işaretlerini KALDIR!**

### 1. MONGO_URI
```
mongodb+srv://analyticax-user:tdZGbFezHT7BvBm5@analyticax.lllypkt.mongodb.net/?appName=AnalyticaX
```
**Not:** Tırnak işaretlerini kaldır, sadece değeri kopyala.

### 2. JWT_SECRET
```
AnalyticaX_UltraSecret_JWT_2025_K9p$Lm@93
```
**Not:** Tırnak işaretlerini kaldır.

### 3. GEMINI_API_KEY
```
AIzaSyCxuQFKnhKLnB7wmsyrn1HSWM66sMkVH7k
```
**Not:** Tırnak işaretlerini kaldır.

### 4. HOST (YENİ EKLE)
```
0.0.0.0
```

### 5. AUTO_OPEN (YENİ EKLE)
```
false
```

### 6. NODE_ENV (YENİ EKLE)
```
production
```

---

## 🚫 EKLEMEYECEKLERİN

- ❌ `PORT` - Railway otomatik ayarlar, ekleme
- ❌ `OPENAI_API_KEY` - Backend'de kullanılmıyor
- ❌ `MODEL_NAME` - Backend'de kullanılmıyor

---

## 📝 Railway'da Ekleme Adımları

1. Railway dashboard'da **Variables** sekmesine git
2. Her variable için:
   - **"+ New Variable"** butonuna tıkla
   - **Name:** Variable adını yaz (örn: `MONGO_URI`)
   - **Value:** Değeri yaz (tırnak işaretleri OLMADAN)
   - **Add** tıkla

### Örnek:
- Name: `MONGO_URI`
- Value: `mongodb+srv://analyticax-user:tdZGbFezHT7BvBm5@analyticax.lllypkt.mongodb.net/?appName=AnalyticaX`
- **Add** tıkla

---

## ✅ KONTROL LİSTESİ

Railway'da şu 6 variable olmalı:

- [ ] `MONGO_URI` = `mongodb+srv://analyticax-user:tdZGbFezHT7BvBm5@analyticax.lllypkt.mongodb.net/?appName=AnalyticaX`
- [ ] `JWT_SECRET` = `AnalyticaX_UltraSecret_JWT_2025_K9p$Lm@93`
- [ ] `GEMINI_API_KEY` = `AIzaSyCxuQFKnhKLnB7wmsyrn1HSWM66sMkVH7k`
- [ ] `HOST` = `0.0.0.0`
- [ ] `AUTO_OPEN` = `false`
- [ ] `NODE_ENV` = `production`

---

## 🎯 ÖNEMLİ NOTLAR

1. **Tırnak işaretlerini kaldır:** `.env` dosyasında `"değer"` şeklinde yazılı ama Railway'da sadece `değer` yaz
2. **HOST mutlaka `0.0.0.0` olmalı:** Production'da backend tüm network interface'lerde dinlemeli
3. **NODE_ENV mutlaka `production` olmalı:** Backend production modunda çalışmalı

---

**Tüm variables'ları ekledikten sonra Deployments sekmesine git ve Redeploy yap! 🚀**

