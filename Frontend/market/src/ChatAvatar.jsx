import { useState, useRef, useEffect } from "react";
import axios from "axios";

function ChatAvatar() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Drag position
  const [position, setPosition] = useState({ x: 30, y: 30 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const chatEndRef = useRef(null);

  // ✅ Use environment variable instead of hardcoding
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

  /* ---------------- Load Chat History ---------------- */
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/chat/history`);
        setMessages(res.data || []);
      } catch (err) {
        console.error("History fetch error:", err);
      }
    };

    fetchHistory();
  }, []);

  /* ---------------- Auto Scroll ---------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- Send Message ---------------- */
  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userText = message;
    setMessage("");
    setLoading(true);

    // Optimistic UI
    setMessages((prev) => [...prev, { user: userText, ai: "..." }]);

    try {
      const aiRes = await axios.post(`${API_URL}/api/generate-content`, {
        prompt: userText,
      });

      const aiText = aiRes.data.content || "No response from AI";

      await axios.post(`${API_URL}/api/chat/save-chat`, {
        userMessage: userText,
        aiResponse: aiText,
      });

      // Replace last loading message
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { user: userText, ai: aiText };
        return updated;
      });

    } catch (err) {
      console.error("Send message error:", err);

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          user: userText,
          ai: "⚠️ Error getting AI response",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Enter Key ---------------- */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  /* ---------------- Drag Handlers ---------------- */
  const onMouseDown = (e) => {
    isDragging.current = false;

    offsetRef.current = {
      x: e.clientX - position.x,
      y: window.innerHeight - e.clientY - position.y,
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    isDragging.current = true;

    setPosition({
      x: e.clientX - offsetRef.current.x,
      y: window.innerHeight - e.clientY - offsetRef.current.y,
    });
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  /* ---------------- Toggle Chat ---------------- */
  const handleToggle = () => {
    if (!isDragging.current) {
      setOpen((prev) => !prev);
    }
  };

  /* ---------------- Styles ---------------- */
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
    width: "320px",
    maxHeight: "420px",
    background: "#fff",
    borderRadius: "16px",
    padding: "14px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
  };

  return (
    <>
      {/* Avatar Button */}
      <button
        style={buttonStyle}
        onMouseDown={onMouseDown}
        onClick={handleToggle}
      >
        🤖
      </button>

      {/* Chat Box */}
      {open && (
        <div style={chatStyle}>
          <h4 style={{ textAlign: "center" }}>AI Assistant</h4>

          {/* Chat History */}
          <div style={{ flex: 1, overflowY: "auto", fontSize: "14px" }}>
            {messages.map((m, idx) => (
              <div key={idx}>
                <div style={{ textAlign: "right", margin: "4px 0" }}>
                  <b>{m.user}</b>
                </div>
                <div
                  style={{
                    textAlign: "left",
                    background: "#f3f4f6",
                    padding: "6px 8px",
                    borderRadius: "6px",
                    marginBottom: "4px",
                  }}
                >
                  {m.ai}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Ask something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "8px",
            }}
          />

          {/* Send Button */}
          <button
            disabled={loading}
            onClick={sendMessage}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: loading ? "#9ca3af" : "#2563eb",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      )}
    </>
  );
}

export default ChatAvatar;
