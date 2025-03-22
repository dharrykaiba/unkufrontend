// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { getHome } from "../api/services/homeService.js";

const Home = () => {
  const [home, setHome] = useState([]); // Estado para almacenar los datos de la API
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState(null); // Estado para manejar errores

  // Llama a la función getHome cuando el componente se monte
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHome(); // Llama a la función getHome
        setHome(data); // Actualiza el estado con los datos obtenidos
      } catch (error) {
        setError(error.message); // Maneja errores
      } finally {
        setLoading(false); // Finaliza el loading
      }
    };

    fetchData(); // Ejecuta la función fetchData
  }, []); // El array vacío asegura que esto solo se ejecute una vez

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Muestra un mensaje de error si algo sale mal
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Muestra los datos obtenidos de la API
  return (
    <div>
      <h1>Datos de la API</h1>
      <pre>{home.message}</pre>
    </div>
  );
};

export default Home;
