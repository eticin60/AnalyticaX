# 🚀 GitHub'a Yükleme Rehberi

## Adım 1: GitHub'da Repository Oluştur

1. GitHub'a git: https://github.com
2. Sağ üstte **"+"** → **"New repository"** tıkla
3. Repository adı: `AnalyticaX` (veya istediğin isim)
4. **Public** veya **Private** seç
5. **"Create repository"** tıkla

## Adım 2: Git'i Başlat ve Yükle

Terminal'de proje klasöründe şu komutları çalıştır:

```bash
# Git'i başlat (eğer daha önce başlatmadıysan)
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit: AnalyticaX AI Chart Analysis Platform"

# GitHub repository URL'ini ekle (YOUR_USERNAME yerine kendi GitHub kullanıcı adını yaz)
git remote add origin https://github.com/YOUR_USERNAME/AnalyticaX.git

# Ana branch'i main olarak ayarla
git branch -M main

# GitHub'a yükle
git push -u origin main
```

## Adım 3: .env Dosyasını Ekleme

⚠️ **ÖNEMLİ**: `.env` dosyası `.gitignore`'da olduğu için GitHub'a yüklenmez (güvenlik için).

Kullanıcılar kendi `.env` dosyalarını oluşturmalı. README.md'de talimatlar var.

## Adım 4: GitHub Pages (Opsiyonel)

Eğer frontend'i GitHub Pages'de host etmek istersen:

1. GitHub repository'de **Settings** → **Pages**
2. Source: **main branch** / **/frontend** seç
3. Save

⚠️ **Not**: Backend API'ler çalışmayacak çünkü GitHub Pages sadece static dosyalar serve eder.

## Adım 5: Sonraki Güncellemeler

Kod değişikliklerinden sonra:

```bash
git add .
git commit -m "Açıklayıcı commit mesajı"
git push
```

## 🔐 Güvenlik Notları

- ✅ `.env` dosyası `.gitignore`'da
- ✅ `node_modules` yüklenmiyor
- ✅ Sensitive bilgiler GitHub'a gitmiyor

## 📋 Checklist

- [ ] GitHub'da repository oluşturuldu
- [ ] `.gitignore` dosyası var
- [ ] `README.md` güncel
- [ ] İlk commit yapıldı
- [ ] GitHub'a push edildi
- [ ] `.env` dosyası yüklenmedi (güvenlik)

## 🆘 Sorun Giderme

**"remote origin already exists" hatası:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/AnalyticaX.git
```

**"Permission denied" hatası:**
- GitHub'da Personal Access Token kullan
- Veya SSH key ekle

**"Large files" hatası:**
- Büyük dosyaları `.gitignore`'a ekle
- Git LFS kullan (eğer çok büyükse)

---

Başarılar! 🎉


