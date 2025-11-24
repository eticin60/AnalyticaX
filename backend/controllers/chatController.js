require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

exports.chat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    console.log("Chat request received:", { message: message?.substring(0, 50), historyLength: history.length });

    if (!message || message.trim().length === 0) {
      return res.json({ ok: false, error: "Message is required" });
    }

    // Check if GEMINI_API_KEY is set
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return res.status(500).json({ 
        ok: false, 
        error: "AI service is not configured. Please contact support." 
      });
    }

    // Build conversation history - handle both "assistant" and "model" roles
    const chatHistory = history.map(msg => {
      const role = msg.role === "user" ? "user" : "model";
      return {
        role: role,
        parts: [{ text: msg.content || msg.message || "" }]
      };
    }).filter(msg => msg.parts[0].text.trim().length > 0);

    // System prompt for AnalyticaX AI assistant
    const systemPrompt = `You are AnalyticaX AI Assistant, a friendly and helpful AI assistant for a cryptocurrency chart analysis platform. 

Your role:
- Help users understand how to use AnalyticaX
- Answer questions about cryptocurrency trading, chart analysis, and technical indicators
- Provide general information about crypto markets (but always remind users this is not financial advice)
- Be friendly, professional, and concise
- Use emojis occasionally to make conversations more engaging
- If asked about specific price predictions or investment advice, remind users that you provide educational information only

Keep responses concise (2-3 sentences max) unless the user asks for detailed explanations.`;

    // Build full history with system prompt
    const fullHistory = [
      {
        role: "user",
        parts: [{ text: systemPrompt }]
      },
      {
        role: "model",
        parts: [{ text: "Merhaba! Ben AnalyticaX AI asistanınız. Size nasıl yardımcı olabilirim? 😊" }]
      },
      ...chatHistory
    ];

    console.log("Starting chat with history length:", fullHistory.length);

    const chat = model.startChat({
      history: fullHistory
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    console.log("Chat response received, length:", text?.length || 0);

    return res.json({
      ok: true,
      message: text
    });

  } catch (err) {
    console.error("Chat error:", err);
    console.error("Error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    return res.status(500).json({ 
      ok: false, 
      error: err.message || "Failed to get AI response. Please check server logs." 
    });
  }
};

