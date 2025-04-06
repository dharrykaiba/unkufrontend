// src/components/ProductCard.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/ProductCard.css"; // Importa los estilos de las tarjetas

const DEFAULT_IMAGE = "/path/to/default-image.png"; // Ruta de la imagen predeterminada

const ProductCard = ({ product }) => {
  const truncateDescription = (description) => {
    if (description && description.length > 40) {
      return description.slice(0, 40) + "...";
    }
    return description;
  };

  return (
    <Link to={`/product/${product.prdId}`} className="product-card">
      <div className="product-image">
        <img
          src={product.imageUrl || DEFAULT_IMAGE}
          alt={product.prdNombre}
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.prdNombre}</h3>
        <p className="product-description">{truncateDescription(product.prdDescripcion)}</p>
        <p className="product-price">
          <strong>S/{product.minPrecio || "No disponible"}</strong>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
