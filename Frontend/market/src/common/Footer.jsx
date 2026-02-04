import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [angle, setAngle] = useState(0);
  const year = new Date().getFullYear();

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 0.5) % 360);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  /* ================= INLINE STYLES ================= */

  const footerStyle = {
    width: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
    background: `linear-gradient(${angle}deg, #4f46e5, #3b82f6, #06b6d4, #8b5cf6, #f472b6)`,
    padding: "20px 16px",
    color: "#ffffff",
    boxShadow: "0 -8px 20px rgba(0,0,0,0.35)",
    borderTopLeftRadius: "18px",
    borderTopRightRadius: "18px",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "14px",
  };

  const textStyle = {
    fontSize: "0.95rem",
    fontWeight: "600",
    whiteSpace: "nowrap",
  };

  const linksStyle = {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
  };

  const linkStyle = {
    color: "#ffffff",
    fontWeight: "700",
    textDecoration: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  };

  const teamBtnStyle = {
    padding: "10px 18px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.4)",
    color: "#ffffff",
    fontWeight: "700",
    textDecoration: "none",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.3s ease",
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* LEFT */}
        <div style={textStyle}>© {year} AI Marketing Strategy</div>

        {/* CENTER */}
        <div style={linksStyle}>
          {["Twitter", "LinkedIn", "GitHub"].map((item) => (
            <a
              key={item}
              href={`https://${item.toLowerCase()}.com`}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                e.currentTarget.style.color = "#facc15";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* RIGHT */}
        <Link
          to="/team"
          style={teamBtnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.35)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.18)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          👨‍💻 Developed By 
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
