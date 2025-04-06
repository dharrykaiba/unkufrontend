// src/pages/ChangePassword.js
import React, { useState } from "react";
import { changePassword } from "../api/services/profileService"; // Asegúrate de importar la función changePassword
import LoaderWrapper from "../components/LoaderWrapper"; // Importar el LoaderWrapper

const ChangePassword = () => {
  // Estados para manejar los valores de los campos, errores y estado de carga
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Función para manejar el cambio de clave
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validaciones
    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setIsLoading(true); // Activar el loader

    try {
      // Llamada al servicio de cambio de clave
      const message = await changePassword(newPassword);
      setSuccessMessage(message);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMessage(error.message); // Mostrar el mensaje de error si ocurre
    } finally {
      setIsLoading(false); // Desactivar el loader
    }
  };

  return (
    <div>
      <h1>Cambiar Clave</h1>
      <LoaderWrapper isLoading={isLoading}>
        <form onSubmit={handleSubmit}>
          {/* Campo de nueva contraseña */}
          <label>
            Nueva Clave:
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} // Actualizar el estado de la nueva contraseña
              required
            />
          </label>
          <br />

          {/* Campo de confirmar nueva contraseña */}
          <label>
            Confirmar Nueva Clave:
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Actualizar el estado de la confirmación
              required
            />
          </label>
          <br />

          {/* Mensajes de error o éxito */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          {/* Botón para enviar el formulario */}
          <button type="submit">Actualizar Clave</button>
        </form>
      </LoaderWrapper>
    </div>
  );
};

export default ChangePassword;
