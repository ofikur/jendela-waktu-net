import React from 'react';

const DOTS = '...';

const usePagination = ({ totalBooks, booksPerPage, siblingCount = 1, currentPage }) => {
  const totalPageCount = Math.ceil(totalBooks / booksPerPage);

  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return Array.from({ length: totalPageCount }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPageCount - rightItemCount + 1 + i);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalBooks, booksPerPage, siblingCount, currentPage]);

  return paginationRange;
};

const Pagination = (props) => {
  const { onPageChange, totalBooks, currentPage, booksPerPage = 32, siblingCount = 1 } = props;

  const paginationRange = usePagination({ currentPage, totalBooks, booksPerPage, siblingCount });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = Math.ceil(totalBooks / booksPerPage);

  return (
    <nav aria-label="Page navigation" className="flex flex-wrap justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="hidden sm:block px-3 py-1 rounded border border-gold/50 text-ink-light hover:bg-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt;&lt;
      </button>

      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border border-gold/50 text-ink-light hover:bg-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt;
      </button>
      
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <span key={`${DOTS}-${index}`} className="px-3 py-1 text-ink-light">&#8230;</span>;
        }

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-1 rounded border border-gold/50 hover:bg-gold/20 ${currentPage === pageNumber ? 'bg-gold text-paper' : 'text-ink-light'}`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={onNext}
        disabled={currentPage === lastPage}
        className="px-3 py-1 rounded border border-gold/50 text-ink-light hover:bg-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &gt;
      </button>

      <button
        onClick={() => onPageChange(lastPage)}
        disabled={currentPage === lastPage}
        className="hidden sm:block px-3 py-1 rounded border border-gold/50 text-ink-light hover:bg-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &gt;&gt;
      </button>
    </nav>
  );
};

export default Pagination;