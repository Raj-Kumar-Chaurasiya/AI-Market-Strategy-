import { useState } from "react";
import axios from "axios";

function KeywordTool() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateKeywords = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login first");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setKeywords([]);

      const res = await axios.post(
        "http://localhost:5050/api/keywords",
        { topic },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data?.result || res.data?.keywords || "";
      if (!data) {
        setKeywords([]);
        setError("No keywords returned from server.");
        return;
      }

      if (Array.isArray(data)) {
        setKeywords(data);
      } else if (typeof data === "string") {
        setKeywords(
          data.split(",").map((k) => k.trim()).filter(Boolean)
        );
      } else {
        setKeywords([]);
        setError("Unexpected response format from server.");
      }
    } catch (err) {
      console.error("Keyword generation failed:", err);
      if (err.response?.status === 401) {
        setError("Unauthorized. Please login again.");
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to generate keywords. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!keywords.length) return setError("No keywords to copy");
    navigator.clipboard.writeText(keywords.join(", "));
    setError("Copied to clipboard!");
    setTimeout(() => setError(""), 2000);
  };

  const downloadKeywords = () => {
    if (!keywords.length) return setError("No keywords to download");
    const blob = new Blob([keywords.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "keywords.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Inline CSS styles
  const containerStyle = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "25px",
    borderRadius: "15px",
    backgroundColor: "#f9fafb",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
    textAlign: "center",
    color: "#2563eb",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "15px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    fontWeight: "600",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: loading ? "#9ca3af" : "#3b82f6",
    cursor: loading ? "not-allowed" : "pointer",
    transition: "all 0.3s",
    marginBottom: "10px",
  };

  const errorStyle = {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  };

  const keywordContainerStyle = {
    marginTop: "20px",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  };

  const btnGroupStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "15px",
  };

  const actionBtnStyle = {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    color: "#fff",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>🔑 AI Keyword Generator</h2>

      <input
        type="text"
        placeholder="Enter topic (e.g., Digital Marketing)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={inputStyle}
      />

      <button style={buttonStyle} onClick={generateKeywords} disabled={loading}>
        {loading ? "Generating..." : "Generate Keywords"}
      </button>

      {error && <p style={errorStyle}>{error}</p>}

      {keywords.length > 0 && (
        <div style={keywordContainerStyle}>
          <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>Keywords</h3>
          <ul style={{ paddingLeft: "20px", marginBottom: "10px" }}>
            {keywords.map((k, i) => (
              <li key={i}>{k}</li>
            ))}
          </ul>

          <div style={btnGroupStyle}>
            <button
              style={{ ...actionBtnStyle, backgroundColor: "#22c55e" }}
              onClick={copyToClipboard}
            >
              Copy
            </button>
            <button
              style={{ ...actionBtnStyle, backgroundColor: "#8b5cf6" }}
              onClick={downloadKeywords}
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default KeywordTool;
