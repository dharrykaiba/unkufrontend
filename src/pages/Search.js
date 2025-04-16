//src/pages/Search.js
import React, { useState, useEffect } from "react";
import { postSearchProduct } from "../api/services/productService";
import LoaderWrapper from "../components/LoaderWrapper";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom"; // Importar useLocation

import "../styles/pages/Search.css";

const Search = () => {
  const [filters, setFilters] = useState({
    nombre: "",
    precioMin: "",
    precioMax: "",
    color: [],
    talla: [],
  });
  const [tempNombre, setTempNombre] = useState(""); // Estado temporal para el input de nombre
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const location = useLocation(); // Obtener la ubicación actual

  const loadFiltersFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const loadedFilters = {
      nombre: params.get("nombre") || "",
      precioMin: params.get("precioMin") || "",
      precioMax: params.get("precioMax") || "",
      color: params.get("color") ? params.get("color").split(",") : [],
      talla: params.get("talla") ? params.get("talla").split(",") : [],
    };
    setFilters(loadedFilters);
    setTempNombre(loadedFilters.nombre); // Sincronizar tempNombre con el filtro de nombre
  };

  const updateUrl = (newFilters) => {
    const params = new URLSearchParams({
      ...newFilters,
      color: newFilters.color.join(","),
      talla: newFilters.talla.join(","),
    });
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  useEffect(() => {
    loadFiltersFromUrl();
  }, [location.search]); // Recargar cuando cambie la URL

  const handleSearch = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const filtersToSend = { ...filters };
    if (filters.color.length === 0) {
      delete filtersToSend.color;
    }
    if (filters.talla.length === 0) {
      delete filtersToSend.talla;
    }

    try {
      const searchResults = await postSearchProduct(filtersToSend);
      setProducts(searchResults);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
    updateUrl(filters);
  }, [filters]);

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFilters((prev) => {
      const updatedArray = checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value);
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleNombreSearch = () => {
    setFilters((prev) => ({ ...prev, nombre: tempNombre }));
  };

  const handleClearNombre = () => {
    setFilters((prev) => ({ ...prev, nombre: "" }));
    setTempNombre("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNombreSearch();
    }
  };

  return (
    <div className="search-page">
      <div className="filters">
        {/* Mostrar el campo de texto y el botón solo si no hay un nombre buscado */}
        {!filters.nombre && (
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Nombre del producto"
              value={tempNombre}
              onChange={(e) => setTempNombre(e.target.value)}
              onKeyDown={handleKeyDown} // Detectar pulsación de teclas
            />
            <button onClick={handleNombreSearch}>Buscar</button>
          </div>
        )}

        {/* Mostrar la palabra buscada con una "X" si hay un nombre buscado */}
        {filters.nombre && (
          <div className="search-tag">
            <span>{filters.nombre}</span>
            <button onClick={handleClearNombre} className="clear-button">
              X
            </button>
          </div>
        )}

        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              value="Rojo"
              checked={filters.color.includes("Rojo")}
              onChange={(e) => handleCheckboxChange(e, "color")}
            />
            Rojo
          </label>
          <label>
            <input
              type="checkbox"
              value="Azul"
              checked={filters.color.includes("Azul")}
              onChange={(e) => handleCheckboxChange(e, "color")}
            />
            Azul
          </label>
          <label>
            <input
              type="checkbox"
              value="Verde"
              checked={filters.color.includes("Verde")}
              onChange={(e) => handleCheckboxChange(e, "color")}
            />
            Verde
          </label>
        </div>

        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              value="S"
              checked={filters.talla.includes("S")}
              onChange={(e) => handleCheckboxChange(e, "talla")}
            />
            Talla S
          </label>
          <label>
            <input
              type="checkbox"
              value="M"
              checked={filters.talla.includes("M")}
              onChange={(e) => handleCheckboxChange(e, "talla")}
            />
            Talla M
          </label>
          <label>
            <input
              type="checkbox"
              value="L"
              checked={filters.talla.includes("L")}
              onChange={(e) => handleCheckboxChange(e, "talla")}
            />
            Talla L
          </label>
          <label>
            <input
              type="checkbox"
              value="XL"
              checked={filters.talla.includes("XL")}
              onChange={(e) => handleCheckboxChange(e, "talla")}
            />
            Talla XL
          </label>
        </div>
      </div>

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
    </div>
  );
};

export default Search;
