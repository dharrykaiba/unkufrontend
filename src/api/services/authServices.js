// src/services/authService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Define la URL de tu API

// Función para registrar usuario
export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, {
      usrEmail: email,
      password: password,
    });

    console.log("Respuesta del registro:", response.data);

    if (response.data.ok) {
      return {
        success: true,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Error desconocido en el registro",
      };
    }
  } catch (error) {
    console.error("Error en el registro:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error en el servidor",
    };
  }
};


// Función para solicitar el código de verificación
export const requestLoginCode = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      usrEmail: email,
    });
    console.log("respuesta del axios:", response.data); // Confirma que 'ok' es true
    const result = response.data.ok;
    console.log("Valor a retornar:", result); // Confirma el valor justo antes del retorno
    console.log("Solicitud de código a la API...");
    return result; // Devuelve el valor booleano verdadero o falso según `response.data.ok`
  } catch (error) {
    console.error("Error al solicitar el código de verificación:", error);
    throw error; // Retorna false en caso de error, así 'success' no será undefined
  }
};

// Función para verificar el código de inicio de sesión
export const verifyLoginCode = async (email, code) => {
  console.log("verificando codigo", email, " - ", code);
  try {
    const response = await axios.post(`${API_URL}/user/verify_email`, {
      usrEmail: email,
      usrCodigoEmail: code,
    });

    if (response.data.ok) {
      const { token } = response.data;
      const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 horas

      localStorage.setItem("token", token);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("expiration", expirationTime);

      return true;
    } else {
      throw new Error("Código incorrecto");
    }
  } catch (error) {
    console.error("Error al verificar el código:", error);
    throw error;
  }
};

// Función para iniciar sesión
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      usrEmail: email,
      password: password,
    });

    if (response.data.ok) {
      const { token } = response.data;
      const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 horas

      // Guardar el token y la expiración en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("expiration", expirationTime);

      return true;
    } else {
      throw new Error("Credenciales incorrectas");
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    throw error;
  }
};

export const requestLoginCodeWS = async (whatsapp) => {
  console.log("enviando a axios:", whatsapp); // Confirma que 'ok' es true
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      usrTelefono: whatsapp,
    });
    console.log("respuesta del axios:", response.data); // Confirma que 'ok' es true
    const result = response.data.ok;
    console.log("Valor a retornar:", result); // Confirma el valor justo antes del retorno
    console.log("Solicitud de código WS a la API...");
    return result; // Devuelve el valor booleano verdadero o falso según `response.data.ok`
  } catch (error) {
    console.error("Error al solicitar el código de verificación:", error);
    throw error; // Retorna false en caso de error, así 'success' no será undefined
  }
};

// Función para verificar el código de inicio de sesión
export const verifyLoginCodeWS = async (whatsapp, code) => {
  console.log("verificando codigo", whatsapp, " - ", code);
  try {
    const response = await axios.post(`${API_URL}/user/verify_ws`, {
      usrTelefono: whatsapp,
      usrCodigoWS: code,
    });

    if (response.data.ok) {
      const { token } = response.data;
      const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 horas

      localStorage.setItem("token", token);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("expiration", expirationTime);

      return true;
    } else {
      throw new Error("Código incorrecto");
    }
  } catch (error) {
    console.error("Error al verificar el código:", error);
    throw error;
  }
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.setItem("isAuthenticated", false);
  localStorage.removeItem("expiration");
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const expiration = localStorage.getItem("expiration");
  return (
    localStorage.getItem("isAuthenticated") &&
    expiration &&
    new Date().getTime() < expiration
  );
};

// Obtener el token desde localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};
