import React, { useState, useEffect } from "react";
import "../styles/components/PriceRangeSelector.css";

const PriceRangeSelector = ({ pendingFilters, setPendingFilters }) => {
  const [selectedRange, setSelectedRange] = useState("");

  const ranges = [
    { min: 20, max: 50 },
    { min: 51, max: 80 },
    { min: 81, max: 110 },
    { min: 111, max: 130 },
    { min: 131, max: 150 },
  ];

  // Sincronizar el rango seleccionado con los filtros
  useEffect(() => {
    if (pendingFilters.precioMin && pendingFilters.precioMax) {
      const range = `${pendingFilters.precioMin}-${pendingFilters.precioMax}`;
      setSelectedRange(range);
    } else {
      setSelectedRange("");
    }
  }, [pendingFilters]);

  const handleRangeChange = (range) => {
    setSelectedRange(range);
    const [min, max] = range.split("-").map(Number);
    setPendingFilters((prev) => ({
      ...prev,
      precioMin: min,
      precioMax: max,
    }));
  };

  return (
    <div className="price-range-selector">
      <h3>Rango de precios</h3>
      <div className="range-options">
        {ranges.map((range, index) => (
          <label key={index} className="range-option">
            <input
              type="radio"
              name="priceRange"
              value={`${range.min}-${range.max}`}
              checked={selectedRange === `${range.min}-${range.max}`}
              onChange={() => handleRangeChange(`${range.min}-${range.max}`)}
            />
            {`S/ ${range.min} - S/ ${range.max}`}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PriceRangeSelector;
