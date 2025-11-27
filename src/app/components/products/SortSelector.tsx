import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import '../../styles/components/SortSelector.css';

interface SortSelectorProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const sortOptions = [
    { value: 'relevance', label: 'Relevância' },
    { value: 'price-asc', label: 'Mais barato' },
    { value: 'price-desc', label: 'Mais caro' },
    { value: 'rating-desc', label: 'Mais avaliado' },
  ];

  const getCurrentLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Relevância';
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: string) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="sort-selector">
      <label className="sort-label">Ordenar por:</label>
      <div className="sort-dropdown" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="sort-select"
        >
          {getCurrentLabel()}
          <ChevronDown className={`sort-chevron ${isOpen ? 'rotated' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="sort-options">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionClick(option.value)}
                className={`sort-option ${sortBy === option.value ? 'selected' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortSelector;
