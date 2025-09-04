"use client";

import { useState } from 'react';
import { IoClose, IoAdd, IoRemove } from 'react-icons/io5';
import '../../styles/components/FilterSidebar.css';
import React from 'react'; 

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: string[];
  onFilterChange: (filter: string) => void;
  onClearAll: () => void;
  openSentimentosSection?: boolean;
}

interface FilterSection {
  id: string;
  title: string;
  options: string[];
  isExpanded: boolean;
  subcategories?: {
    id: string;
    title: string;
    options: string[];
    isExpanded: boolean;
  }[];
}

export default function FilterSidebar({ 
  isOpen, 
  onClose, 
  selectedFilters, 
  onFilterChange, 
  onClearAll,
  openSentimentosSection 
}: FilterSidebarProps) {
  const [isClosing, setIsClosing] = useState(false);
  
  const [sections, setSections] = useState<FilterSection[]>([
    {
      id: 'categories',
      title: 'Categorias',
              options: ['Flores', 'Buquês', 'Combos'],
      isExpanded: true, // deixar aberta por padrão
      subcategories: [
        {
          id: 'sentimentos',
          title: 'Sentimentos',
          options: ['Romântico', 'Alegre', 'Elegante', 'Delicado', 'Clássico', 'Luxo', 'Exótico', 'Aromático'],
          isExpanded: false
        }
      ]
    },
    {
      id: 'price',
      title: 'Preço',
      options: ['Até R$ 50', 'R$ 50 - R$ 100', 'R$ 100 - R$ 150', 'Acima de R$ 150'],
      isExpanded: false
    },
    {
      id: 'occasion',
      title: 'Ocasião',
      options: ['Aniversário', 'Casamento', 'Namoro', 'Amizade', 'Dia das Mães', 'Dia dos Namorados'],
      isExpanded: false
    },
    {
      id: 'color',
      title: 'Cor',
      options: ['Vermelho', 'Rosa', 'Branco', 'Amarelo', 'Roxo', 'Laranja'],
      isExpanded: false
    }
  ]);

  // efeito para abrir automaticamente a seção Sentimentos
  React.useEffect(() => {
    if (openSentimentosSection && isOpen) {
      setSections(prev => 
        prev.map(section => 
          section.id === 'categories' 
            ? {
                ...section,
                subcategories: section.subcategories?.map(sub => 
                  sub.id === 'sentimentos' 
                    ? { ...sub, isExpanded: true }
                    : sub
                )
              }
            : section
        )
      );
    }
  }, [openSentimentosSection, isOpen]);

  const toggleSection = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  const toggleSubcategory = (sectionId: string, subcategoryId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? {
              ...section,
              subcategories: section.subcategories?.map(sub => 
                sub.id === subcategoryId 
                  ? { ...sub, isExpanded: !sub.isExpanded }
                  : sub
              )
            }
          : section
      )
    );
  };

  const isFilterSelected = (filter: string) => selectedFilters.includes(filter);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 800); // Tempo da animação aumentado para 800ms
  };

  return (
    <>
      {/* Overlay para fechar ao clicar fora - só quando aberto */}
      {(isOpen || isClosing) && (
        <div 
          className={`fixed inset-0 z-40 filter-sidebar-overlay ${
            isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleClose}
        />
      )}
      
      {/* Sidebar com animação */}
      <div 
        className={`fixed right-0 top-0 h-full w-80 bg-white filter-sidebar-content filter-sidebar-animation z-50 ${
          isOpen && !isClosing ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full filter-sidebar">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 filter-sidebar-header">Filtros</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoClose className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Filter Sections */}
          <div className="flex-1 overflow-y-auto p-6">
            {sections.map((section) => (
              <div key={section.id} className="mb-6">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full text-left mb-3 hover:text-purple-600 transition-colors filter-sidebar-section-title"
                >
                  <span className="font-medium text-gray-900">{section.title}</span>
                  <div className={`filter-sidebar-section-icon ${section.isExpanded ? 'expanded' : ''}`}>
                    {section.isExpanded ? (
                      <IoRemove className="w-4 h-4 text-gray-500" />
                    ) : (
                      <IoAdd className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>
                
                <div className={`filter-sidebar-section-content ${section.isExpanded ? 'expanded' : ''}`}>
                  {section.isExpanded && (
                    <div className="space-y-2">
                      {/* Opções diretas da seção */}
                      {section.options.length > 0 && section.options.map((option) => (
                        <label key={option} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isFilterSelected(option)}
                            onChange={() => onFilterChange(option)}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="ml-3 text-gray-700 filter-sidebar-option">{option}</span>
                        </label>
                      ))}
                      
                      {/* Subcategorias */}
                      {section.subcategories && section.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="mb-3">
                          <button
                            onClick={() => toggleSubcategory(section.id, subcategory.id)}
                            className="flex items-center justify-between w-full text-left mb-2 hover:text-purple-600 transition-colors filter-sidebar-section-title"
                          >
                            <span className="font-medium text-gray-900">{subcategory.title}</span>
                            <div className={`filter-sidebar-section-icon ${subcategory.isExpanded ? 'expanded' : ''}`}>
                              {subcategory.isExpanded ? (
                                <IoRemove className="w-4 h-4 text-gray-500" />
                              ) : (
                                <IoAdd className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                          </button>
                          
                          <div className={`filter-sidebar-subcategory-content ${subcategory.isExpanded ? 'expanded' : ''}`}>
                            {subcategory.isExpanded && (
                              <div className="space-y-2">
                                {subcategory.options.map((option) => (
                                  <label key={option} className="flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={isFilterSelected(option)}
                                      onChange={() => onFilterChange(option)}
                                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                    />
                                    <span className="ml-3 text-gray-700 filter-sidebar-option">{option}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <div className="mb-4">
              <span className="text-sm text-gray-600 filter-sidebar-counter">
                {selectedFilters.length > 0 
                  ? `${selectedFilters.length} filtro(s) selecionado(s)`
                  : 'Nenhum filtro selecionado'
                }
              </span>
            </div>
            
            <button
              onClick={handleClose}
              className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-3 filter-sidebar-button"
            >
              Ver Resultados
            </button>
            
            {selectedFilters.length > 0 && (
              <button
                onClick={onClearAll}
                className="w-full text-gray-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors filter-sidebar-button-clear"
              >
                Limpar Todos
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
