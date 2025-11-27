"use client";

import { useEffect } from 'react';

interface PerformanceOptimizerProps {
  criticalImages?: string[];
  criticalCSS?: string[];
}

export default function PerformanceOptimizer({ 
  criticalImages = [], 
  criticalCSS = [] 
}: PerformanceOptimizerProps) {
  useEffect(() => {
    // Pré-carrega imagens críticas
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Pré-carrega CSS crítico
    criticalCSS.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });

    // Otimiza o carregamento de fontes
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        // Fontes carregadas, pode otimizar o layout
        document.documentElement.classList.add('fonts-loaded');
      });
    }

    // Otimiza o carregamento de imagens com baixa prioridade
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    images.forEach(img => imageObserver.observe(img));

    return () => {
      imageObserver.disconnect();
    };
  }, [criticalImages, criticalCSS]);

  return null; // Componente não renderiza nada
}
