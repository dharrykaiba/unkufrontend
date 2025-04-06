//src/components/UserMenu.js
import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa"; // Usamos un icono diferente para el perfil
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ setShowLogin }) => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // Hook para navegar a otras rutas
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Referencia al menú desplegable

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    if (setShowLogin) {
      setShowLogin(false);
    }
  };

  const goToProfile = () => {
    setIsMenuOpen(false); // Cierra el menú al hacer clic en "Perfil"
    navigate("/profile"); // Redirige a la página de perfil
  };

  const goToChangePassword = () => {
    setIsMenuOpen(false); // Cierra el menú al hacer clic en "Cambiar contraseña"
    navigate("/change-password"); // Redirige a la página de cambiar contraseña
  };

  // Función para cerrar el menú si el clic es fuera de él
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false); // Cierra el menú si el clic es fuera de él
    }
  };

  // Usamos useEffect para agregar y eliminar el event listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Detectar clic fuera
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Limpiar el event listener
    };
  }, []);

  return (
    <div className="user-menu">
      <button onClick={toggleMenu} className="icon-button">
        <FaUserCircle size={24} />
      </button>
      {isMenuOpen && (
        <div className="menu-dropdown" ref={menuRef}>
          <button onClick={goToProfile}>Perfil</button>
          <button onClick={goToChangePassword}>Cambiar contraseña</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;