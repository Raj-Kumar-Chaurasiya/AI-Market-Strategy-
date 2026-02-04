import { useEffect, useState } from "react";

function Slider() {
  const slides = [
    {
      title: "AI Content Generation",
      short: "Create high-quality AI-powered content 🚀",
      full:
        "AI Content Generation helps you create blogs, ads, emails, and marketing copy using advanced AI models.",
    },
    {
      title: "Keyword Research Tools",
      short: "Boost SEO with smart keywords 📈",
      full:
        "Keyword tools analyze search volume, trends, and competition to find keywords that improve ranking.",
    },
    {
      title: "Marketing Strategies",
      short: "Grow your business intelligently 💡",
      full:
        "AI-driven marketing strategies optimize campaigns, improve conversions, and maximize ROI.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [paused, setPaused] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);

  // Auto slide
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      changeSlide((current + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [current, paused]);

  const changeSlide = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(index);
      setFade(true);
    }, 250);
  };

  /* ================= STYLES ================= */

  const sectionStyle = {
    width: "100%",
    overflow: "hidden", // ✅ IMPORTANT
    background: "linear-gradient(120deg, #020617, #0f172a)",
    padding: "80px 16px", // safe padding
    boxSizing: "border-box",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
    color: "#fff",
  };

  const slideBoxStyle = {
    padding: "32px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(14px)",
    transition: "opacity 0.4s ease, transform 0.4s ease",
    opacity: fade ? 1 : 0,
    transform: fade ? "translateY(0)" : "translateY(10px)",
  };

  const titleStyle = {
    fontSize: "clamp(22px, 4vw, 30px)",
    fontWeight: "800",
    color: "#38bdf8",
    cursor: "pointer",
  };

  const descStyle = {
    marginTop: "14px",
    fontSize: "clamp(15px, 2.5vw, 18px)",
    lineHeight: "1.6",
    color: "#e5e7eb",
  };

  const buttonStyle = {
    padding: "12px 24px",
    margin: "28px 8px 0",
    borderRadius: "14px",
    border: "none",
    background: "#38bdf8",
    color: "#020617",
    fontWeight: "700",
    cursor: "pointer",
  };

  /* ================= POPUP ================= */

  const popupOverlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const popupBox = {
    maxWidth: "600px",
    width: "90%",
    background: "#020617",
    padding: "35px",
    borderRadius: "20px",
    textAlign: "center",
    color: "#fff",
  };

  const closeBtn = {
    marginTop: "24px",
    padding: "10px 22px",
    borderRadius: "10px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  };

  return (
    <>
      <section
        style={sectionStyle}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={containerStyle}>
          <div style={slideBoxStyle}>
            <h3
              style={titleStyle}
              onClick={() => {
                setSelectedSlide(slides[current]);
                setShowPopup(true);
              }}
            >
              {slides[current].title}
            </h3>
            <p style={descStyle}>{slides[current].short}</p>
          </div>

          <div>
            <button
              style={buttonStyle}
              onClick={() =>
                changeSlide((current - 1 + slides.length) % slides.length)
              }
            >
              ◀ Prev
            </button>

            <button
              style={buttonStyle}
              onClick={() =>
                changeSlide((current + 1) % slides.length)
              }
            >
              Next ▶
            </button>
          </div>
        </div>
      </section>

      {showPopup && selectedSlide && (
        <div style={popupOverlay} onClick={() => setShowPopup(false)}>
          <div style={popupBox} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: "#38bdf8" }}>
              {selectedSlide.title}
            </h2>
            <p style={{ marginTop: "15px", lineHeight: "1.7" }}>
              {selectedSlide.full}
            </p>
            <button style={closeBtn} onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Slider;
