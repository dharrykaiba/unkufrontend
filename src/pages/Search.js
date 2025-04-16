//src/pages/Search.js
import React, { useState, useEffect, useCallback  } from "react";
import { postSearchProduct } from "../api/services/productService";
import LoaderWrapper from "../components/LoaderWrapper";
import ProductCard from "../components/ProductCard";

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
  
  const [filtersLoaded, setFiltersLoaded] = useState(false);

  const getSearchParamsFromHash = () => {
    const hash = window.location.hash; // Ej: "#/search?nombre=polo"
    const queryStart = hash.indexOf("?");
    if (queryStart === -1) return new URLSearchParams();
    return new URLSearchParams(hash.substring(queryStart));
  };

  const loadFiltersFromUrl = useCallback(() => {
    const params = getSearchParamsFromHash();
  
    const loadedFilters = {
      nombre: params.get("nombre") || "",
      precioMin: params.get("precioMin") || "",
      precioMax: params.get("precioMax") || "",
      color: params.get("color") ? params.get("color").split(",") : [],
      talla: params.get("talla") ? params.get("talla").split(",") : [],
    };
    setFilters(loadedFilters);
    setTempNombre(loadedFilters.nombre);
    setFiltersLoaded(true);
  }, []);

  const updateUrl = (newFilters) => {
    const params = new URLSearchParams();

    if (newFilters.nombre) params.set("nombre", newFilters.nombre);
    if (newFilters.precioMin) params.set("precioMin", newFilters.precioMin);
    if (newFilters.precioMax) params.set("precioMax", newFilters.precioMax);
    if (newFilters.color.length > 0)
      params.set("color", newFilters.color.join(","));
    if (newFilters.talla.length > 0)
      params.set("talla", newFilters.talla.join(","));

    const baseHash = window.location.hash.split("?")[0];
    window.history.replaceState(null, "", `${baseHash}?${params.toString()}`);
  };


  
  useEffect(() => {
    const handleHashChange = () => {
      loadFiltersFromUrl();
    };

    window.addEventListener("hashchange", handleHashChange);

    // Cargar por primera vez
    loadFiltersFromUrl();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [loadFiltersFromUrl]); // Recargar cuando cambie la URL

  const handleSearch = useCallback(async () => {
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
  }, [filters]);

  useEffect(() => {
    if (filtersLoaded) {
      handleSearch();
      updateUrl(filters);
    }
  }, [filters, filtersLoaded, handleSearch]);

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
