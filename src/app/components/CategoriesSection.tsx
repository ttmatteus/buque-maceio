"use client";

import { useState } from 'react';

interface Category {
  name: string;
  image: string;
}

const CategoriesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const categories: Category[] = [
    { name: 'Tulipas', image: '/images/carousel/8.png' },
    { name: 'Rosas', image: '/images/carousel/11.png' },
    { name: 'Girassóis', image: '/images/carousel/10.png' },
    { name: 'Margaridas', image: '/images/carousel/12.png' },
    { name: 'Orquídeas	', image: '/images/carousel/9.png' }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  return (
    <section className="categories-section">
      <div className="categories-container">

        
        {/* Carrossel de Categorias */}
        <div className="categories-carousel">
          {/* Seta Esquerda */}
          <button 
            onClick={prevSlide}
            className="categories-nav-button prev"
          >
            <svg className="w-5 h-5 transition-colors duration-300" fill="none" stroke="#8B8B8B" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Categorias */}
          <div className="categories-grid">
            {categories.map((_, index) => {
              const categoryIndex = (currentIndex + index) % categories.length;
              const category = categories[categoryIndex];
              
              return (
                <div
                  key={`${category.name}-${index}`}
                  className="category-item"
                >
                  <div className="category-image-container">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="category-image"
                    />
                  </div>
                  <div className="category-text">
                    <h3 className="category-name">
                      {category.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Seta Direita */}
          <button 
            onClick={nextSlide}
            className="categories-nav-button next"
          >
            <svg className="w-5 h-5" fill="none" stroke="#8B8B8B" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
