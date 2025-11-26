# 🧪 OTP Email Test - Kontrol Listesi

## ✅ Yapılanlar

- SMTP variables Railway'a eklendi
- Backend deploy edildi
- OTP email servisi hazır

## 🧪 Test Adımları

### 1. Login Yap ve OTP Tetikle

OTP'yi tetiklemek için şu durumlardan biri olmalı:
- **Yeni device:** Farklı bir cihazdan login yap
- **IP değişikliği:** Farklı bir IP'den login yap
- **Browser değişikliği:** Farklı bir tarayıcıdan login yap

### 2. Email'i Kontrol Et

1. `support@analyticax.com.tr` email hesabını kontrol et
2. Veya login yaptığın email adresini kontrol et
3. **Subject:** `AnalyticaX - OTP Verification Code`
4. Email'de 6 haneli OTP kodu olmalı

### 3. OTP'yi Gir

1. OTP verification sayfasında
2. Email'deki 6 haneli kodu gir
3. **"Verify Code"** butonuna tıkla
4. Login tamamlanmalı

---

## 🐛 Sorun Giderme

### Email Gelmiyorsa

1. **Railway Deploy Loglarını Kontrol Et:**
   - Deployments → Logs sekmesine git
   - `✅ OTP email sent to [email]` mesajını ara
   - Veya `❌ Email send error:` hatası var mı kontrol et

2. **SMTP Variables Kontrolü:**
   - Variables sekmesinde tüm 5 variable var mı?
   - Değerler doğru mu?

3. **Spam Klasörünü Kontrol Et:**
   - Email spam klasörüne düşmüş olabilir

### Email Geliyor Ama OTP Çalışmıyorsa

1. **OTP Süresi:** OTP 5 dakika geçerli
2. **Email Formatı:** OTP 6 haneli sayı olmalı
3. **Console Logları:** Browser console'da hata var mı kontrol et

---

## ✅ Başarı Kriterleri

- [ ] Login yapıldı
- [ ] OTP gerektiren durum oluştu
- [ ] Email geldi
- [ ] OTP email'de görünüyor
- [ ] OTP girildi
- [ ] Login tamamlandı

---

**Test et ve sonucu bildir! 🚀**

