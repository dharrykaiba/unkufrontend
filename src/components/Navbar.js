// src/components/Navbar.js
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../context/CartContext";
import LoginForm from "./LoginPopup";
import UserMenu from "./UserMenu";
import CartSidebar from "./CartSidebar";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Importar useLocation
import HamburgerMenu from "./HamburgerMenu";

import "../styles/components/Navbar.css"; // Para estilos adicionales

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { isCartOpen, toggleCart } = useCart();
  const [showLogin, setShowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const navigate = useNavigate(); // Hook para redireccionar
  const location = useLocation(); // Hook para obtener la ruta actual

  const toggleLoginPopup = () => {
    setShowLogin(!showLogin);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    if (searchTerm.trim()) {
      navigate(`/search?nombre=${encodeURIComponent(searchTerm.trim())}`); // Redirigir a Search.js con el término de búsqueda
      setSearchTerm(""); // Limpiar el campo de búsqueda después de la redirección
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
      {/* Campo de búsqueda (no mostrar si estamos en /search) */}
      {location.pathname !== "/search" && ( // Verificar la ruta actual
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch size={18} />
          </button>
        </form>
      )}
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
