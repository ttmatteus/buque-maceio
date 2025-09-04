"use client";

import ViewProductsButton from './ViewProductsButton';
import CategoriesSectionBelow from './CategoriesSectionBelow';
import CustomerReviews from './CustomerReviews';
import CategoryBadge from './CategoryBadge';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  stock: string;
}

const FeaturedBouquets: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Buquê de Rosas",
      description: "Lindo buquê com 12 rosas vermelhas, perfeito para presentear sua...",
      price: 89.90,
      image: "/images/carousel/13.png",
      category: "Romântico",
      rating: 4,
      reviews: 127,
      stock: "Restam dois"
    },
    {
      id: 2,
      name: "Combo Dia das Mães",
      description: "Especial para celebrar o amor materno com flores selecionadas...",
      price: 120.73,
      image: "/images/carousel/14.png",
      category: "Combos",
      rating: 4,
      reviews: 89,
      stock: "Restam dois"
    },
    {
      id: 3,
      name: "Buquê de Girassóis",
      description: "Vibrante buquê de girassóis que traz alegria e energia...",
      price: 75.50,
      image: "/images/carousel/2.png",
      category: "Alegre",
      rating: 4,
      reviews: 156,
      stock: "Em estoque"
    },
    {
      id: 4,
      name: "Buquê de Rosas",
      description: "Lindo buquê com 12 rosas vermelhas, perfeito para presentear sua...",
      price: 95.00,
      image: "/images/carousel/15.png",
      category: "Romântico",
      rating: 4,
      reviews: 203,
      stock: "Em estoque"
    },
    {
      id: 5,
      name: "Buquê de Tulipas",
      description: "Delicado buquê com tulipas e zínias em tons rosados...",
      price: 88.90,
      image: "/images/carousel/16.png",
      category: "Delicado",
      rating: 4,
      reviews: 134,
      stock: "Em estoque"
    },
    {
      id: 6,
      name: "Combo Dia das Avós",
      description: "Especial para homenagear as avós com flores e presentes...",
      price: 145.00,
      image: "/images/carousel/17.png",
      category: "Combos",
      rating: 4,
      reviews: 67,
      stock: "Em estoque"
    },
    {
      id: 7,
      name: "Buquê de Gerberas",
      description: "Colorido buquê com gerberas, margaridas e tulipas...",
      price: 78.50,
      image: "/images/carousel/1.png",
      category: "Delicado",
      rating: 4,
      reviews: 98,
      stock: "Em estoque"
    },
    {
      id: 8,
      name: "Buquê de Rosas",
      description: "Clássico buquê de rosas vermelhas e brancas...",
      price: 92.00,
      image: "/images/carousel/4.png",
      category: "Clássico",
      rating: 4,
      reviews: 178,
      stock: "Em estoque"
    }
  ];



  return (
    <section className="featured-bouquets-section">

      
      <div className="featured-bouquets-container">
        {/* Header da Seção */}
        <div className="featured-bouquets-header">
          <h2 className="featured-bouquets-title">
            Buquês em Destaque
          </h2>
          <p className="featured-bouquets-subtitle">
            Explore nossa coleção única de buquês artesanais, cuidadosamente elaborados com flores selecionadas e muito carinho
          </p>
        </div>

        {/* Grid de Produtos */}
        <div className="featured-bouquets-grid">
          {products.map((product) => (
            <div key={product.id} className="featured-product-item">
              {/* Imagem do Produto */}
              <div className="featured-product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="featured-product-image"
                />
                {/* Badge da Categoria */}
                <CategoryBadge category={product.category} variant="featured" />
              </div>

              {/* Conteúdo do Produto */}
              <div className="featured-product-content">
                {/* Nome do Produto */}
                <h3 className="featured-product-name">
                  {product.name}
                </h3>

                {/* Descrição */}
                <p className="featured-product-description">
                  {product.description}
                </p>

                {/* Container com posição fixa para avaliação, preço e estoque */}
                <div className="featured-product-info">
                  {/* Avaliação */}
                  <div className="featured-product-rating">
                    <div className="featured-stars">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`featured-star ${i < product.rating ? 'filled' : 'empty'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.898 3.09 1.127-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.74 4.635 1.127 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="featured-reviews-count">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Preço */}
                  <div className="featured-product-price-container">
                    <div className="featured-product-price">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </div>
                  </div>

                  {/* Status do Estoque */}
                  <div className={`featured-product-stock ${product.stock === 'Em estoque' ? 'in-stock' : 'low-stock'}`}>
                    {product.stock}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botão Ver nossos produtos */}
        <ViewProductsButton />
        
        {/* Seção de Categorias Abaixo */}
        <div id="sentimentos">
          <CategoriesSectionBelow />
        </div>
        
        {/* Seção de Avaliações de Clientes */}
        <CustomerReviews />
      </div>
    </section>
  );
};

export default FeaturedBouquets;
