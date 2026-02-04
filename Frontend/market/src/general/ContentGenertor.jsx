import { useState, useEffect, useRef } from "react";
import axios from "axios";

function ContentGenerator() {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const debounceRef = useRef(null);

  /* ---------------- HISTORY ---------------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("contentHistory") || "[]");
    setHistory(saved);
  }, []);

  const saveHistory = (entry) => {
    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, 10);
      localStorage.setItem("contentHistory", JSON.stringify(updated));
      return updated;
    });
  };

  /* ---------------- API ---------------- */
  const generateContent = async () => {
    if (!prompt.trim()) return setError("Please enter a prompt");

    const token = localStorage.getItem("token");
    if (!token) return setError("Please login first");

    try {
      setLoading(true);
      setError("");
      setContent("");

      const res = await axios.post(
        "http://localhost:5050/api/generate-content",
        { prompt },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const generatedContent = res.data.content || "";
      if (!generatedContent) setError("AI returned empty content");
      setContent(generatedContent);

      saveHistory({
        prompt,
        content: generatedContent,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      setError("Failed to generate content. Check your API or network.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(generateContent, 300);
  };

  /* ---------------- SHORTCUT ---------------- */
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Enter") handleGenerate();
  };

  const copyToClipboard = () => {
    if (!content) return setError("No content to copy");
    navigator.clipboard.writeText(content);
    setError("Copied to clipboard!");
    setTimeout(() => setError(""), 2000);
  };

  const downloadContent = () => {
    if (!content) return setError("No content to download");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-content.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const examples = [
    "Write a blog post about AI in marketing",
    "Generate Instagram captions for a product launch",
    "Create a landing page headline for a SaaS app",
  ];

  /* ---------------- STYLES ---------------- */
  const containerStyle = {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "24px",
    backgroundColor: "#f9fafb",
    borderRadius: "16px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "20px",
    textAlign: "center",
    color: "#2563eb",
  };

  const textareaStyle = {
    width: "100%",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    resize: "vertical",
  };

  const generateBtnStyle = {
    width: "100%",
    padding: "15px",
    marginTop: "12px",
    borderRadius: "12px",
    backgroundColor: loading ? "#9ca3af" : "#3b82f6",
    color: "#fff",
    fontWeight: "700",
    fontSize: "16px",
    cursor: loading ? "not-allowed" : "pointer",
    border: "none",
  };

  const contentStyle = {
    backgroundColor: "#ffffff",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    whiteSpace: "pre-wrap",
  };

  const historyItemStyle = {
    backgroundColor: "#f3f4f6",
    padding: "14px",
    marginBottom: "10px",
    borderRadius: "12px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>🤖 AI Content Generator</h2>

      <textarea
        style={textareaStyle}
        rows="4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe what you want... (Ctrl + Enter)"
      />

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
        <span style={{ fontSize: "13px", color: "#6b7280" }}>
          Characters: {prompt.length}
        </span>
        <button
          onClick={() => setPrompt("")}
          style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}
        >
          Clear
        </button>
      </div>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
        {examples.map((ex, i) => (
          <button
            key={i}
            onClick={() => setPrompt(ex)}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "none",
              background: "#e5e7eb",
              cursor: "pointer",
            }}
          >
            {ex}
          </button>
        ))}
      </div>

      <button style={generateBtnStyle} onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating AI Content..." : "Generate"}
      </button>

      {error && <p style={{ color: "#dc2626", textAlign: "center" }}>{error}</p>}

      {content && (
        <div style={contentStyle}>
          <h3>Generated Content</h3>
          <p>{content}</p>

          <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
            <button
              style={{ flex: 1, padding: "10px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "8px" }}
              onClick={copyToClipboard}
            >
              Copy
            </button>
            <button
              style={{ flex: 1, padding: "10px", background: "#8b5cf6", color: "#fff", border: "none", borderRadius: "8px" }}
              onClick={downloadContent}
            >
              Download
            </button>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Recent History</h3>
          {history.map((item, i) => (
            <div
              key={i}
              style={historyItemStyle}
              onClick={() => setPrompt(item.prompt)}
            >
              <strong>{item.prompt}</strong>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                {new Date(item.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContentGenerator;
  