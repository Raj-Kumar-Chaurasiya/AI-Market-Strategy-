import { useState } from "react";
import axios from "axios";

function StrategyRecommender() {
  const [business, setBusiness] = useState("");
  const [strategy, setStrategy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateStrategy = async () => {
    if (!business.trim()) {
      setError("Please describe your business");
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
      setStrategy("");

      const res = await axios.post(
        "http://localhost:5050/api/strategy",
        { business },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.strategy;
      if (!data || (Array.isArray(data) && data.length === 0)) {
        setError("No strategy returned from server.");
        return;
      }

      // Accept array or string
      if (Array.isArray(data)) {
        setStrategy(data.map((s) => `• ${s}`).join("\n"));
      } else {
        setStrategy(`• ${data}`);
      }

    } catch (err) {
      if (err.response?.status === 401) {
        setError("Unauthorized. Please login again.");
      } else {
        setError("Failed to generate strategy. Try again later.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!strategy) return setError("No strategy to copy");
    navigator.clipboard.writeText(strategy);
    setError("Copied to clipboard!");
    setTimeout(() => setError(""), 2000);
  };

  const downloadStrategy = () => {
    if (!strategy) return setError("No strategy to download");
    const blob = new Blob([strategy], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "strategy.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Inline CSS
  const containerStyle = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "25px",
    borderRadius: "15px",
    backgroundColor: "#f3f4f6",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "20px",
  };

  const textareaStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "15px",
    resize: "vertical",
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

  const strategyContainerStyle = {
    marginTop: "20px",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    whiteSpace: "pre-wrap",
  };

  const actionBtnGroupStyle = {
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
      <h2 style={headingStyle}>📊 AI Strategy Recommender</h2>

      <textarea
        rows={4}
        placeholder="Describe your business (industry, audience, goals)"
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
        style={textareaStyle}
      />

      <button style={buttonStyle} onClick={generateStrategy} disabled={loading}>
        {loading ? "Generating..." : "Recommend Strategy"}
      </button>

      {error && <p style={errorStyle}>{error}</p>}

      {strategy && (
        <div style={strategyContainerStyle}>
          <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>Recommended Strategy</h3>
          <p>{strategy}</p>

          <div style={actionBtnGroupStyle}>
            <button
              style={{ ...actionBtnStyle, backgroundColor: "#22c55e" }}
              onClick={copyToClipboard}
            >
              Copy
            </button>
            <button
              style={{ ...actionBtnStyle, backgroundColor: "#8b5cf6" }}
              onClick={downloadStrategy}
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StrategyRecommender;
