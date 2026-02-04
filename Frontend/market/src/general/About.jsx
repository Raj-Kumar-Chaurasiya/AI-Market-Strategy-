import { useState, useEffect } from "react";

function About() {
  const [pulse, setPulse] = useState(0);

  // Animate pulse for highlights
  useEffect(() => {
    const id = setInterval(() => {
      setPulse((p) => (p + 0.03) % 1);
    }, 40);
    return () => clearInterval(id);
  }, []);

  // ===================== STYLES =====================

  const containerStyle = {
    position: "relative",
    padding: "60px 30px",
    maxWidth: "900px",
    margin: "60px auto",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    lineHeight: "1.7",
    color: "#1f2937",
    textAlign: "center", // ✅ Center all content
    transition: "all 0.3s ease",
  };

  const headingStyle = {
    fontSize: "3rem",
    fontWeight: "900",
    marginBottom: "25px",
    background: "linear-gradient(90deg, #3b82f6, #06b6d4, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
    position: "relative",
  };

  const underlineStyle = {
    display: "block",
    width: "100px",
    height: "4px",
    margin: "8px auto 0", // ✅ Centered underline
    borderRadius: "2px",
    background: "linear-gradient(90deg, #3b82f6, #f472b6)",
    boxShadow: `0 0 ${10 + pulse * 15}px rgba(59,130,246,0.5)`,
    transition: "all 0.3s ease",
  };

  const paragraphStyle = {
    fontSize: "1.2rem",
    marginBottom: "20px",
    color: "#111827",
  };

  const highlightStyle = {
    background: "linear-gradient(90deg, #3b82f6, #06b6d4, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "700",
    textShadow: `0 0 ${5 + pulse * 10}px rgba(99,102,241,0.7)`,
    transition: "all 0.3s ease",
  };

  const cardStyle = {
    marginTop: "30px",
    padding: "25px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
    textAlign: "center", // ✅ Center card text
  };

  const cardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.25)";
  };

  const cardLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>
        About Us
        <span style={underlineStyle}></span>
      </h2>

      <p style={paragraphStyle}>
        At <span style={highlightStyle}>AI Marketing Strategy</span>, we leverage cutting-edge AI technology to revolutionize marketing. 
        Our solutions help businesses generate optimized content, discover high-value keywords, craft smart strategies, and enhance customer engagement.
      </p>

      <p style={{ ...paragraphStyle, fontSize: "1rem", color: "#6b7280" }}>
        Our team combines expertise in <span style={highlightStyle}>AI</span>, <span style={highlightStyle}>digital marketing</span>, and <span style={highlightStyle}>strategy</span> to drive measurable results.
      </p>

      <div
        style={cardStyle}
        onMouseEnter={cardHover}
        onMouseLeave={cardLeave}
      >
        <p style={{ fontSize: "1.1rem", color: "#111827" }}>
          🚀 We provide advanced analytics, AI-powered content suggestions, keyword optimization, and strategic guidance to accelerate your business growth.
        </p>
      </div>

      <div
        style={{ ...cardStyle, marginTop: "20px" }}
        onMouseEnter={cardHover}
        onMouseLeave={cardLeave}
      >
        <p style={{ fontSize: "1.1rem", color: "#111827" }}>
          💡 Our solutions are scalable, easy-to-use, and designed to deliver measurable ROI across all marketing channels.
        </p>
      </div>
    </div>
  );
}

export default About;
