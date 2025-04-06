// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import * as authService from "../api/services/authServices"; // Importa el servicio de autenticación

// Creamos el contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isWsCodeSent, setIsWsCodeSent] = useState(false); // Nueva variable para seguimiento de código enviado por WhatsApp

  useEffect(() => {
    const interval = setInterval(() => {
      if (!authService.isAuthenticated()) {
        logout();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Función para solicitar el código de verificación por correo
  const requestLoginCode = async (email) => {
    try {
      const success = await authService.requestLoginCode(email);
      if (success) {
        setIsCodeSent(true);
      }
    } catch (error) {
      // Maneja el error
      throw new Error("Error al solicitar el código");
    }
  };

  // Función para verificar el código de verificación por correo
  const verifyLoginCode = async (email, code) => {
    try {
      const success = await authService.verifyLoginCode(email, code);
      if (success) {
        setIsAuthenticated(true);
        setIsCodeSent(false);
      }
    } catch (error) {
      throw new Error("Código incorrecto");
    }
  };

  // Nueva función para solicitar el código de verificación por WhatsApp
  const requestLoginCodeWS = async (whatsapp) => {
    try {
      const success = await authService.requestLoginCodeWS(whatsapp);
      if (success) {
        setIsWsCodeSent(true); // Actualiza el estado de código enviado por WhatsApp
      }
    } catch (error) {
      // Maneja el error
      throw new Error("Error al solicitar el código de WhatsApp");
    }
  };

  // Nueva función para verificar el código de verificación por WhatsApp
  const verifyLoginCodeWS = async (whatsapp, code) => {
    try {
      const success = await authService.verifyLoginCodeWS(whatsapp, code);
      if (success) {
        setIsAuthenticated(true);
        setIsWsCodeSent(false); // Reinicia el estado después de la verificación exitosa
      }
    } catch (error) {
      throw new Error("Código incorrecto de WhatsApp");
    }
  };

  // Función para iniciar sesión con correo electrónico y contraseña
  const login = async (email, password) => {
    try {
      const success = await authService.login(email, password);
      if (success) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    try {
      authService.logout();
      setIsAuthenticated(false);
      setIsCodeSent(false);
      setIsWsCodeSent(false); // Reinicia el estado de código WhatsApp
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      isCodeSent,
      requestLoginCode,
      verifyLoginCode,
      isWsCodeSent,
      requestLoginCodeWS, // Añadido al contexto
      verifyLoginCodeWS,  // Añadido al contexto
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
