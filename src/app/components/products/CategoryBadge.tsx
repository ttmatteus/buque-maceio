import React from 'react';

interface CategoryBadgeProps {
  category: string;
  variant?: 'default' | 'featured';
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, variant = 'default' }) => {
  const getCategoryClass = (category: string) => {
    if (variant === 'featured') {
      switch (category) {
        case "Romântico":
          return "featured-category-badge featured-category-romantico";
        case "Combos":
          return "featured-category-badge featured-category-combos";
        case "Alegre":
          return "featured-category-badge featured-category-alegre";
        case "Delicado":
          return "featured-category-badge featured-category-delicado";
        case "Clássico":
          return "featured-category-badge featured-category-classico";
        case "Elegante":
          return "featured-category-badge featured-category-elegante";
        case "Luxo":
          return "featured-category-badge featured-category-luxo";
        case "Exótico":
          return "featured-category-badge featured-category-exotico";
        case "Aromático":
          return "featured-category-badge featured-category-aromatico";
        default:
          return "featured-category-badge";
      }
    }
    return "category-badge";
  };

  return (
    <div className={getCategoryClass(category)}>
      {category}
    </div>
  );
};

export default CategoryBadge;
