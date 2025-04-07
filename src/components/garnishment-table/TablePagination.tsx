
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  goToPrevPage: () => void;
  goToNextPage: () => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
  goToPrevPage,
  goToNextPage
}) => {
  const renderPaginationItems = () => {
    const items = [];
    
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => goToPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <div className="py-4 border-t">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={goToPrevPage} className="cursor-pointer" />
          </PaginationItem>
          
          {renderPaginationItems()}
          
          <PaginationItem>
            <PaginationNext onClick={goToNextPage} className="cursor-pointer" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePagination;
