import React from 'react';
import CategoryBadge from './CategoryBadge';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
}

const PromotionsSection: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Buquê de Rosas",
      description: "Lindo buquê com 12 rosas vermelhas, perfeito para presentear sua pessoa especial em momentos únicos.",
      image: "/images/decorative/flor6.png",
      category: "Alegre",
      rating: 4,
      reviews: 127,
      price: 89.90,
      originalPrice: 129.90
    },
    {
      id: 2,
      name: "Buquê de Girassóis",
      description: "Buquê vibrante com girassóis amarelos e flores complementares, ideal para transmitir alegria e energia positiva.",
      image: "/images/bouquets/girassol.jpg",
      category: "Alegre",
      rating: 5,
      reviews: 89,
      price: 79.90,
      originalPrice: 119.90
    },
    {
      id: 3,
      name: "Buquê Misto",
      description: "Composição harmoniosa com diversas flores coloridas, criando um arranjo único e cheio de personalidade.",
      image: "/images/decorative/flor7.png",
      category: "Alegre",
      rating: 4,
      reviews: 156,
      price: 94.90,
      originalPrice: 134.90
    }
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="star filled" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L2 9L8.91 8.26L12 2Z" />
          </svg>
        ))}
        
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="star empty" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L2 9L8.91 8.26L12 2Z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="promotions-section">
      <div className="promotions-container">
        {/* Header da Seção */}
        <div className="promotions-header">
          <h2 className="promotions-title">Promoções da Semana</h2>
          <p className="promotions-subtitle">
            Aproveite descontos exclusivos em flores frescas, naturais e cheias de vida.<br />
            nossas promoções tornam cada momento inesquecível
          </p>
        </div>

        {/* Grid dos Produtos */}
        <div className="promotions-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {/* Imagem do Produto */}
                                        <div className="product-image-container">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="product-image"
                            />
                            <CategoryBadge category={product.category} />
                          </div>
              
              {/* Informações do Produto */}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                {/* Avaliação */}
                <div className="product-rating">
                  {renderStars(product.rating)}
                  <span className="reviews-count">({product.reviews})</span>
                </div>
                
                                            {/* Preços */}
                            <div className="product-price-container">
                              <div className="price-wrapper">
                                <div className="product-original-price">
                                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                                </div>
                                <div className="product-price">
                                  R$ {product.price.toFixed(2).replace('.', ',')}
                                </div>
                                <div className="discount-badge">
                                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                </div>
                              </div>
                            </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
