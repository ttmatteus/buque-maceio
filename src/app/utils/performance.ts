// Utilitários para otimização de performance

export const performanceMetrics = {
  // Mede o tempo de carregamento da página
  measurePageLoad: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalTime: navigation.loadEventEnd - navigation.fetchStart
        };
      }
    }
    return null;
  },

  // Mede o tempo de carregamento de imagens
  measureImageLoad: (imageSrc: string): Promise<number> => {
    return new Promise((resolve) => {
      const img = new Image();
      const startTime = performance.now();
      
      img.onload = () => {
        const loadTime = performance.now() - startTime;
        resolve(loadTime);
      };
      
      img.onerror = () => {
        resolve(-1); // Erro no carregamento
      };
      
      img.src = imageSrc;
    });
  },

  // Debounce para otimizar eventos de scroll
  debounce: <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle para otimizar eventos de scroll
  throttle: <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Configurações de lazy loading
export const lazyLoadingConfig = {
  // Threshold para Intersection Observer
  threshold: 0.1,
  
  // Margem para carregar antes de ficar visível
  rootMargin: '50px',
  
  // Delay para suavizar transições
  transitionDelay: 100,
  
  // Placeholder para imagens
  imagePlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMCAzNUg3MFY2NUgzMFYzNVoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+'
};

// Otimizações para diferentes tipos de dispositivo
export const deviceOptimizations = {
  // Para dispositivos móveis
  mobile: {
    imageQuality: 0.8,
    lazyLoadThreshold: 0.05,
    preloadImages: 2
  },
  
  // Para desktop
  desktop: {
    imageQuality: 1.0,
    lazyLoadThreshold: 0.1,
    preloadImages: 4
  }
};

// Detecta o tipo de dispositivo
export const detectDevice = () => {
  if (typeof window === 'undefined') return 'desktop';
  
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);
  
  return isMobile ? 'mobile' : 'desktop';
};

// Aplica otimizações baseadas no dispositivo
export const getOptimizedConfig = () => {
  const device = detectDevice();
  return deviceOptimizations[device as keyof typeof deviceOptimizations];
};
