"use client";

import { useState, useMemo, useCallback } from 'react';
import { Product } from '../types/product';
import { products } from '../data/products';

export const useProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Função para buscar produtos
  const searchProducts = useCallback((query: string): Product[] => {
    if (!query.trim()) return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery)
    );
  }, []);

  // Resultados da busca memoizados
  const searchResults = useMemo(() => {
    return searchProducts(searchQuery);
  }, [searchQuery, searchProducts]);

  // Função para atualizar a query de busca
  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    setIsSearchOpen(query.length > 0);
  }, []);

  // Função para limpar a busca
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearchOpen(false);
  }, []);

  // Função para fechar o preview
  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  return {
    searchQuery,
    searchResults,
    isSearchOpen,
    updateSearchQuery,
    clearSearch,
    closeSearch
  };
};
