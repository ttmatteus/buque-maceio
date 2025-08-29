"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header, Footer, ProductSplashScreen } from '../../../components';
import { products } from '../../../data/products';
import { generateProductSlug } from '../../../utils/slugUtils';
import '../../../styles/components/ProductPage.css';
import '../../../styles/components/ProductSplashScreen.css';
import { Product } from '../../../types/product';

export default function ProductDetailClient() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id && params.slug) {
      const productId = parseInt(params.id as string);
      const urlSlug = params.slug as string;
      
      // Primeiro procura no arquivo principal de produtos
      let foundProduct = products.find((p: Product) => p.id === productId);
      
      // Se não encontrou, procura nos produtos hardcoded da landing page
      if (!foundProduct) {
        const landingPageProducts = [
          // FeaturedBouquets - todos os 8 produtos
          { id: 1001, name: "Buquê de Rosas", description: "Lindo buquê com 12 rosas vermelhas, perfeito para presentear sua...", price: 89.90, image: "/images/carousel/13.png", category: "Romântico", rating: 4, reviews: 127, stock: "Restam dois" },
          { id: 1002, name: "Combo Dia das Mães", description: "Especial para celebrar o amor materno com flores selecionadas...", price: 120.73, image: "/images/carousel/14.png", category: "Combos", rating: 4, reviews: 89, stock: "Restam dois" },
          { id: 1003, name: "Buquê de Girassóis", description: "Vibrante buquê de girassóis que traz alegria e energia...", price: 75.50, image: "/images/carousel/2.png", category: "Alegre", rating: 4, reviews: 156, stock: "Em estoque" },
          { id: 1004, name: "Buquê de Rosas", description: "Lindo buquê com 12 rosas vermelhas, perfeito para presentear sua...", price: 95.00, image: "/images/carousel/15.png", category: "Romântico", rating: 4, reviews: 203, stock: "Em estoque" },
          { id: 1005, name: "Buquê de Tulipas", description: "Delicado buquê com tulipas e zínias em tons rosados...", price: 88.90, image: "/images/carousel/16.png", category: "Delicado", rating: 4, reviews: 134, stock: "Em estoque" },
          { id: 1006, name: "Combo Dia das Avós", description: "Especial para homenagear as avós com flores e presentes...", price: 145.00, image: "/images/carousel/17.png", category: "Combos", rating: 4, reviews: 67, stock: "Em estoque" },
          { id: 1007, name: "Buquê de Gerberas", description: "Colorido buquê com gerberas, margaridas e tulipas...", price: 78.50, image: "/images/carousel/1.png", category: "Delicado", rating: 4, reviews: 98, stock: "Em estoque" },
          { id: 1008, name: "Buquê de Rosas", description: "Clássico buquê de rosas vermelhas e brancas...", price: 92.00, image: "/images/carousel/4.png", category: "Clássico", rating: 4, reviews: 178, stock: "Em estoque" },
          // PromotionsSection - todos os 3 produtos
          { id: 2001, name: "Buquê de Rosas", description: "Lindo buquê com 12 rosas vermelhas, perfeito para presentear sua pessoa especial em momentos únicos.", image: "/images/decorative/flor6.png", category: "Alegre", rating: 4, reviews: 127, price: 89.90, originalPrice: 129.90, stock: "Em estoque" },
          { id: 2002, name: "Buquê de Girassóis", description: "Buquê vibrante com girassóis amarelos e flores complementares, ideal para transmitir alegria e energia positiva.", image: "/images/bouquets/girassol.jpg", category: "Alegre", rating: 5, reviews: 89, price: 79.90, originalPrice: 129.90, stock: "Em estoque" },
          { id: 2003, name: "Buquê Misto", description: "Composição harmoniosa com diversas flores coloridas, criando um arranjo único e cheio de personalidade.", image: "/images/decorative/flor7.png", category: "Alegre", rating: 4, reviews: 156, price: 94.90, originalPrice: 134.90, stock: "Em estoque" }
        ];
        
        foundProduct = landingPageProducts.find((p: Product) => p.id === productId);
      }
      
      if (foundProduct) {
        // Verifica se o slug da URL corresponde ao nome do produto
        const expectedSlug = generateProductSlug(foundProduct.name);
        
        if (urlSlug === expectedSlug) {
          setProduct(foundProduct);
        } else {
          // Slug não corresponde, redirecionar para a URL correta
          router.replace(`/produto/${expectedSlug}/${productId}`);
          return;
        }
      } else {
        // Produto não encontrado, redirecionar para página de produtos
        router.push('/produto');
      }
      setIsLoading(false);
    }
  }, [params.id, params.slug, router]);

  const handleCloseSplash = () => {
    router.push('/produto');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Product Splash Screen sempre visível nesta página */}
      <ProductSplashScreen
        product={product}
        isOpen={true}
        onClose={handleCloseSplash}
        isStandalone={true}
      />
      
      <Footer />
    </div>
  );
}
