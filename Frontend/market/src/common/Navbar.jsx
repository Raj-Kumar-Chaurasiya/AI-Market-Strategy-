// Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password) return alert("Please enter username and password");
    alert("Signup successful! Please login.");
    setShowSignup(false);
    setShowLogin(true);
    setUsername("");
    setPassword("");
  };

  const handleLogin = () => {
    if (!username || !password) return alert("Please enter username and password");
    alert(`Welcome, ${username}!`);
    setLoggedIn(true);
    setShowLogin(false);
    setUsername("");
    setPassword("");
    navigate("/"); // Go to home after login
  };

  // Inline styles
  const navStyle = {
    background: "#1f2937",
    color: "white",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  };

  const linkStyle = {
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: "6px",
    color: "white",
    fontWeight: "500",
    textDecoration: "none",
    transition: "0.2s",
  };

  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const dialogStyle = {
    background: "white",
    padding: "35px 40px",
    borderRadius: "15px",
    width: "350px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.2s",
  };

  return (
    <>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/content-generator" style={linkStyle}>Content Generator</Link>
        <Link to="/keyword-tool" style={linkStyle}>Keyword Tool</Link>
        <Link to="/strategy-recommender" style={linkStyle}>Strategy Recommender</Link>
        <Link to="/email-generator" style={linkStyle}>Email Generator</Link>

        {!loggedIn && (
          <span style={{ ...linkStyle, color: "#facc15" }} onClick={() => setShowSignup(true)}>Signup</span>
        )}
        {!loggedIn && (
          <span style={{ ...linkStyle, color: "#34d399" }} onClick={() => setShowLogin(true)}>Login</span>
        )}
        {loggedIn && (
          <span style={{ ...linkStyle, color: "#f87171" }} onClick={() => setLoggedIn(false)}>Logout</span>
        )}
      </nav>

      {/* Signup Modal */}
      {showSignup && (
        <div style={modalStyle} onClick={() => setShowSignup(false)}>
          <div style={dialogStyle} onClick={(e) => e.stopPropagation()}>
            <h2>Signup</h2>
            <input type="text" placeholder="Username" style={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} />
            <button style={buttonStyle} onClick={handleSignup}>Signup</button>
            <p style={{ marginTop: "10px", fontSize: "14px" }}>
              Already have an account?{" "}
              <span style={{ color: "#3b82f6", cursor: "pointer" }} onClick={() => { setShowSignup(false); setShowLogin(true); }}>Login</span>
            </p>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div style={modalStyle} onClick={() => setShowLogin(false)}>
          <div style={dialogStyle} onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <input type="text" placeholder="Username" style={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} />
            <button style={buttonStyle} onClick={handleLogin}>Login</button>
            <p style={{ marginTop: "10px", fontSize: "14px" }}>
              Don't have an account?{" "}
              <span style={{ color: "#3b82f6", cursor: "pointer" }} onClick={() => { setShowLogin(false); setShowSignup(true); }}>Signup</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
