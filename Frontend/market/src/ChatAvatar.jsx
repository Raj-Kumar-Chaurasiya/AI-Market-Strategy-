import { useState, useRef, useEffect } from "react";
import axios from "axios";

function ChatAvatar() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // chat history
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Drag position
  const [position, setPosition] = useState({ x: 30, y: 30 });
  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const API_URL = "http://localhost:5050"; // Change to your backend URL if needed

  // Load chat history from backend on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/chat/history`);
        setMessages(res.data || []);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };
    fetchHistory();
  }, []);

  // Send message to AI and save
  const sendMessage = async () => {
    if (!message.trim()) return alert("Please enter a message");
    setLoading(true);

    try {
      // 1️⃣ Send message to AI endpoint
      const aiRes = await axios.post(`${API_URL}/api/generate-content`, {
        prompt: message,
      });
      const aiText = aiRes.data.content || "No response from AI";

      // 2️⃣ Save chat to backend
      await axios.post(`${API_URL}/api/chat/save-chat`, {
        userMessage: message,
        aiResponse: aiText,
      });

      // 3️⃣ Update local chat state
      setMessages((prev) => [...prev, { user: message, ai: aiText }]);
      setMessage(""); // Clear input
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Something went wrong while sending your message");
    } finally {
      setLoading(false);
    }
  };

  // Drag handlers
  const onMouseDown = (e) => {
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    setPosition({
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y,
    });
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  /* ---------- STYLES ---------- */
  const buttonStyle = {
    position: "fixed",
    left: position.x,
    bottom: position.y,
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    color: "#fff",
    border: "none",
    cursor: "grab",
    fontSize: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
    zIndex: 1000,
  };

  const chatStyle = {
    position: "fixed",
    left: position.x,
    bottom: position.y + 75,
    width: "300px",
    maxHeight: "400px",
    background: "#fff",
    borderRadius: "16px",
    padding: "14px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    animation: "fadeIn 0.3s ease",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    marginBottom: "8px",
  };

  const sendBtnStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: loading ? "#9ca3af" : "#2563eb",
    color: "#fff",
    fontWeight: "600",
    cursor: loading ? "not-allowed" : "pointer",
    marginBottom: "8px",
  };

  const chatHistoryStyle = {
    flex: 1,
    overflowY: "auto",
    marginBottom: "8px",
    fontSize: "14px",
  };

  const userMessageStyle = { textAlign: "right", margin: "4px 0", fontWeight: "500" };
  const aiMessageStyle = {
    textAlign: "left",
    margin: "4px 0",
    background: "#f3f4f6",
    padding: "6px 8px",
    borderRadius: "6px",
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        ref={dragRef}
        style={buttonStyle}
        onMouseDown={onMouseDown}
        onClick={() => setOpen(!open)}
      >
        🤖
      </button>

      {/* Chat Box */}
      {open && (
        <div style={chatStyle}>
          <h4 style={{ textAlign: "center", marginBottom: "8px" }}>AI Assistant</h4>

          <div style={chatHistoryStyle}>
            {messages.map((m, idx) => (
              <div key={idx}>
                <div style={userMessageStyle}>{m.user}</div>
                <div style={aiMessageStyle}>{m.ai}</div>
              </div>
            ))}
          </div>

          <input
            type="text"
            placeholder="Ask something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={inputStyle}
          />

          <button style={sendBtnStyle} disabled={loading} onClick={sendMessage}>
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      )}
    </>
  );
}

export default ChatAvatar;
