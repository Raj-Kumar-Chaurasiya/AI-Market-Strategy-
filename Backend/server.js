// ===================== Imports =====================
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import dotenv from "dotenv";
import OpenAI from "openai";

import connectDB from "./db.js";
import chatRoutes from "./routes/chatRoutes.js";

// ===================== Config =====================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const SECRET_KEY = process.env.SECRET_KEY || "default-secret-key";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("⚠️ OpenAI API key not set in .env file");
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// ===================== Middleware =====================
app.use(cors());
app.use(express.json());

// ===================== Database =====================
connectDB();

// ===================== Routes =====================
app.use("/api/chat", chatRoutes);

// ===================== Users =====================
let users = [];
try {
  if (fs.existsSync("users.json")) {
    users = JSON.parse(fs.readFileSync("users.json", "utf8"));
  } else {
    fs.writeFileSync("users.json", "[]");
  }
} catch (err) {
  console.error("Error reading users.json:", err);
  users = [];
}

// ===================== Health Check =====================
app.get("/", (req, res) => res.send("🚀 Backend running"));

// ===================== Signup =====================
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    if (users.find(u => u.username === username))
      return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    users.push({ username, password: hashed });
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// ===================== Login =====================
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Wrong password" });

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// ===================== AI Helper =====================
async function askAI(prompt) {
  if (!OPENAI_API_KEY)
    throw new Error("OpenAI API key not set. Check your .env file.");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0]?.message?.content?.trim() || "No content returned";
  } catch (err) {
    console.error("OpenAI API error:", err);
    throw new Error("AI generation failed: " + err.message);
  }
}

// ===================== AI Endpoints =====================
app.post("/api/generate-content", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    const content = await askAI(prompt);
    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/keywords", async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: "Topic required" });

    const result = await askAI(
      `Generate a list of SEO keywords for: ${topic}. Return only comma-separated keywords.`
    );

    const keywords = result.split(",").map(k => k.trim()).filter(Boolean);
    res.json({ keywords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/strategy", async (req, res) => {
  try {
    const { business } = req.body;
    if (!business) return res.status(400).json({ error: "Business name required" });

    const result = await askAI(`Create a marketing strategy for: ${business}`);
    res.json({ strategy: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/email", async (req, res) => {
  try {
    const { details } = req.body;
    if (!details) return res.status(400).json({ error: "Email details required" });

    const result = await askAI(`Write a professional email for: ${details}`);
    res.json({ email: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===================== Start Server =====================
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
