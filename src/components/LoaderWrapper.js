// src/components/LoaderWrapper.js
import React, { useState, useEffect } from "react";
import "../styles/components/LoaderWrapper.css"; // Para estilos adicionales

const LoaderWrapper = ({ isLoading, children }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowLoader(true);  // Muestra el loader después de 2 segundos
      }, 2000); // 2 segundos de retraso

      return () => clearTimeout(timer);  // Limpiar el temporizador cuando el componente se desmonte
    } else {
      setShowLoader(false);  // Si no está cargando, no mostrar el loader
    }
  }, [isLoading]);

  return (
    <div className="loader-wrapper">
      {showLoader ? (
        <div className="loader">
          <span>Cargando, espera por favor ...</span> {/* Puedes usar un spinner aquí */}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LoaderWrapper;
