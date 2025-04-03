import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { WorkflowStage, workflowStages } from './GarnishmentWorkflowTracker';
import { format, parseISO, isValid } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface GarnishmentOrder {
  id: string;
  caseNumber: string;
  customerName: string;
  accountNumber: string;
  dateReceived: Date;
  dueDate: Date;
  currentStage: WorkflowStage;
  amount: number;
}

interface GarnishmentTableProps {
  orders: GarnishmentOrder[];
  itemsPerPage?: number;
}

const GarnishmentTable: React.FC<GarnishmentTableProps> = ({ orders, itemsPerPage = 10 }) => {
  const location = useLocation();
  const path = location.pathname;
  const hideCurrentStage = path.startsWith('/team/');
  const [currentPage, setCurrentPage] = useState(1);
  
  const getStageName = (stageId: WorkflowStage) => {
    const stage = workflowStages.find(s => s.id === stageId);
    return stage ? stage.label : 'Unknown';
  };
  
  const formatDate = (date: Date | string | null | undefined) => {
    try {
      if (!date) {
        return 'N/A';
      }
      
      if (date instanceof Date) {
        return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid date';
      }
      else if (typeof date === 'string') {
        const parsedDate = parseISO(date);
        return isValid(parsedDate) ? format(parsedDate, 'MMM d, yyyy') : 'Invalid date';
      }
      return 'Invalid date';
    } catch (error) {
      console.error('Error formatting date:', date, error);
      return 'Invalid date';
    }
  };
  
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
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case Number</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date Received</TableHead>
            <TableHead>Due Date</TableHead>
            {!hideCurrentStage && <TableHead>Current Stage</TableHead>}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-gray-500">
                No garnishment orders found
              </TableCell>
            </TableRow>
          ) : (
            paginatedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.caseNumber}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.accountNumber}</TableCell>
                <TableCell>{order.amount.toLocaleString('de-DE')} €</TableCell>
                <TableCell>{formatDate(order.dateReceived)}</TableCell>
                <TableCell>{formatDate(order.dueDate)}</TableCell>
                {!hideCurrentStage && (
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.currentStage === 'outbound_communication' ? 'bg-green-100 text-green-800' :
                      order.currentStage === 'document_management' ? 'bg-blue-100 text-blue-800' :
                      order.currentStage === 'legal_team' ? 'bg-purple-100 text-purple-800' :
                      order.currentStage === 'compliance_team' ? 'bg-yellow-100 text-yellow-800' :
                      order.currentStage === 'case_management' ? 'bg-indigo-100 text-indigo-800' :
                      order.currentStage === 'customer_management' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {getStageName(order.currentStage)}
                    </span>
                  </TableCell>
                )}
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                  >
                    <Link to={`/garnishment/${order.id}`} className="flex items-center">
                      View Details
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default GarnishmentTable;
