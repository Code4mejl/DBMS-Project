import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>🍏 NutriTrack</h1>
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}
