// src/components/Navbar.js
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../context/CartContext";
import LoginForm from "./LoginPopup";
import UserMenu from "./UserMenu";
import CartSidebar from "./CartSidebar";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; // Importar useLocation
import HamburgerMenu from "./HamburgerMenu";

import "../styles/components/Navbar.css"; // Para estilos adicionales

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { isCartOpen, toggleCart } = useCart();
  const [showLogin, setShowLogin] = useState(false);

  const [searchText, setSearchText] = useState("");
  
  const toggleLoginPopup = () => {
    setShowLogin(!showLogin);
  };

  const handleNavbarSearch = (e) => {
    if (e.key === "Enter") {
      const nombre = encodeURIComponent(searchText.trim());
      if (nombre) {
        // Cambia completamente el hash para que HashRouter lo detecte
        window.location.hash = `/search?nombre=${nombre}`;
      } else {
        window.location.hash = `/search`;
      }
      setSearchText(""); // ✅ Limpia el input después de la búsqueda
    }
  };

  return (
    <nav>
      <div className="logo-container">
        {/* Imagen a la izquierda */}
        <Link to="/" className="navbar-logo-link">
          <img
            src="./path/logo/logovert.png"
            alt="Logo"
            className="navbar-logo"
          />
          {/* Nombre de la aplicación */}
        </Link>
        <HamburgerMenu />
      </div>
      {/* 🔍 Input de búsqueda al centro */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          className="search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleNavbarSearch}
        />
        <FaSearch
          className="search-icon"
          onClick={() => {
            const nombre = encodeURIComponent(searchText.trim());
            if (nombre) {
              window.location.hash = `/search?nombre=${nombre}`;
            } else {
              window.location.hash = `/search`;
            }
            setSearchText(""); // ✅ Limpia el input después de la búsqueda
          }}
        />
      </div>
      {/* Menú hamburguesa a la derecha */}
      <header>
        {/* Botón de login */}
        {!isAuthenticated ? (
          <div style={{ position: "relative", display: "inline-block" }}>
            <button onClick={toggleLoginPopup} className="icon-button">
              <FaUser size={24} />
            </button>
            {showLogin && <LoginForm onClose={toggleLoginPopup} />}
          </div>
        ) : (
          <UserMenu setShowLogin={setShowLogin} />
        )}
        {/* Botón de carrito */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCart();
          }}
          className="icon-button"
          aria-label={isCartOpen ? "Cerrar carrito" : "Abrir carrito"}
        >
          <FaShoppingCart size={24} />
        </button>
      </header>
      <CartSidebar /> {/* Sidebar del carrito */}
    </nav>
  );
};

export default Navbar;
