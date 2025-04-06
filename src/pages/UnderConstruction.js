import React from "react";
import "../styles/pages/UnderConstruction.css"; // Puedes crear este archivo para estilos específicos


const UnderConstruction = () => {
  return (
    <div className="under-construction-container">
      <img
        src="./path/logo/logovert.png"
        alt="Logo"
        className="under-construction-logo"
      />
      <h1>Sitio en construcción</h1>
      <p>Estamos trabajando para ofrecerte una mejor experiencia. ¡Vuelve pronto!</p>
    </div>
  );
};

export default UnderConstruction;
