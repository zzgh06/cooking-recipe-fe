import React from "react";
import Pagination from "react-js-pagination";

const paginationStyle = `
  .pagination {
    display: flex;
    justify-content: center;
    gap: 4px;
  }
  
  .pagination li {
    display: inline-block;
  }
  
  .pagination li a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2.5rem;
    height: 2.5rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    transition: all 0.2s;
  }
  
  .pagination li.active a {
    background-color: #2563eb;
    color: white;
  }
  
  .pagination li a:hover:not(.active) {
    background-color: #f3f4f6;
  }
  
  .pagination li.disabled a {
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

interface PaginationComponentProps {
  activePage: number;
  itemsCountPerPage: number;
  totalItemsCount: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationComponent = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  onPageChange,
}: PaginationComponentProps) => {
  return (
    <>
      <style>{paginationStyle}</style>
      <div className="flex justify-center mt-8">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          prevPageText="이전"
          nextPageText="다음"
          onChange={onPageChange}
        />
      </div>
    </>
  );
};

export default PaginationComponent;
