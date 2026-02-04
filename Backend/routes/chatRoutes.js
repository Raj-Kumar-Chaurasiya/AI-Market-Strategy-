import express from "express";
import ChatHistory from "../models/ChatHistory.js";

const router = express.Router();

router.post("/save-chat", async (req, res) => {
  const { userMessage, aiResponse } = req.body;

  await ChatHistory.create({ userMessage, aiResponse });

  res.json({ success: true });
});

export default router;
