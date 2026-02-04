import { useEffect, useState } from "react";

function Header() {
  const [angle, setAngle] = useState(0);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAngle((a) => (a + 0.6) % 360);
      setPulse((p) => (p + 0.03) % 1);
    }, 40);
    return () => clearInterval(id);
  }, []);

  /* ===================== STYLES ===================== */

  const headerStyle = {
    width: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
    padding: "26px 20px",
    backgroundImage: `
      radial-gradient(circle at 15% 20%, rgba(99,102,241,0.35), transparent 45%),
      radial-gradient(circle at 85% 30%, rgba(236,72,153,0.35), transparent 45%),
      linear-gradient(${angle}deg, #020617, #020617)
    `,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    perspective: "900px",
    boxShadow: "0 18px 50px rgba(0,0,0,0.6)",
    borderBottomLeftRadius: "24px",
    borderBottomRightRadius: "24px",
    transition: "transform 0.35s ease",
  };

  const glassBarStyle = {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    padding: "14px 28px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow:
      "inset 0 0 0 1px rgba(255,255,255,0.12), 0 15px 40px rgba(0,0,0,0.5)",
    transition: "all 0.35s ease",
  };

  const orbStyle = {
    position: "absolute",
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.55), transparent 70%)",
    filter: "blur(50px)",
    animation: "float 8s ease-in-out infinite",
    pointerEvents: "none",
  };

  const logoStyle = {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.7rem",
    fontWeight: "900",
    color: "#4f46e5",
    boxShadow: `
      0 0 ${12 + pulse * 25}px rgba(255,255,255,0.95),
      0 0 ${22 + pulse * 35}px rgba(99,102,241,0.8)
    `,
    transition: "transform 0.35s ease",
    flexShrink: 0,
  };

  const titleStyle = {
    fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
    fontWeight: "900",
    letterSpacing: "2px",
    background:
      "linear-gradient(90deg, #e0e7ff, #c7d2fe, #fbcfe8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: `
      0 0 6px rgba(255,255,255,0.6),
      0 0 16px rgba(236,72,153,0.6)
    `,
    margin: 0,
    whiteSpace: "nowrap",
  };

  /* ===================== EVENTS ===================== */

  const hoverIn = (e) => {
    e.currentTarget.style.transform =
      "translateY(-3px) rotateX(6deg) rotateY(6deg)";
    e.currentTarget.style.boxShadow =
      "0 22px 55px rgba(0,0,0,0.75)";
    e.currentTarget.children[1].style.transform = "scale(1.1)";
  };

  const hoverOut = (e) => {
    e.currentTarget.style.transform =
      "translateY(0) rotateX(0) rotateY(0)";
    e.currentTarget.style.boxShadow =
      "0 18px 50px rgba(0,0,0,0.6)";
    e.currentTarget.children[1].style.transform = "scale(1)";
  };

  return (
    <header style={headerStyle}>
      {/* Glow Orbs */}
      <div style={{ ...orbStyle, top: "-40px", left: "-40px" }} />
      <div style={{ ...orbStyle, bottom: "-40px", right: "-40px" }} />

      <div
        style={glassBarStyle}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        <div style={logoStyle}>AI</div>
        <h1 style={titleStyle}>AI Marketing Strategy</h1>
      </div>
    </header>
  );
}

export default Header;
