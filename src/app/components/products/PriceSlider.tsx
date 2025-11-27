import React, { useState, useEffect } from 'react';
import '../../styles/components/PriceSlider.css';

interface PriceSliderProps {
  minPrice: number;
  maxPrice: number;
  selectedMinPrice: number;
  selectedMaxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({
  minPrice,
  maxPrice,
  selectedMinPrice,
  selectedMaxPrice,
  onPriceChange
}) => {
  const [minValue, setMinValue] = useState(selectedMinPrice);
  const [maxValue, setMaxValue] = useState(selectedMaxPrice);

  useEffect(() => {
    setMinValue(selectedMinPrice);
    setMaxValue(selectedMaxPrice);
  }, [selectedMinPrice, selectedMaxPrice]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
    onPriceChange(value, maxValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    onPriceChange(minValue, value);
  };

  const getPercentage = (value: number) => {
    return ((value - minPrice) / (maxPrice - minPrice)) * 100;
  };

  return (
    <div className="price-slider-container">
      <div className="price-slider-header">
        <span className="price-slider-label">Faixa de Preço</span>
        <span className="price-slider-values">
          R$ {minValue} - R$ {maxValue}
        </span>
      </div>
      
      <div className="price-slider-wrapper">
        <div className="price-slider-track">
          <div 
            className="price-slider-range"
            style={{
              left: `${getPercentage(minValue)}%`,
              width: `${getPercentage(maxValue) - getPercentage(minValue)}%`
            }}
          />
        </div>
        
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={minValue}
          onChange={handleMinChange}
          className="price-slider-input price-slider-min"
        />
        
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={maxValue}
          onChange={handleMaxChange}
          className="price-slider-input price-slider-max"
        />
      </div>
      
      <div className="price-slider-labels">
        <span className="price-slider-min-label">R$ {minPrice}</span>
        <span className="price-slider-max-label">R$ {maxPrice}</span>
      </div>
    </div>
  );
};

export default PriceSlider;
