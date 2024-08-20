import React from 'react';

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-8">
      <button
        className="mx-1"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Poprzednia strona
      </button>
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page}
          className={`mx-1 ${currentPage === page + 1 ? 'font-bold' : ''}`}
          onClick={() => onPageChange(page + 1)}
        >
          {page + 1}
        </button>
      ))}
      <button
        className="mx-1"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Następna strona →
      </button>
    </div>
  );
}
