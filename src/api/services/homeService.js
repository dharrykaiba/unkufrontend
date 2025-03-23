// src/pages/Home.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Define tu variable de entorno

const handleServiceError = (error, message) => {
  // Opcional: Enviar error a un servicio externo o log interno
  // logErrorToService(error); // Implementa esta función según sea necesario

  // Retorna un error controlado
  return new Error(message);
};

export const getHome = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    // Manejo explícito para problemas de conexión
    if (error.message.includes("Network Error") || error.code === "ERR_NETWORK") {
      throw handleServiceError(error, "No se pudo conectar con el servidor. Intente nuevamente más tarde.");
    }
    // Mensaje genérico para otros errores
    throw handleServiceError(error, "Ocurrió un problema inesperado. Intente nuevamente.");
  }
};

