// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { getAllProducts } from "../api/services/productService";
import LoaderWrapper from "../components/LoaderWrapper";
import ProductCard from "../components/ProductCard"; // Importa el nuevo componente
import "../styles/pages/Home.css";
//import "../styles/components/ProductCard.css"; // Importa los estilos de las tarjetas

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null); // Nueva variable para manejar errores

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getAllProducts();
        setProducts(productList);
      } catch (error) {
        setErrorMessage(error.message); // Muestra un mensaje controlado
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <LoaderWrapper isLoading={isLoading}>
    {errorMessage ? (
      <div className="error-message">{errorMessage}</div>
    ) : (
      <div className="product-list">
        {isLoading ? ( // Mostrar "Cargando..." mientras se carga
          <p>Cargando...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.prdId} product={product} />
          ))
        ) : (
          <p>No hay productos disponibles en este momento.</p>
        )}
      </div>
    )}
  </LoaderWrapper>
  );
};

export default Home;
