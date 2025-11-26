"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer, Pagination } from '../../components';
import { ProductCard } from '../../components/products';
import { User, ShoppingCart, ChevronDown, ChevronRight, Heart } from 'lucide-react';
import { getFavorites, isUserLoggedIn } from '../../utils/favoritesUtils';
import { Product } from '../../types/product';
import '../../styles/components/Pagination.css';
import '../styles/PerfilPage.css';

const PerfilPage: React.FC = () => {
  const router = useRouter();
  const [isMinhaContaOpen, setIsMinhaContaOpen] = useState(false);
  const [isMinhasListasOpen, setIsMinhasListasOpen] = useState(false);
  const [showMeusFavoritos, setShowMeusFavoritos] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('Username');

  // Garantir que o componente está montado no cliente antes de acessar localStorage
  useEffect(() => {
    setIsMounted(true);
    
    // Carrega o email e nome do usuário logado
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail') || '';
      const name = localStorage.getItem('userName') || 'Username';
      setUserEmail(email);
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const checkScreen = () => setIsSmallScreen(window.innerHeight < 900);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, [isMounted]);

  // Carrega produtos favoritados (após montagem)
  useEffect(() => {
    if (!isMounted) return;
    
    const loadFavorites = () => {
      const favorites = getFavorites();
      setFavoriteProducts(favorites);
    };

    loadFavorites();

    // Listener para atualizar quando favoritos mudarem
    const handleFavoritesUpdate = () => {
      loadFavorites();
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, [isMounted]);

  // Verifica se deve abrir favoritos automaticamente ao carregar (após montagem)
  useEffect(() => {
    if (!isMounted) return;
    
    const shouldOpenFavoritos = localStorage.getItem('openFavoritos');
    if (shouldOpenFavoritos === 'true') {
      setShowMeusFavoritos(true);
      setIsMinhasListasOpen(true);
    }
  }, [isMounted]);

  // Listener para eventos de mostrar favoritos ou perfil (após montagem)
  useEffect(() => {
    if (!isMounted) return;
    
    const handleShowFavoritos = () => {
      setShowMeusFavoritos(true);
      setIsMinhasListasOpen(true);
    };

    const handleShowProfile = () => {
      setShowMeusFavoritos(false);
      setIsMinhasListasOpen(false);
      localStorage.removeItem('openFavoritos');
    };

    window.addEventListener('showFavoritos', handleShowFavoritos);
    window.addEventListener('showProfile', handleShowProfile);

    return () => {
      window.removeEventListener('showFavoritos', handleShowFavoritos);
      window.removeEventListener('showProfile', handleShowProfile);
    };
  }, [isMounted]);

  const toggleMinhaConta = () => {
    setIsMinhaContaOpen(!isMinhaContaOpen);
    setShowMeusFavoritos(false);
    localStorage.removeItem('openFavoritos');
  };

  const toggleMinhasListas = () => {
    setIsMinhasListasOpen(!isMinhasListasOpen);
    if (!isMinhasListasOpen) {
      // Se está abrindo, não fecha favoritos
    } else {
      // Se está fechando, fecha favoritos também
      setShowMeusFavoritos(false);
      localStorage.removeItem('openFavoritos');
    }
  };

  const handleMeusFavoritosClick = () => {
    setShowMeusFavoritos(true);
    localStorage.setItem('openFavoritos', 'true');
  };

  // Atualiza localStorage quando o estado muda
  useEffect(() => {
    if (showMeusFavoritos) {
      localStorage.setItem('openFavoritos', 'true');
      setIsMinhasListasOpen(true);
    } else {
      localStorage.removeItem('openFavoritos');
    }
  }, [showMeusFavoritos]);

  return (
    <div className="bg-white overflow-hidden" style={{ backgroundColor: '#F9F9F9' }}>
      <Header />
      <div className="perfil-page" style={{ marginTop: '112px', marginBottom: (isMounted && showMeusFavoritos) ? '140px' : '0' }}>
        {/* Grid Demo Elements */}
        <div className="grid-demo">
          <div className="profile-menu">
            <div className="profile-username">{userName}</div>
            
            <div className="profile-section">
              <div className="profile-section-header" onClick={toggleMinhaConta}>
                <div>
                  <User size={14} />
                  <span>Minha Conta</span>
                </div>
                <ChevronDown 
                  size={14} 
                  className={`chevron ${isMinhaContaOpen ? 'rotated' : ''}`}
                />
              </div>
              {isMinhaContaOpen && (
                <div className="profile-submenu">
                  <div className="profile-submenu-item">Meu Perfil</div>
                  <div className="profile-submenu-item">Meus Endereços</div>
                </div>
              )}
            </div>
            
            <div className="profile-section">
              <div 
                className="profile-section-header"
                onClick={() => router.push('/pedidos')}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <ShoppingCart size={14} />
                  <span>Meus Pedidos</span>
                </div>
                <ChevronRight size={14} />
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-header" onClick={toggleMinhasListas}>
                <div>
                  <Heart size={14} />
                  <span>Minhas Listas</span>
                </div>
                <ChevronDown 
                  size={14} 
                  className={`chevron ${isMinhasListasOpen ? 'rotated' : ''}`}
                />
              </div>
              {isMinhasListasOpen && (
                <div className="profile-submenu">
                  <div className="profile-submenu-item" onClick={handleMeusFavoritosClick}>Meus Favoritos</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid-demo-2" style={{ 
          backgroundColor: (isMounted && showMeusFavoritos) ? 'transparent' : '#FFFFFF',
          border: (isMounted && showMeusFavoritos) ? 'none' : undefined
        }}>
          {(isMounted && showMeusFavoritos) ? (
            <div style={{
              width: '987px',
              height: isSmallScreen ? '964px' : '1264px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              position: 'absolute',
              top: '0',
              left: '0',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Conteúdo de Meus Favoritos */}
              <div style={{ padding: '55px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
                <h2 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '20px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  color: '#000000',
                  margin: '0 0 24px 0',
                  padding: '0'
                }}>
                  Favoritos
                </h2>
                {!isUserLoggedIn() ? (
                  <div style={{
                    padding: '40px 0',
                    textAlign: 'center',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#666666'
                  }}>
                    Faça login para ver seus produtos favoritados.
                  </div>
                ) : favoriteProducts.length === 0 ? (
                  <div style={{
                    padding: '40px 0',
                    textAlign: 'center',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#666666'
                  }}>
                    Você ainda não tem produtos favoritados.
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    columnGap: '8px',
                    rowGap: '0px'
                  }}>
                    {favoriteProducts.slice((currentPage - 1) * (isSmallScreen ? 3 : 6), currentPage * (isSmallScreen ? 3 : 6)).map((product, index) => {
                      const itemsPerPage = isSmallScreen ? 3 : 6;
                      const isFirstRow = index < 3;
                      return (
                      <div key={product.id} style={{ marginBottom: isFirstRow ? '-32px' : '0', pointerEvents: 'none', position: 'relative', zIndex: 1 }}>
                        <div style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1 }}>
                          <ProductCard
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
                          />
                        </div>
                      </div>
                      );
                    })}
                  </div>
                )}
                {/* Paginação - só mostra se houver mais produtos do que o limite por página */}
                {favoriteProducts.length > (isSmallScreen ? 3 : 6) && (
                  <div style={{ 
                    marginTop: isSmallScreen ? '20px' : '-82px',
                    display: 'flex', 
                    justifyContent: 'center',
                    width: '100%',
                    position: 'relative',
                    zIndex: 100,
                    pointerEvents: 'auto'
                  }}>
                    <div style={{ 
                      pointerEvents: 'auto', 
                      zIndex: 100,
                      position: 'relative',
                      backgroundColor: 'transparent'
                    }}>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(favoriteProducts.length / (isSmallScreen ? 3 : 6))}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="grid-demo-internal">
                <div className="profile-form">
                  <h2 className="profile-form-title">Meu Perfil</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nome</label>
                      <input type="text" placeholder="Nome" />
                    </div>
                    <div className="form-group">
                      <label>Sobrenome</label>
                      <input type="text" placeholder="Sobrenome" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        placeholder="Email" 
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Celular</label>
                      <input type="tel" placeholder="(99) 99999-9999" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid-demo-internal-2">
                <button className="btn-salvar">Salvar</button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PerfilPage;

