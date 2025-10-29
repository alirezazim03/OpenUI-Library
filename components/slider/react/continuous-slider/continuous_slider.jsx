"use client";
import {useState } from "react";

const ContinuousSlider = ({
  min = 0,
  max = 100,
  defaultValue = 40,
  onChange = null,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [hover, setHover] = useState(false);

  const handleChange = (e) => {
    const val = Number(e.target.value);
    setValue(val);
    if (onChange) onChange(val);
  };

  const percent = ((value - min) / (max - min)) * 100;
  const tooltipPosition = Math.min(Math.max(percent, 0), 100);

  return (
    <div className="relative w-full max-w-[300px] h-[30px] mx-auto mt-12">
      <input
        type="range"
        min={min}
        max={max}
        step="any"
        value={value}
        onChange={handleChange}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label="Continuous slider"
        aria-valuenow={value}
        className="w-full h-[6px] appearance-none rounded-md outline-none bg-gray-300"
        style={{
          background: `linear-gradient(to right, #0ea5e9 ${percent}%, #cdd6e0 ${percent}%)`,
        }}
      />

      <div
        className={`absolute -top-7 px-2 py-[2px] text-xs rounded bg-gray-700 text-white transition-opacity duration-200 whitespace-nowrap ${
          hover ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${tooltipPosition}%`,
          transform: "translateX(-50%)",
        }}
      >
        {value.toFixed(2)}
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #0ea5e9;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #0ea5e9;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default ContinuousSlider;
