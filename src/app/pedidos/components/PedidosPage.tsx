"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '../../components';
import { Check, Trash2, Heart, ChevronRight } from 'lucide-react';
import { isFavorite as checkIsFavorite, toggleFavorite, isUserLoggedIn, getFavorites } from '../../utils/favoritesUtils';
import { getCartItems, CartItem, updateCartItemQuantity, removeFromCart } from '../../utils/cartUtils';
import { Product } from '../../types/product';
import '../styles/PedidosPage.css';
import '../../styles/components/ProductSplashScreen.css';

const PedidosPage: React.FC = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [itemStates, setItemStates] = useState<{ [key: number]: { checked: boolean; quantity: number; inputValue: string; isFavorite: boolean } }>({});
  
  // Estado para produtos favoritos
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  // Carregar itens do carrinho
  useEffect(() => {
    const loadCartItems = () => {
      const items = getCartItems();
      setCartItems(items);
      
      // Inicializar estados para cada item
      const states: { [key: number]: { checked: boolean; quantity: number; inputValue: string; isFavorite: boolean } } = {};
      items.forEach(item => {
        states[item.product.id] = {
          checked: false,
          quantity: item.quantity,
          inputValue: item.quantity.toString(),
          isFavorite: checkIsFavorite(item.product.id)
        };
      });
      setItemStates(states);
    };

    loadCartItems();

    // Buscar produtos favoritos do usuário
    const favorites = getFavorites();
    setFavoriteProducts(favorites);

    // Ouvir atualizações do carrinho
    const handleCartUpdate = () => {
      loadCartItems();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Atualizar favoritos quando houver mudanças
  useEffect(() => {
    const handleFavoritesUpdate = () => {
      const favorites = getFavorites();
      setFavoriteProducts(favorites);
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, []);

  // Calcular quantos itens estão selecionados
  const selectedCount = Object.values(itemStates).filter(state => state.checked).length;

  // Lista de produtos selecionados
  const selectedProducts = cartItems
    .filter(item => itemStates[item.product.id]?.checked)
    .map(item => item.product);

  // Calcular preço total dos produtos selecionados
  const totalPrice = cartItems.reduce((total, item) => {
    if (itemStates[item.product.id]?.checked) {
      const quantity = itemStates[item.product.id].quantity;
      return total + (item.product.price * quantity);
    }
    return total;
  }, 0);
  
  // Calcular promoção (30% do total)
  const promotionValue = totalPrice * 0.3;
  
  // Calcular subtotal (total - promoção)
  const subtotal = Math.max(0, totalPrice - promotionValue);

  // Handler para marcar/desmarcar todos os itens
  const handleSelectAll = (checked: boolean) => {
    setIsChecked(checked);
    const newStates = { ...itemStates };
    cartItems.forEach(item => {
      newStates[item.product.id] = {
        ...newStates[item.product.id],
        checked
      };
    });
    setItemStates(newStates);
  };

  // Atualizar o checkbox "Todos os Itens" quando todos os itens individuais estiverem marcados/desmarcados
  useEffect(() => {
    if (cartItems.length === 0) {
      setIsChecked(false);
      return;
    }
    
    const allChecked = cartItems.every(item => itemStates[item.product.id]?.checked);
    const noneChecked = cartItems.every(item => !itemStates[item.product.id]?.checked);
    
    if (allChecked && !isChecked) {
      setIsChecked(true);
    } else if (noneChecked && isChecked) {
      setIsChecked(false);
    }
  }, [itemStates, cartItems, isChecked]);

  // Handlers para quantidade
  const handleQuantityChange = (productId: number, increase: boolean) => {
    const state = itemStates[productId];
    if (!state) return;
    
    const stockAvailable = parseInt(state.inputValue) || 3;
    let newQuantity = increase ? state.quantity + 1 : state.quantity - 1;
    newQuantity = Math.max(1, Math.min(newQuantity, stockAvailable));
    
    const newStates = { ...itemStates };
    newStates[productId] = {
      ...state,
      quantity: newQuantity,
      inputValue: newQuantity.toString()
    };
    setItemStates(newStates);
    
    updateCartItemQuantity(productId, newQuantity);
  };

  const handleInputChange = (productId: number, value: string) => {
    const state = itemStates[productId];
    if (!state) return;
    
    const numValue = parseInt(value) || 1;
    const stockAvailable = 3; // Você pode pegar do produto se necessário
    const newQuantity = Math.max(1, Math.min(numValue, stockAvailable));
    
    const newStates = { ...itemStates };
    newStates[productId] = {
      ...state,
      quantity: newQuantity,
      inputValue: value
    };
    setItemStates(newStates);
    
    if (!isNaN(numValue) && numValue > 0) {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  // Handler para remover item do carrinho
  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
    const newStates = { ...itemStates };
    delete newStates[productId];
    setItemStates(newStates);
  };

  // Handler para toggle favorito
  const handleToggleFavorite = (product: Product) => {
    if (!isUserLoggedIn()) {
      return;
    }
    const newFavoriteState = toggleFavorite(product);
    const newStates = { ...itemStates };
    if (newStates[product.id]) {
      newStates[product.id].isFavorite = newFavoriteState;
      setItemStates(newStates);
    }
  };

  return (
    <div className="bg-white overflow-hidden" style={{ backgroundColor: '#F9F9F9', minHeight: '100vh' }}>
      <Header />
      <div className="pedidos-page" style={{ paddingBottom: '140px' }}>
        {/* Card */}
        <div style={{
          width: '928px',
          height: '70px',
          marginTop: '230px',
          marginLeft: '74px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '33px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ 
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              flexShrink: 0
            }}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => handleSelectAll(e.target.checked)}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  border: '1px solid #b2b2b2',
                  backgroundColor: isChecked ? '#373636' : '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  outline: 'none',
                  margin: 0,
                  padding: 0,
                  position: 'relative',
                  zIndex: 1
                }}
              />
              {isChecked && (
                <Check 
                  size={12} 
                  color="#FFFFFF" 
                  strokeWidth={3}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 2
                  }}
                />
              )}
            </div>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '22px',
              fontWeight: '600',
              lineHeight: '20px',
              color: '#1c1c1c'
            }}>
              Todos os Itens
            </span>
            {selectedCount > 0 && (
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '22px',
                fontWeight: '600',
                lineHeight: '20px',
                color: '#1c1c1c',
                marginLeft: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                ({String(selectedCount).padStart(2, '0')})
              </span>
            )}
          </div>
        </div>

        {/* Card 343x338 */}
        <div style={{
          width: '343px',
          height: '338px',
          position: 'absolute',
          top: '230px',
          left: '1024px', // 74px (posição do card anterior) + 928px (largura do card anterior) + 22px (gap)
          backgroundColor: '#FFFFFF',
          borderRadius: '8px'
        }}>
          {/* Card Interno 301x301 */}
          <div style={{
            width: '301px',
            height: '301px',
            marginTop: '18px',
            marginLeft: '21px',
            backgroundColor: '#FFFFFF',
            border: 'none'
          }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '20px',
              fontWeight: '600',
              color: '#000000'
            }}>
              Resumo do Pedido
            </span>
            
            {/* Imagens dos produtos selecionados */}
            {selectedProducts.length > 0 && (
              <div style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {selectedProducts.slice(0, 3).map((product, index) => (
                  <div
                    key={index}
                    style={{
                      width: '59px',
                      height: '59px',
                      position: 'relative',
                      flexShrink: 0,
                      overflow: 'hidden',
                      borderRadius: '0'
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={59}
                      height={59}
                      style={{
                        width: '59px',
                        height: '59px',
                        objectFit: 'cover',
                        borderRadius: '0'
                      }}
                    />
                  </div>
                ))}
                {selectedProducts.length > 3 && (
                  <div style={{
                    width: '59px',
                    height: '59px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: '400',
                    color: '#000000'
                  }}>
                    ...
                  </div>
                )}
              </div>
            )}

            {/* Preço do item */}
            {selectedProducts.length > 0 && (
              <div style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#000000'
                }}>
                  Preço do item:
                </span>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#000000'
                }}>
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            )}

            {/* Promoções */}
            {selectedProducts.length > 0 && (
              <div style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#FA6338'
                }}>
                  Promoções
                </span>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#FA6338'
                }}>
                  - R$ {promotionValue.toFixed(2).replace('.', ',')}
                </span>
              </div>
            )}

            {/* Separador */}
            {selectedProducts.length > 0 && (
              <div style={{
                marginTop: '16px',
                width: '100%',
                height: '1px',
                backgroundColor: '#E5E5E5'
              }}>
              </div>
            )}

            {/* Subtotal */}
            {selectedProducts.length > 0 && (
              <div style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#000000'
                }}>
                  Subtotal
                </span>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#000000'
                }}>
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            )}

            {/* Botão Fechar Pedido */}
            {selectedProducts.length > 0 && (
              <button
                style={{
                  width: '301px',
                  height: '40px',
                  borderRadius: '20px',
                  backgroundColor: '#FFD950',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '32px'
                }}
              >
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '24px',
                  color: '#000000'
                }}>
                  Fechar pedido
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Segundo Card */}
        <div style={{
          width: '928px',
          height: '590px',
          marginTop: '22px',
          marginLeft: '74px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowY: 'auto'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#9a9a9a',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px'
            }}>
              Seu carrinho está vazio
            </div>
          ) : (
            cartItems.map((cartItem, index) => {
              const product = cartItem.product;
              const state = itemStates[product.id] || { checked: false, quantity: cartItem.quantity, inputValue: cartItem.quantity.toString(), isFavorite: checkIsFavorite(product.id) };
              const stockAvailable = 3; // Você pode pegar do produto se necessário
              
              return (
                <div
                  key={product.id}
                  style={{
                    width: '889px',
                    height: '126px',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    marginTop: index === 0 ? '50px' : '64px'
                  }}
                >
                  {/* Checkbox */}
                  <div style={{
                    marginLeft: '53px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ 
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '20px',
                      height: '20px',
                      flexShrink: 0
                    }}>
                      <input
                        type="checkbox"
                        checked={state.checked}
                        onChange={(e) => {
                          const newStates = { ...itemStates };
                          newStates[product.id] = {
                            ...state,
                            checked: e.target.checked
                          };
                          setItemStates(newStates);
                        }}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          border: '1px solid #b2b2b2',
                          backgroundColor: state.checked ? '#373636' : '#FFFFFF',
                          cursor: 'pointer',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          outline: 'none',
                          margin: 0,
                          padding: 0,
                          position: 'relative',
                          zIndex: 1
                        }}
                      />
                      {state.checked && (
                        <Check 
                          size={12} 
                          color="#FFFFFF" 
                          strokeWidth={3}
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                            zIndex: 2
                          }}
                        />
                      )}
                    </div>
                  </div>
                  
                  {/* Imagem */}
                  <div style={{
                    marginLeft: '32.5px',
                    width: '126px',
                    height: '126px',
                    position: 'relative',
                    flexShrink: 0,
                    overflow: 'hidden'
                  }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={126}
                      height={126}
                      style={{
                        width: '126px',
                        height: '126px',
                        objectFit: 'cover',
                        borderRadius: '0'
                      }}
                    />
                  </div>
                  
                  {/* Container com Nome e Quantidade */}
                  <div style={{
                    marginLeft: '51px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px',
                    alignSelf: 'flex-start'
                  }}>
                    {/* Nome do Produto e Estoque */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0px',
                      marginTop: '-8px'
                    }}>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '20px',
                        fontWeight: '400',
                        color: '#000000'
                      }}>
                        {product.name}
                      </span>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        fontWeight: '400',
                        color: '#9a9a9a'
                      }}>
                        {stockAvailable} em estoque
                      </span>
                    </div>
                    
                    {/* Componente de Quantidade */}
                    <div style={{
                      marginTop: '62px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '23px'
                    }}>
                      <div className="quantity-controls">
                        <label style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: '500',
                          fontSize: '12px',
                          color: '#1D1D1D',
                          marginRight: '6px'
                        }}>
                          Quantidade:
                        </label>
                        <div style={{ position: 'relative' }}>
                          <button 
                            className="quantity-btn"
                            style={{ left: 8, top: -2 }}
                            onClick={() => handleQuantityChange(product.id, false)}
                            disabled={state.quantity <= 1}
                          >
                            −
                          </button>
                          <input 
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={state.inputValue} 
                            onChange={(e) => handleInputChange(product.id, e.target.value)}
                            className="quantity-input"
                            min="1"
                            max={stockAvailable}
                          />
                          <button 
                            className="quantity-btn"
                            style={{ right: 12, top: -2 }}
                            onClick={() => handleQuantityChange(product.id, true)}
                            disabled={state.quantity >= stockAvailable}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      {/* Ícone de Lixeira */}
                      <button
                        onClick={() => handleRemoveItem(product.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '-8px'
                        }}
                      >
                        <Trash2 size={16} color="#9A9A9A" />
                      </button>
                      
                      {/* Ícone de Favorito */}
                      <button
                        onClick={() => handleToggleFavorite(product)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '-8px',
                          marginLeft: '-8px'
                        }}
                      >
                        <Heart 
                          size={16} 
                          fill={state.isFavorite ? '#FF5353' : 'none'}
                          stroke={state.isFavorite ? '#FA6338' : '#9A9A9A'}
                        />
                      </button>
                    </div>
                  </div>
                  
                  {/* Preço */}
                  <div style={{
                    position: 'absolute',
                    right: '0',
                    top: '-8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#000000'
                    }}>
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: '400',
                      color: '#9a9a9a',
                      textDecoration: 'line-through'
                    }}>
                      R$ {((product.originalPrice || product.price * 1.3)).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Card abaixo do carrinho */}
        <div style={{
          width: '928px',
          height: '169px',
          marginTop: '22px',
          marginLeft: '74px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px'
        }}>
          {/* Card Interno 886x133 */}
          <div style={{
            width: '886px',
            height: '133px',
            marginTop: '18px',
            marginLeft: '21px',
            backgroundColor: '#FFFFFF',
            border: 'none'
          }}>
            <div style={{
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '20px',
                fontWeight: '600',
                color: '#000000'
              }}>
                Favoritos
              </span>
              
              {/* Ver tudo */}
              <button
                onClick={() => {
                  localStorage.setItem('openFavoritos', 'true');
                  router.push('/perfil');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '0',
                  flexShrink: 0
                }}
              >
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#000000'
                }}>
                  Ver tudo
                </span>
                <ChevronRight size={16} color="#000000" />
              </button>
            </div>

            {/* Imagens dos produtos favoritos */}
            {favoriteProducts.length > 0 && (
              <div style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                {favoriteProducts.map((product: Product, index: number) => (
                  <div
                    key={product.id || index}
                    style={{
                      width: '93px',
                      height: '93px',
                      position: 'relative',
                      flexShrink: 0,
                      overflow: 'hidden',
                      borderRadius: '0'
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={93}
                      height={93}
                      style={{
                        width: '93px',
                        height: '93px',
                        objectFit: 'cover',
                        borderRadius: '0'
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PedidosPage;

