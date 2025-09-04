import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  stock: string;
  image: string;
}

interface ProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  return (
    <div className="featured-bouquets-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          rating={product.rating}
          reviews={product.reviews}
          category={product.category}
          stock={product.stock}
          image={product.image}
          showStock={false}
          clickable={true}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
