"use client";

import { useRouter } from 'next/navigation';
import ViewProductsButton from './ViewProductsButton';
import CategoriesSectionBelow from './CategoriesSectionBelow';
import CustomerReviews from './CustomerReviews';
import ProductCard from '../products/ProductCard';
import { generateProductUrl } from '../../utils/slugUtils';

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
  const router = useRouter();

  const products: Product[] = [
    {
      id: 1001,
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
      id: 1002,
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
      id: 1003,
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
      id: 1004,
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
      id: 1005,
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
      id: 1006,
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
      id: 1007,
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
      id: 1008,
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
              clickable={false}
              onProductClick={(product) => {
                // Redireciona para a página dedicada do produto
                const productUrl = generateProductUrl(product.name, product.id);
                router.push(productUrl);
              }}
            />
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
