"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '../types/product';
import { Heart, ShoppingCart } from 'lucide-react';
import '../styles/components/ProductSplashScreen.css';
import PromotionsSection from './sections/PromotionsSection';

interface ProductSplashScreenProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isStandalone?: boolean;
}

export default function ProductSplashScreen({ 
  product, 
  isOpen, 
  onClose,
  isStandalone = false
}: ProductSplashScreenProps) {
  const [quantity, setQuantity] = useState(1);
  const [inputValue, setInputValue] = useState('1');
  const [isVisible, setIsVisible] = useState(false);
  const [savedScrollY, setSavedScrollY] = useState(0);

  useEffect(() => {
    // Se estiver em modo standalone, não bloqueia o scroll
    if (isStandalone) {
      setIsVisible(true);
      return;
    }
    
    if (isOpen) {
      setIsVisible(true);
      // Salva a posição atual do scroll
      const scrollY = window.scrollY;
      setSavedScrollY(scrollY);
      
      // Bloqueia o scroll da página principal
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      setIsVisible(false);
      
      // Restaura o scroll da página principal
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      
      // Aguarda um frame para garantir que os estilos foram removidos
      requestAnimationFrame(() => {
        if (savedScrollY > 0) {
          window.scrollTo(0, savedScrollY);
        } else {
          // Fallback: tenta restaurar para uma posição razoável se savedScrollY for 0
          const currentTop = document.body.style.top;
          if (currentTop && currentTop !== '') {
            const fallbackScrollY = parseInt(currentTop.replace('-', '').replace('px', ''));
            if (!isNaN(fallbackScrollY) && fallbackScrollY > 0) {
              window.scrollTo(0, fallbackScrollY);
            }
          }
        }
      });
    }

    // Cleanup quando o componente for desmontado
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      
      // Aguarda um frame para garantir que os estilos foram removidos
      requestAnimationFrame(() => {
        if (savedScrollY > 0) {
          window.scrollTo(0, savedScrollY);
        } else {
          // Fallback: tenta restaurar para uma posição razoável se savedScrollY for 0
          const currentTop = document.body.style.top;
          if (currentTop && currentTop !== '') {
            const fallbackScrollY = parseInt(currentTop.replace('-', '').replace('px', ''));
            if (!isNaN(fallbackScrollY) && fallbackScrollY > 0) {
              window.scrollTo(0, fallbackScrollY);
            }
          }
        }
      });
    };
  }, [isOpen, savedScrollY, isStandalone]);

  // Garante que o scroll permaneça bloqueado enquanto o splash screen estiver aberto
  useEffect(() => {
    // Se estiver em modo standalone, não bloqueia o scroll
    if (isStandalone) {
      return;
    }
    
    if (isOpen && isVisible) {
      // Força o bloqueio do scroll a cada mudança
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${savedScrollY}px`;
      
      // Listener para prevenir scroll apenas na página principal, não no splash screen
      const preventScroll = (e: Event) => {
        if (isOpen && isVisible) {
          // Verifica se o evento veio do splash screen
          const target = e.target as Element;
          const splashScreen = target.closest('.product-splash-overlay');
          
          // Se o evento veio de dentro do splash screen, permite o scroll
          if (splashScreen) {
            return true;
          }
          
          // Se veio de fora, bloqueia o scroll
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      };
      
      // Adiciona listeners para prevenir scroll apenas na página principal
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('keydown', (e) => {
        if (isOpen && isVisible && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'PageUp' || e.key === 'PageDown' || e.key === 'Home' || e.key === 'End')) {
          // Verifica se o foco está no splash screen
          const activeElement = document.activeElement;
          const splashScreen = activeElement?.closest('.product-splash-overlay');
          
          // Se o foco está no splash screen, permite as teclas
          if (splashScreen) {
            return true;
          }
          
          e.preventDefault();
        }
      });
      
      return () => {
        document.removeEventListener('wheel', preventScroll);
        document.removeEventListener('touchmove', preventScroll);
      };
    }
  }, [isOpen, isVisible, savedScrollY, isStandalone]);

  const handleQuantityChange = (increment: boolean) => {
    if (increment && quantity < 99) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      setInputValue(newQuantity.toString());
    } else if (!increment && quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setInputValue(newQuantity.toString());
    }
  };

  const handleInputChange = (value: string) => {
    // Se o campo estiver vazio, permite
    if (value === '') {
      setInputValue(value);
      return;
    }
    
    // Não permite caracteres especiais, só números inteiros
    if (!/^\d*$/.test(value)) {
      return; 
    }
    
    // Não permite que o primeiro número seja 0
    if (value.startsWith('0')) {
      return; 
    }
    
    const numValue = parseInt(value);
    
    // Só aceita valores válidos entre 1-99
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 99) {
      setInputValue(value);
      setQuantity(numValue);
    }
    // Se for maior que 99, não atualiza o input
    else if (numValue > 99) {
      return; 
    }
    // Para outros valores inválidos, permite digitação mas não atualiza quantidade
    else {
      setInputValue(value);
    }
  };


  // fazer depois as funções
  const handleBuyNow = () => {
    // Implementar lógica de compra
    onClose();
  };

  const handleAddToWishlist = () => {
    // Implementar lógica de lista de desejos
  };

  const handleAddToCart = () => {
    // Implementar lógica de carrinho
  };

  if ((!isOpen && !isStandalone) || !product) {
    return null;
  }

  return (
    <div className={`product-splash-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="product-splash-content">
        {/* Botão de fechar - só mostra se não estiver em modo standalone */}
        {!isStandalone && (
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        )}

        {/* Conteúdo principal */}
        <div className="product-splash-main">
          {/* Imagem do produto */}
          <div className="product-image-container">
            <Image 
              src={product.image} 
              alt={product.name}
              width={400}
              height={400}
              className="product-image"
            />
          </div>

          {/* Detalhes do produto */}
          <div className="product-details">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-id">{product.id}</p>
            
            {/* Preços */}
            <div className="pricing">
              <div className="original-price">R$ {(product.originalPrice || product.price * 1.3).toFixed(2).replace('.', ',')}</div>
              <div className="current-price">R$ {product.price.toFixed(2).replace('.', ',')}</div>
              <div className="installments">2x de R$ {(product.price / 2).toFixed(2).replace('.', ',')} sem juros</div>
            </div>

              {/* Descrição */}
             <div className="product-description">
               <h3>Descrição do Produto</h3>
               <p>Um lindo buquê com 12 rosas vermelhas, cuidadosamente selecionadas para transmitir amor, paixão e carinho. Ideal para surpreender e emocionar em momentos especiais, seja para presentear sua pessoa amada, celebrar uma data marcante ou simplesmente demonstrar afeto de forma inesquecível.</p>
             </div>

              {/* Seletor de quantidade */}
             <div className="quantity-selector">
                              <div className="quantity-controls">
                 <label>Quantidade:</label>
                 <div style={{ position: 'relative' }}>
                   <button 
                     className="quantity-btn"
                     style={{ left: 8, top: -2 }}
                     onClick={() => handleQuantityChange(false)}
                     disabled={quantity <= 1}
                   >
                     −
                   </button>
                   <input 
                     type="text"
                     inputMode="numeric"
                     pattern="[0-9]*"
                     value={inputValue} 
                     onChange={(e) => handleInputChange(e.target.value)}
                     className="quantity-input"
                     min="1"
                     max="99"
                   />
                   <button 
                     className="quantity-btn"
                     style={{ right: 12, top: -2 }}
                     onClick={() => handleQuantityChange(true)}
                     disabled={quantity >= 99}
                   >
                     +
                   </button>
                 </div>
               </div>
            </div>

            {/* Botões de ação */}
            <div className="action-buttons">
              <button className="buy-now-btn" onClick={handleBuyNow}>
                Comprar Agora
              </button>
                             <div className="secondary-actions">
                 <button className="action-btn wishlist" onClick={handleAddToWishlist}>
                   <Heart size={16} />
                 </button>
                 <button className="action-btn cart" onClick={handleAddToCart}>
                   <ShoppingCart size={16} />
                 </button>
               </div>
            </div>
          </div>
        </div>

          {/* Seção de descrição adicional */}
         <div className="additional-description">
           <h3>Descrição do Produto</h3>
           <div className="description-content">
             <p>Um lindo buquê com 12 rosas vermelhas, cuidadosamente selecionadas para transmitir amor, paixão e carinho. Ideal para surpreender e emocionar em momentos especiais, seja para presentear sua pessoa amada, celebrar uma data marcante ou simplesmente demonstrar afeto de forma inesquecível.</p>
           </div>
           
           <h3>Especificações</h3>
           <div className="description-content">
             <p>Buquê composto por 12 rosas vermelhas de alta qualidade, com folhas verdes complementares. Cada rosa é cuidadosamente selecionada para garantir beleza e durabilidade. O arranjo é embrulhado em papel especial e decorado com fita de cetim.</p>
           </div>
           
           <h3>Cuidados</h3>
           <div className="description-content">
             <p>Para manter seu buquê bonito por mais tempo, mantenha em local fresco, longe do sol direto. Troque a água diariamente e corte as hastes em diagonal. Evite colocar próximo a frutas maduras, pois liberam etileno que acelera o envelhecimento das flores.</p>
           </div>
         </div>

         {/* Seção de Promoções */}
         <div style={{ marginTop: '400px' }}>
           <PromotionsSection />
         </div>
      </div>
    </div>
  );
}
