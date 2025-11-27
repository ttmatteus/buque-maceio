import React from 'react';
import { useRouter } from 'next/navigation';
import CategoryBadge from './CategoryBadge';
import LazyImage from '../LazyImage';
import { generateProductUrl } from '../../utils/slugUtils';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  stock: string;
  image: string;
  showStock?: boolean;
  clickable?: boolean;
  onProductClick?: (product: {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;
    category: string;
    stock: string;
    image: string;
  }) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  rating,
  reviews,
  category,
  stock,
  image,
  showStock = true,
  clickable = false,
  onProductClick
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick({
        id,
        name,
        description,
        price,
        rating,
        reviews,
        category,
        stock,
        image
      });
    } else if (clickable) {
      // Usa a função utilitária para gerar a URL
      const productUrl = generateProductUrl(name, id);
      router.push(productUrl);
    }
  };

  return (
    <div 
      className={`featured-product-item ${clickable ? 'clickable' : ''}`}
      onClick={handleCardClick}
    >
      {/* Imagem do Produto */}
      <div className="featured-product-image-container">
        <LazyImage
          src={image}
          alt={name}
          className="featured-product-image"
        />
        {/* Badge da Categoria */}
        <CategoryBadge category={category} variant="featured" />
      </div>

      {/* Conteúdo do Produto */}
      <div className="featured-product-content">
        {/* Nome do Produto */}
        <h3 className="featured-product-name">
          {name}
        </h3>

        {/* Descrição */}
        <p className="featured-product-description">
          {description}
        </p>

        {/* Container com posição fixa para avaliação, preço e estoque */}
        <div className="featured-product-info">
          {/* Avaliação */}
          <div className="featured-product-rating">
            <div className="featured-stars">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`featured-star ${i < rating ? 'filled' : 'empty'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.898 3.09 1.127-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.74 4.635 1.127 6.545z" />
                </svg>
              ))}
            </div>
            <span className="featured-reviews-count">
              ({reviews})
            </span>
          </div>

          {/* Preço */}
          <div className="featured-product-price-container">
            <div className="featured-product-price">
              R$ {price.toFixed(2).replace('.', ',')}
            </div>
          </div>

          {/* Status do Estoque - só mostra se showStock for true */}
          {showStock && (
            <div className={`featured-product-stock ${stock === 'Em estoque' ? 'in-stock' : 'low-stock'}`}>
              {stock}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
