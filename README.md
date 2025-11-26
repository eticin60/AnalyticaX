# 🔮 AnalyticaX - AI Powered Crypto Chart Analysis

<div align="center">

[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-analyticax.com.tr-blue.svg)](https://analyticax.com.tr)
[![CyberEx Ecosystem](https://img.shields.io/badge/CyberEx-Ecosystem-purple.svg)](https://cyberex.com.tr)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green.svg)](https://www.mongodb.com/)

**AI-Powered Cryptocurrency & Stock Chart Analysis Platform**

🌐 **Live Website:** [https://analyticax.com.tr](https://analyticax.com.tr)

[Features](#-features) • [About Us](#-about-analyticax--cyberex) • [Technology](#-technology-stack) • [Contact](#-contact--support)

</div>

---

## 🎯 What is AnalyticaX?

**AnalyticaX** is an advanced AI-powered cryptocurrency and stock chart analysis platform that revolutionizes how traders analyze market data. Using cutting-edge Google Gemini 2.0 Flash AI technology, AnalyticaX provides professional-grade chart analysis, trend predictions, and actionable trading insights.

### Our Mission

To democratize professional-grade trading analysis by making AI-powered insights accessible to traders of all levels, from beginners to professionals.

### Key Capabilities

- 🤖 **AI-Powered Analysis**: Deep learning algorithms analyze chart patterns, structure, liquidity, and trends
- 📊 **Real-time Market Data**: Live cryptocurrency prices and market overview
- 💡 **Intelligent Insights**: Probability-based scenarios and risk assessments
- 📈 **Technical Analysis**: Support/resistance levels, trend identification, pattern recognition
- 🎯 **Trade Recommendations**: AI-generated long/short suggestions with invalidation levels

---

## 🏢 About AnalyticaX & CyberEx

### AnalyticaX

**AnalyticaX** is a leading AI technology company specializing in financial market analysis. We combine artificial intelligence with deep market knowledge to provide traders with actionable insights and professional-grade analysis tools.

**Our Expertise:**
- AI/ML Development
- Financial Market Analysis
- Cryptocurrency Trading Tools
- Real-time Data Processing
- Advanced Chart Pattern Recognition

### CyberEx Ecosystem

**AnalyticaX** is proudly part of the **CyberEx** ecosystem, a comprehensive cryptocurrency and blockchain technology platform.

**CyberEx Ecosystem Includes:**
- 🔷 **CyberEx Platform** - Main cryptocurrency trading and analysis platform
- 💼 **CyberEx Web3 Wallet** - Secure cryptocurrency wallet solution
- 🔌 **CyberEx Extension** - Browser extension for seamless trading
- 📱 **CyberEx Web3 App** - Mobile application for on-the-go trading
- 🔮 **AnalyticaX** - AI-powered chart analysis (this project)

**Learn More:**
- CyberEx Platform: [https://cyberex.com.tr](https://cyberex.com.tr)
- CyberEx Web3 Wallet: [https://cyberex.com.tr/web3wallet](https://cyberex.com.tr/web3wallet)
- CyberEx Extension: [https://cyberex.com.tr/web3extension](https://cyberex.com.tr/web3extension)
- CyberEx Web3 App: [https://cyberex.com.tr/web3app](https://cyberex.com.tr/web3app)

---

## ✨ Features

### 🤖 AI-Powered Analysis
- **Google Gemini 2.0 Flash** integration for advanced chart analysis
- Structure and trend detection (HH/HL, LH/LL, CHoCH/BOS)
- Liquidity and stop hunt identification
- Pattern recognition (wedges, triangles, flags, double tops/bottoms)
- Risk frame mapping and invalidation levels

### 📊 Market Intelligence
- Real-time cryptocurrency prices via CoinGecko API
- Live market overview with top 100 coins
- Interactive heatmap for volatility visualization
- 24h performance tracking

### 💳 Flexible Credit System
- **Free Plan**: 1 AI analysis per day, up to 3 total (for testing)
- **Premium Plans**: Multiple tiers from 5 to 500 analyses
- Secure crypto payments (USDT, USDC, BTC via TRC20, ERC20, BEP20)
- KYC requirements for payments over $5,000

### 🔐 Security & Authentication
- JWT-based authentication with device fingerprinting
- OTP (One-Time Password) verification for new devices
- Secure password hashing (bcrypt)
- Device and IP tracking for enhanced security

### 📱 Modern User Experience
- Responsive design (mobile, tablet, desktop)
- Progressive Web App (PWA) support
- Dark theme with neon accents
- Smooth animations and transitions
- Multi-language support (English, Turkish, and more)

### 🔒 Enterprise-Grade Security
- CORS protection
- Rate limiting on API endpoints
- Input validation and sanitization
- Secure payment processing
- GDPR-compliant data handling

---

## 🛠️ Technology Stack

### Frontend
- **HTML5, CSS3, JavaScript (Vanilla)**
- Progressive Web App (PWA) with Service Worker
- Responsive design with mobile-first approach
- Particle animations and modern UI/UX

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- RESTful API architecture
- JWT authentication middleware

### AI & APIs
- **Google Generative AI** (Gemini 2.0 Flash)
- **CoinGecko API** for market data
- **Binance API** integration (for future features)

### Payment Integration
- **OxaPay** payment gateway
- TRC20, ERC20, BEP20 cryptocurrency support
- Secure payment verification system

### Deployment
- **GitHub Pages** for frontend hosting
- **Railway.app** for backend hosting
- Automated deployment workflows

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
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
MONGO_URI=mongodb://localhost:27017/analyticax
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
GEMINI_API_KEY=your-gemini-api-key-here
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
SMTP_SECURE=false
NODE_ENV=development
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

---

## 📁 Project Structure

```
AnalyticaX/
├── backend/
│   ├── controllers/        # Business logic
│   │   ├── authController.js
│   │   ├── analysisController.js
│   │   └── paymentController.js
│   ├── models/             # MongoDB schemas
│   │   ├── User.js
│   │   └── Payment.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── analysis.js
│   │   └── paymentRoutes.js
│   ├── middleware/         # Auth & security
│   │   └── authMiddleware.js
│   ├── utils/              # Utilities
│   │   └── emailService.js
│   ├── config/             # Configuration
│   │   └── db.js
│   └── server.js           # Express server
├── frontend/
│   ├── index.html          # Landing page
│   ├── analyze.html        # Chart analysis page
│   ├── dashboard.html       # User dashboard
│   ├── premium.html        # Premium plans
│   ├── history.html        # Analysis history
│   ├── settings.html       # User settings
│   ├── login.html          # Login page
│   ├── register.html       # Registration page
│   ├── js/
│   │   └── api-config.js  # API configuration
│   ├── assets/
│   │   └── AnalyticaX.png # Logo
│   ├── manifest.json       # PWA manifest
│   ├── service-worker.js   # PWA service worker
│   ├── sitemap.xml         # SEO sitemap
│   └── robots.txt          # SEO robots
├── LICENSE                  # Proprietary license
└── README.md               # This file
```

---

## 🔧 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/resend-otp` - Resend OTP
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-email` - Update email
- `POST /api/auth/change-password` - Update password
- `DELETE /api/auth/delete-account` - Delete account

### Analysis Endpoints
- `POST /api/analysis/chart` - Analyze chart image
- `GET /api/analysis/history` - Get analysis history
- `POST /api/analysis/chat` - AI chat assistant

### Payment Endpoints
- `POST /api/payments/create` - Create payment order
- `POST /api/payments/verify` - Verify payment transaction

---

## ⚠️ Copyright & License

**Copyright (c) 2025 AnalyticaX & CyberEx. All Rights Reserved.**

This software and associated documentation files (the "Software") are the proprietary and confidential property of AnalyticaX and CyberEx. Unauthorized copying, modification, distribution, or use of this Software, via any medium, is strictly prohibited without the express written permission of AnalyticaX and CyberEx.

### Terms:
- ❌ This codebase is **NOT open source**
- ❌ Redistribution and use in source and binary forms are **prohibited**
- ❌ Commercial use is **prohibited** without explicit written permission
- ❌ Reverse engineering, decompilation, or disassembly is **prohibited**
- ❌ Forking, cloning, or creating copies is **prohibited**
- ❌ Using any part of this codebase in your own projects is **prohibited**

**Violation of these terms may result in legal action.**

For licensing inquiries, please contact: [support@AnalyticaX.com.tr](mailto:support@AnalyticaX.com.tr)

See [LICENSE](LICENSE) for full terms and conditions.

---

## 📧 Contact & Support

### AnalyticaX
- **Website**: [https://analyticax.com.tr](https://analyticax.com.tr)
- **Support Email**: [support@AnalyticaX.com.tr](mailto:support@AnalyticaX.com.tr)
- **GitHub**: [https://github.com/eticin60/AnalyticaX](https://github.com/eticin60/AnalyticaX)

### CyberEx
- **Platform**: [https://cyberex.com.tr](https://cyberex.com.tr)
- **Web3 Wallet**: [https://cyberex.com.tr/web3wallet](https://cyberex.com.tr/web3wallet)
- **Extension**: [https://cyberex.com.tr/web3extension](https://cyberex.com.tr/web3extension)
- **Web3 App**: [https://cyberex.com.tr/web3app](https://cyberex.com.tr/web3app)

---

## 🙏 Acknowledgments

- **Google Gemini AI** - Advanced AI analysis capabilities
- **CoinGecko** - Real-time cryptocurrency market data
- **Binance** - Cryptocurrency exchange API
- **OxaPay** - Secure payment processing
- **CyberEx Ecosystem** - Comprehensive blockchain platform

---

## 📊 Project Status

✅ **Production Ready** - Live at [https://analyticax.com.tr](https://analyticax.com.tr)

- ✅ Frontend deployed on GitHub Pages
- ✅ Backend deployed on Railway.app
- ✅ MongoDB database configured
- ✅ Payment system integrated
- ✅ AI analysis fully functional
- ✅ PWA support enabled
- ✅ SEO optimized
- ✅ Multi-language support

---

<div align="center">

**© 2025 AnalyticaX & CyberEx. All Rights Reserved.**

*This software is proprietary and confidential. Unauthorized use is prohibited.*

[Website](https://analyticax.com.tr) • [CyberEx](https://cyberex.com.tr) • [Support](mailto:support@AnalyticaX.com.tr)

</div>
