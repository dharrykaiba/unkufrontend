// src/pages/ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/services/productService";
import LoaderWrapper from "../components/LoaderWrapper";
import "../styles/components/ProductDetail.css";

const ProductDetail = () => {
  const { prdId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDetails = await getProductById(prdId);
        setProduct(productDetails?.content || {});
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [prdId]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Por favor, selecciona un color y una talla.");
      return;
    }
    const itemToAdd = {
      id: product.prdId,
      name: product.prdNombre,
      color: selectedColor,
      size: selectedSize,
      quantity: selectedQuantity,
      price: product.DisenoVersions?.[0]?.dvPrecio || 0, // Asume que el precio es el mismo para todas las versiones
    };
    console.log("Producto agregado al carrito:", itemToAdd);
    // Aquí puedes agregar la lógica para añadir el producto al carrito
  };

  const { back, front, sleeve } = product?.images || {};

  return (
    <LoaderWrapper isLoading={isLoading}>
      {isLoading ? (
        <p>Cargando...</p> // Solo si quieres texto además del loader
      ) : !product?.prdId ? (
        <div>Producto no encontrado</div>
      ) : (
        <div className="product-detail-container">
          <h1>{product?.prdNombre || "Producto no disponible"}</h1>
          <p>Código: {product?.prdId || "N/A"}</p>
          <div className="product-images">
            {front && (
              <img src={front} alt="Frontal" className="product-image" />
            )}
            {back && <img src={back} alt="Trasero" className="product-image" />}
            {sleeve && (
              <img src={sleeve} alt="Manga" className="product-image" />
            )}
          </div>
          <p className="product-description">
            {product?.prdDescripcion || "Descripción no disponible"}
          </p>
          <div className="product-options">
            <h2>Selecciona tus opciones:</h2>
            {/* Selector de color */}
            <div className="option-selector">
              <label>Color:</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="">Selecciona un color</option>
                {product?.ProductoStocks?.map((stock, index) => (
                  <option key={index} value={stock.psColor}>
                    {stock.psColor}
                  </option>
                ))}
              </select>
            </div>
            {/* Selector de talla */}
            <div className="option-selector">
              <label>Talla:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">Selecciona una talla</option>
                {product?.ProductoStocks?.map((stock, index) => (
                  <option key={index} value={stock.psTalla}>
                    {stock.psTalla}
                  </option>
                ))}
              </select>
            </div>
            {/* Selector de cantidad */}
            <div className="option-selector">
              <label>Cantidad:</label>
              <input
                type="number"
                min="1"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
              />
            </div>
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
          <h2>Stock disponible:</h2>
          <ul className="stock-list">
            {product?.ProductoStocks?.map((stock, index) => (
              <li key={index}>
                Talla: {stock.psTalla} | Color: {stock.psColor} | Stock:{" "}
                {stock.psStock}
              </li>
            ))}
          </ul>
          <h2>Versiones de Diseño:</h2>
          {product?.DisenoVersions?.map((version, index) => (
            <div key={index} className="design-version">
              <h3>
                Versión {version.dvVersion} - {version.Diseno?.dsnNombre}
              </h3>
              <p>
                <strong>Código de diseño:</strong> {version.Diseno?.dsnCodigo}
              </p>
              <p>
                <strong>Precio:</strong> ${version.dvPrecio}
              </p>
              <h4>Diseño Frontal:</h4>
              <p>{formatDesignOption(version.dvFrontal)}</p>
              <h4>Diseño Espalda:</h4>
              <p>{formatDesignOption(version.dvEspalda)}</p>
            </div>
          ))}
        </div>
      )}
    </LoaderWrapper>
  );
};

// Función auxiliar para formatear las opciones de diseño
const formatDesignOption = (option) => {
  switch (option) {
    case "logo_pequeno_izquierda":
      return "Logo pequeño (lado izquierdo)";
    case "diseno_grande":
      return "Diseño grande";
    case "diseno_mediano":
      return "Diseño mediano";
    case "logo_pequeno_centro_superior":
      return "Logo pequeño (centro superior)";
    default:
      return "Opción desconocida";
  }
};

export default ProductDetail;
