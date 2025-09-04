import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const [discountValues, setDiscountValues] = useState<{ [key: number]: number }>({});

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

  // Função para calcular o desconto
  const calculateDiscount = (originalPrice: number, price: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Animação de contagem do desconto
  // Esta animação faz o valor do desconto contar de 0 até o valor final
  // e depois aplica um efeito de balanço quando termina
  useEffect(() => {
    const animateDiscounts = () => {
      products.forEach((product) => {
        const finalDiscount = calculateDiscount(product.originalPrice, product.price);
        
        // Inicia a contagem após um delay baseado no ID do produto
        // Cada produto tem um delay diferente para criar um efeito cascata
        setTimeout(() => {
          let currentValue = 0;
          const increment = finalDiscount / 40; // 40 passos para a contagem mais suave
          
          const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalDiscount) {
              currentValue = finalDiscount;
              clearInterval(timer);
              
              // Adiciona o balanço após a contagem terminar
              // O balanço só acontece quando o valor final é atingido
              setTimeout(() => {
                setDiscountValues(prev => ({
                  ...prev,
                  [product.id]: finalDiscount
                }));
              }, 200);
            }
            
            // Atualiza o valor atual para criar o efeito de contagem
            setDiscountValues(prev => ({
              ...prev,
              [product.id]: Math.floor(currentValue)
            }));
          }, 40); // 40ms entre cada incremento para movimento mais suave
        }, product.id * 300); // Delay escalonado para cada produto
      });
    };

    // Inicia a animação quando o componente montar
    animateDiscounts();
  }, []);

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
                                <motion.div 
                                  className="discount-badge"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ 
                                    opacity: 1, 
                                    scale: discountValues[product.id] === calculateDiscount(product.originalPrice, product.price) ? 
                                      [1, 1.1, 1, 1.1, 1] : 1,
                                    rotate: discountValues[product.id] === calculateDiscount(product.originalPrice, product.price) ? 
                                      [0, -6, 6, -6, 6, 0] : 0
                                  }}
                                  transition={{
                                    opacity: { duration: 0.5, delay: product.id * 0.1 },
                                    scale: { duration: 0.5, delay: product.id * 0.1 },
                                    rotate: { duration: 0.6, ease: "easeInOut" }
                                  }}
                                >
                                  -{discountValues[product.id] || 0}%
                                </motion.div>
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
