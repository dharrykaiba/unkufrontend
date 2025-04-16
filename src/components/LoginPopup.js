//LoginPopup.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../hooks/useAuth"; // Asegúrate de importar correctamente el hook
import LoaderWrapper from "./LoaderWrapper";

import "../styles/components/LoginPopup.css"; // Para estilos adicionales

const LoginPopup = ({ onClose }) => {
  const { requestLoginCode, login, verifyLoginCode } = useAuth();
  //  requestLoginCodeWS,  verifyLoginCodeWS,

  const loginPopupRef = useRef(null); // Referencia para el LoginPopup

  // ✅ Memorizar función para que no se vuelva a crear en cada render
  const handleClickOutside = useCallback(
    (event) => {
      if (
        loginPopupRef.current &&
        !loginPopupRef.current.contains(event.target)
      ) {
        onClose();
      }
    },
    [onClose] // ✅ Dependencias
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]); // ✅ Ahora la advertencia desaparece

  const [currentPhase, setCurrentPhase] = useState(0);
  const [email, setEmail] = useState("");
  //const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // Nuevo estado para el mensaje de éxito

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login(username.trim(), password); // Limpieza de espacios
    } catch (error) {
      setError(
        "Hubo un problema al intentar iniciar sesión. Por favor, verifica tus credenciales."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLoginRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validación básica de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Correo electrónico no válido.");
      setIsLoading(false);
      return;
    }

    try {
      await requestLoginCode(email);
      setIsCodeSent(true);
      setSuccessMessage("¡Código de verificación enviado al correo!"); // Mensaje de éxito
      setTimeout(() => setSuccessMessage(""), 3000); // Limpiar después de 3 segundos
    } catch (error) {
      setError(error.message || "Error al solicitar código de verificación");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailCodeVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await verifyLoginCode(email, code);
      setIsCodeSent(false);
    } catch (error) {
      setError(error.message || "Código incorrecto");
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    switch (currentPhase) {
      case 0:
        return "Elige modo de ingreso";
      case 1:
        return "Ingresa tu usuario y contraseña";
      case 2:
        return isCodeSent
          ? "Ingresa el código recibido"
          : "Solicita tu código por correo";
      default:
        return "Bienvenido";
    }
  };

  return (
    <div className="login-popup" ref={loginPopupRef}>
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
      <h3>{getTitle()}</h3>
      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}{" "}
      {/* Mostrar mensaje de éxito */}
      <LoaderWrapper isLoading={isLoading}>
        {currentPhase === 0 && (
          <div className="login-options">
            <button onClick={() => setCurrentPhase(2)}>Email y Código</button>
            <button onClick={() => setCurrentPhase(1)}>Usuario y Clave</button>
            {/* Términos solo en fase 0 */}
            <a href="/terminos-y-condiciones" className="terms-link">
              Términos y Condiciones
            </a>
          </div>
        )}

        {currentPhase === 1 && (
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="compact-input"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="compact-input"
              required
            />
            {/* Enlace de "Olvidaste tu contraseña" */}
            <button
              type="button"
              onClick={() => alert("Función en desarrollo")}
              className="link-button"
            >
              ¿Olvidaste tu contraseña?
            </button>
            <button type="submit">Iniciar sesión</button>
            <button
                  type="button"
                  className="back-button"
                  onClick={() => setCurrentPhase(0)}
                >
                  Volver
                </button>
            {/* Enlace a login con usuario */}
            <button
              type="button"
              onClick={() => setCurrentPhase(2)}
              className="link-button"
            >
              Registrar Correo
            </button>
          </form>
        )}

        {currentPhase === 2 && (
          <div>
            {!isCodeSent ? (
              <form onSubmit={handleEmailLoginRequest}>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="compact-input"
                  required
                />
                <button type="submit">Solicitar Código</button>
                <button
                  type="button"
                  className="back-button"
                  onClick={() => setCurrentPhase(0)}
                >
                  Volver
                </button>
                <button
              type="button"
              onClick={() => alert("Función en desarrollo")}
              className="link-button"
            >
              Ya tengo un codigo
            </button>
              </form>
            ) : (
              <form onSubmit={handleEmailCodeVerification}>
                <input
                  type="text"
                  placeholder="Código de verificación"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="compact-input"
                  required
                />
                <button type="submit">Verificar Código</button>
                <button
                  type="button"
                  className="back-button"
                  onClick={() => setCurrentPhase(0)}
                >
                  Volver
                </button>
              </form>
            )}
          </div>
        )}
      </LoaderWrapper>
    </div>
  );
};

export default LoginPopup;
