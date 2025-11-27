import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CategoryBadge } from '../products';
import { generateProductUrl } from '../../utils/slugUtils'; 

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
  stock: string;
}

const PromotionsSection: React.FC = () => {
  const router = useRouter();
  const [discountValues, setDiscountValues] = useState<{ [key: number]: number }>({});
  const [animationExecuted, setAnimationExecuted] = useState(false);
  
  const products = useMemo(() => [
    {
      id: 2001,
      name: "Buquê de Rosas",
      description: "Lindo buquê com 12 rosas vermelhas, perfeito para presentear sua pessoa especial em momentos únicos.",
      image: "/images/decorative/flor6.png",
      category: "Alegre",
      rating: 4,
      reviews: 127,
      price: 89.90,
      originalPrice: 129.90,
      stock: "Em estoque"
    },
    {
      id: 2002,
      name: "Buquê de Girassóis",
      description: "Buquê vibrante com girassóis amarelos e flores complementares, ideal para transmitir alegria e energia positiva.",
      image: "/images/bouquets/girassol.jpg",
      category: "Alegre",
      rating: 5,
      reviews: 89,
      price: 79.90,
      originalPrice: 119.90,
      stock: "Em estoque"
    },
    {
      id: 2003,
      name: "Buquê Misto",
      description: "Composição harmoniosa com diversas flores coloridas, criando um arranjo único e cheio de personalidade.",
      image: "/images/decorative/flor7.png",
      category: "Alegre",
      rating: 4,
      reviews: 156,
      price: 94.90,
      originalPrice: 134.90,
      stock: "Em estoque"
    }
  ], []);
  


  // Inicializa os valores de desconto com 0
  useEffect(() => {
    const initialDiscounts = products.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {} as { [key: number]: number });
    
    setDiscountValues(initialDiscounts);
  }, [products]);

  // Função para redirecionar para a página do produto
  const handleProductClick = useCallback((product: Product) => {
    // Redireciona para a página dedicada do produto
    const productUrl = generateProductUrl(product.name, product.id);
    router.push(productUrl);
  }, [router]);


  // Função para calcular o desconto
  const calculateDiscount = (originalPrice: number, price: number) => {
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
    return discount;
  };

  // Animação de contagem do desconto
  useEffect(() => {
    if (animationExecuted) {
      return;
    }

    setAnimationExecuted(true);
    
    const timers: NodeJS.Timeout[] = [];
    const intervals: NodeJS.Timeout[] = [];
    
    const animateDiscounts = () => {
      products.forEach((product, index) => {
        const finalDiscount = calculateDiscount(product.originalPrice, product.price);
        
        // Inicia a contagem após um delay baseado no índice (não no ID)
        // Cada produto tem um delay diferente para criar um efeito cascata
        const timeout = setTimeout(() => {
          let currentValue = 0;
          const increment = finalDiscount / 40; // 40 passos para a contagem mais suave
          
          const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalDiscount) {
              currentValue = finalDiscount;
              clearInterval(timer);
              
              // Adiciona o balanço após a contagem terminar
              // O balanço só acontece quando o valor final é atingido
              const balanceTimeout = setTimeout(() => {
                setDiscountValues(prev => ({
                  ...prev,
                  [product.id]: finalDiscount
                }));
              }, 200);
              
              timers.push(balanceTimeout);
            }
            
            // Atualiza o valor atual para criar o efeito de contagem
            setDiscountValues(prev => ({
              ...prev,
              [product.id]: Math.floor(currentValue)
            }));
          }, 40); // 40ms entre cada incremento para movimento mais suave
          
          intervals.push(timer);
        }, index * 500); // Delay escalonado baseado no índice (500ms entre cada produto)
        
        timers.push(timeout);
      });
    };

    // Inicia a animação quando o componente montar
    animateDiscounts();

    // Cleanup: limpa todos os timers e intervals
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      intervals.forEach(interval => clearInterval(interval));
    };
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
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
                {/* Imagem do Produto */}
                <div className="featured-product-image-container">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="featured-product-image"
                  />
                  <CategoryBadge category={product.category} variant="featured" />
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
                        opacity: { duration: 0.5, delay: index * 0.1 },
                        scale: { duration: 0.5, delay: index * 0.1 },
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