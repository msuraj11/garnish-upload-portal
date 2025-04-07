
import React from 'react';
import { GarnishmentOrderWithTimeline } from '@/context/GarnishmentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, CreditCard } from 'lucide-react';

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
      </CardContent>
    </Card>
  );
};

export default CustomerDetails;
