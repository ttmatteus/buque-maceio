import { Product } from '../types/product';

// Obter chave de favoritos baseada no usuário
const getFavoritesKey = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userName = localStorage.getItem('userName');
  
  if (!isLoggedIn || !userName) {
    return null;
  }
  
  return `favorites_${userName}`;
};

// Verificar se há usuário logado
export const isUserLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Obter todos os favoritos do usuário logado
export const getFavorites = (): Product[] => {
  if (typeof window === 'undefined') return [];
  
  const favoritesKey = getFavoritesKey();
  if (!favoritesKey) return [];
  
  try {
    const favorites = localStorage.getItem(favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Erro ao obter favoritos:', error);
    return [];
  }
};

// Verificar se um produto está favoritado
export const isFavorite = (productId: number): boolean => {
  if (!isUserLoggedIn()) return false;
  
  const favorites = getFavorites();
  return favorites.some(p => p.id === productId);
};

// Adicionar produto aos favoritos
export const addToFavorites = (product: Product): boolean => {
  if (typeof window === 'undefined') return false;
  
  if (!isUserLoggedIn()) {
    console.warn('Usuário não está logado. Faça login para favoritar produtos.');
    return false;
  }
  
  const favoritesKey = getFavoritesKey();
  if (!favoritesKey) return false;
  
  try {
    const favorites = getFavorites();
    
    // Verifica se já está favoritado
    if (!favorites.some(p => p.id === product.id)) {
      favorites.push(product);
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
      
      // Dispara evento para atualizar outros componentes
      window.dispatchEvent(new Event('favoritesUpdated'));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    return false;
  }
};

// Remover produto dos favoritos
export const removeFromFavorites = (productId: number): boolean => {
  if (typeof window === 'undefined') return false;
  
  if (!isUserLoggedIn()) {
    return false;
  }
  
  const favoritesKey = getFavoritesKey();
  if (!favoritesKey) return false;
  
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(p => p.id !== productId);
    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    
    // Dispara evento para atualizar outros componentes
    window.dispatchEvent(new Event('favoritesUpdated'));
    return true;
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    return false;
  }
};

// Toggle favorito (adiciona se não estiver, remove se estiver)
export const toggleFavorite = (product: Product): boolean => {
  if (!isUserLoggedIn()) {
    console.warn('Usuário não está logado. Faça login para favoritar produtos.');
    return false;
  }
  
  if (isFavorite(product.id)) {
    removeFromFavorites(product.id);
    return false;
  } else {
    addToFavorites(product);
    return true;
  }
};

