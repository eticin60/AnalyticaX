# 🚀 AnalyticaX'i Başlatma Rehberi

## Yöntem 1: VS Code'dan Tek Tıkla Başlat (ÖNERİLEN) ⭐

1. **VS Code'da projeyi aç**
2. **F5** tuşuna bas VEYA
3. Sol üstteki **▶️ Run and Debug** butonuna tıkla
4. **"🚀 Start AnalyticaX (Port 5000)"** seçeneğini seç
5. Otomatik olarak backend başlar ve tarayıcıda `http://localhost:5000` açılır!

## Yöntem 2: VS Code Tasks (Ctrl+Shift+P)

1. **Ctrl+Shift+P** tuşlarına bas
2. **"Tasks: Run Task"** yaz
3. **"🚀 Start AnalyticaX Server"** seçeneğini seç
4. Backend başlar!

## Yöntem 3: start.bat Dosyasını Çalıştır (Windows)

### Seçenek A: Çift Tıklama
1. Windows Explorer'da `start.bat` dosyasını bul
2. **Çift tıkla** (double-click)
3. Otomatik olarak backend başlar!

### Seçenek B: VS Code'dan
1. VS Code'da `start.bat` dosyasına sağ tıkla
2. **"Run in Terminal"** seç
3. Backend başlar!

## Yöntem 4: Terminal'den Manuel

```bash
cd backend
npm install
npm start
```

## 🌐 Tarayıcıda Aç

Backend başladıktan sonra:

1. Otomatik: VS Code launch ile otomatik açılır
2. Manuel: Tarayıcıda şu adresi aç:
   ```
   http://localhost:5000
   ```

## ✅ Kontrol Et

Backend çalışıyor mu kontrol et:
- Terminal'de şunu görmelisin: `🔥 Server running on port 5000`
- Tarayıcıda `http://localhost:5000/api` adresine git
- `{"ok":true,"message":"AnalyticaX backend running 🚀"}` mesajını görmelisin

## ⚠️ Sorun Giderme

**Port 5000 kullanımda:**
- Başka bir program 5000 portunu kullanıyor olabilir
- Terminal'de `netstat -ano | findstr :5000` komutu ile kontrol et
- Veya `.env` dosyasında `PORT=5001` gibi farklı bir port belirle

**MongoDB hatası:**
- MongoDB'nin çalıştığından emin ol
- `.env` dosyasında `MONGO_URI` doğru mu kontrol et

**npm install hatası:**
- Node.js yüklü mü kontrol et: `node --version`
- `cd backend` yapıp tekrar `npm install` dene

## 🎯 Hızlı Başlangıç

1. VS Code'da projeyi aç
2. **F5** tuşuna bas
3. Tarayıcıda `http://localhost:5000` açılır
4. Hazırsın! 🎉




