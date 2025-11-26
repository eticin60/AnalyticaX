# 🔧 Railway Environment Variables Sorunu - Çözüm

## ❌ Sorun
```
❌ MONGO_URI environment variable is not set!
Available env vars: []
```

Bu, Railway'da variables'ların container'a geçmediği anlamına geliyor.

## ✅ Çözüm

### 1. Variables'ların Service Seviyesinde Olduğundan Emin Ol

Railway'da iki tür variable var:
- **Service Variables** (Service seviyesinde - DOĞRU)
- **Project Variables** (Project seviyesinde - YANLIŞ)

**Kontrol:**
1. Railway dashboard'da **service**'e tıkla (AnalyticaX)
2. **Variables** sekmesine git
3. Üstte **"Service Variables"** yazıyor mu kontrol et
4. Eğer **"Project Variables"** görüyorsan, yanlış yerde!

### 2. Variables'ları Service Seviyesinde Ekle

1. **Service**'e tıkla (AnalyticaX)
2. **Variables** sekmesine git
3. **"+ New Variable"** butonuna tıkla
4. Variables'ları ekle:
   - `MONGO_URI` = `mongodb+srv://analyticax-user:tdZGbFezHT7BvBm5@analyticax.lllypkt.mongodb.net/?appName=AnalyticaX`
   - `JWT_SECRET` = `AnalyticaX_UltraSecret_JWT_2025_K9p$Lm@93`
   - `GEMINI_API_KEY` = `AIzaSyCxuQFKnhKLnB7wmsyrn1HSWM66sMkVH7k`
   - `HOST` = `0.0.0.0`
   - `AUTO_OPEN` = `false`
   - `NODE_ENV` = `production`

### 3. Environment Kontrolü

Variables eklerken:
- **Environment:** `production` seçili olmalı
- Eğer `development` seçiliyse, `production`'a değiştir

### 4. Variables'ları Sil ve Yeniden Ekle

Eğer variables'lar yanlış yerdeyse:
1. Tüm variables'ları sil
2. Service seviyesinde yeniden ekle
3. **Environment:** `production` seç
4. **Save** tıkla

### 5. Redeploy

1. Variables'ları düzelttikten sonra
2. **Deployments** sekmesine git
3. **"Redeploy"** butonuna tıkla
4. Deploy loglarında şunu görmelisin: `✅ MongoDB Connected`

---

## 📋 Kontrol Listesi

- [ ] Variables'lar **Service** seviyesinde mi? (Project değil!)
- [ ] Variables'lar **production** environment'ında mı?
- [ ] Tüm 6 variable eklendi mi?
- [ ] Tırnak işaretleri yok mu?
- [ ] Redeploy yaptın mı?

---

## 🎯 Hızlı Test

Variables'ları düzelttikten sonra, deploy loglarında şunu görmelisin:

```
✅ MongoDB Connected
🔥 Server running on 0.0.0.0:8080
```

Eğer hala `❌ MONGO_URI environment variable is not set!` görüyorsan:
- Variables'ların service seviyesinde olduğundan emin ol
- Environment'ın `production` olduğundan emin ol
- Variables'ları sil ve yeniden ekle

---

**Variables'ları service seviyesinde ekle ve redeploy yap! 🚀**

