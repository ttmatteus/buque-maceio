import React from 'react';
import { Product } from '../../types/product';
import ProductCard from './ProductCard';
import { products } from '../../data/products';

interface RelatedProductsProps {
  currentProduct: Product;
  onProductClick?: (product: Product) => void;
  maxProducts?: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProduct,
  onProductClick,
  maxProducts = 4
}) => {
  // Função para encontrar produtos relacionados
  const getRelatedProducts = (product: Product): Product[] => {
    let relatedProducts: Product[] = [];

    // Primeiro, tenta pegar produtos da mesma categoria
    const sameCategoryProducts = products.filter(
      p => p.category === product.category && p.id !== product.id
    );
    
    if (sameCategoryProducts.length > 0) {
      relatedProducts = [...sameCategoryProducts];
    }

    // Se não tem 4 produtos da mesma categoria, busca por produtos com preços similares
    if (relatedProducts.length < maxProducts) {
      const priceRange = product.price * 0.3; // 30% de variação no preço
      const similarPriceProducts = products
        .filter(p => 
          p.id !== product.id && 
          !relatedProducts.some(rp => rp.id === p.id) && // Evita duplicatas
          Math.abs(p.price - product.price) <= priceRange
        );
      
      relatedProducts = [...relatedProducts, ...similarPriceProducts];
    }

    // Se ainda não tem 4 produtos, pega qualquer produto que não seja o atual
    if (relatedProducts.length < maxProducts) {
      const otherProducts = products
        .filter(p => 
          p.id !== product.id && 
          !relatedProducts.some(rp => rp.id === p.id) // Evita duplicatas
        );
      
      relatedProducts = [...relatedProducts, ...otherProducts];
    }

    // Retorna exatamente 4 produtos
    return relatedProducts.slice(0, maxProducts);
  };

  const relatedProducts = getRelatedProducts(currentProduct);

  // Se não houver produtos relacionados, não renderiza o componente
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="related-products-section">
      <h3 className="related-products-title">Clientes que compraram este buquê também compraram</h3>
      <div className={`related-products-grid ${relatedProducts.length <= 2 ? 'few-products' : ''}`}>
        {relatedProducts.map((product) => (
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
    </div>
  );
};

export default RelatedProducts;
