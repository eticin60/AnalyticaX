# AnalyticaX - AI Powered Crypto Chart Analysis

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green.svg)](https://www.mongodb.com/)

**AnalyticaX** is an AI-powered cryptocurrency chart analysis platform that uses Google Gemini AI to analyze trading charts and provide detailed market insights, trend predictions, and trading recommendations.

## ✨ Features

- 🤖 **AI-Powered Analysis**: Uses Google Gemini 2.0 Flash for advanced chart analysis
- 📊 **Real-time Market Data**: Integration with Binance API for live prices
- 💳 **Credit System**: Free daily analysis + premium credit packages
- 🔐 **Secure Authentication**: JWT-based auth with device fingerprinting
- 💰 **Payment Integration**: OxaPay, TRC20, ERC20, BEP20 support
- 📈 **Technical Indicators**: EMA, ATR, Bollinger Bands, Support/Resistance
- 🎯 **Trade Ideas**: AI-generated long/short recommendations
- 📱 **Responsive Design**: Modern, mobile-friendly UI

## 🚀 Local'de Çalıştırma

### Gereksinimler
- Node.js (v16 veya üzeri)
- MongoDB (local veya MongoDB Atlas)
- Google Gemini API Key

### Kurulum

1. **Backend bağımlılıklarını yükle:**
```bash
cd backend
npm install
```

2. **Environment değişkenlerini ayarla:**
`backend/.env` dosyası oluştur:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/analyticax
JWT_SECRET=your-super-secret-jwt-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

3. **Backend'i başlat:**
```bash
cd backend
npm start
# veya development için:
npm run dev
```

Backend `http://localhost:5000` adresinde çalışacak.

4. **Frontend'i aç:**
Backend aynı zamanda frontend'i de serve ediyor. Tarayıcıda şu adresi aç:
```
http://localhost:5000
```

### Alternatif: Sadece Frontend için Live Server

Eğer sadece frontend'i test etmek istiyorsan:

**VS Code Live Server Extension:**
1. VS Code'da `frontend/index.html` dosyasını aç
2. Sağ tık → "Open with Live Server"
3. Otomatik olarak `http://127.0.0.1:5500` adresinde açılır

**Python HTTP Server:**
```bash
cd frontend
python -m http.server 8000
# veya Python 3 için:
python3 -m http.server 8000
```
Sonra tarayıcıda: `http://localhost:8000`

**Node.js http-server:**
```bash
npm install -g http-server
cd frontend
http-server -p 8000
```

### ⚠️ Önemli Notlar

- Backend çalışmadan frontend tam olarak çalışmaz (API çağrıları için gerekli)
- MongoDB bağlantısı olmadan kullanıcı kayıt/giriş yapılamaz
- Gemini API key olmadan görsel analiz çalışmaz

### Test Kullanıcısı

İlk kullanıcıyı kaydetmek için `register.html` sayfasını kullan.

### API Endpoints

- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Giriş
- `GET /api/auth/me` - Kullanıcı bilgileri
- `POST /api/analysis/chart` - Grafik analizi
- `POST /api/payments/create` - Ödeme oluştur
- `POST /api/payments/verify` - Ödeme doğrula

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- Google Gemini API Key

### Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/AnalyticaX.git
cd AnalyticaX
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Set up environment variables:**
Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/analyticax
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
GEMINI_API_KEY=your-gemini-api-key-here
```

4. **Start the server:**
```bash
npm start
# or for development:
npm run dev
```

5. **Open in browser:**
```
http://localhost:5000
```

## 🏗️ Project Structure

```
AnalyticaX/
├── backend/
│   ├── controllers/     # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & security
│   └── server.js        # Express server
├── frontend/
│   ├── index.html       # Landing page
│   ├── analyze.html     # Chart analysis page
│   ├── dashboard.html   # User dashboard
│   ├── premium.html     # Premium plans
│   └── ...              # Other pages
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-email` - Update email
- `POST /api/auth/change-password` - Update password
- `DELETE /api/auth/delete-account` - Delete account

### Analysis
- `POST /api/analysis/chart` - Analyze chart image
- `GET /api/analysis/history` - Get analysis history

### Payments
- `POST /api/payments/create` - Create payment order
- `POST /api/payments/verify` - Verify payment transaction

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **AI**: Google Generative AI (Gemini 2.0 Flash)
- **APIs**: Binance API, CoinGecko API
- **Payment**: OxaPay Integration

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🙏 Acknowledgments

- Google Gemini AI
- Binance API
- CoinGecko API
- OxaPay

---

Made with ❤️ by AnalyticaX Team

### Sorun Giderme

**Login Yapamıyorum:**
1. Backend'in çalıştığından emin ol (`http://localhost:5000/api` adresini kontrol et)
2. MongoDB'nin çalıştığından emin ol
3. `test-login.html` dosyasını aç ve debug yap
4. Browser console'u aç (F12) ve hataları kontrol et

**CORS Hatası:**
- Backend'deki CORS ayarlarını kontrol et
- Frontend'in hangi portta çalıştığını kontrol et

**MongoDB Bağlantı Hatası:**
- MongoDB'nin çalıştığından emin ol
- `.env` dosyasındaki `MONGO_URI` değerini kontrol et (MONGODB_URI değil!)

**API Key Hatası:**
- Gemini API key'in doğru olduğundan emin ol
- Google Cloud Console'dan API key oluştur

**Test Sayfası:**
- `test-login.html` dosyasını açarak login sistemini test edebilirsin
- Bu sayfa backend bağlantısını, register ve login işlemlerini test eder

