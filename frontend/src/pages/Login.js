import React, { useState } from "react";
import API from "../api.js";
import { useNavigate } from "react-router-dom";
import "../index.css"; // same CSS file for consistency

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Login failed"));
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🔑 Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
          <p className="switch-text">
            New user? <span onClick={() => navigate("/signup")}>Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
}
