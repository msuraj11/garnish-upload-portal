
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { format, parseISO, isValid } from 'date-fns';
import { WorkflowStage, workflowStages } from '../GarnishmentWorkflowTracker';
import { GarnishmentOrder } from '@/types/garnishment';

interface GarnishmentTableRowProps {
  order: GarnishmentOrder;
  hideCurrentStage: boolean;
  routeState?: { from: string };
}

const GarnishmentTableRow: React.FC<GarnishmentTableRowProps> = ({ order, hideCurrentStage, routeState }) => {
  const navigate = useNavigate();
  console.log(routeState)
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

  const handleViewDetails = (id: string) => {
    navigate(`/garnishment/${id}`, { state: routeState });
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{order.caseNumber}</TableCell>
      <TableCell>{order.courtOrderNumber}</TableCell>
      <TableCell>{order.customerName}</TableCell>
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
          onClick={() => handleViewDetails(order.id)}
        >
          View Details
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default GarnishmentTableRow;
