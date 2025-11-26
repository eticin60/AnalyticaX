# 📧 Resend API Kurulumu - OTP Email Gönderme

## ✅ Yapılanlar

OTP email gönderme servisi eklendi. Artık kullanıcılar OTP'yi email ile alacak.

## 🔧 Resend API Key Ekleme

### 1. Resend Hesabı Oluştur
1. https://resend.com adresine git
2. **"Sign Up"** butonuna tıkla
3. Email ile kayıt ol
4. Ücretsiz plan yeterli (ayda 3,000 email)

### 2. API Key Al
1. Resend dashboard'a git
2. **"API Keys"** sekmesine git
3. **"Create API Key"** butonuna tıkla
4. Name: `AnalyticaX Production`
5. **"Create"** tıkla
6. API key'i kopyala (sadece bir kez gösterilir!)

### 3. Domain Verify Et (Opsiyonel ama Önerilen)
1. **"Domains"** sekmesine git
2. **"Add Domain"** butonuna tıkla
3. Domain: `analyticax.com.tr`
4. DNS kayıtlarını ekle (Resend talimatları verir)
5. Domain verify edildikten sonra `from` adresini güncelle

### 4. Railway'a API Key Ekle
1. Railway dashboard'da **Variables** sekmesine git
2. **"+ New Variable"** butonuna tıkla
3. Name: `RESEND_API_KEY`
4. Value: Resend API key'in
5. **Add** tıkla

---

## 🎯 Şimdi Yapılacaklar

1. **Resend hesabı oluştur**
2. **API key al**
3. **Railway'a `RESEND_API_KEY` ekle**
4. **Redeploy yap**

---

## 📧 Email Formatı

OTP email'i şu formatta gönderilecek:
- **From:** `AnalyticaX <noreply@analyticax.com.tr>` (domain verify edilirse)
- **Subject:** `AnalyticaX - OTP Verification Code`
- **Content:** Güzel HTML email template ile OTP kodu

---

## ⚠️ Önemli Notlar

- **RESEND_API_KEY yoksa:** OTP sadece console'a yazılır (development için)
- **RESEND_API_KEY varsa:** OTP email ile gönderilir
- **Domain verify edilmezse:** Resend'in default domain'i kullanılır (örnek: `onboarding@resend.dev`)

---

**Resend API key'i ekle ve redeploy yap! 🚀**

