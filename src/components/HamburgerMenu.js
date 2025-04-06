// src/components/HamburgerMenu.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importar Link para el enlace
import "../styles/components/HamburgerMenu.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div
      className="hamburger-menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`hamburger-icon ${isOpen ? "open" : ""}`}
        aria-label="Toggle menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div className={`menu-options ${isOpen ? "visible" : ""}`}>
        {/* Opciones del menú */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          Inicio
        </Link>
        <Link to="/search" onClick={() => setIsOpen(false)}>
          Buscar
        </Link>{" "}
        {/* Enlace a la página de búsqueda */}
        <Link to="/about" onClick={() => setIsOpen(false)}>
          Acerca de
        </Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>
          Contacto
        </Link>
      </div>
    </div>
  );
};

export default HamburgerMenu;