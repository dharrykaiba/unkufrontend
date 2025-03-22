// src/api/config.js
const API_URL = process.env.REACT_APP_API_URL; // Asegúrate de que esta variable esté bien definida

console.log('API_URL:', API_URL);  // Para verificar que la URL es correcta

export const apiConfig = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};
