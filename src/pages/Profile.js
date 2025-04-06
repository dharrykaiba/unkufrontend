import React, { useState, useEffect } from "react";
import { viewProfile } from "../api/services/profileService";
import { useNavigate, useLocation } from "react-router-dom";
import LoaderWrapper from "../components/LoaderWrapper"; // Importa el componente LoaderWrapper

const Profile = () => {
  const [userData, setUserData] = useState({
    usrNombreCompleto: "",
    usrDNI: "",
    usrTelefono: "",
    usrEmail: "",
    usrNotificaciones: false,
  });
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await viewProfile();
        setUserData(profile);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      } finally {
        setIsLoading(false); // Termina de cargar
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Perfil del Usuario</h1>

      {/* Mostrar mensaje de éxito si existe */}
      {location.state && location.state.successMessage && (
        <div className="success-message">{location.state.successMessage}</div>
      )}

      {/* Usamos LoaderWrapper para envolver los datos del perfil */}
      <LoaderWrapper isLoading={isLoading}>
        <div>
          <label>Nombre Completo:</label>
          <span>{userData.usrNombreCompleto}</span>
        </div>
        <div>
          <label>DNI:</label>
          <span>{userData.usrDNI}</span>
        </div>
        <div>
          <label>Teléfono:</label>
          <span>{userData.usrTelefono}</span>
        </div>
        <div>
          <label>Email:</label>
          <span>{userData.usrEmail}</span>
        </div>
        <div>
          <label>Notificaciones:</label>
          <input
            type="checkbox"
            checked={userData.usrNotificaciones}
            disabled
          />
        </div>
        <button onClick={() => navigate("/profile/edit")}>Editar Perfil</button>
      </LoaderWrapper>
    </div>
  );
};

export default Profile;
