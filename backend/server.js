// Load .env file only in development (Railway uses environment variables directly)
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const authRoutes = require("./routes/auth");
const analysisRoutes = require("./routes/analysis");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const testRoutes = require("./routes/testRoutes");

const app = express();

connectDB();

// ================================
// CORS
// ================================
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      "http://localhost:5000", 
      "http://127.0.0.1:5000", 
      "http://127.0.0.1:5500", 
      "http://localhost:5500",
      "https://analyticax.com.tr",
      "http://analyticax.com.tr",
      "https://www.analyticax.com.tr",
      "http://www.analyticax.com.tr"
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      callback(null, true);
    } else {
      console.log("⚠️ CORS blocked origin:", origin);
      callback(null, true); // Allow all for now, but log it
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "x-device-id", "x-device-fingerprint", "X-Requested-With"],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Handle preflight requests
app.options("*", (req, res) => {
  const origin = req.headers.origin;
  res.header("Access-Control-Allow-Origin", origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-device-id, x-device-fingerprint, X-Requested-With");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "86400"); // 24 hours
  res.sendStatus(204);
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    ok: true, 
    status: "online",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
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

// Debug: Log all API requests BEFORE routes
app.use("/api/*", (req, res, next) => {
  console.log(`📡 API Request: ${req.method} ${req.path}`, req.body);
  next();
});

// API routes - MUST be before static files
app.use("/api/auth", authRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/test", testRoutes);

// Log API routes on startup (for debugging)
if (process.env.NODE_ENV === 'production') {
  console.log("📡 API Routes registered:");
  console.log("   - /api/auth");
  console.log("   - /api/analysis");
  console.log("   - /api/payments");
  console.log("   - /api/admin");
  console.log("   - /api/test");
}

// Maintenance status endpoint
app.get("/api/maintenance/status", (req, res) => {
  const maintenance = process.env.MAINTENANCE_MODE === "true";
  res.json({ maintenance });
});

// In production (Railway), frontend is served by GitHub Pages
// Backend only serves API endpoints
if (process.env.NODE_ENV !== 'production') {
  // Serve frontend static files only in development
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
} else {
  // In production, only handle API routes
  // All other routes return 404 (frontend is on GitHub Pages)
  // IMPORTANT: This catch-all must come AFTER all API routes
  // API routes are already defined above, so this only catches non-API routes
  app.get("*", (req, res) => {
    // This should never catch /api routes because they're handled above
    // But just in case, check again
    if (req.path.startsWith("/api")) {
      console.error("⚠️ API route not found:", req.path);
      console.error("   Available API routes: /api/auth, /api/analysis, /api/payments, /api/admin, /api/test");
      return res.status(404).json({ ok: false, error: "API endpoint not found", path: req.path });
    }
    // Frontend is on GitHub Pages, not here
    return res.status(404).json({ ok: false, error: "Not found. Frontend is served by GitHub Pages." });
  });
}

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0'; // Production için 0.0.0.0 gerekli

const server = app.listen(PORT, HOST, () => {
  console.log(`🔥 Server running on ${HOST}:${PORT}`);
  console.log(`🌐 Frontend: http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
  console.log(`📡 API: http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Windows'ta otomatik tarayıcı aç (sadece development'ta)
  if (process.platform === 'win32' && process.env.AUTO_OPEN !== 'false' && !process.env.NODE_ENV) {
    const { exec } = require('child_process');
    setTimeout(() => {
      exec(`start http://localhost:${PORT}`, (err) => {
        if (err) console.log('Note: Could not auto-open browser');
      });
    }, 1000);
  }
});

// Graceful shutdown handlers
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  server.close(() => {
    console.log('✅ HTTP server closed.');
    const mongoose = require('mongoose');
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB connection closed.');
      process.exit(0);
    });
  });
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('⚠️ Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Handle termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});
