// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const { GoogleGenerativeAI } = require("@google/generative-ai");
const User = require("../models/User");
const crypto = require("crypto");

// Initialize Gemini AI
let genAI = null;
let model = null;

if (process.env.GEMINI_API_KEY) {
  try {
    const apiKey = process.env.GEMINI_API_KEY.trim();
    if (apiKey && apiKey.startsWith("AIza")) {
      genAI = new GoogleGenerativeAI(apiKey);
      model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      console.log("✅ Gemini AI model initialized successfully");
      console.log("   API Key (first 10 chars):", apiKey.substring(0, 10) + "...");
    } else {
      console.error("❌ GEMINI_API_KEY format is invalid! Should start with 'AIza'");
      console.error("   Current key (first 10 chars):", apiKey.substring(0, 10) + "...");
    }
  } catch (err) {
    console.error("❌ Failed to initialize Gemini AI:", err.message);
  }
} else {
  console.error("❌ GEMINI_API_KEY is not set in environment variables!");
  console.error("Please set GEMINI_API_KEY in Railway environment variables.");
}

function generateAXID() {
  return "AX-" + crypto.randomBytes(6).toString("hex").toUpperCase();
}

async function fetchBinanceOHLC(symbol, interval) {
  try {
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=200`;
    const res = await fetch(url);
    const data = await res.json();

    if (!Array.isArray(data)) return null;

    return {
      open: data.map(k => parseFloat(k[1])),
      high: data.map(k => parseFloat(k[2])),
      low: data.map(k => parseFloat(k[3])),
      close: data.map(k => parseFloat(k[4]))
    };
  } catch (err) {
    console.error("OHLC FETCH ERROR:", err);
    return null;
  }
}


function calculateEMA(values, period) {
  const k = 2 / (period + 1);
  let ema = values[0];
  for (let i = 1; i < values.length; i++) {
    ema = values[i] * k + ema * (1 - k);
  }
  return ema;
}

function calculateATR(highs, lows, closes, period = 14) {
  let TR = [];
  for (let i = 1; i < highs.length; i++) {
    TR.push(
      Math.max(
        highs[i] - lows[i],
        Math.abs(highs[i] - closes[i - 1]),
        Math.abs(lows[i] - closes[i - 1])
      )
    );
  }

  let ATR = TR.slice(0, period).reduce((a, b) => a + b, 0) / period;

  for (let i = period; i < TR.length; i++) {
    ATR = (ATR * (period - 1) + TR[i]) / period;
  }

  return ATR;
}

async function extractChartMetadata(imageBase64) {
  if (!model || !genAI || !process.env.GEMINI_API_KEY) {
    throw new Error("AI service is temporarily unavailable. GEMINI_API_KEY is not configured. Please contact support@AnalyticaX.com.tr");
  }
  
  try {
    const prompt = `
You are an advanced OCR and image recognition engine specialized in cryptocurrency trading charts and assets.

Analyze the image and detect:
1. If it's a crypto trading chart (BTC, ETH, SOL, BNB, XRP, DOGE, ADA, DOT, LINK, AVAX, TRX, MATIC, OP, ARB, etc.)
2. If it's a gold/precious metal chart
3. If it's a stock/forex chart
4. The trading pair symbol (e.g., BTCUSDT, ETHUSDT)
5. The timeframe (1m, 5m, 15m, 1h, 4h, 1d, 1w)

RETURN JSON ONLY:
{
  "assetType": "crypto" | "gold" | "stock" | "forex" | "unknown",
  "symbol": "BTCUSDT" | "ETHUSDT" | etc. or empty string,
  "timeframe": "1h" | "4h" | "1d" | etc. or empty string,
  "baseAsset": "BTC" | "ETH" | "GOLD" | etc. or empty string,
  "quoteAsset": "USDT" | "USD" | etc. or empty string
}

If you cannot detect, return empty strings but try to identify the assetType.
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64.split(",")[1],
          mimeType: "image/png"
        }
      }
    ]);

    let txt = result.response.text();
    txt = txt.replace(/```json/gi, "").replace(/```/g, "").trim();
    return JSON.parse(txt);
  } catch (geminiError) {
    console.error("❌ Gemini Metadata Extraction Error:", geminiError);
    
    // Check for API key specific errors
    if (geminiError.message && (
      geminiError.message.includes("API key") || 
      geminiError.message.includes("API_KEY") || 
      geminiError.message.includes("API key not valid") ||
      geminiError.message.includes("API_KEY_INVALID") ||
      geminiError.status === 400 ||
      (geminiError.error && geminiError.error.message && geminiError.error.message.includes("API key"))
    )) {
      console.error("🔑 API Key Validation Error in extractChartMetadata!");
      console.error("   API Key (first 10 chars):", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 10) + "..." : "NOT SET");
      throw new Error("GEMINI_API_KEY is invalid or expired. Please check the API key in Railway environment variables and ensure it's active in Google AI Studio.");
    }
    
    // Re-throw other errors
    throw geminiError;
  }
}


