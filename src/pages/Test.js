// src/pages/Test.js
import React, { useState, useEffect } from "react";
import { getAlltest } from "../api/services/testService.js";
//import "../styles/pages/Home.css";
//import "../styles/components/ProductCard.css"; // Importa los estilos de las tarjetas

const Alltest = () => {
  const [alltest, setAlltest] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null); // Nueva variable para manejar errores

  useEffect(() => {
    const fetchAlltest = async () => {
      try {
        const productList = await getAlltest();
        setAlltest(productList);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchAlltest();
  }, []);

  return (
    <div className="alltest-list">
      {errorMessage ? (
        <p>Error: {errorMessage}</p>
      ) : alltest.length > 0 ? (
        <ul>
          {alltest.map((test) => (
            <li key={test.usrId}>
              {test.usrId} - {test.usrNombreCompleto} - {test.usrEmail}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios disponibles en este momento.</p>
      )}
    </div>
  );
};

export default Alltest;
