
import React from 'react';
import { GarnishmentOrderWithTimeline } from '@/context/GarnishmentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MapPin, Building, Gavel } from 'lucide-react';
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
          {order.courtOrderNumber && (
            <div>
              <p className="text-sm text-gray-500">Court Order Number</p>
              <p className="font-medium">{order.courtOrderNumber}</p>
            </div>
          )}
          {order.plaintiff && (
            <div>
              <p className="text-sm text-gray-500">Plaintiff</p>
              <p className="font-medium">{order.plaintiff}</p>
            </div>
          )}
          <div className="col-span-2">
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

        {/* Court information section */}
        {order.courtAddress && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium flex items-center mb-3">
              <Gavel className="h-4 w-4 mr-2 text-bank" />
              Court Information
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {order.courtAddress && (
                <div>
                  <p className="text-sm text-gray-500">Court Address</p>
                  <p className="font-medium flex items-start">
                    <MapPin className="h-4 w-4 mr-1 mt-0.5 text-gray-400" />
                    {order.courtAddress}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Defendant information section */}
        {(order.defendantAddress || order.defendantId) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium flex items-center mb-3">
              <Building className="h-4 w-4 mr-2 text-bank" />
              Defendant Information
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {order.defendantId && (
                <div>
                  <p className="text-sm text-gray-500">Defendant ID</p>
                  <p className="font-medium">{order.defendantId}</p>
                </div>
              )}
              {order.defendantAddress && (
                <div>
                  <p className="text-sm text-gray-500">Defendant Address</p>
                  <p className="font-medium flex items-start">
                    <MapPin className="h-4 w-4 mr-1 mt-0.5 text-gray-400" />
                    {order.defendantAddress}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GarnishmentOrderInfo;
