import { useState, useMemo, useEffect, useCallback } from 'react';
import { products } from '../data/products';
import { Product } from '../types/product';

export const useProductFilters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [openSentimentosSection, setOpenSentimentosSection] = useState(false);
  
  const itemsPerPage = 12; // 3 linhas × 4 cards = 12 produtos por página

  // Lista de filtros de sentimentos válidos
  const sentimentosFilters = useMemo(() => ['Romântico', 'Alegre', 'Elegante', 'Delicado', 'Clássico', 'Luxo', 'Exótico', 'Aromático'], []);

  // Função para verificar se um filtro é de sentimento
  const isSentimentoFilter = useCallback((filter: string) => sentimentosFilters.includes(filter), [sentimentosFilters]);

  // Função para verificar se há filtros de sentimento ativos
  const hasActiveSentimentoFilters = useCallback(() => selectedFilters.some(filter => isSentimentoFilter(filter)), [selectedFilters, isSentimentoFilter]);

  // Efeito para detectar parâmetros da URL e aplicar filtros automaticamente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Verificar localStorage para filtros salvos
      const localStorageSentimento = localStorage.getItem('selectedSentimento');
      if (localStorageSentimento && sentimentosFilters.includes(localStorageSentimento)) {
        // Aplicar o filtro de sentimento automaticamente
        setSelectedFilters([localStorageSentimento]);
        setSelectedCategory('Sentimentos');
        
        // Limpar o localStorage para não interferir em futuras navegações
        localStorage.removeItem('selectedSentimento');
      }
    }
  }, [sentimentosFilters]);

  // Efeito para escutar eventos de sentimento selecionado do header
  useEffect(() => {
    const handleSentimentoSelected = (event: CustomEvent) => {
      const { sentimento } = event.detail;
      
      if (sentimentosFilters.includes(sentimento)) {
        // Aplicar o filtro de sentimento diretamente
        setSelectedFilters([sentimento]);
        setSelectedCategory('Sentimentos');
        setCurrentPage(1); // Voltar para primeira página
      }
    };

    // Adicionar event listener
    window.addEventListener('sentimentoSelected', handleSentimentoSelected as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('sentimentoSelected', handleSentimentoSelected as EventListener);
    };
  }, [sentimentosFilters]);

  // Efeito para escutar eventos de abrir sidebar do header
  useEffect(() => {
    const handleOpenFilterSidebar = (event: CustomEvent) => {
      const { openSentimentosSection } = event.detail;
      
      // Abrir a sidebar de filtros
      setIsFilterSidebarOpen(true);
      
      // Se especificado, abrir a seção de sentimentos
      if (openSentimentosSection) {
        setOpenSentimentosSection(true);
        setSelectedCategory('Sentimentos');
      }
    };

    // Adicionar event listener
    window.addEventListener('openFilterSidebar', handleOpenFilterSidebar as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('openFilterSidebar', handleOpenFilterSidebar as EventListener);
    };
  }, []);

  // Efeito para escutar eventos de aplicar filtro de sentimento do header
  useEffect(() => {
    const handleApplySentimentoFilter = (event: CustomEvent) => {
      const { sentimento } = event.detail;
      
      if (sentimentosFilters.includes(sentimento)) {
        // Aplicar o filtro de sentimento diretamente
        setSelectedFilters([sentimento]);
        setSelectedCategory('Sentimentos');
        setCurrentPage(1); // Voltar para primeira página
      }
    };

    // Adicionar event listener
    window.addEventListener('applySentimentoFilter', handleApplySentimentoFilter as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('applySentimentoFilter', handleApplySentimentoFilter as EventListener);
    };
  }, [sentimentosFilters]);

  // Função para verificar se um produto atende a um filtro específico
  const productMatchesFilter = useCallback((product: Product, filter: string): boolean => {
    // Filtros de categoria (sentimentos)
    if (isSentimentoFilter(filter)) {
      return product.category === filter;
    }
    
    // Filtros de preço
    if (filter === 'Até R$ 50') {
      return product.price <= 50;
    }
    if (filter === 'R$ 50 - R$ 100') {
      return product.price > 50 && product.price <= 100;
    }
    if (filter === 'R$ 100 - R$ 150') {
      return product.price > 100 && product.price <= 150;
    }
    if (filter === 'Acima de R$ 150') {
      return product.price > 150;
    }
    
    // Filtros de categoria de produto
    if (filter === 'Flores' || filter === 'Buquês' || filter === 'Combos') {
      // Por enquanto, considerar que todos os produtos podem ser de qualquer categoria
      return true;
    }
    
    // Filtros de ocasião
    if (filter === 'Aniversário' || filter === 'Casamento' || filter === 'Namoro' || 
        filter === 'Amizade' || filter === 'Dia das Mães' || filter === 'Dia dos Namorados') {
      // Por enquanto, vamos considerar que todos os produtos podem ser para qualquer ocasião
      return true;
    }
    
    // Filtros de cor
    if (filter === 'Vermelho' || filter === 'Rosa' || filter === 'Branco' || 
        filter === 'Amarelo' || filter === 'Roxo' || filter === 'Laranja') {
      // Por enquanto, vamos considerar que todos os produtos podem ter qualquer cor
      return true;
    }
    
    // Verificar se o filtro está no nome do produto (fallback)
    if (product.name.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    }
    
    return false;
  }, [isSentimentoFilter]);

  // Efeito para desmarcar "Sentimentos" quando não há filtros de sentimento ativos
  useEffect(() => {
    if (selectedCategory === 'Sentimentos' && !hasActiveSentimentoFilters()) {
      setSelectedCategory('');
    }
  }, [selectedFilters, selectedCategory, hasActiveSentimentoFilters]);

  // Filtrar produtos por categoria e filtros selecionados
  const filteredProducts = useMemo(() => {
    let filtered: Product[] = products;
    
    // Filtrar por categoria (ignorar "Sentimentos" pois não é uma categoria real de produtos)
    if (selectedCategory && selectedCategory !== 'Sentimentos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filtrar por filtros selecionados
    if (selectedFilters.length > 0) {
      const beforeFilters = filtered.length;
      
      // Separar filtros de sentimento dos outros filtros
      const sentimentoFilters = selectedFilters.filter(filter => isSentimentoFilter(filter));
      const otherFilters = selectedFilters.filter(filter => !isSentimentoFilter(filter));
      
      filtered = filtered.filter(product => {
        // Para filtros de sentimento: usar OR logic 
        let matchesSentimentos = true;
        if (sentimentoFilters.length > 0) {
          matchesSentimentos = sentimentoFilters.some(filter => productMatchesFilter(product, filter));
        }
        
        // Para outros filtros: usar AND logic 
        let matchesOtherFilters = true;
        if (otherFilters.length > 0) {
          matchesOtherFilters = otherFilters.every(filter => productMatchesFilter(product, filter));
        }
        
        // O produto deve atender aos sentimentos E aos outros filtros
        return matchesSentimentos && matchesOtherFilters;
      });
    }
    
    return filtered;
  }, [selectedCategory, selectedFilters, productMatchesFilter, isSentimentoFilter]);

  // Calcular produtos paginados
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Verificar se não há resultados
  const hasNoResults = filteredProducts.length === 0 && (selectedFilters.length > 0 || selectedCategory);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll para o topo da página
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    // Fallback para navegadores que não suportam smooth scroll
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  };

  const handleCategoryChange = (category: string | undefined) => {
    // Se clicou em "Sentimentos"
    if (category === 'Sentimentos') {
      // Se já está selecionado, desmarca e remove filtros de sentimentos
      if (selectedCategory === 'Sentimentos') {
        setSelectedCategory('');
        // Remove apenas os filtros de sentimentos, mantendo outros filtros
        setSelectedFilters(prev => prev.filter(filter => !isSentimentoFilter(filter)));
        setCurrentPage(1);
      } else {
        // Se não está selecionado, seleciona e abre sidebar
        setSelectedCategory('Sentimentos');
        setIsFilterSidebarOpen(true);
        setOpenSentimentosSection(true);
        setCurrentPage(1);
      }
      return;
    }
    
    // Para outras categorias, comportamento normal
    // Se estava selecionado "Sentimentos", desmarca mas mantém filtros de sentimentos
    if (selectedCategory === 'Sentimentos') {
      setSelectedCategory(category || '');
      setCurrentPage(1);
      return;
    }
    
    setSelectedCategory(category || '');
    setCurrentPage(1);
  };

  const handleFilterChange = useCallback((filter: string) => {
    setSelectedFilters(prev => {
      if (prev.includes(filter)) {
        // Remove o filtro
        const newFilters = prev.filter(f => f !== filter);
        
        // Se era um filtro de sentimento e não há mais filtros de sentimento ativos,
        // e a categoria "Sentimentos" está selecionada, desmarca ela
        if (isSentimentoFilter(filter) && !newFilters.some(f => isSentimentoFilter(f)) && selectedCategory === 'Sentimentos') {
          setSelectedCategory('');
        }
        
        return newFilters;
      } else {
        // Adiciona o filtro
        const newFilters = [...prev, filter];
        
        // Se é um filtro de sentimento, seleciona a categoria "Sentimentos"
        if (isSentimentoFilter(filter)) {
          setSelectedCategory('Sentimentos');
        }
        
        return newFilters;
      }
    });
    setCurrentPage(1);
  }, [selectedCategory, isSentimentoFilter]);

  // Função para remover filtros de sentimentos quando clicar em "Sentimentos" nos filtros externos
  const handleSentimentosClick = () => {
    // Se "Sentimentos" já está selecionado, desmarca e remove filtros de sentimentos
    if (selectedCategory === 'Sentimentos') {
      setSelectedCategory('');
      // Remove apenas os filtros de sentimentos, mantendo outros filtros
      setSelectedFilters(prev => prev.filter(filter => !isSentimentoFilter(filter)));
      setCurrentPage(1);
    } else {
      // Se não está selecionado, seleciona e abre sidebar
      setSelectedCategory('Sentimentos');
      setIsFilterSidebarOpen(true);
      setOpenSentimentosSection(true);
      setCurrentPage(1);
    }
  };

  const handleClearAllFilters = () => {
    setSelectedFilters([]);
    setSelectedCategory(''); // Também desmarca "Sentimentos"
    setCurrentPage(1);
  };

  const openFilterSidebar = () => {
    setIsFilterSidebarOpen(true);
    setOpenSentimentosSection(false); // Reset ao abrir manualmente
  };

  const closeFilterSidebar = () => {
    setIsFilterSidebarOpen(false);
    setOpenSentimentosSection(false);
    
    // Se a categoria "Sentimentos" está selecionada mas não há filtros de sentimento ativos,
    // desmarca automaticamente
    if (selectedCategory === 'Sentimentos' && !hasActiveSentimentoFilters()) {
      setSelectedCategory('');
    }
  };

  return {
    // Estado
    currentPage,
    selectedCategory,
    isFilterSidebarOpen,
    selectedFilters,
    openSentimentosSection,
    
    // Dados filtrados
    filteredProducts,
    paginatedProducts,
    totalPages,
    hasNoResults,
    
    // Funções
    handlePageChange,
    handleCategoryChange,
    handleFilterChange,
    handleClearAllFilters,
    openFilterSidebar,
    closeFilterSidebar,
    handleSentimentosClick,
  };
};
