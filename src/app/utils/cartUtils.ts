import { Product } from '../types/product';

// Interface para item do carrinho (produto + quantidade)
export interface CartItem {
  product: Product;
  quantity: number;
}

// Obter chave do carrinho baseada no usuário
const getCartKey = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userName = localStorage.getItem('userName');
  
  if (!isLoggedIn || !userName) {
    // Se não estiver logado, usa uma chave genérica
    return 'cart_guest';
  }
  
  return `cart_${userName}`;
};

// Obter todos os itens do carrinho
export const getCartItems = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  const cartKey = getCartKey();
  if (!cartKey) return [];
  
  try {
    const cart = localStorage.getItem(cartKey);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Erro ao obter carrinho:', error);
    return [];
  }
};

// Obter quantidade total de itens no carrinho
export const getCartItemsCount = (): number => {
  const items = getCartItems();
  return items.reduce((total, item) => total + item.quantity, 0);
};

// Adicionar produto ao carrinho
export const addToCart = (product: Product, quantity: number = 1): boolean => {
  if (typeof window === 'undefined') return false;
  
  const cartKey = getCartKey();
  if (!cartKey) return false;
  
  try {
    const cart = getCartItems();
    
    // Verifica se o produto já está no carrinho
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Se já existe, aumenta a quantidade
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Se não existe, adiciona novo item
      cart.push({ product, quantity });
    }
    
    localStorage.setItem(cartKey, JSON.stringify(cart));
    
    // Dispara evento para atualizar outros componentes
    window.dispatchEvent(new Event('cartUpdated'));
    return true;
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    return false;
  }
};

// Remover produto do carrinho
export const removeFromCart = (productId: number): boolean => {
  if (typeof window === 'undefined') return false;
  
  const cartKey = getCartKey();
  if (!cartKey) return false;
  
  try {
    const cart = getCartItems();
    const updatedCart = cart.filter(item => item.product.id !== productId);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    
    // Dispara evento para atualizar outros componentes
    window.dispatchEvent(new Event('cartUpdated'));
    return true;
  } catch (error) {
    console.error('Erro ao remover do carrinho:', error);
    return false;
  }
};

// Atualizar quantidade de um item no carrinho
export const updateCartItemQuantity = (productId: number, quantity: number): boolean => {
  if (typeof window === 'undefined') return false;
  
  const cartKey = getCartKey();
  if (!cartKey) return false;
  
  try {
    const cart = getCartItems();
    const itemIndex = cart.findIndex(item => item.product.id === productId);
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        // Remove o item se a quantidade for 0 ou menor
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = quantity;
      }
      
      localStorage.setItem(cartKey, JSON.stringify(cart));
      
      // Dispara evento para atualizar outros componentes
      window.dispatchEvent(new Event('cartUpdated'));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao atualizar quantidade:', error);
    return false;
  }
};

// Limpar carrinho
export const clearCart = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const cartKey = getCartKey();
  if (!cartKey) return false;
  
  try {
    localStorage.removeItem(cartKey);
    
    // Dispara evento para atualizar outros componentes
    window.dispatchEvent(new Event('cartUpdated'));
    return true;
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error);
    return false;
  }
};

