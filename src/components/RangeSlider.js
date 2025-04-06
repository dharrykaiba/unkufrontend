import React, { useState } from "react";
import "../styles/components/RangeSlider.css";

const RangeSlider = ({ min, max, step, onChange }) => {
  const [rangeValues, setRangeValues] = useState([min, max]);

  const handleInputChange = (e, index) => {
    const newValue = Math.min(Math.max(Number(e.target.value), min), max);
    const newRangeValues = [...rangeValues];
    newRangeValues[index] = newValue;

    // Asegurar que el mínimo no supere al máximo y viceversa
    if (newRangeValues[0] > newRangeValues[1]) {
      if (index === 0) {
        newRangeValues[1] = newValue;
      } else {
        newRangeValues[0] = newValue;
      }
    }

    setRangeValues(newRangeValues);
    onChange(newRangeValues);
  };

  const handleSliderChange = (e) => {
    const { value, name } = e.target;
    const index = name === "min" ? 0 : 1;
    handleInputChange({ target: { value } }, index);
  };

  return (
    <div className="range-slider">
      <div className="slider-controls">
        <input
          type="number"
          className="range-input"
          value={rangeValues[0]}
          min={min}
          max={rangeValues[1]}
          step={step}
          onChange={(e) => handleInputChange(e, 0)}
        />
        <input
          type="number"
          className="range-input"
          value={rangeValues[1]}
          min={rangeValues[0]}
          max={max}
          step={step}
          onChange={(e) => handleInputChange(e, 1)}
        />
      </div>
      <div className="slider-track">
        <input
          type="range"
          name="min"
          min={min}
          max={max}
          step={step}
          value={rangeValues[0]}
          onChange={handleSliderChange}
          className="slider-thumb min-thumb"
        />
        <input
          type="range"
          name="max"
          min={min}
          max={max}
          step={step}
          value={rangeValues[1]}
          onChange={handleSliderChange}
          className="slider-thumb max-thumb"
        />
      </div>
    </div>
  );
};

export default RangeSlider;
