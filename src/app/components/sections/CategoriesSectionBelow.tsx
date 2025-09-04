"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../../styles/components/CategoriesSection.css';

interface Category {
  name: string;
  image: string;
}

const CategoriesSectionBelow: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const categories: Category[] = [
    { name: 'Romântico', image: '/images/carousel/11.png' },
    { name: 'Alegre', image: '/images/carousel/10.png' },
    { name: 'Elegante', image: '/images/carousel/8.png' },
    { name: 'Delicado', image: '/images/carousel/9.png' },
    { name: 'Clássico', image: '/images/carousel/12.png' },
    { name: 'Luxo', image: '/images/carousel/10.png' },
    { name: 'Exótico', image: '/images/carousel/11.png' },
    { name: 'Aromático', image: '/images/carousel/8.png' }
  ];

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/produto?sentimento=${encodeURIComponent(categoryName)}`);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, categories.length - 5);
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, categories.length - 5);
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  return (
    <section className="categories-section">
      <div className="categories-container">
        


        {/* Carrossel de Categorias */}
        <div className="categories-carousel">
          {/* Seta Esquerda */}
          <button className="categories-nav-button prev" onClick={prevSlide}>
            <svg className="w-5 h-5" fill="none" stroke="#8B8B8B" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Categorias */}
          <div className="categories-grid">
            {categories.slice(currentIndex, currentIndex + 5).map((category, index) => (
              <div
                key={category.name}
                className={`category-item ${index === 0 ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.name)}
                style={{ cursor: 'pointer' }}
              >
                <div className="category-image-container">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="category-image"
                  />
                </div>
                <div className="category-text">
                  <h3 className="category-name">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Seta Direita */}
          <button className="categories-nav-button next" onClick={nextSlide}>
            <svg className="w-5 h-5" fill="none" stroke="#8B8B8B" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>


      </div>
    </section>
  );
};

export default CategoriesSectionBelow;
