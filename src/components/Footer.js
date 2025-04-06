import React from "react";
import "../styles/components/Footer.css"; // Importar los estilos

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="/politica-de-privacidad">Política de Privacidad</a>
          <a href="/terminos-y-condiciones">Términos y Condiciones</a>
          <a href="/contacto">Contacto</a>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" aria-label="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;