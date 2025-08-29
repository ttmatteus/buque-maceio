import React from 'react';
import { Settings2 } from 'lucide-react';
import '../../styles/components/ProductFilters.css';

interface ProductFiltersProps {
  categories: string[];
  onCategorySelect?: (category: string | undefined) => void;
  selectedCategory?: string;
  onOpenFilters?: () => void;
  selectedFilters?: string[]; // filtros selecionados no sidebar
  onRemoveSidebarFilter?: (filter: string) => void; // função para remover filtro do sidebar
  onSentimentosClick?: () => void; // função para lidar com clique em Sentimentos
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  onCategorySelect,
  selectedCategory,
  onOpenFilters,
  selectedFilters = [], 
  onRemoveSidebarFilter,
  onSentimentosClick
}) => {
  // lista de filtros de sentimentos válidos
  const sentimentosFilters = ['Romântico', 'Alegre', 'Elegante', 'Delicado', 'Clássico', 'Luxo', 'Exótico', 'Aromático'];
  
  // função para verificar se um filtro é de sentimento
  const isSentimentoFilter = (filter: string) => sentimentosFilters.includes(filter);
  
  // função para verificar se há filtros de sentimento ativos
  const hasActiveSentimentoFilters = () => selectedFilters.some(filter => isSentimentoFilter(filter));

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2.5">
        <span className="filter-label">Filtrar resultados:</span>
        
        {/* botão de filtro com icones*/}
        <button 
          className="filter-icon-button"
          onClick={onOpenFilters}
        >
          <Settings2 className="w-4 h-4" style={{ color: '#1C1C1C' }} />
        </button>
        
        {/* botões de categoria na mesma linha */}
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category;
          const isSidebarSelected = selectedFilters.includes(category);
          
          // para "sentimentos", verificar se há filtros de sentimento ativos
          const isSentimentosActive = category === 'Sentimentos' && hasActiveSentimentoFilters();
          
          return (
            <button
              key={index}
              onClick={() => {
                // se for "Sentimentos", usar função específica
                if (category === 'Sentimentos' && onSentimentosClick) {
                  onSentimentosClick();
                  return;
                }
                
                // se o filtro está selecionado no sidebar, remove ele
                if (isSidebarSelected) {
                  onRemoveSidebarFilter?.(category);
                } else {
                  // se a categoria já está selecionada, desmarca (passa undefined)
                  // se não está selecionada, seleciona
                  if (selectedCategory === category) {
                    onCategorySelect?.(undefined);
                  } else {
                    onCategorySelect?.(category);
                  }
                }
              }}
              className={`category-button ${
                isSelected || isSentimentosActive ? 'selected' : ''
              } ${
                isSidebarSelected ? 'sidebar-selected' : ''
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
      
      {/* Mostrar filtros adicionais selecionados no sidebar */}
      {selectedFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedFilters
            .filter(filter => !categories.includes(filter)) // Filtros que não são categorias principais
            .map((filter, index) => (
              <button
                key={`sidebar-${index}`}
                onClick={() => onRemoveSidebarFilter?.(filter)}
                className="category-button sidebar-selected"
              >
                {filter}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
