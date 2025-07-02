import React from 'react';

const PaginationControls = ({ page, totalPages, totalRows, onPrev, onNext }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <button
        className="btn btn-outline-primary"
        disabled={page === 1}
        onClick={onPrev}
      >
        Prev
      </button>

      <span>
        Halaman <strong>{page}</strong> dari <strong>{totalPages}</strong> — Total <strong>{totalRows}</strong> produk
      </span>

      <button
        className="btn btn-outline-primary"
        disabled={page >= totalPages}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;