import { useEffect, useRef, useState, useCallback } from 'react';

interface UseLazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useLazyLoading(options: UseLazyLoadingOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    once = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (entry.isIntersecting) {
      setIsVisible(true);
      
      // Pequeno delay para suavizar a transição
      setTimeout(() => setIsLoaded(true), 100);
      
      // Se once for true, desconecta o observer após o primeiro trigger
      if (once) {
        observerRef.current?.disconnect();
      }
    } else if (!once) {
      setIsVisible(false);
      setIsLoaded(false);
    }
  }, [once]);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  const triggerLoad = useCallback(() => {
    setIsVisible(true);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return {
    elementRef,
    isVisible,
    isLoaded,
    triggerLoad
  };
}
