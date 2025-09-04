"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// header massa 
const Header: React.FC = () => {
  const [openSentimentosDropdown, setOpenSentimentosDropdown] = useState(false);
  const router = useRouter();
  
  // Lista de sentimentos disponíveis
  const sentimentos = ['Romântico', 'Alegre', 'Elegante', 'Delicado', 'Clássico', 'Luxo', 'Exótico', 'Aromático'];
  


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      let offset = 120; 
      
      // Offset maior para a seção de buquês
      if (sectionId === 'buques') {
        offset = 50; 
      }
      
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSentimentoClick = (sentimento: string) => {
    // Fecha o dropdown
    setOpenSentimentosDropdown(false);
    
    // Redireciona para a pagina de produtos com o filtro de sentimento
    const url = `/produto?sentimento=${encodeURIComponent(sentimento)}`;
    router.push(url);
  };


  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full max-w-full">
      {/* barra superior branca  */}
      <div className="header-top">
        <div className="header-container">
          <div className="header-content">
            
            {/* lado esquerdo: logo + nome da empresa */}
            <div className="header-brand" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
              <div className="header-logo">
                <Image
                  src="/images/logos/Logo (1).png"
                  alt="Logo Buquê Maceió"
                  width={50}
                  height={50}
                  className="h-12 w-12 object-contain"
                />
              </div>
              <div className="header-brand-text">
                <h1 className="header-title">Buquê Maceió</h1>
                <p className="header-subtitle">Flores e Elegância</p>
              </div>
            </div>

            {/* barra de pesquisa centralizada */}
            <div className="header-search">
              <div className="search-container">
                <div className="search-icon">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Pesquisar tipos de flores, compos..."
                  className="search-input"
                />
              </div>
            </div>

            {/* lado direito: ícones personalizados do usuário */}
            <div className="header-actions">
              <motion.button 
                className="header-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/images/icons/Frame.svg"
                  alt="Perfil do usuário"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </motion.button>
              <motion.button 
                className="header-button favorites"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  whileHover={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src="/images/icons/Frame (1).svg"
                    alt="Favoritos"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </motion.div>
              </motion.button>
              <motion.button 
                className="header-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/images/icons/Frame (2).svg"
                  alt="Carrinho de compras"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* barra inferior preta */}
      <div className="header-bottom">
        <div className="header-nav-container">
          <div className="header-nav">
            <nav className="header-nav-menu">
              <motion.button 
                onClick={() => scrollToSection('tipos')}
                className="header-nav-button"
                whileHover={{ color: '#FFD950' }}
                transition={{ duration: 0.2 }}
              >
                <span>Tipos de Flores</span>
                <FaChevronDown size={10} />
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('buques')}
                className="header-nav-button"
                whileHover={{ color: '#FFD950' }}
                transition={{ duration: 0.2 }}
              >
                <span>Buquês</span>
                <FaChevronDown size={10} />
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('cestas')}
                className="header-nav-button"
                whileHover={{ color: '#FFD950' }}
                transition={{ duration: 0.2 }}
              >
                <span>Cesta</span>
                <FaChevronDown size={10} />
              </motion.button>
              <motion.button 
                onClick={() => router.push('/produto')}
                className="header-nav-button"
                whileHover={{ color: '#FFD950' }}
                transition={{ duration: 0.2 }}
              >
                <span>Produtos</span>
                <FaChevronDown size={10} />
              </motion.button>
              
              {/* Botão Sentimentos com Dropdown */}
              <div className="header-nav-dropdown">
                <motion.button 
                  onClick={() => {
                    setOpenSentimentosDropdown(!openSentimentosDropdown);
                  }}
                  className="header-nav-button"
                  whileHover={{ color: '#FFD950' }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Sentimentos</span>
                  <motion.div
                    animate={{ rotate: openSentimentosDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronDown size={10} />
                  </motion.div>
                </motion.button>
                
                {/* Dropdown de Sentimentos */}
                {openSentimentosDropdown && (
                  <motion.div 
                    className="sentimentos-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {sentimentos.map((sentimento) => (
                      <motion.button
                        key={sentimento}
                        onClick={() => handleSentimentoClick(sentimento)}
                        className="sentimento-option"
                        whileHover={{ backgroundColor: '#FFD950', color: '#000000' }}
                        transition={{ duration: 0.2 }}
                      >
                        {sentimento}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;