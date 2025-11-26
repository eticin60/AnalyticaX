# Google ve WhatsApp'ta Logo Görünürlüğü Test Rehberi

## ✅ Yapılan Düzenlemeler

1. **Open Graph Meta Tags** - Tüm sayfalara eklendi
2. **Twitter Card Meta Tags** - Tüm sayfalara eklendi
3. **Logo URL** - `https://analyticax.com.tr/assets/AnalyticaX.png`
4. **Image Dimensions** - 1200x630 (WhatsApp için ideal)
5. **Secure URL** - HTTPS üzerinden erişilebilir
6. **Image Type** - PNG formatı belirtildi
7. **Alt Text** - Erişilebilirlik için eklendi

## 🔍 Test Etme

### 1. WhatsApp'ta Test
1. WhatsApp'ı açın
2. Bir sohbete gidin
3. Link paylaşın: `https://analyticax.com.tr`
4. Link önizlemesinde logo görünmeli

**Not:** WhatsApp cache kullanır. İlk seferde görünmeyebilir, birkaç dakika bekleyin veya linki farklı bir sohbette deneyin.

### 2. Google'da Test
1. Google'da arama yapın: `site:analyticax.com.tr`
2. Sonuçlarda logo görünmeli (eğer Google indexlemişse)

### 3. Facebook Debugger ile Test
1. https://developers.facebook.com/tools/debug/ adresine gidin
2. URL girin: `https://analyticax.com.tr`
3. "Scrape Again" butonuna tıklayın
4. Open Graph görseli görünmeli

### 4. Twitter Card Validator ile Test
1. https://cards-dev.twitter.com/validator adresine gidin
2. URL girin: `https://analyticax.com.tr`
3. Preview'da logo görünmeli

### 5. LinkedIn Post Inspector ile Test
1. https://www.linkedin.com/post-inspector/ adresine gidin
2. URL girin: `https://analyticax.com.tr`
3. Preview'da logo görünmeli

## ⚠️ Önemli Notlar

### Logo Dosyası Gereksinimleri:
- **Format:** PNG veya JPG
- **Boyut:** En az 300x200, ideal 1200x630
- **Dosya Boyutu:** 8MB'dan küçük olmalı
- **Erişim:** HTTPS üzerinden erişilebilir olmalı
- **CORS:** Cross-origin isteklerine izin vermeli

### Cache Sorunları:
- WhatsApp, Facebook, Twitter cache kullanır
- Değişikliklerin görünmesi 24-48 saat sürebilir
- Cache'i temizlemek için:
  - Facebook: Debugger'da "Scrape Again"
  - Twitter: Card Validator'da yeniden test
  - WhatsApp: Farklı bir sohbette deneyin

### Logo Görünmüyorsa:
1. Logo dosyasının gerçekten erişilebilir olduğunu kontrol edin:
   - Tarayıcıda açın: `https://analyticax.com.tr/assets/AnalyticaX.png`
2. Logo dosyasının boyutunu kontrol edin (en az 300x200)
3. Meta tags'lerin doğru olduğunu kontrol edin (HTML source'da)
4. HTTPS kullandığınızdan emin olun
5. CORS headers'ın doğru olduğundan emin olun

## 🚀 Hızlı Test Komutu

Terminal'de çalıştırın:
```bash
curl -I https://analyticax.com.tr/assets/AnalyticaX.png
```

Response'da `200 OK` görmelisiniz.

## 📱 Mobil Test

Mobil cihazlarda WhatsApp'ta test edin:
1. Mobil WhatsApp'ı açın
2. Bir sohbete gidin
3. Link paylaşın: `https://analyticax.com.tr`
4. Link önizlemesinde logo görünmeli

## 🔧 Sorun Giderme

### Logo görünmüyor:
1. Logo dosyasının var olduğunu kontrol edin
2. Logo dosyasının boyutunu kontrol edin
3. Meta tags'lerin doğru olduğunu kontrol edin
4. Cache'i temizleyin
5. Farklı bir tarayıcıda test edin

### Logo çok küçük:
- Logo dosyasını 1200x630 boyutunda yeniden oluşturun
- `og:image:width` ve `og:image:height` değerlerini güncelleyin

### Logo yanlış görünüyor:
- Logo dosyasını kontrol edin
- Meta tags'lerdeki URL'yi kontrol edin
- Cache'i temizleyin

