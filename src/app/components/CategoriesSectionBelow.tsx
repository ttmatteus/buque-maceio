"use client";

interface Category {
  name: string;
  image: string;
}

const CategoriesSectionBelow: React.FC = () => {
  const categories: Category[] = [
    { name: 'Alegre', image: '/images/carousel/10.png' },
    { name: 'Romântico', image: '/images/carousel/11.png' },
    { name: 'Delicado', image: '/images/carousel/8.png' },
    { name: 'Clássico', image: '/images/carousel/9.png' },
    { name: 'Combos', image: '/images/carousel/12.png' }
  ];

  return (
    <section className="categories-section">
      <div className="categories-container">

        
        {/* Carrossel de Categorias */}
        <div className="categories-carousel">
          {/* Seta Esquerda */}
          <button className="categories-nav-button prev">
            <svg className="w-5 h-5" fill="none" stroke="#8B8B8B" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Categorias */}
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.name}
                className="category-item"
              >
                <div className="category-image-container">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                  />
                </div>
                <div className="category-text">
                  <h3 className="category-name">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Seta Direita */}
          <button className="categories-nav-button next">
            <svg className="w-5 h-5" fill="none" stroke="#8B8B8B" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSectionBelow;
