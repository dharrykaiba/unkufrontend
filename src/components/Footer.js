import React from "react";
import { Link } from "react-router-dom"; // ✅ Usar Link en lugar de <a>
import "../styles/components/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>

        <div className="footer-links">
          <Link to="/politica-de-privacidad">Política de Privacidad</Link>
          <Link to="/terminos-y-condiciones">Términos y Condiciones</Link>
          <Link to="/contacto">Contacto</Link>
        </div>

        <div className="footer-social">
          {/* Aquí mantenemos <a> porque apuntan fuera de la app */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
