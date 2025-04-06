import React from "react";
import "../styles/components/ColorFilter.css";

const ColorFilter = ({ filters, handleCheckboxChange }) => {
  return (
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
  );
};

export default ColorFilter;
