
import React from 'react';
import { GarnishmentOrderWithTimeline } from '@/context/GarnishmentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, CreditCard, Building, MapPin } from 'lucide-react';

interface CustomerDetailsProps {
  order: GarnishmentOrderWithTimeline;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ order }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2 text-bank" />
          Customer Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-sm text-gray-500">Customer Name</p>
            <p className="font-medium">{order.customerName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Account Number</p>
            <p className="font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
              {order.accountNumber}
            </p>
          </div>
        </div>

        {/* Defendant information section - moved from GarnishmentOrderInfo */}
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

export default CustomerDetails;
