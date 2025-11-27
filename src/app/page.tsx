"use client";

import { 
  Header, 
  Footer,
  Carousel,
  CategoriesSection,
  FeaturedBouquets,
  DifferentialsSection,
  PromotionsSection,
  LazySection,
  PerformanceOptimizer
} from './components';

export default function Home() {
  // Imagens críticas para pré-carregamento
  const criticalImages = [
    '/images/decorative/flor1.png',
    '/images/decorative/flor2.png',
    '/images/carousel/13.png',
    '/images/carousel/14.png'
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Otimizador de Performance */}
      <PerformanceOptimizer criticalImages={criticalImages} />
      
      {/* header sempre carregado */}
      <Header />
      
      {/* hero Section - Carousel (carrega imediatamente) */}
      <div id="inicio" style={{ marginTop: '112px' }}>
        <Carousel />
      </div>
      

      {/* seção de Categorias - Lazy Loading */}
      <div id="tipos">
        <LazySection threshold={0.2}>
          <CategoriesSection />
        </LazySection>
      </div>
      
      {/* seção de Buquês em Destaque - Lazy Loading */}
      <div id="buques">
        <LazySection threshold={0.2}>
          <FeaturedBouquets />
        </LazySection>
      </div>
      
      {/* seção de Nossos Diferenciais - Lazy Loading */}
      <div id="diferenciais">
        <LazySection threshold={0.2}>
          <DifferentialsSection />
        </LazySection>
      </div>

      {/* seção de Promoções da Semana - Lazy Loading */}
      <div id="promocoes">
        <LazySection threshold={0.2}>
          <PromotionsSection />
        </LazySection>
      </div>
      
      {/* Footer sempre carregado */}
      <Footer />
    </div>
  );
}