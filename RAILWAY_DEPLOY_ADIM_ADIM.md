# 🚀 Railway'a Backend Deploy - ADIM ADIM (ÜCRETSİZ)

## ⚡ 5 DAKİKADA BACKEND'İ CANLIYA AL

### ✅ Adım 1: Railway Hesabı Oluştur
1. https://railway.app adresine git
2. Sağ üstte **"Login"** butonuna tıkla
3. **"Login with GitHub"** seçeneğini seç
4. GitHub hesabınla giriş yap
5. Railway'a erişim izni ver

### ✅ Adım 2: Yeni Proje Oluştur
1. Railway dashboard'da **"New Project"** butonuna tıkla
2. **"Deploy from GitHub repo"** seçeneğini seç
3. GitHub repo listesinden **"AnalyticaX"** repo'sunu bul ve seç
4. **"Deploy Now"** butonuna tıkla

### ✅ Adım 3: Backend Klasörünü Seç (ÖNEMLİ!)

Railway'da root directory ayarı farklı yerlerde olabilir. Şu yöntemleri dene:

**Yöntem 1: Service Settings'ten**
1. Railway projeyi deploy etmeye başladıktan sonra
2. Sol tarafta oluşan **service**'e (genellikle repo adıyla aynı) tıkla
3. Üstteki **"Settings"** sekmesine tıkla
4. Aşağı kaydır, **"Source"** veya **"Build"** bölümünü bul
5. **"Root Directory"** veya **"Working Directory"** alanını bul
6. **`backend`** yaz
7. **"Save"** butonuna tıkla

**Yöntem 2: Service Oluştururken**
1. Eğer henüz service oluşturmadıysan:
   - Proje içinde **"+ New"** butonuna tıkla
   - **"GitHub Repo"** seçeneğini seç
   - **"AnalyticaX"** repo'sunu seç
   - **"Root Directory"** alanına **`backend`** yaz
   - **"Deploy"** butonuna tıkla

**Yöntem 3: Settings → Source**
1. Sol tarafta **"Settings"** sekmesine tıkla (proje seviyesinde)
2. **"Source"** bölümünü bul
3. **"Root Directory"** alanına **`backend`** yaz
4. **"Save"** butonuna tıkla

**Yöntem 4: Eğer hiçbirini bulamazsan:**
- Railway otomatik olarak `package.json` dosyasını arar
- `backend` klasöründe `package.json` olduğu için otomatik bulabilir
- Ama yine de **Settings** → **"Source"** veya **"Build"** bölümünde **Root Directory** alanına **`backend`** yazmayı dene

### ✅ Adım 4: Environment Variables Ekle
1. Sol tarafta **"Variables"** sekmesine tıkla
2. **"New Variable"** butonuna tıkla
3. Şu değişkenleri tek tek ekle:

   **Variable 1:**
   - Name: `MONGO_URI`
   - Value: MongoDB connection string'in (MongoDB Atlas'tan al)
   - **Add** butonuna tıkla

   **Variable 2:**
   - Name: `JWT_SECRET`
   - Value: En az 32 karakterlik bir secret key (rastgele string)
   - **Add** butonuna tıkla

   **Variable 3:**
   - Name: `GEMINI_API_KEY`
   - Value: Google Gemini API key'in
   - **Add** butonuna tıkla

   **Variable 4:**
   - Name: `NODE_ENV`
   - Value: `production`
   - **Add** butonuna tıkla

### ✅ Adım 5: Deploy'i Başlat
1. Sol tarafta **"Deployments"** sekmesine tıkla
2. Eğer otomatik deploy başlamadıysa, **"Redeploy"** butonuna tıkla
3. Deploy işlemi 2-3 dakika sürecek
4. Deploy tamamlandığında yeşil tik işareti görünecek ✅

### ✅ Adım 6: Backend URL'ini Al
1. Sol tarafta **"Settings"** sekmesine tıkla
2. Aşağı kaydır, **"Domains"** bölümünü bul
3. **"Generate Domain"** butonuna tıkla
4. Railway sana bir URL verecek (örn: `analyticax-backend-production.up.railway.app`)
5. Bu URL'i kopyala! 📋

### ✅ Adım 7: Frontend'i Güncelle (Ben yapacağım)
Backend URL'ini aldıktan sonra bana söyle, ben frontend'deki `api-config.js` dosyasını güncelleyeceğim.

---

## 🎯 ÖNEMLİ NOTLAR

- **Railway ücretsiz plan:** Ayda 500 saat ücretsiz (yeterli)
- **MongoDB:** MongoDB Atlas'ta ücretsiz cluster oluşturabilirsin
- **Domain:** Railway otomatik bir domain verir (ücretsiz)
- **SSL:** Railway otomatik SSL sertifikası verir (ücretsiz)

---

## 🐛 SORUN GİDERME

**Deploy başarısız olursa:**
1. **"Deployments"** sekmesine git
2. Son deployment'a tıkla
3. **"Logs"** sekmesine bak
4. Hata mesajını oku ve düzelt

**Environment variables eksikse:**
- Tüm 4 değişkeni eklediğinden emin ol
- Değişken isimlerinin büyük/küçük harflerine dikkat et

**Backend çalışmıyorsa:**
- Railway dashboard'da **"Deployments"** → **"Logs"** sekmesine bak
- Hata mesajlarını kontrol et

---

## ✅ KONTROL LİSTESİ

- [ ] Railway hesabı oluşturuldu
- [ ] GitHub repo bağlandı
- [ ] Root Directory: `backend` ayarlandı
- [ ] 4 environment variable eklendi (MONGO_URI, JWT_SECRET, GEMINI_API_KEY, NODE_ENV)
- [ ] Deploy başarılı oldu
- [ ] Backend URL'i alındı
- [ ] Frontend güncellendi (ben yapacağım)

---

**Backend URL'ini aldıktan sonra bana söyle, frontend'i güncelleyeyim! 🚀**

