import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (<header style={{ background: "#0ea5a3", color: "#fff", padding: 12 }}>
    <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1 style={{ margin: 0 }}>Mi Finanzas</h1>
      <nav className="small bold bg-white">App - Record Pagos</nav>
      <div className={darkMode ? "dark" : ""}>
    <button
      className="btn btn-secondary"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
    </button>
  </div>
    </div>
  </header>)
};

export default Navbar;
