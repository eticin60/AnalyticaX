require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const authRoutes = require("./routes/auth");
const analysisRoutes = require("./routes/analysis");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

connectDB();

// ================================
// CORS
// ================================
app.use(cors({
  origin: [
    "http://localhost:5000", 
    "http://127.0.0.1:5000", 
    "http://127.0.0.1:5500", 
    "http://localhost:5500",
    "https://analyticax.com.tr",
    "http://analyticax.com.tr"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-device-id", "x-device-fingerprint"],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Handle preflight requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-device-id, x-device-fingerprint");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

// ================================
// SYMBOL TEMİZLEYİCİ (GELİŞMİŞ)
// ================================
function cleanSymbol(raw) {
    if (!raw) return null;

    let s = raw.toUpperCase().trim();

    // özel karakter, ., -, / temizle
    s = s.replace(/[^A-Z0-9]/g, "");

    // saçma takıları temizle
    s = s.replace(/PERP/g, "");
    s = s.replace(/FUTURES/g, "");
    s = s.replace(/USDTP/g, "USDT");
    s = s.replace(/USDTF/g, "USDT");
    s = s.replace(/COINM/g, "");
    s = s.replace(/USDUSD/g, "USDT");

    // Bybit/FTX kalıntıları (.P, .S)
    s = s.replace(/P$/g, "");
    s = s.replace(/S$/g, "");
    s = s.replace(/F$/g, "");

    // Quote listesi
    const QUOTES = ["USDT", "BUSD", "USDC", "USD"];

    for (let q of QUOTES) {
        const idx = s.indexOf(q);
        if (idx > 0) {
            let base = s.substring(0, idx);
            let quote = s.substring(idx);

            if (quote === "USD") quote = "USDT";

            return base + quote;
        }
    }

    return null;
}

// ================================
// OHLC ENDPOINT
// ================================
app.get("/api/binance/ohlc", async (req, res) => {
    try {
        const symbol = (req.query.symbol || "").toUpperCase();
        const interval = req.query.interval || "1h";

        if (!symbol) {
            return res.json({ ok: false, error: "Invalid symbol" });
        }

        const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=500`;

        const r = await fetch(url);
        const data = await r.json();

        if (!Array.isArray(data)) {
            return res.json({ ok: false, error: "Binance response error" });
        }

        return res.json({ ok: true, data });
    } catch (err) {
        console.error("OHLC route error:", err);
        return res.json({ ok: false, error: err.message });
    }
});

// Body parser - MUST be before routes
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// API root - MUST be before other routes
app.get("/api", (req, res) => {
  res.json({ ok: true, message: "AnalyticaX backend running 🚀" });
});

// API routes - MUST be before static files
app.use("/api/auth", authRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/payments", paymentRoutes);

// Debug: Log all API requests
app.use("/api/*", (req, res, next) => {
  console.log(`📡 API Request: ${req.method} ${req.path}`);
  next();
});

// Serve frontend static files
const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve specific HTML files
app.get("/verify-payment.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/verify-payment.html"));
});

app.get("/404.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/404.html"));
});

// Serve index.html for all other non-API routes (ONLY GET requests)
// IMPORTANT: This must be LAST and only handle GET requests
app.get("*", (req, res) => {
  // Never handle API routes here - they should be handled by API routes above
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ ok: false, error: "API endpoint not found" });
  }
  
  // Check if file exists, otherwise serve index.html
  const filePath = path.join(__dirname, "../frontend", req.path);
  const fs = require("fs");
  if (fs.existsSync(filePath) && req.path.endsWith(".html")) {
    res.sendFile(filePath);
  } else {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  
  // Windows'ta otomatik tarayıcı aç (opsiyonel)
  if (process.platform === 'win32' && process.env.AUTO_OPEN !== 'false') {
    const { exec } = require('child_process');
    setTimeout(() => {
      exec(`start http://localhost:${PORT}`, (err) => {
        if (err) console.log('Note: Could not auto-open browser');
      });
    }, 1000);
  }
});
