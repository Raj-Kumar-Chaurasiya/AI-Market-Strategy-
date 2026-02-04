import { useState } from "react";
import RajImage from "./assets/team/raj.png";

function Team() {
  const [showPopup, setShowPopup] = useState(false);

  /* ================= MAIN STYLES ================= */

  const containerStyle = {
    maxWidth: "1100px",
    margin: "80px auto",
    padding: "50px",
    borderRadius: "30px",
    background:
      "linear-gradient(145deg, #020617, #020617), radial-gradient(circle at left, #2563eb, transparent 55%)",
    backgroundBlendMode: "overlay",
    boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "3.2rem",
    fontWeight: "900",
    marginBottom: "60px",
    background: "linear-gradient(90deg, #38bdf8, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const contentWrapperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "70px",
    flexWrap: "wrap",
  };

  const imageWrapperStyle = {
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    padding: "6px",
    background: "linear-gradient(135deg, #38bdf8, #6366f1)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  };

  const infoStyle = {
    maxWidth: "500px",
  };

  const badgeStyle = {
    display: "inline-block",
    padding: "10px 22px",
    borderRadius: "25px",
    background: "linear-gradient(90deg, #38bdf8, #6366f1)",
    fontWeight: "700",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  };

  /* ================= POPUP STYLES ================= */

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  };

  const popupStyle = {
    width: "90%",
    maxWidth: "500px",
    background: "#020617",
    borderRadius: "25px",
    padding: "35px",
    boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
    color: "#fff",
    textAlign: "center",
    transform: "scale(1)",
    animation: "fadeIn 0.3s ease",
  };

  const closeBtnStyle = {
    position: "absolute",
    top: "15px",
    right: "20px",
    fontSize: "1.8rem",
    cursor: "pointer",
    color: "#93c5fd",
  };

  return (
    <>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Meet Our Expert</h2>

        <div style={contentWrapperStyle}>
          {/* IMAGE */}
          <div style={imageWrapperStyle}>
            <img src={RajImage} alt="Raj Kumar" style={imageStyle} />
          </div>

          {/* INFO */}
          <div style={infoStyle}>
            <h3 style={{ fontSize: "2.4rem", fontWeight: "900" }}>
              Raj Kumar Chaurasiya
            </h3>
            <p style={{ color: "#93c5fd", marginBottom: "20px" }}>
              Backend Engineer & System Architect
            </p>

            <p style={{ lineHeight: "1.8", marginBottom: "25px" }}>
              Raj is responsible for building scalable backend systems, secure
              APIs, and performance-optimized architectures that power AI-based
              platforms.
            </p>

            {/* CLICK TO OPEN POPUP */}
            <span style={badgeStyle} onClick={() => setShowPopup(true)}>
              Core Developer
            </span>
          </div>
        </div>
      </div>

      {/* ================= POPUP ================= */}
      {showPopup && (
        <div style={overlayStyle} onClick={() => setShowPopup(false)}>
          <div style={popupStyle} onClick={(e) => e.stopPropagation()}>
            <span style={closeBtnStyle} onClick={() => setShowPopup(false)}>
              &times;
            </span>

            <h3 style={{ fontSize: "2rem", marginBottom: "15px" }}>
              Core Developer Role
            </h3>

            <p style={{ lineHeight: "1.8", color: "#e5e7eb" }}>
              As a Core Developer, Raj leads backend architecture, API security,
              database design, system scalability, and performance optimization.
              He ensures clean code standards, long-term maintainability, and
              seamless AI integrations.
            </p>

            <p style={{ marginTop: "15px", color: "#93c5fd" }}>
              Tech Stack: Node.js • MongoDB • Express • REST APIs • System Design
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Team;
