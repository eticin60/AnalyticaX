# AnalyticaX - AI Powered Crypto Chart Analysis

[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-analyticax.com.tr-blue.svg)](https://analyticax.com.tr)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green.svg)](https://www.mongodb.com/)

**AnalyticaX** is an AI-powered cryptocurrency chart analysis platform that uses Google Gemini AI to analyze trading charts and provide detailed market insights, trend predictions, and trading recommendations.

🌐 **Live Website:** [https://analyticax.com.tr](https://analyticax.com.tr)

## ⚠️ Copyright & License

**Copyright (c) 2025 AnalyticaX. All Rights Reserved.**

This software and associated documentation files (the "Software") are the proprietary and confidential property of AnalyticaX. Unauthorized copying, modification, distribution, or use of this Software, via any medium, is strictly prohibited without the express written permission of AnalyticaX.

**Terms:**
- This codebase is **NOT open source**
- Redistribution and use in source and binary forms are **prohibited**
- Commercial use is **prohibited** without explicit written permission
- Reverse engineering, decompilation, or disassembly is **prohibited**

For licensing inquiries, please contact: [legal@analyticax.com.tr](mailto:legal@analyticax.com.tr)

## ✨ Features

- 🤖 **AI-Powered Analysis**: Uses Google Gemini 2.0 Flash for advanced chart analysis
- 📊 **Real-time Market Data**: Integration with Binance API for live prices
- 💳 **Credit System**: Free daily analysis + premium credit packages
- 🔐 **Secure Authentication**: JWT-based auth with device fingerprinting
- 💰 **Payment Integration**: OxaPay, TRC20, ERC20, BEP20 support
- 📈 **Technical Indicators**: EMA, ATR, Bollinger Bands, Support/Resistance
- 🎯 **Trade Ideas**: AI-generated long/short recommendations
- 📱 **Responsive Design**: Modern, mobile-friendly UI
- 🔒 **Code Protection**: Obfuscated and protected source code

## 🚀 Production Deployment

**Live Site:** [https://analyticax.com.tr](https://analyticax.com.tr)

The production site is automatically deployed via GitHub Pages. All API calls are configured to use the production backend.

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v18 veya üzeri)
- MongoDB (local veya MongoDB Atlas)
- Google Gemini API Key

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/eticin60/AnalyticaX.git
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
MONGODB_URI=mongodb://localhost:27017/analyticax
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
GEMINI_API_KEY=your-gemini-api-key-here
```

4. **Start the development server:**
```bash
npm start
# or for development with auto-reload:
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
│   ├── js/
│   │   └── api-config.js # API configuration
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
- **Deployment**: GitHub Pages, GitHub Actions

## 🔒 Security & Code Protection

- Source code is protected and obfuscated
- API keys and secrets are stored in environment variables
- JWT-based authentication with device fingerprinting
- CORS protection enabled
- Rate limiting on API endpoints

## 📧 Contact & Support

- **Website**: [https://analyticax.com.tr](https://analyticax.com.tr)
- **GitHub**: [https://github.com/eticin60/AnalyticaX](https://github.com/eticin60/AnalyticaX)
- **Legal Inquiries**: [legal@analyticax.com.tr](mailto:legal@analyticax.com.tr)

## 🙏 Acknowledgments

- Google Gemini AI
- Binance API
- CoinGecko API
- OxaPay

---

**© 2025 AnalyticaX. All Rights Reserved.**

*This software is proprietary and confidential. Unauthorized use is prohibited.*
