import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import {
  viewProfile,
  updateData,
  sendConfirmationCode,
  confirmSensitiveUpdate,
} from "../api/services/profileService";
import LoaderWrapper from "../components/LoaderWrapper"; // Importamos el LoaderWrapper

const ProfileEdit = () => {
  const [userData, setUserData] = useState({
    usrNombreCompleto: "",
    usrDNI: "",
    usrNotificaciones: false,
    usrEmail: "",
    usrTelefono: "",
  });
  
  const [originalData, setOriginalData] = useState({}); // Guardamos los datos originales
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentSensitiveField, setCurrentSensitiveField] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true); // Comienza a cargar
      try {
        const profile = await viewProfile();
        setUserData({
          usrNombreCompleto: profile.usrNombreCompleto,
          usrDNI: profile.usrDNI,
          usrNotificaciones: profile.usrNotificaciones,
          usrEmail: profile.usrEmail,
          usrTelefono: profile.usrTelefono,
        });
        setOriginalData({
          usrNombreCompleto: profile.usrNombreCompleto,
          usrDNI: profile.usrDNI,
          usrNotificaciones: profile.usrNotificaciones,
          usrEmail: profile.usrEmail,
          usrTelefono: profile.usrTelefono,
        }); // Guardamos los datos originales
      } catch (error) {
        setError("Error al cargar el perfil");
      } finally {
        setIsLoading(false); // Termina de cargar
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNonSensitiveSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Comienza la carga
    try {
      const { usrNombreCompleto, usrDNI, usrNotificaciones } = userData;
      await updateData({ usrNombreCompleto, usrDNI, usrNotificaciones });
      setSuccessMessage("Tus datos básicos han sido actualizados correctamente.");
      navigate("/profile", { state: { successMessage: "Tus datos han sido actualizados correctamente." } }); // Redirige a profile
    } catch (error) {
      setError("Error al actualizar datos no sensibles");
    } finally {
      setIsLoading(false); // Termina la carga
    }
  };

  const handleSendCode = async (field) => {
    setIsLoading(true); // Comienza la carga
    try {
      const data =
        field === "email"
          ? { usrEmail: userData.usrEmail, updateType: "email" }
          : { usrTelefono: userData.usrTelefono, updateType: "telefono" };

      await sendConfirmationCode(data);
      setIsVerifying(true);
      setCurrentSensitiveField(field);
      setSuccessMessage(`Te hemos enviado un código de verificación a tu ${field}. Ingresa el código para confirmar el cambio.`);
    } catch (error) {
      setError(`Error al enviar el código de verificación (${field})`);
    } finally {
      setIsLoading(false); // Termina la carga
    }
  };

  const handleSensitiveSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Comienza la carga
    try {
      const data =
        currentSensitiveField === "email"
          ? { usrEmail: userData.usrEmail, code: verificationCode, updateType: "email" }
          : { usrTelefono: userData.usrTelefono, code: verificationCode, updateType: "telefono" };

      await confirmSensitiveUpdate(data);
      setSuccessMessage("Tu información sensible ha sido actualizada correctamente.");
      setIsVerifying(false);
      setVerificationCode("");
      navigate("/profile", { state: { successMessage: "Tu información sensible ha sido actualizada correctamente." } }); // Redirige a profile
    } catch (error) {
      setError("Error al confirmar la actualización de datos sensibles");
    } finally {
      setIsLoading(false); // Termina la carga
    }
  };

  // Compara los datos actuales con los originales para habilitar/deshabilitar el botón
  const isDataModified = JSON.stringify(userData) !== JSON.stringify(originalData);
  const isSensitiveDataModified = userData.usrEmail !== originalData.usrEmail || userData.usrTelefono !== originalData.usrTelefono;

  return (
    <div>
      <h1>Editar Perfil</h1>

      {/* Mostrar mensaje de error o éxito */}
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Datos básicos */}
      <LoaderWrapper isLoading={isLoading}> {/* Envolvemos con LoaderWrapper */}
        <form onSubmit={handleNonSensitiveSubmit}>
          <h2>Datos Básicos</h2>
          <div>
            <label>Nombre Completo:</label>
            <input
              type="text"
              name="usrNombreCompleto"
              value={userData.usrNombreCompleto}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>DNI:</label>
            <input
              type="text"
              name="usrDNI"
              value={userData.usrDNI}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Notificaciones:</label>
            <input
              type="checkbox"
              name="usrNotificaciones"
              checked={userData.usrNotificaciones}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={!isDataModified}>Guardar Datos Básicos</button> {/* Deshabilitamos el botón si no hay cambios */}
        </form>
      </LoaderWrapper>

      {/* Datos sensibles */}
      <h2>Información de Contacto</h2>
      <LoaderWrapper isLoading={isLoading}> {/* Envolvemos con LoaderWrapper */}
        {!isVerifying ? (
          <>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="usrEmail"
                value={userData.usrEmail}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => handleSendCode("email")}
                disabled={!isSensitiveDataModified}
              >
                Enviar Código para Modificar Email
              </button>
            </div>
            <div>
              <label>Teléfono WhatsApp:</label>
              <input
                type="text"
                name="usrTelefono"
                value={userData.usrTelefono}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => handleSendCode("telefono")}
                disabled={!isSensitiveDataModified}
              >
                Enviar Código para Modificar Teléfono
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSensitiveSubmit}>
            <div>
              <label>Código de Verificación:</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <button type="submit">Confirmar Actualización</button>
          </form>
        )}
      </LoaderWrapper>
    </div>
  );
};

export default ProfileEdit;
