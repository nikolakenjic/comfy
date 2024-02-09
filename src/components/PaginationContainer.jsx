import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const pagesList = pages.map((pageNum) => {
    return (
      <button
        key={pageNum}
        onClick={() => handlePageChange(pageNum)}
        className={`btn btn-xs sm:btn-md join-item border-none ${
          pageNum === page ? 'bg-base-300 border-base-300' : ''
        }`}
      >
        {pageNum}
      </button>
    );
  });

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
        {pagesList}
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

export default PaginationContainer;
