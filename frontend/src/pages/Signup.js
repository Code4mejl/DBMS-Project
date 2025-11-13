import React, { useState } from "react";
import API from "../api.js";
import { useNavigate } from "react-router-dom";
import "../index.css"; // import the new CSS file

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    height: "",
    activity_level: "Medium",
    goal: "Maintain Weight",
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await API.post("/users/signup", form);
      alert("Signup successful! You can now login.");
      navigate("/login");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Signup failed"));
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🍏 Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(form).map((key) => (
            <div className="form-group" key={key}>
              <label>
                {key === "password"
                  ? "Password"
                  : key.replace("_", " ").toUpperCase()}
              </label>
              <input
                type={key === "password" ? "password" : "text"}
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                required
              />
            </div>
          ))}
          <button type="submit">Sign Up</button>
          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}
