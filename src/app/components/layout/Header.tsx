"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useProductSearch } from '../../hooks';
import { SearchPreview } from '../';
import UserProfileDropdown from '../UserProfileDropdown';
import ProfileShape from '../ProfileShape';
import { Product } from '../../types/product';
import { generateProductSlug } from '../../utils/slugUtils';

// tt: cuidado com o dropdown se mexer vai conflitar 
const Header: React.FC = () => {
  const [openSentimentosDropdown, setOpenSentimentosDropdown] = useState(false);
  const [openUserProfileDropdown, setOpenUserProfileDropdown] = useState(false);
  const [showProfileShape, setShowProfileShape] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Verifica se está logado ao carregar
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName');
    setIsLoggedIn(loggedIn);
    setUserName(name);
  }, []);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.header-nav-dropdown')) {
        setOpenUserProfileDropdown(false);
      }
    };

    if (openUserProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openUserProfileDropdown]);
  
  // jm: ou tt verifica isso please, tem coisa errada aqui
  const {
    searchQuery,
    searchResults,
    isSearchOpen,
    updateSearchQuery,
    clearSearch,
    closeSearch
  } = useProductSearch();
  

  const sentimentos = ['Romântico', 'Alegre', 'Elegante', 'Delicado', 'Clássico', 'Luxo', 'Exótico', 'Aromático'];
  


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      let offset = 120; 
      
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

  const handleUserProfileClick = () => {
    if (isLoggedIn) {
      // Se estiver logado, mostra dropdown com nome e opção de sair
      setOpenUserProfileDropdown(!openUserProfileDropdown);
    } else {
      // Se não estiver logado, mostra modal de login
      setShowProfileShape(!showProfileShape);
    }
    // Fecha o dropdown de sentimentos se estiver aberto
    if (openSentimentosDropdown) {
      setOpenSentimentosDropdown(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserName(null);
    setOpenUserProfileDropdown(false);
    window.location.reload();
  };

  // Função para lidar com clique em produto da busca
  const handleProductClick = (product: Product) => {
    const productUrl = `/produto/${generateProductSlug(product.name)}/${product.id}`;
    router.push(productUrl);
  };

  // Função para lidar com mudança no input de busca
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchQuery(e.target.value);
  };

  // Função para lidar com submit da busca
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redireciona para página de produtos com o termo de busca
      const url = `/produto?search=${encodeURIComponent(searchQuery)}`;
      router.push(url);
      closeSearch();
    }
  };

  // Função para lidar com clique em sugestão
  const handleSuggestionClick = (suggestion: string) => {
    updateSearchQuery(suggestion);
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
            <div className="header-search" style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', transform: 'translateX(-270px)' }}>
              <form onSubmit={handleSearchSubmit} className="search-container">
                <div className="search-icon">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Pesquisar tipos de flores, combos..."
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="search-clear"
                    aria-label="Limpar busca"
                  >
                    ×
                  </button>
                )}
              </form>
            </div>

            {/* lado direito: ícones personalizados do usuário */}
            <div className="header-actions">
              <div className="header-nav-dropdown">
                <motion.button 
                  className="header-button"
                  onClick={handleUserProfileClick}
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
                
                {/* Dropdown do Perfil do Usuário */}
                {isLoggedIn && openUserProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: '0',
                      marginTop: '8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E5E5',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      width: '177px',
                      height: '214px',
                      padding: '0',
                      zIndex: 1000
                    }}
                  >
                    {/* Nome do Usuário */}
                    <div style={{
                      padding: '12px 16px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#000000'
                    }}>
                      {userName}
                    </div>
                    
                    {/* Linha divisória */}
                    <div style={{
                      height: '1px',
                      backgroundColor: '#E5E5E5',
                      width: '144px',
                      marginLeft: '16px'
                    }}></div>
                    
                    {/* Menu Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px', marginBottom: '14px' }}>
                      <div style={{
                        padding: '0 16px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#666666',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={() => {
                        setOpenUserProfileDropdown(false);
                        if (pathname === '/perfil') {
                          // Se já está na página de perfil, apenas limpa o estado de favoritos
                          localStorage.removeItem('openFavoritos');
                          window.dispatchEvent(new Event('showProfile'));
                        } else {
                          // Se não está, navega para a página
                          localStorage.removeItem('openFavoritos');
                          router.push('/perfil');
                        }
                      }}
                      >
                        Meu Perfil
                      </div>
                      <div style={{
                        padding: '0 16px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#666666',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={() => {
                        setOpenUserProfileDropdown(false);
                        if (pathname === '/perfil') {
                          // Se já está na página de perfil, apenas mostra favoritos
                          localStorage.setItem('openFavoritos', 'true');
                          window.dispatchEvent(new Event('showFavoritos'));
                        } else {
                          // Se não está, navega e mostra favoritos
                          localStorage.setItem('openFavoritos', 'true');
                          router.push('/perfil');
                        }
                      }}
                      >
                        Meus Favoritos
                      </div>
                      <div style={{
                        padding: '0 16px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#666666',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Meu Pedidos
                      </div>
                    </div>
                    
                    {/* Linha divisória */}
                    <div style={{
                      height: '1px',
                      backgroundColor: '#E5E5E5',
                      width: '144px',
                      marginLeft: '16px'
                    }}></div>
                    
                    {/* Botão Sair */}
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '0 16px',
                        marginTop: '10px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#666666',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      Sair
                    </button>
                  </motion.div>
                )}
                
                <UserProfileDropdown
                  isOpen={openUserProfileDropdown && !isLoggedIn}
                  onClose={() => setOpenUserProfileDropdown(false)}
                  userName="Nome do Usuário"
                />
              </div>
              <motion.button 
                className="header-button favorites"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  if (pathname === '/perfil') {
                    // Se já está na página de perfil, apenas mostra favoritos
                    localStorage.setItem('openFavoritos', 'true');
                    window.dispatchEvent(new Event('showFavoritos'));
                  } else {
                    // Se não está, navega e mostra favoritos
                    localStorage.setItem('openFavoritos', 'true');
                    router.push('/perfil');
                  }
                }}
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
                  src="/images/icons/cesta.svg"
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
                <span>Combos</span>
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

      {/* Preview dos resultados da busca */}
      <SearchPreview
        results={searchResults}
        isOpen={isSearchOpen}
        onClose={closeSearch}
        onProductClick={handleProductClick}
        onSuggestionClick={handleSuggestionClick}
      />

      {/* ProfileShape - aparece quando clica no ícone de perfil */}
      <ProfileShape
        isVisible={showProfileShape}
        onClose={() => setShowProfileShape(false)}
      />
    </div>
  );
};

export default Header;