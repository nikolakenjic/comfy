import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const PaginationContainerComplex = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNum, activeClass }) => {
    return (
      <button
        key={pageNum}
        onClick={() => handlePageChange(pageNum)}
        className={`btn btn-xs sm:btn-md join-item border-none ${
          activeClass ? 'bg-base-300 border-base-300' : ''
        }`}
      >
        {pageNum}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // First btn
    pageButtons.push(addPageButton({ pageNum: 1, activeClass: page === 1 }));

    // Add dots between
    if (page > 3) {
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-1">
          ...
        </button>
      );
    }

    if (page > 2) {
      pageButtons.push(
        addPageButton({ pageNum: page - 1, activeClass: false })
      );
    }

    // Active-current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNum: page, activeClass: true }));
    }

    if (page < pageCount - 1) {
      pageButtons.push(
        addPageButton({ pageNum: page + 1, activeClass: false })
      );
    }

    // Add dots between
    if (page < pageCount - 2) {
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-2">
          ...
        </button>
      );
    }

    // Last btn
    pageButtons.push(
      addPageButton({ pageNum: pageCount, activeClass: page === pageCount })
    );

    return pageButtons;
  };

  // Page Less than 2
  if (pageCount < 2) return null;

  return (
    <div className="flex justify-end mt-16">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainerComplex;
