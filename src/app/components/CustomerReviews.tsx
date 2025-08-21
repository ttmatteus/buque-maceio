"use client";

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
             fillPercentage = 1; // Estrela completamente cheia
           } else if (rating > i) {
             // Para estrelas parciais, ajusta para ficar mais perceptível
             const partial = rating - i;
             fillPercentage = partial * 0.88; // Sempre reduz para ficar mais visível
           } else {
             fillPercentage = 0; // Estrela vazia
           }
           
           return (
             <div key={i} className="relative">
               {/* Estrela vazia (fundo) */}
               <svg
                 className={`${starSize} fill-current`}
                 style={{color: '#C4C4C4'}}
                 viewBox="0 0 20 20"
               >
                 <path d="M10 15l-5.898 3.09 1.127-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.74 4.635 1.127 6.545z" />
               </svg>
               
               {/* Estrela preenchida (sobreposição) */}
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
                  fillPercentage = 1; // Estrela completamente cheia
                } else if (4.9 > i) {
                  // Para estrelas parciais, ajusta para ficar mais perceptível
                  const partial = 4.9 - i;
                  fillPercentage = partial * 0.88; // Sempre reduz para ficar mais visível
                } else {
                  fillPercentage = 0; // Estrela vazia
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
                     <svg viewBox="0 0 24 24" className="w-full h-full">
                       <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                       <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                       <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                       <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                     </svg>
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
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98 .66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s .13-1.43 .35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s .43 3.45 1.18 4.93l2.85-2.22 .81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06 .56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c .87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span className="google-reviews-label">Google Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
