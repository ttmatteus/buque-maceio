"use client";

import { useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header, Footer, ProductGrid, ProductFilters, Pagination, FilterSidebar, SortSelector } from '../components';
import { useProductFilters } from '../hooks/useProductFilters';
import { Product } from '../types/product';
import { generateProductUrl } from '../utils/slugUtils';
import '../styles/components/ProductPage.css';
import '../styles/components/Pagination.css';
import '../styles/components/FeaturedBouquets.css';
import '../styles/components/Header.css';

function ProductPageContent() {
  const searchParams = useSearchParams();
  const processedSentimentoRef = useRef<string | null>(null);
  
  // Obter parâmetro de busca da URL
  const searchQuery = searchParams.get('search') || '';

  const {
    // Estado
    currentPage,
    selectedCategory,
    isFilterSidebarOpen,
    selectedFilters,
    openSentimentosSection,
    sortBy,
    priceRange,
    priceRangeData,
    
    // Dados filtrados
    paginatedProducts,
    totalPages,
    
    // Funções
    handlePageChange,
    handleCategoryChange,
    handleFilterChange,
    handleClearAllFilters,
    openFilterSidebar,
    closeFilterSidebar,
    handleSentimentosClick,
    handleSortChange,
    handlePriceRangeChange,
  } = useProductFilters(searchQuery);

  const handleProductClick = (product: Product) => {
    // Usa a função utilitária para gerar a URL
    const productUrl = generateProductUrl(product.name, product.id);
    window.location.href = productUrl;
  };

  // Aplica filtro de sentimento da URL quando a página carregar
  useEffect(() => {
    const sentimento = searchParams.get('sentimento');
    if (sentimento && sentimento !== processedSentimentoRef.current) {
      // Se o sentimento já está nos filtros, remove (toggle off)
      if (selectedFilters.includes(sentimento)) {
        handleFilterChange(sentimento); // Remove
      } else {
        // Se não está nos filtros, adiciona (toggle on)
        handleFilterChange(sentimento); // Adiciona
      }
      
      // Marca como processado para evitar processamento duplicado
      processedSentimentoRef.current = sentimento;
      
      // Limpa o parâmetro da URL para não interferir em futuras navegações
      setTimeout(() => {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }, 100);
    }
  }, [searchParams, handleFilterChange, selectedFilters]);

  // Reset do processedSentimentoRef quando navegar para uma nova URL
  useEffect(() => {
    const currentSentimento = searchParams.get('sentimento');
    if (!currentSentimento) {
      processedSentimentoRef.current = null;
    }
  }, [searchParams]);

  return (
    <div 
      className="bg-white product-page-wrapper" 
      style={{ 
        background: 'white !important',
        backgroundColor: 'white !important',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1
      }}
    >
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-2" style={{ marginTop: '190px' }}>
          <h1 className="text-3xl font-bold text-gray-900" style={{ 
            fontFamily: 'Alegreya SC, serif',
            fontSize: '32px',
            fontWeight: '500',
            color: 'black'
          }}>
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Flores'}
          </h1>
          {searchQuery && (
            <p className="text-gray-600 mt-2" style={{ 
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px'
            }}>
              Encontramos {paginatedProducts.length} produtos para sua busca
            </p>
          )}
        </div>

        {/* Filtros por categoria e ordenação */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <ProductFilters 
            categories={["Flores", "Buquês", "Combos", "Sentimentos"]}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategoryChange}
            onOpenFilters={openFilterSidebar}
            selectedFilters={selectedFilters}
            onRemoveSidebarFilter={handleFilterChange}
            onSentimentosClick={handleSentimentosClick}
          />
          
          <SortSelector 
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Grid de produtos */}
        {paginatedProducts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium text-black" style={{ 
              fontFamily: 'Alegreya SC, serif',
              fontWeight: '500'
            }}>
              Nenhum resultado
            </h3>
            <button
              onClick={handleClearAllFilters}
              className="mt-4 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              style={{ 
                fontFamily: 'Nunito Sans, sans-serif'
              }}
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <ProductGrid products={paginatedProducts} onProductClick={handleProductClick} />
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

      </main>

      {/* Sidebar de Filtros */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={closeFilterSidebar}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAllFilters}
        openSentimentosSection={openSentimentosSection}
        priceRange={priceRange}
        priceRangeData={priceRangeData}
        onPriceRangeChange={handlePriceRangeChange}
      />
      
      <Footer />
      
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <ProductPageContent />
    </Suspense>
  );
}
