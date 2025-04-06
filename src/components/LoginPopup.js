//LoginPopup.js
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth"; // Asegúrate de importar correctamente el hook
import LoaderWrapper from "./LoaderWrapper";

import "../styles/components/LoginPopup.css"; // Para estilos adicionales

const LoginPopup = ({ onClose }) => {
  const {
    requestLoginCode,
    login,
    verifyLoginCode,
    requestLoginCodeWS,
    verifyLoginCodeWS,
  } = useAuth();

  const loginPopupRef = useRef(null); // Referencia para el LoginPopup

  const handleClickOutside = (event) => {
    // Verificamos si el clic ocurrió fuera del área del LoginPopup
    if (
      loginPopupRef.current &&
      !loginPopupRef.current.contains(event.target)
    ) {
      onClose(); // Cierra el LoginPopup
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [currentPhase, setCurrentPhase] = useState(0);
  const [email, setEmail] = useState("dharrykaiba@gmail.com");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("dharrykaiba@gmail.com");
  const [password, setPassword] = useState("clave");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // Nuevo estado para el mensaje de éxito

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login(username, password);
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

  const handlePhoneLoginRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await requestLoginCodeWS(phone);
      setIsCodeSent(true);
      setSuccessMessage("¡Código de verificación enviado al teléfono!"); // Mensaje de éxito
      setTimeout(() => setSuccessMessage(""), 3000); // Limpiar después de 3 segundos
    } catch (error) {
      setError("Error al solicitar el código de verificación");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneCodeVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await verifyLoginCodeWS(phone, code);
      setIsCodeSent(false);
    } catch (error) {
      setError("Código incorrecto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-popup" ref={loginPopupRef}>
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
      <h3>Iniciar Sesión</h3>
      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}{" "}
      {/* Mostrar mensaje de éxito */}
      <LoaderWrapper isLoading={isLoading}>
        {currentPhase === 0 && (
          <div className="login-options">
            <button onClick={() => setCurrentPhase(1)}>Usuario y Clave</button>
            <button onClick={() => setCurrentPhase(2)}>Email y Código</button>
            <button onClick={() => setCurrentPhase(3)}>
              Teléfono y Código
            </button>
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
            <button type="submit">Iniciar sesión</button>
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
              </form>
            )}
          </div>
        )}

        {currentPhase === 3 && (
          <div>
            {!isCodeSent ? (
              <form onSubmit={handlePhoneLoginRequest}>
                <input
                  type="tel"
                  placeholder="Número de teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="compact-input"
                  required
                />
                <button type="submit">Solicitar Código</button>
              </form>
            ) : (
              <form onSubmit={handlePhoneCodeVerification}>
                <input
                  type="text"
                  placeholder="Código de verificación"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="compact-input"
                  required
                />
                <button type="submit">Verificar Código</button>
              </form>
            )}
          </div>
        )}

        <a href="/terminos-y-condiciones" className="terms-link">
          Términos y Condiciones
        </a>
      </LoaderWrapper>
    </div>
  );
};

export default LoginPopup;
