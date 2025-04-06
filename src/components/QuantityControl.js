// src/components/QuantityControl.js
import React from "react";

const QuantityControl = ({ item, onIncrease, onDecrease, maxQuantity }) => {
  return (
    <div className="quantity-control">
      <button
        onClick={onDecrease}
        disabled={item.quantity <= 1}
        aria-label={`Disminuir cantidad de ${item.name}`}
      >
        -
      </button>
      <span>{item.quantity}</span>
      <button
        onClick={onIncrease}
        disabled={item.quantity >= maxQuantity}
        aria-label={`Aumentar cantidad de ${item.name}`}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
