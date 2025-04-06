import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Define la URL de tu API

// Función para ver el perfil del usuario
export const viewProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.ok) {
      return response.data.content;
    } else {
      throw new Error(response.data.message || "Usuario no encontrado");
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message || "Error al obtener el perfil del usuario"
      : error.message || "Error desconocido";
    console.error("Error al obtener el perfil del usuario:", errorMessage);
    throw new Error(errorMessage);
  }
};

// Función para cambiar la clave del usuario
export const changePassword = async (newPassword) => {
  try {
    const response = await axios.put(
      `${API_URL}/profile/changepassword`,
      { newPassword },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.ok) {
      return response.data.message;
    } else {
      throw new Error(response.data.message || "Error al cambiar la clave");
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message || "Error al cambiar la clave"
      : error.message || "Error desconocido";
    console.error("Error al cambiar la clave:", errorMessage);
    throw new Error(errorMessage);
  }
};

// Función para actualizar otros datos del usuario
export const updateData = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/profile/updaterdata`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.ok) {
      return response.data.message;
    } else {
      throw new Error(response.data.message || "Error al actualizar datos");
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message || "Error al actualizar datos"
      : error.message || "Error desconocido";
    console.error("Error al actualizar datos:", errorMessage);
    throw new Error(errorMessage);
  }
};

// Función para enviar el código de confirmación
export const sendConfirmationCode = async (data) => {
  //console.log(data)
  try {
    const response = await axios.put(
      `${API_URL}/profile/sendConfirmationCode`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.ok) {
      return response.data.message;
    } else {
      throw new Error(response.data.message || "Error al enviar el código de confirmación");
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message || "Error al enviar el código de confirmación"
      : error.message || "Error desconocido";
    console.error("Error al enviar el código de confirmación:", errorMessage);
    throw new Error(errorMessage);
  }
};

// Función para confirmar actualizaciones sensibles
export const confirmSensitiveUpdate = async (data) => {
  try {
    const response = await axios.put(
      `${API_URL}/profile/confirmSensitiveUpdate`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.ok) {
      return response.data.message;
    } else {
      throw new Error(response.data.message || "Error al confirmar la actualización sensible");
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message || "Error al confirmar la actualización sensible"
      : error.message || "Error desconocido";
    console.error("Error al confirmar la actualización sensible:", errorMessage);
    throw new Error(errorMessage);
  }
};
