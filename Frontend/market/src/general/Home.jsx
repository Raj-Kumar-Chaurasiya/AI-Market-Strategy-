import { Link } from "react-router-dom";

function Home() {
  const containerStyle = {
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top, #38bdf8, transparent 55%), linear-gradient(135deg, #020617, #020617)",
    color: "#fff",
    textAlign: "center",
    padding: "60px 25px",
    borderRadius: "26px",
    margin: "30px auto",
    maxWidth: "1100px",
    boxShadow:
      "0 30px 80px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05)",
    position: "relative",
    overflow: "hidden",
  };

  const glowOrbStyle = {
    position: "absolute",
    width: "420px",
    height: "420px",
    background: "radial-gradient(circle, #38bdf8, transparent 70%)",
    top: "-120px",
    right: "-120px",
    opacity: 0.35,
    filter: "blur(60px)",
  };

  const titleStyle = {
    fontSize: "3.8rem",
    fontWeight: "900",
    marginBottom: "22px",
    letterSpacing: "1px",
    background: "linear-gradient(90deg, #38bdf8, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 10px 25px rgba(0,0,0,0.6)",
  };

  const subtitleStyle = {
    fontSize: "1.35rem",
    maxWidth: "760px",
    marginBottom: "45px",
    lineHeight: "1.75",
    color: "#e0f2fe",
    opacity: 0.95,
  };

  const buttonsWrapperStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "18px",
    marginTop: "10px",
  };

  const buttonStyle = {
    padding: "15px 30px",
    fontSize: "1.05rem",
    fontWeight: "700",
    color: "#020617",
    background: "linear-gradient(135deg, #38bdf8, #818cf8)",
    border: "none",
    borderRadius: "999px",
    cursor: "pointer",
    boxShadow:
      "0 10px 25px rgba(56,189,248,0.5), inset 0 0 0 1px rgba(255,255,255,0.4)",
    transition: "all 0.35s ease",
    textDecoration: "none",
    position: "relative",
    overflow: "hidden",
  };

  const buttonHoverStyle = {
    transform: "translateY(-4px) scale(1.05)",
    boxShadow:
      "0 18px 45px rgba(56,189,248,0.75), inset 0 0 0 1px rgba(255,255,255,0.6)",
  };

  return (
    <div style={containerStyle}>
      <div style={glowOrbStyle}></div>

      <h1 style={titleStyle}>AI Marketing Strategy Platform</h1>

      <p style={subtitleStyle}>
        Supercharge your marketing with AI-powered tools. Generate high-quality
        content, discover high-ranking keywords, craft data-driven strategies,
        and send professional emails — all from one intelligent platform.
      </p>

      <div style={buttonsWrapperStyle}>
        {[
          { path: "/content-generator", label: "Content Generator" },
          { path: "/keyword-tool", label: "Keyword Tool" },
          { path: "/strategy-recommender", label: "Strategy Recommender" },
          { path: "/email-generator", label: "Email Generator" },
        ].map((btn, index) => (
          <Link
            key={index}
            to={btn.path}
            style={buttonStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, buttonHoverStyle)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, buttonStyle)
            }
          >
            {btn.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
