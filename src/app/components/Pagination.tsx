"use client";

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
          <span className="pagination-chevron">‹</span>
          <span className="pagination-text">Anterior</span>
        </button>

        {/* Separador */}
        <div className="pagination-separator"></div>

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
          
          {/* Elipsis se houver mais páginas */}
          {totalPages > 3 && (
            <span className="pagination-ellipsis">...</span>
          )}
        </div>

        {/* Separador */}
        <div className="pagination-separator"></div>

        {/* Botão Próximo */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button pagination-next"
        >
          <span className="pagination-text">Próximo</span>
          <span className="pagination-chevron">›</span>
        </button>
      </div>
    </div>
  );
}
