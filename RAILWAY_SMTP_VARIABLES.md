# 📧 Railway SMTP Variables - Doğru Ayarlar

## ✅ Email Servis Bilgileri

Ekrandan görünen bilgiler:
- **SMTP Host:** `mail.kurumsaleposta.com`
- **SMTP Port:** `465`
- **Encryption:** `SSL/TLS`
- **Email:** `support@analyticax.com.tr`
- **Password:** `Onur.Demir60` (veya yeni şifre)

## 🔧 Railway'a Eklenecek Variables

### 1. SMTP_HOST
- Name: `SMTP_HOST`
- Value: `mail.kurumsaleposta.com`

### 2. SMTP_PORT
- Name: `SMTP_PORT`
- Value: `465`

### 3. SMTP_USER
- Name: `SMTP_USER`
- Value: `support@analyticax.com.tr`

### 4. SMTP_PASS
- Name: `SMTP_PASS`
- Value: `Onur.Demir60` (veya email şifresi)

### 5. SMTP_SECURE
- Name: `SMTP_SECURE`
- Value: `true` (465 portu SSL/TLS kullanıyor)

---

## 📋 Adım Adım

1. Railway dashboard'da **Variables** sekmesine git
2. **"+ New Variable"** butonuna tıkla
3. Her birini tek tek ekle:

**Variable 1:**
- Name: `SMTP_HOST`
- Value: `mail.kurumsaleposta.com`
- **Add** tıkla

**Variable 2:**
- Name: `SMTP_PORT`
- Value: `465`
- **Add** tıkla

**Variable 3:**
- Name: `SMTP_USER`
- Value: `support@analyticax.com.tr`
- **Add** tıkla

**Variable 4:**
- Name: `SMTP_PASS`
- Value: `Onur.Demir60` (veya email şifresi)
- **Add** tıkla

**Variable 5:**
- Name: `SMTP_SECURE`
- Value: `true`
- **Add** tıkla

4. **Deployments** sekmesine git
5. **"Redeploy"** butonuna tıkla

---

## ✅ Kontrol Listesi

- [ ] SMTP_HOST = `mail.kurumsaleposta.com`
- [ ] SMTP_PORT = `465`
- [ ] SMTP_USER = `support@analyticax.com.tr`
- [ ] SMTP_PASS = Email şifresi
- [ ] SMTP_SECURE = `true`
- [ ] Redeploy yapıldı

---

**Variables'ları ekle ve redeploy yap! 🚀**

