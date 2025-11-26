# 🔍 Railway'da Root Directory Nasıl Bulunur?

## Railway'da Root Directory Ayarları

Railway'ın arayüzü zaman zaman değişiyor. Root directory ayarını bulmak için şu yerleri kontrol et:

## 📍 Yer 1: Service Settings

1. Railway dashboard'da projeni aç
2. Sol tarafta **service**'e tıkla (genellikle repo adıyla aynı)
3. Üstteki **"Settings"** sekmesine tıkla
4. Aşağı kaydır, şu bölümleri ara:
   - **"Source"** bölümü
   - **"Build"** bölümü
   - **"Deploy"** bölümü
5. **"Root Directory"** veya **"Working Directory"** alanını bul
6. **`backend`** yaz ve **"Save"** tıkla

## 📍 Yer 2: Proje Settings

1. Railway dashboard'da projeni aç
2. Sol üstte proje adının yanındaki **⚙️ Settings** ikonuna tıkla
3. **"Source"** veya **"Build"** sekmesine git
4. **"Root Directory"** alanını bul
5. **`backend`** yaz ve **"Save"** tıkla

## 📍 Yer 3: Service Oluştururken

1. Proje içinde **"+ New"** butonuna tıkla
2. **"GitHub Repo"** seçeneğini seç
3. **"AnalyticaX"** repo'sunu seç
4. **"Root Directory"** alanına **`backend`** yaz
5. **"Deploy"** butonuna tıkla

## 📍 Yer 4: Deploy Ayarları

1. Service'e tıkla
2. **"Deployments"** sekmesine git
3. Son deployment'a tıkla
4. **"Settings"** veya **"Configure"** butonuna tıkla
5. **"Root Directory"** alanını bul
6. **`backend`** yaz

## 🎯 Alternatif: Railway.json Dosyası

Eğer root directory ayarını bulamazsan, Railway otomatik olarak `backend/railway.json` dosyasını okuyacak. Bu dosya zaten hazır ve GitHub'da. Railway bu dosyayı görünce otomatik olarak `backend` klasörünü kullanacak.

## ✅ Kontrol Et

Root directory ayarlandıktan sonra:
1. **"Deployments"** sekmesine git
2. Yeni bir deploy başlat (Redeploy)
3. Logları kontrol et
4. Eğer loglarda `backend` klasörü görünüyorsa, başarılı! ✅

## 🆘 Hala Bulamıyorsan

1. Railway'ın yeni arayüzünde olabilir
2. Ekran görüntüsü al ve bana gönder
3. Veya şunu dene: Service'e tıkla → **"Variables"** sekmesine git → Orada **"Root Directory"** olabilir

---

**ÖNEMLİ:** Root directory ayarı olmadan da çalışabilir, ama Railway tüm repo'yu deploy etmeye çalışır ve hata verebilir. Bu yüzden mutlaka **`backend`** yazmalısın.

