"use client";

import { MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange
}: PaginationProps) {

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination-container">
      {/* Componente de paginação */}
      <div className="pagination-component">
        {/* Botão Anterior */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button pagination-prev"
        >
          <ChevronLeft size={16} />
          <span className="pagination-text">Anterior</span>
        </button>

        {/* Números das páginas */}
        <div className="pagination-pages">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pagination-page ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
          
          {/* Ícone Ellipsis após a última página */}
          <MoreHorizontal size={16} style={{ marginLeft: '8px' }} />
        </div>

        {/* Botão Próximo */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button pagination-next"
          style={{ marginLeft: '16px' }}
        >
          <span className="pagination-text">Próximo</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
