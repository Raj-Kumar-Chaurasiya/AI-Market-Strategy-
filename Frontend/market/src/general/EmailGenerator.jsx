import { useState } from "react";
import axios from "axios";

function EmailGenerator() {
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateEmail = async () => {
    if (!details.trim()) {
      setError("Please enter email details");
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
      setEmail("");

      const res = await axios.post(
        "http://localhost:5050/api/email",
        { details },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.email;
      if (Array.isArray(data)) {
        setEmail(data.join("\n"));
      } else {
        setEmail(data);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Unauthorized. Please login again.");
      } else {
        setError("Failed to generate email.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!email) return setError("No email content to copy");
    navigator.clipboard.writeText(email);
    setError("Copied to clipboard!");
    setTimeout(() => setError(""), 2000);
  };

  const downloadEmail = () => {
    if (!email) return setError("No email content to download");
    const blob = new Blob([email], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-email.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Inline styles
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

  const textareaStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "vertical",
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

  const emailContainerStyle = {
    marginTop: "20px",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    whiteSpace: "pre-wrap",
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
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>📧 AI Email Generator</h2>

      <textarea
        style={textareaStyle}
        rows={5}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Enter email details: subject, audience, tone, purpose..."
      />

      <button style={buttonStyle} onClick={generateEmail} disabled={loading}>
        {loading ? "Generating..." : "Generate Email"}
      </button>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      {email && (
        <div style={emailContainerStyle}>
          <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>
            Generated Email
          </h3>
          <p>{email}</p>
          <div style={btnGroupStyle}>
            <button
              style={{ ...actionBtnStyle, backgroundColor: "#22c55e", color: "#fff" }}
              onClick={copyToClipboard}
            >
              Copy
            </button>
            <button
              style={{ ...actionBtnStyle, backgroundColor: "#8b5cf6", color: "#fff" }}
              onClick={downloadEmail}
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailGenerator;
