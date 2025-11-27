"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Carousel: React.FC = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const slides = useMemo(() => [
    {
      image: '/images/decorative/flor1.png',
      title: 'Buquês Artesanais',
      subtitle: 'Criados com Amor',
      description: 'Cada buquê é uma obra de arte única'
    },
    {
      image: '/images/decorative/flor2.png',
      title: 'Rosas Elegantes',
      subtitle: 'Beleza Atemporal',
      description: 'A elegância das rosas em composições sofisticadas'
    },
    {
      image: '/images/decorative/flor3.png',
      title: 'Girassóis Vibrantes',
      subtitle: 'Energia Pura',
      description: 'A alegria e vitalidade dos girassóis'
    },
    {
      image: '/images/decorative/flor4.png',
      title: 'Buquês Mistos',
      subtitle: 'Harmonia Perfeita',
      description: 'A combinação perfeita de cores e texturas'
    },
    {
      image: '/images/decorative/flor5.png',
      title: 'Flores',
      subtitle: 'Harmonia Perfeita',
      description: 'A combinação perfeita de cores e texturas'
    }
  ], []);

  // Pré-carrega todas as imagens do carrossel
  useEffect(() => {
    const loadImage = (src: string, index: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          setImagesLoaded(prev => new Set(prev).add(index));
          resolve();
        };
        img.onerror = () => {
          console.error(`Erro ao carregar imagem ${index}: ${src}`);
          // Marca como carregada mesmo com erro para não travar o carrossel
          setImagesLoaded(prev => new Set(prev).add(index));
          resolve();
        };
        img.src = src;
      });
    };

    // Carrega todas as imagens em paralelo
    const loadAllImages = async () => {
      setIsLoading(true);
      
      try {
        const promises = slides.map((slide, index) => loadImage(slide.image, index));
        await Promise.all(promises);
      } catch (error) {
        console.error('Erro durante o carregamento:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllImages();
  }, [slides]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSlideDirection('left');
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, slides]);

  const nextSlide = () => {
    setSlideDirection('left');
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideDirection('right');
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setSlideDirection(index > currentSlide ? 'left' : 'right');
    setCurrentSlide(index);
  };

  const goToProducts = () => {
    router.push('/produto');
  };

  const contentVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  };



  return (
    <div
      ref={containerRef}
      className="carousel-container"
    >
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        const isImageLoaded = imagesLoaded.has(index);
        
        return (
          <motion.div
            key={index}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 1.02
            }}
            transition={{
              opacity: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
              scale: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
            className={`carousel-slide ${isActive ? 'active' : ''}`}
            style={{
              backgroundImage: isImageLoaded ? `url(${slide.image})` : 'none'
            }}
          >
            {/* Placeholder enquanto a imagem carrega */}
            {!isImageLoaded && (
              <div className="carousel-slide-placeholder">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="mt-4 text-gray-500 text-sm">Carregando imagem {index + 1}...</div>
              </div>
            )}
          </motion.div>
        );
      })}

      <div className="carousel-overlay" />

      <AnimatePresence mode="wait" custom={slideDirection}>
        <motion.div
          key={currentSlide}
          custom={slideDirection}
          variants={contentVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="carousel-content"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="carousel-subtitle"
          >
            {slides[currentSlide].subtitle}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="carousel-title"
          >
            {slides[currentSlide].title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="carousel-description"
          >
            {slides[currentSlide].description}
          </motion.p>

          {/* botão centralizado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="carousel-button-container"
          >
            <button className="carousel-button" onClick={goToProducts}>
              Nossos Produtos
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* botões navegação */}
      <button
        onClick={prevSlide}
        className="carousel-nav-button prev"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="carousel-nav-button next"
      >
        <FaChevronRight />
      </button>

      {/* indicadores */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
