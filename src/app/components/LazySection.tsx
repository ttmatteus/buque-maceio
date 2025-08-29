"use client";

import { useEffect, useRef, useState } from 'react';
import { getOptimizedConfig } from '../utils/performance';

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  fallback?: React.ReactNode;
}

export default function LazySection({ 
  children, 
  threshold,
  rootMargin,
  className = '',
  fallback = <div className="h-32 bg-gray-100 animate-pulse rounded-lg" />
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Usa configurações otimizadas baseadas no dispositivo
  const optimizedConfig = getOptimizedConfig();
  const finalThreshold = threshold ?? optimizedConfig.lazyLoadThreshold;
  const finalRootMargin = rootMargin ?? '50px';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Delay otimizado para suavizar o carregamento
          setTimeout(() => {
            setIsLoaded(true);
          }, 100);
          observer.disconnect();
        }
      },
      {
        threshold: finalThreshold,
        rootMargin: finalRootMargin,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [finalThreshold, finalRootMargin]);

  return (
    <div ref={sectionRef} className={className}>
      {!isVisible ? (
        fallback
      ) : (
        <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {children}
        </div>
      )}
    </div>
  );
}
