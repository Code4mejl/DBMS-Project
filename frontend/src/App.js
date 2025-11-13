// import React from 'react';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import './index.css';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <nav className="navbar">
//         <h1>🍎 NutriTrack</h1>
//         <div className="navbar-links">
//           <Link to="/">Dashboard</Link>
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Signup</Link>
//         </div>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Dashboard from "./pages/Dashboard.js";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
