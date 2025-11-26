# 📧 SMTP Ayarları - OTP Email Gönderme

## ✅ Yapılanlar

Kendi email hesabınızı (`support@analyticax.com.tr`) kullanarak OTP gönderme servisi eklendi.

## 🔧 Railway'a SMTP Variables Ekleme

### 1. SMTP Bilgilerini Al

Email servis sağlayıcınızdan (XMail, cPanel, vs.) şu bilgileri alın:
- **SMTP Host:** (örn: `mail.analyticax.com.tr` veya `smtp.analyticax.com.tr`)
- **SMTP Port:** (genellikle `587` veya `465`)
- **SMTP User:** `support@analyticax.com.tr`
- **SMTP Password:** Email şifresi
- **SMTP Secure:** `465` portu için `true`, `587` için `false`

### 2. Railway'a Variables Ekle

1. Railway dashboard'da **Variables** sekmesine git
2. **"+ New Variable"** butonuna tıkla
3. Şu variables'ları ekle:

**Variable 1:**
- Name: `SMTP_HOST`
- Value: `mail.analyticax.com.tr` (veya email servis sağlayıcınızın SMTP host'u)
- **Add** tıkla

**Variable 2:**
- Name: `SMTP_PORT`
- Value: `587` (veya `465`)
- **Add** tıkla

**Variable 3:**
- Name: `SMTP_USER`
- Value: `support@analyticax.com.tr`
- **Add** tıkla

**Variable 4:**
- Name: `SMTP_PASS`
- Value: Email şifresi (`Onur.Demir60` veya yeni şifre)
- **Add** tıkla

**Variable 5:**
- Name: `SMTP_SECURE`
- Value: `false` (587 için) veya `true` (465 için)
- **Add** tıkla

### 3. Redeploy

1. Variables'ları ekledikten sonra
2. **Deployments** sekmesine git
3. **"Redeploy"** butonuna tıkla

---

## 📋 Yaygın SMTP Ayarları

### XMail / cPanel
```
SMTP_HOST: mail.analyticax.com.tr
SMTP_PORT: 587
SMTP_USER: support@analyticax.com.tr
SMTP_PASS: [şifre]
SMTP_SECURE: false
```

### Gmail (eğer Gmail kullanıyorsanız)
```
SMTP_HOST: smtp.gmail.com
SMTP_PORT: 587
SMTP_USER: support@analyticax.com.tr
SMTP_PASS: [app password]
SMTP_SECURE: false
```

### Outlook / Office 365
```
SMTP_HOST: smtp.office365.com
SMTP_PORT: 587
SMTP_USER: support@analyticax.com.tr
SMTP_PASS: [şifre]
SMTP_SECURE: false
```

---

## ✅ Kontrol Listesi

- [ ] SMTP_HOST eklendi
- [ ] SMTP_PORT eklendi
- [ ] SMTP_USER eklendi
- [ ] SMTP_PASS eklendi
- [ ] SMTP_SECURE eklendi
- [ ] Redeploy yapıldı
- [ ] Test email gönderildi

---

## 🧪 Test Et

1. Login yap
2. OTP gerektiren bir durum oluştur (yeni device, IP değişikliği)
3. Email'i kontrol et
4. OTP'yi gir

---

**SMTP variables'larını ekle ve redeploy yap! 🚀**

