import React from 'react';

const PaginationButtons = ({ currentPage, pageCount, handlePageChange }) => {
  const maxButtons = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(pageCount, startPage + maxButtons - 1);

  return (
    <div className="pagination">
      <button
        className="prev-next-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {[...Array(endPage - startPage + 1).keys()].map((i) => {
        const pageNumber = startPage + i;
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className="prev-next-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage * 30 >= pageCount * 30}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
