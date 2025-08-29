// Função para fazer scroll suave para o topo da página
export const scrollToTop = () => {
  // Scroll para o topo da página
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
  
  // Fallback para navegadores que não suportam smooth scroll
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 200);
};

// Função para formatar preço em reais
export const formatPrice = (price: number): string => {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
};

// Função para verificar se um produto corresponde a um filtro
export const productMatchesFilter = (product: { category: string; name: string; price: number }, filter: string): boolean => {
  // Verificar se o filtro corresponde exatamente à categoria do produto
  if (product.category === filter) {
    return true;
  }
  
  // Verificar se o filtro está no nome do produto
  if (product.name.toLowerCase().includes(filter.toLowerCase())) {
    return true;
  }
  
  // Verificar filtros de preço
  if (filter === 'Até R$ 50' && product.price <= 50) {
    return true;
  }
  if (filter === 'R$ 50 - R$ 100' && product.price > 50 && product.price <= 100) {
    return true;
  }
  if (filter === 'R$ 100 - R$ 150' && product.price > 100 && product.price <= 150) {
    return true;
  }
  if (filter === 'Acima de R$ 150' && product.price > 150) {
    return true;
  }
  
  return false;
};
