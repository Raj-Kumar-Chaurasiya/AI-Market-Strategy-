import { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation
    if (!username || !password) {
      alert("Username and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5050/api/signup",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      alert(res.data.message || "Signup successful");
      setUsername("");
      setPassword("");
    } catch (err) {
      // ✅ Show backend error message
      const msg =
        err.response?.data?.error || "Signup failed. Try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white p-2 w-full disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
