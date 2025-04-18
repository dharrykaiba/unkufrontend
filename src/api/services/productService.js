import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Define tu variable de entorno

const handleServiceError = (error, message) => {
  // Opcional: Enviar error a un servicio externo o log interno
  // logErrorToService(error); // Implementa esta función según sea necesario

  // Retorna un error controlado
  return new Error(message);
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product/products`);
    return response.data;
  } catch (error) {
    // Manejo explícito para problemas de conexión
    if (error.message.includes("Network Error") || error.code === "ERR_NETWORK") {
      throw new Error("No se pudo conectar con el servidor. Intente nuevamente más tarde.");
    }

    // Manejo para errores específicos del backend
    if (error.response && error.response.status === 404) {
      throw new Error("No se encontraron productos disponibles.");
    }

    // Mensaje genérico para otros errores
    throw new Error("Ocurrió un problema inesperado. Intente nuevamente.");
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/product/products/id/${id}`);
    return response.data; // Asegúrate de que la respuesta tenga la estructura esperada
  } catch (error) {
    throw handleServiceError(
      error,
      "Error al obtener el producto. Intente nuevamente más tarde."
    );
  }
};

export const postSearchProduct = async (filters) => {
  try {
    const response = await axios.post(`${API_URL}/product/products/search`, filters);
    return response.data;
  } catch (error) {
    // Manejo explícito para problemas de conexión
    if (error.message.includes("Network Error") || error.code === "ERR_NETWORK") {
      throw new Error("No se pudo conectar con el servidor. Intente nuevamente más tarde.");
    }

    // Manejo para errores específicos del backend
    if (error.response && error.response.status === 404) {
      throw new Error("No se encontraron productos con los filtros aplicados.");
    }

    // Mensaje genérico para otros errores
    throw new Error("Ocurrió un problema inesperado. Intente nuevamente.");
  }
};