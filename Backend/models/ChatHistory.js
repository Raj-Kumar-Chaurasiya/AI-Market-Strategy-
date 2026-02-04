import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema({
  userMessage: String,
  aiResponse: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ChatHistory", chatHistorySchema);
