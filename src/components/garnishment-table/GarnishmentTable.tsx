
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from '@/components/ui/table';
import { GarnishmentOrder } from '@/types/garnishment';
import GarnishmentTableHeader from './GarnishmentTableHeader';
import { GarnishmentTableBody } from './GarnishmentTableBody';
import TablePagination from './TablePagination';

interface GarnishmentTableProps {
  orders: GarnishmentOrder[];
  itemsPerPage?: number;
  routeState?: Record<string, any>;
}

const GarnishmentTable: React.FC<GarnishmentTableProps> = ({ 
  orders, 
  itemsPerPage = 10,
  routeState
}) => {
  const location = useLocation();
  const path = location.pathname;
  const hideCurrentStage = path.startsWith('/team/');
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);
  
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <GarnishmentTableHeader hideCurrentStage={hideCurrentStage} />
        <GarnishmentTableBody 
          currentItems={paginatedOrders} 
          routeState={routeState} 
        />
      </Table>
      
      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
        />
      )}
    </div>
  );
};

export default GarnishmentTable;
