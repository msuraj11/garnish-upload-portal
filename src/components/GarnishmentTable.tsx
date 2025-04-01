
import React from 'react';
import { Link } from 'react-router-dom';
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
import { format, parseISO } from 'date-fns';
import { ExternalLink } from 'lucide-react';

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
}

const GarnishmentTable: React.FC<GarnishmentTableProps> = ({ orders }) => {
  const getStageName = (stageId: WorkflowStage) => {
    const stage = workflowStages.find(s => s.id === stageId);
    return stage ? stage.label : 'Unknown';
  };
  
  // Helper function to safely format dates
  const formatDate = (date: Date | string) => {
    try {
      // If it's already a Date object, use it directly
      if (date instanceof Date) {
        return format(date, 'MMM d, yyyy');
      }
      // If it's a string (likely from localStorage serialization), parse it first
      else if (typeof date === 'string') {
        return format(parseISO(date), 'MMM d, yyyy');
      }
      // Fallback
      return 'Invalid date';
    } catch (error) {
      console.error('Error formatting date:', date, error);
      return 'Invalid date';
    }
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
            <TableHead>Current Stage</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-gray-500">
                No garnishment orders found
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.caseNumber}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.accountNumber}</TableCell>
                <TableCell>${order.amount.toLocaleString()}</TableCell>
                <TableCell>{formatDate(order.dateReceived)}</TableCell>
                <TableCell>{formatDate(order.dueDate)}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.currentStage === 'outbound_communication' ? 'bg-green-100 text-green-800' :
                    order.currentStage === 'document_management' ? 'bg-blue-100 text-blue-800' :
                    order.currentStage === 'legal_team' ? 'bg-purple-100 text-purple-800' :
                    order.currentStage === 'compliance_team' ? 'bg-yellow-100 text-yellow-800' :
                    order.currentStage === 'case_management_l1' ? 'bg-indigo-100 text-indigo-800' :
                    order.currentStage === 'case_management_l2' ? 'bg-pink-100 text-pink-800' :
                    order.currentStage === 'customer_management' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {getStageName(order.currentStage)}
                  </span>
                </TableCell>
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
    </div>
  );
};

export default GarnishmentTable;
