"use client";

import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Product } from '../types/product';
import { generateProductSlug } from '../utils/slugUtils';
import CategoryBadge from './products/CategoryBadge';
import '../styles/components/SearchPreview.css';

interface SearchPreviewProps {
  results: Product[];
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
  onSuggestionClick?: (suggestion: string) => void;
}

const SearchPreview: React.FC<SearchPreviewProps> = ({
  results,
  isOpen,
  onClose,
  onProductClick,
  onSuggestionClick
}) => {
  if (!isOpen) {
    return null;
  }

  const handleProductClick = (product: Product) => {
    onProductClick(product);
    onClose();
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
  };

  return (
    <div className="search-preview-overlay" onClick={onClose}>
      <div className="search-preview-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-preview-header">
          <h3 className="search-preview-title">
            {results.length > 0 ? `Resultados da busca (${results.length})` : 'Nenhum resultado encontrado'}
          </h3>
          <button 
            className="search-preview-close"
            onClick={onClose}
            aria-label="Fechar busca"
          >
            ×
          </button>
        </div>
        
        {results.length > 0 ? (
          <>
            <div className="search-preview-results">
              {results.slice(0, 6).map((product, index) => (
                <div 
                  key={product.id}
                  className="search-preview-item"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="search-preview-image">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="search-preview-img"
                    />
                  </div>
                  
                  <div className="search-preview-content">
                    <h4 className="search-preview-name">{product.name}</h4>
                    <p className="search-preview-description">
                      {product.description.substring(0, 80)}...
                    </p>
                    <div className="search-preview-meta">
                      <CategoryBadge category={product.category} variant="featured" />
                      <span className="search-preview-rating">
                        ⭐ {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                  
                  <div className="search-preview-price">
                    <span className="search-preview-price-value">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="search-preview-stock">{product.stock}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {results.length > 6 && (
              <div className="search-preview-footer">
                <p className="search-preview-more">
                  E mais {results.length - 6} produtos...
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="search-preview-no-results">
            <div className="search-preview-no-results-icon">
              <Search size={48} />
            </div>
            <h4 className="search-preview-no-results-title">
              Nenhum produto encontrado
            </h4>
            <p className="search-preview-no-results-message">
              Tente buscar por outros termos ou verifique a ortografia
            </p>
            <div className="search-preview-suggestions">
              <p className="search-preview-suggestions-title">Sugestões:</p>
              <div className="search-preview-suggestion-tags">
                <span 
                  className="search-preview-suggestion-tag"
                  onClick={() => handleSuggestionClick('rosas')}
                >
                  rosas
                </span>
                <span 
                  className="search-preview-suggestion-tag"
                  onClick={() => handleSuggestionClick('girassóis')}
                >
                  girassóis
                </span>
                <span 
                  className="search-preview-suggestion-tag"
                  onClick={() => handleSuggestionClick('tulipas')}
                >
                  tulipas
                </span>
                <span 
                  className="search-preview-suggestion-tag"
                  onClick={() => handleSuggestionClick('lírios')}
                >
                  lírios
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPreview;
