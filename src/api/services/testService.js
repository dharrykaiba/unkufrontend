// src/api/services/testService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Asegúrate de definir esta variable de entorno

const handleServiceError = (error, message) => {
  console.error("Error en la API:", error);
  return new Error(message);
};

// Función para obtener la lista de usuarios
export const getAlltest = async () => {
  try {
    console.log("Consultando:", `${API_URL}/user`);
    const response = await axios.get(`${API_URL}/user`);
    console.log("Respuesta del backend:", response.data);
    return response.data.content;
  } catch (error) {
    console.error(
      "Error en la petición:",
      error.response?.data || error.message
    );
    throw new Error("Error al obtener los usuarios.");
  }
};
