
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GarnishmentOrder } from '@/types/garnishment';
import { formatDate } from '@/utils/dateUtils';
import { getColorForStage } from '@/utils/garnishmentUtils';
import { TableCell, TableRow } from "@/components/ui/table";

interface GarnishmentTableRowProps {
  order: GarnishmentOrder;
  routeState?: Record<string, any>;
}

export const GarnishmentTableRow = ({ order, routeState }: GarnishmentTableRowProps) => {
  const navigate = useNavigate();
  const stageColor = getColorForStage(order.currentStage);
  
  const handleViewDetails = (id: string) => {
    navigate(`/garnishment/${id}`, { state: routeState });
  };
  
  return (
    <TableRow key={order.id} className="hover:bg-gray-50">
      <TableCell className="font-medium">{order.caseNumber}</TableCell>
      <TableCell>{order.courtOrderNumber || 'N/A'}</TableCell>
      <TableCell>{order.customerName}</TableCell>
      <TableCell>{formatDate(new Date(order.dateReceived))}</TableCell>
      <TableCell>
        <Badge 
          className={`${stageColor}`}
        >
          {order.currentStage.replace('_', ' ')}
        </Badge>
      </TableCell>
      <TableCell>
        <Button
          size="sm"
          onClick={() => handleViewDetails(order.id)}
          className="bg-bank hover:bg-bank-dark"
        >
          View Details
        </Button>
      </TableCell>
    </TableRow>
  );
};
