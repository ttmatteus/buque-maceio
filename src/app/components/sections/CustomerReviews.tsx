"use client";

import Image from 'next/image';

interface Review {
  id: number;
  rating: number;
  text: string;
  reviewerName: string;
  location: string;
}

const CustomerReviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      rating: 4,
      text: "As flores são simplesmente deslumbrantes! A entrega foi rápida e o buquê estava perfeito.",
      reviewerName: "Ana Silva",
      location: "Maceió, AL"
    },
    {
      id: 2,
      rating: 5,
      text: "Qualidade excepcional e atendimento impecável. Recomendo muito!",
      reviewerName: "Carlos Santos",
      location: "Maceió, AL"
    },
    {
      id: 3,
      rating: 4,
      text: "Buquê lindo e entrega pontual. Minha mãe adorou o presente!",
      reviewerName: "Maria Costa",
      location: "Maceió, AL"
    },
    {
      id: 4,
      rating: 5,
      text: "Flores frescas e arranjo perfeito. Superou todas as expectativas.",
      reviewerName: "João Oliveira",
      location: "Maceió, AL"
    }
  ];

     const renderStars = (rating: number, size: 'large' | 'small' = 'small') => {
     const starSize = size === 'large' ? 'w-8 h-8' : 'w-4 h-4';
     
     return (
       <div className="flex gap-[4px]">
         {[...Array(5)].map((_, i) => {
           let fillPercentage;
           if (rating >= i + 1) {
             fillPercentage = 1; 
           } else if (rating > i) {
             // para estrelas parciais, ajusta para ficar mais perceptível
             const partial = rating - i;
             fillPercentage = partial * 0.88; // sempre reduz para ficar mais visível
           } else {
             fillPercentage = 0; // estrela vazia
           }
           
           return (
             <div key={i} className="relative">
               {/* estrela vazia (fundo) */}
               <svg
                 className={`${starSize} fill-current`}
                 style={{color: '#C4C4C4'}}
                 viewBox="0 0 20 20"
               >
                 <path d="M10 15l-5.898 3.09 1.127-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.74 4.635 1.127 6.545z" />
               </svg>
               
               {/* estrela preenchida (sobreposição) */}
               <svg
                 className={`${starSize} fill-current absolute top-0 left-0`}
                 style={{
                   color: '#FFD333',
                   clipPath: `inset(0 ${100 - (fillPercentage * 100)}% 0 0)`
                 }}
                 viewBox="0 0 20 20"
               >
                 <path d="M10 15l-5.898 3.09 1.127-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.74 4.635 1.127 6.545z" />
               </svg>
             </div>
           );
         })}
       </div>
     );
   };

  return (
    <section className="customer-reviews-section">
      <div className="customer-reviews-container">
        
        {/* Avaliação Geral */}
        <div className="overall-rating">
          <h2 className="overall-title">
            <span>4.9 </span>
            <span>stars</span>
          </h2>
          <div className="overall-stars">
            <div className="stars-group">
              {[...Array(5)].map((_, i) => {
                let fillPercentage;
                if (4.9 >= i + 1) {
                  fillPercentage = 1; 
                } else if (4.9 > i) {
                  const partial = 4.9 - i;
                  fillPercentage = partial * 0.88; 
                } else {
                  fillPercentage = 0;
                }

                return (
                  <div key={i} className="relative">
                    {/* Estrela vazia (fundo) */}
                    <svg
                      className="star-large fill-current"
                      style={{color: '#C4C4C4'}}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.898 3.09 1.127-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.74 4.635 1.127 6.545z" />
                    </svg>

                    {/* Estrela preenchida (sobreposição) */}
                    <svg
                      className="star-large fill-current absolute top-0 left-0"
                      style={{
                        color: '#FFD333',
                        clipPath: `inset(0 ${100 - (fillPercentage * 100)}% 0 0)`
                      }}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.898 3.09 1.127-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.74 4.635 1.127 6.545z" />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

                 {/* Carrossel de Reviews */}
         <div className="flex items-center justify-center">
           {/* Seta Esquerda */}
          <button className="nav-button nav-left self-center">
             <svg className="w-5 h-5 transition-colors duration-300" fill="none" stroke="#8B8B8B" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
             </svg>
           </button>

           {/* Reviews */}
          <div className="reviews-list">
             {reviews.map((review) => (
                                  <div
                    key={review.id}
                    className="review-card"
                  >
                 {/* Header do Review */}
                <div className="review-header">
                   <div>
                     {renderStars(review.rating)}
                   </div>
                   {/* Google Logo */}
                   <div className="w-6 h-6">
                     <Image 
                       src="/images/icons/google-g-logo.svg" 
                       alt="Google" 
                       width={24}
                       height={24}
                       className="w-full h-full"
                     />
                   </div>
                 </div>

                 {/* Texto do Review */}
                <p className="review-text">
                   &ldquo;{review.text}&rdquo;
                 </p>

                 {/* Informações do Reviewer */}
                <div className="review-footer">
                   <span>{review.reviewerName}</span>
                   <span>{review.location}</span>
                 </div>
               </div>
             ))}
           </div>

           {/* Seta Direita */}
          <button className="nav-button nav-right self-center">
             <svg className="w-5 h-5" fill="none" stroke="#8B8B8B" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
           </button>
         </div>

         {/* Informações do Google Reviews */}
        <div className="google-info">
          <p className="google-text">
            Based on <span className="google-bold">89</span> reviews
          </p>
          <div className="google-brand">
            <div className="google-logo">
              <Image 
                src="/images/icons/google-g-logo.svg" 
                alt="Google" 
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <span className="google-reviews-label">Google Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