async function askGemini(prompt, imageBase64) {
  if (!model || !genAI) {
    throw new Error("AI service is temporarily unavailable. GEMINI_API_KEY is not configured. Please contact support@AnalyticaX.com.tr");
  }
  
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("AI service is temporarily unavailable. GEMINI_API_KEY is not set. Please contact support@AnalyticaX.com.tr");
  }
  
  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64.split(",")[1],
          mimeType: "image/png",
        },
      },
    ]);

    let raw = result.response.text();
    raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
    return raw;
  } catch (geminiError) {
    console.error("❌ Gemini API Error:", geminiError);
    
    // Check for API key specific errors
    if (geminiError.message && (
      geminiError.message.includes("API key") || 
      geminiError.message.includes("API_KEY") || 
      geminiError.message.includes("API key not valid") ||
      geminiError.message.includes("API_KEY_INVALID") ||
      geminiError.status === 400 ||
      (geminiError.error && geminiError.error.message && geminiError.error.message.includes("API key"))
    )) {
      console.error("🔑 API Key Validation Error!");
      console.error("   API Key (first 10 chars):", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 10) + "..." : "NOT SET");
      throw new Error("GEMINI_API_KEY is invalid or expired. Please check the API key in Railway environment variables and ensure it's active in Google AI Studio.");
    }
    
    // Re-throw other errors
    throw geminiError;
  }
}

