
import React from 'react';
import { GarnishmentOrderWithTimeline } from '@/context/GarnishmentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { workflowStages } from '@/components/GarnishmentWorkflowTracker';

interface GarnishmentOrderInfoProps {
  order: GarnishmentOrderWithTimeline;
  formatDate: (date: Date | string, formatString?: string) => string;
}

const GarnishmentOrderInfo: React.FC<GarnishmentOrderInfoProps> = ({ order, formatDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-bank" />
          Order Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Case Number</p>
            <p className="font-medium">{order.caseNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-medium">{order.amount.toLocaleString('de-DE')} €</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date Received</p>
            <p className="font-medium">{formatDate(order.dateReceived)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium">{formatDate(order.dueDate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Stage</p>
            <p className="font-medium">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                order.currentStage === 'outbound_communication' ? 'bg-green-100 text-green-800' :
                order.currentStage === 'document_management' ? 'bg-blue-100 text-blue-800' :
                order.currentStage === 'legal_team' ? 'bg-purple-100 text-purple-800' :
                order.currentStage === 'compliance_team' ? 'bg-yellow-100 text-yellow-800' :
                order.currentStage === 'case_management' ? 'bg-indigo-100 text-indigo-800' :
                order.currentStage === 'customer_management' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {workflowStages.find(stage => stage.id === order.currentStage)?.label}
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GarnishmentOrderInfo;
