"use client";

import { useState, useEffect } from 'react';
import { Product } from '../types/product';

interface ProductHistoryItem {
  product: Product;
  timestamp: number;
}

export const useProductHistory = () => {
  const [history, setHistory] = useState<ProductHistoryItem[]>([]);

  // Carrega o histórico do localStorage na inicialização
  useEffect(() => {
    const savedHistory = localStorage.getItem('productHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      } catch (error) {
        // Limpa o localStorage se houver erro
        localStorage.removeItem('productHistory');
      }
    }
  }, []);

  // Salva o histórico no localStorage sempre que ele mudar
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('productHistory', JSON.stringify(history));
    }
  }, [history]);

  const addToHistory = (product: Product) => {
    setHistory(prevHistory => {
      // Remove o produto se já existir no histórico
      const filteredHistory = prevHistory.filter(item => item.product.id !== product.id);
      
      // Adiciona o produto no início da lista
      const newHistory = [
        { product, timestamp: Date.now() },
        ...filteredHistory
      ];
      
      // Mantém até 3 produtos no histórico
      const finalHistory = newHistory.slice(0, 3);
      return finalHistory;
    });
  };

  const navigateToProduct = (product: Product) => {
    setHistory(prevHistory => {
      // Se o produto já está no histórico, não faz nada (mantém a posição)
      const existingProduct = prevHistory.find(item => item.product.id === product.id);
      if (existingProduct) {
        // Mantém o histórico exatamente como está
        return prevHistory;
      }
      
      // Se não está no histórico, adiciona no início
      const newHistory = [
        { product, timestamp: Date.now() },
        ...prevHistory
      ];
      
      // Mantém até 3 produtos no histórico
      const finalHistory = newHistory.slice(0, 3);
      return finalHistory;
    });
  };

  const removeFromHistory = (productId: number) => {
    setHistory(prevHistory => 
      prevHistory.filter(item => item.product.id !== productId)
    );
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('productHistory');
  };

  return {
    history,
    addToHistory,
    navigateToProduct,
    removeFromHistory,
    clearHistory,
    setHistory
  };
};