exports.analyzeChart = async (req, res) => {
  try {
    // Check if GEMINI_API_KEY is configured
    if (!process.env.GEMINI_API_KEY || !genAI || !model) {
      console.error("❌ GEMINI_API_KEY is not configured!");
      return res.json({ 
        ok: false, 
        error: "AI service is temporarily unavailable. Please contact support@AnalyticaX.com.tr" 
      });
    }

    const queryId = generateQueryId();

    const user = await User.findById(req.user._id);
    if (!user) return res.json({ ok: false, error: "User not found" });

    const { imageBase64 } = req.body;

    if (!imageBase64)
      return res.json({ ok: false, error: "Image is missing." });

    const autoMeta = await extractChartMetadata(imageBase64);

    let finalSymbol = (autoMeta.symbol || "").toUpperCase().trim();
    let finalTimeframe = (autoMeta.timeframe || "").trim();
    const assetType = (autoMeta.assetType || "crypto").toLowerCase();

    // Handle different asset types
    if (assetType === "gold" || assetType === "precious metal") {
      // For gold, we'll use a gold price API or default to XAUUSD
      finalSymbol = "XAUUSD";
    } else if (assetType === "stock" || assetType === "forex") {
      // For stocks/forex, use the detected symbol or default
      if (!finalSymbol) finalSymbol = "BTCUSDT"; // Fallback
    } else {
      // Crypto - ensure USDT pair
      if (!finalSymbol || finalSymbol.length < 3) {
        // Try to construct from baseAsset
        const base = (autoMeta.baseAsset || "").toUpperCase().trim();
        if (base && ["BTC", "ETH", "SOL", "BNB", "XRP", "DOGE", "ADA", "DOT", "LINK", "AVAX", "TRX", "MATIC", "OP", "ARB"].includes(base)) {
          finalSymbol = base + "USDT";
        } else {
          finalSymbol = "BTCUSDT";
        }
      }
      
      // Ensure it ends with USDT or USD
      if (!finalSymbol.endsWith("USDT") && !finalSymbol.endsWith("USD")) {
        if (finalSymbol.includes("USDT")) {
          // Already has USDT, keep as is
        } else {
          finalSymbol = finalSymbol.replace(/USD$/, "") + "USDT";
        }
      }
    }

    if (!finalTimeframe) finalTimeframe = "1h";

    // Fetch current price for USD/USDT conversion
    let currentPriceUSD = null;
    let currentPriceUSDT = null;
    
    try {
      if (assetType === "crypto" && finalSymbol.endsWith("USDT")) {
        const tickerRes = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${finalSymbol}`);
        if (tickerRes.ok) {
          const tickerData = await tickerRes.json();
          currentPriceUSDT = parseFloat(tickerData.price);
          currentPriceUSD = currentPriceUSDT; // USDT ≈ USD
        }
      } else if (assetType === "gold") {
        // For gold, use a gold price API (example)
        // In production, use a real gold price API
        currentPriceUSD = 2000; // Placeholder
        currentPriceUSDT = 2000;
      }
    } catch (err) {
      console.warn("Price fetch error:", err);
    }

    const ohlc = await fetchBinanceOHLC(finalSymbol, finalTimeframe);

    if (!ohlc || !ohlc.close || ohlc.close.length < 50) {
      // If Binance fails, try to provide analysis anyway with limited data
      console.warn("OHLC fetch failed for", finalSymbol);
      
      // Create mock OHLC data for non-crypto or unsupported pairs
      const mockCloses = Array(200).fill(currentPriceUSDT || 50000);
      const mockHighs = mockCloses.map(c => c * 1.02);
      const mockLows = mockCloses.map(c => c * 0.98);
      
      ohlc = {
        open: mockCloses,
        high: mockHighs,
        low: mockLows,
        close: mockCloses
      };
    }

    const closes = ohlc.close;
    const highs = ohlc.high;
    const lows = ohlc.low;

    const ema20 = calculateEMA(closes, 20);
    const ema50 = calculateEMA(closes, 50);
    const ema200 = calculateEMA(closes, 200);
    const atr = calculateATR(highs, lows, closes, 14);

    let trend = "Sideways";
    if (ema20 > ema50 && ema50 > ema200) trend = "Strong Uptrend";
    if (ema20 < ema50 && ema50 < ema200) trend = "Strong Downtrend";

    const support = [
      Math.min(...closes.slice(-20)).toFixed(3),
      Math.min(...lows.slice(-20)).toFixed(3),
      Math.min(...closes.slice(-50)).toFixed(3),
    ];

    const resistance = [
      Math.max(...closes.slice(-20)).toFixed(3),
      Math.max(...highs.slice(-20)).toFixed(3),
      Math.max(...closes.slice(-50)).toFixed(3),
    ];

    const megaPrompt = `
You are AnalyticaX Neural Engine.
Using the REAL indicators provided:

Asset Type: ${assetType}
Symbol: ${finalSymbol}
Timeframe: ${finalTimeframe}
Current Price (USD): ${currentPriceUSD ? currentPriceUSD.toFixed(2) : "N/A"}
Current Price (USDT): ${currentPriceUSDT ? currentPriceUSDT.toFixed(2) : "N/A"}
EMA20: ${ema20.toFixed(3)}
EMA50: ${ema50.toFixed(3)}
EMA200: ${ema200.toFixed(3)}
ATR14: ${atr.toFixed(4)}
Trend: ${trend}
Support: ${support.join(", ")}
Resistance: ${resistance.join(", ")}

Provide analysis in USD and USDT values. All price targets should be in both USD and USDT.

RETURN RAW JSON ONLY:
{
 "pattern": "",
 "bollinger": {"upper":"","middle":"","lower":""},
 "forecast": {"primary":"","secondary":"","low":""},
 "forecastUSD": {"primary":"","secondary":"","low":""},
 "forecastUSDT": {"primary":"","secondary":"","low":""},
 "probUp": 0,
 "probDown": 0,
 "heatmap": {"bull":0,"neutral":0,"bear":0},
 "risk": "",
 "leverage": "",
 "aiComment": "",
 "longIdea": "",
 "shortIdea": "",
 "currentPriceUSD": ${currentPriceUSD || "null"},
 "currentPriceUSDT": ${currentPriceUSDT || "null"}
}
`;

    let raw = await askGemini(megaPrompt, imageBase64);

    let ai;
    try {
      ai = JSON.parse(raw);
    } catch {
      raw = await askGemini(megaPrompt, imageBase64);
      ai = JSON.parse(raw);
    }

    const today = new Date().toISOString().split("T")[0];

    if (!user.lastFreeCreditDate) {
      user.lastFreeCreditDate = today;
      user.freeUsed = 0;
    }

    let usingFree = false;

    if (user.lastFreeCreditDate !== today) {
      user.lastFreeCreditDate = today;
      user.freeUsed = 0;
      usingFree = true;
      user.freeUsed++;
    } else {
      if (user.freeUsed < 1) {
        usingFree = true;
        user.freeUsed++;
      } else {
        if (user.credits <= 0) {
          return res.json({ ok: false, error: "No credits left." });
        }
        user.credits--;
      }
    }

    if (!user.history) user.history = [];

    const record = {
      _id: crypto.randomUUID(),
      queryId,
      userId: user._id,
      axId: generateAXID(),
      symbol: finalSymbol,
      timeframe: finalTimeframe,
      trend,
      risk: ai.risk,
      status: "ok",
      imageBase64: imageBase64,  
      result: ai,
      createdAt: new Date(),
    };

    user.history.push(record);

    user.totalAnalyses = (user.totalAnalyses || 0) + 1;

    if (user.lastAnalyseDate !== today) {
      user.todayAnalyses = 0;
      user.lastAnalyseDate = today;
    }

    user.todayAnalyses = (user.todayAnalyses || 0) + 1;

    await user.save();

    return res.json({
      ok: true,
      queryId,
      historyId: record._id,
      usedFree: usingFree,
      creditsLeft: user.credits,
      data: {
        assetType: assetType,
        symbol: finalSymbol,
        timeframe: finalTimeframe,
        trend,
        atr: atr.toFixed(4),
        ema: {
          ema20: ema20.toFixed(3),
          ema50: ema50.toFixed(3),
          ema200: ema200.toFixed(3),
        },
        support,
        resistance,
        pattern: ai.pattern,
        bollinger: ai.bollinger,
        forecast: ai.forecast,
        forecastUSD: ai.forecastUSD || ai.forecast,
        forecastUSDT: ai.forecastUSDT || ai.forecast,
        probUp: ai.probUp,
        probDown: ai.probDown,
        heatmap: ai.heatmap,
        risk: ai.risk,
        leverage: ai.leverage,
        aiComment: ai.aiComment,
        longIdea: ai.longIdea,
        shortIdea: ai.shortIdea,
        currentPriceUSD: currentPriceUSD,
        currentPriceUSDT: currentPriceUSDT,
      },
    });

  } catch (err) {
    console.error("❌ GEMINI ERROR:", err);
    console.error("   Error type:", err.constructor.name);
    console.error("   Error message:", err.message);
    console.error("   Error status:", err.status || err.statusCode);
    if (err.error) {
      console.error("   Error details:", JSON.stringify(err.error, null, 2));
    }
    
    // Check for specific API key errors
    const errorMessage = err.message || "";
    const errorDetails = err.error || {};
    const hasApiKeyError = 
      errorMessage.includes("API key") || 
      errorMessage.includes("API_KEY") || 
      errorMessage.includes("API key not valid") ||
      errorMessage.includes("API_KEY_INVALID") ||
      errorDetails.reason === "API_KEY_INVALID" ||
      (err.status === 400 && errorMessage.includes("API"));
    
    if (hasApiKeyError) {
      console.error("🔑 API Key Error Detected!");
      console.error("   API Key exists:", !!process.env.GEMINI_API_KEY);
      console.error("   API Key (first 10 chars):", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 10) + "..." : "NOT SET");
      console.error("   API Key length:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0);
      
      return res.status(500).json({ 
        ok: false, 
        error: "AI service configuration error. The GEMINI_API_KEY may be invalid, expired, or not activated in Google AI Studio.",
        details: "Please verify the API key in Railway environment variables and ensure it's active in Google AI Studio (https://aistudio.google.com/apikey). Contact support@AnalyticaX.com.tr for assistance."
      });
    }
    
    // Check for network/connection errors
    if (err.message && (err.message.includes("fetch") || err.message.includes("network") || err.message.includes("ECONNREFUSED") || err.message.includes("ENOTFOUND"))) {
      return res.status(500).json({ 
        ok: false, 
        error: "AI service connection error. Please try again later.",
        details: err.message
      });
    }
    
    // Generic error
    return res.status(500).json({ 
      ok: false, 
      error: err.message || "Analysis failed. Please try again or contact support@AnalyticaX.com.tr",
      details: process.env.NODE_ENV !== 'production' ? err.stack : undefined
    });
  }
};


function generateQueryId() {
  const uuid = crypto.randomUUID().replace(/-/g,"").slice(0,12);
  const ts = new Date().toISOString().split("T")[0].replace(/-/g,"");
  return `AXQ-${ts}-${uuid}`;
}

exports.getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.json({ ok: false, error: "User not found" });

    if (!user.history) return res.json([]);

    const list = [...user.history].reverse();
    return res.json(list);
  } catch (err) {
    console.error("HISTORY ERROR:", err);
    return res.json({ ok: false, error: err.message });
  }
};

exports.changeEmail = async (req, res) => {
  try {
    const user = req.user;
    const { email } = req.body;

    if (!email) {
      return res.json({ ok: false, message: "Email is required." });
    }

    const exists = await User.findOne({ email });
    if (exists && exists._id.toString() !== user._id.toString()) {
      return res.json({ ok: false, message: "Email already in use." });
    }

    user.email = email;
    await user.save();

    return res.json({ ok: true, message: "Email updated." });
  } catch (err) {
    console.error("EMAIL UPDATE ERROR:", err);
    return res.json({ ok: false, message: "Email update failed." });
  }
};

const bcrypt = require("bcryptjs");

exports.changePassword = async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.json({ ok: false, message: "Both passwords are required." });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.json({ ok: false, message: "Current password is incorrect." });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return res.json({ ok: true, message: "Password updated." });
  } catch (err) {
    console.error("PASSWORD UPDATE ERROR:", err);
    return res.json({ ok: false, message: "Password update failed." });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const user = req.user;

    await User.findByIdAndDelete(user._id);

    return res.json({ ok: true, message: "Account deleted." });
  } catch (err) {
    console.error("DELETE ACCOUNT ERROR:", err);
    return res.json({ ok: false, message: "Delete failed." });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.json({ ok: false, error: "Invalid token" });
    }

    const deviceId = req.headers["x-device-id"] || user.deviceId || null;
    const fingerprint =
      req.headers["x-device-fingerprint"] || user.deviceFingerprint || null;

    const ip =
      req.headers["cf-connecting-ip"] || 
      req.headers["x-real-ip"] ||        
      (req.headers["x-forwarded-for"]
        ? req.headers["x-forwarded-for"].split(",")[0].trim()
        : null) ||
      req.ip ||
      req.connection?.remoteAddress ||
      "unknown";

    const plan = user.premium ? "Premium" : "Free";

    const today = new Date().toISOString().split("T")[0];
    let dailyFree = 1;

    if (user.lastFreeCreditDate !== today) {
      dailyFree = 1; 
    } else {
      dailyFree = Math.max(0, 1 - (user.freeUsed || 0));
    }

    return res.json({
      ok: true,

      email: user.email,
      premium: user.premium,
      plan: plan,

      credits: user.credits ?? 0,
      dailyFree: dailyFree,

      totalAnalyses: user.totalAnalyses ?? 0,
      todayAnalyses: user.todayAnalyses ?? 0,

      deviceId: deviceId,
      deviceFingerprint: fingerprint,
      ipAddress: ip
    });

  } catch (err) {
    console.error("GET ME ERROR:", err);
    return res.json({ ok: false, error: err.message });
  }
};




