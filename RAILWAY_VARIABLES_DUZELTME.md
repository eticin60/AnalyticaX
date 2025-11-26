# 🔧 Railway Variables Düzeltme Rehberi

## ✅ Doğru Variables Ayarları

Ekranda gördüğün variables'larda şu düzeltmeleri yap:

### ❌ YANLIŞ → ✅ DOĞRU

1. **HOST:**
   - ❌ Şu an: `5000` (YANLIŞ! Bu PORT değeri)
   - ✅ Olması gereken: `0.0.0.0`
   - **Neden?** Production'da backend tüm network interface'lerde dinlemeli

2. **AUTO_OPEN:**
   - ❌ Şu an: `VALUE or ${{REF}}` (YANLIŞ!)
   - ✅ Olması gereken: `false`
   - **Neden?** Production'da tarayıcı otomatik açılmamalı

3. **PORT:**
   - ❌ Eklemeye gerek YOK (Railway otomatik ayarlar)
   - Railway otomatik olarak PORT'u ayarlar, sen ekleme

4. **NODE_ENV:**
   - ❌ Eksik!
   - ✅ Eklenmeli: `production`

---

## 📋 TÜM VARIABLES LİSTESİ (Doğru Değerlerle)

Railway'da şu variables'lar olmalı:

| Variable | Değer | Açıklama |
|----------|-------|----------|
| `MONGO_URI` | `mongodb+srv://...` | MongoDB connection string (zaten var ✅) |
| `JWT_SECRET` | `${{ AnalyticaX_UltraSecret_JWT_2025_K9p$Lm@93() }}` | JWT secret key (zaten var ✅) |
| `GEMINI_API_KEY` | `AlzaSyCxuQFKnhKLnB7wmsyrnlHSWM66sMkVH7k` | Gemini API key (zaten var ✅) |
| `HOST` | `0.0.0.0` | **DÜZELT!** Şu an `5000` yazıyor, `0.0.0.0` olmalı |
| `AUTO_OPEN` | `false` | **DÜZELT!** Şu an yanlış değer var |
| `NODE_ENV` | `production` | **EKLE!** Eksik |

---

## 🔧 DÜZELTME ADIMLARI

### 1. HOST'u Düzelt
1. Variables sekmesinde `HOST` değişkenini bul
2. Üzerine tıkla (edit ikonu)
3. Value'yu sil
4. **`0.0.0.0`** yaz
5. **Save** tıkla

### 2. AUTO_OPEN'u Düzelt
1. Variables sekmesinde `AUTO_OPEN` değişkenini bul
2. Üzerine tıkla (edit ikonu)
3. Value'yu sil
4. **`false`** yaz
5. **Save** tıkla

### 3. NODE_ENV Ekle
1. Variables sekmesinde **"+ New Variable"** butonuna tıkla
2. Name: **`NODE_ENV`**
3. Value: **`production`**
4. **Add** tıkla

---

## ✅ KONTROL LİSTESİ

Tüm variables'ları düzelttikten sonra:

- [ ] HOST = `0.0.0.0` ✅
- [ ] AUTO_OPEN = `false` ✅
- [ ] NODE_ENV = `production` ✅
- [ ] MONGO_URI = MongoDB connection string ✅
- [ ] JWT_SECRET = Secret key ✅
- [ ] GEMINI_API_KEY = API key ✅

---

## 🚀 SONRAKİ ADIM

Variables'ları düzelttikten sonra:
1. **Deployments** sekmesine git
2. **Redeploy** butonuna tıkla (veya otomatik deploy olacak)
3. Deploy tamamlandığında backend URL'ini al
4. Bana backend URL'ini söyle, frontend'i güncelleyeyim!

