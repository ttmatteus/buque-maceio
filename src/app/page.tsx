"use client";


import Header from './components/Header';
import Carousel from './components/Carousel';
import CategoriesSection from './components/CategoriesSection';
import FeaturedBouquets from './components/FeaturedBouquets';
import DifferentialsSection from './components/DifferentialsSection';
import PromotionsSection from './components/PromotionsSection';
import Footer from './components/Footer';



export default function Home() {
  return (
    <div className="bg-white">
      {/* header sempre carregado */}
      <Header />
      
      {/* hero Section - Carousel */}
      <div id="inicio" style={{ marginTop: '112px' }}>
        <Carousel />
      </div>
      
      {/* seção de Categorias */}
      <div id="tipos">
        <CategoriesSection />
      </div>
      
      {/* seção de Buquês em Destaque */}
      <div id="buques">
        <FeaturedBouquets />
      </div>
      
      {/* seção de Nossos Diferenciais */}
      <div id="diferenciais">
        <DifferentialsSection />
      </div>
      
      {/* seção de Promoções da Semana */}
      <div id="promocoes">
        <PromotionsSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}