# ✅ Railway Variable Ekleme - Doğru Adımlar

## 🎯 Şu Anda Yaptığın

Variables ekleme ekranındasın. Doğru yoldasın!

## ⚠️ Dikkat Et

### 1. AUTO_OPEN Variable'ı
- **Name:** `AUTO_OPEN` ✅
- **Value:** `false` ✅ (sadece `false` yaz, tırnak yok)
- **ÖNEMLİ:** Dropdown'daki `{{RAILWAY_...}}` variables'larını kullanma! Bunlar Railway'ın kendi variables'ları.
- Sadece değeri yaz: `false`

### 2. Diğer Variables'ları Ekle

Her variable için:
1. **"+ New Variable"** butonuna tıkla
2. **Name:** Variable adını yaz
3. **Value:** Değeri yaz (tırnak işaretleri OLMADAN)
4. **Add** tıkla

**Variables Listesi:**
- `MONGO_URI` = `mongodb+srv://analyticax-user:tdZGbFezHT7BvBm5@analyticax.lllypkt.mongodb.net/?appName=AnalyticaX`
- `JWT_SECRET` = `AnalyticaX_UltraSecret_JWT_2025_K9p$Lm@93`
- `GEMINI_API_KEY` = `AIzaSyCxuQFKnhKLnB7wmsyrn1HSWM66sMkVH7k`
- `HOST` = `0.0.0.0`
- `AUTO_OPEN` = `false`
- `NODE_ENV` = `production`

### 3. Dropdown'daki Variables'ları Kullanma

Dropdown'da görünen `{{RAILWAY_...}}` variables'ları Railway'ın kendi variables'ları. Bunları kullanma! Sadece değeri yaz.

---

## ✅ Doğru Yol

1. **Name:** `AUTO_OPEN`
2. **Value:** `false` (sadece bu, başka bir şey yok)
3. **Add** tıkla
4. Diğer variables'ları da aynı şekilde ekle

---

## 🚫 Yanlış Yol

- ❌ Value: `{{RAILWAY_ENVIRONMENT_ID}}` (YANLIŞ!)
- ❌ Value: `"false"` (tırnak işaretleri YANLIŞ!)
- ✅ Value: `false` (DOĞRU!)

---

**AUTO_OPEN için sadece `false` yaz ve Add tıkla! Sonra diğer variables'ları ekle. 🚀**

