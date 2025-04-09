
import React from 'react';
import { GarnishmentOrderWithTimeline } from '@/types/garnishment';
import GarnishmentOrderInfo from '@/components/GarnishmentOrderInfo';
import CustomerDetails from '@/components/CustomerDetails';
import GarnishmentTimeline from '@/components/GarnishmentTimeline';

interface GarnishmentDetailsContentProps {
  order: GarnishmentOrderWithTimeline;
  formatDate: (date: Date | string, formatString?: string) => string;
}

const GarnishmentDetailsContent: React.FC<GarnishmentDetailsContentProps> = ({ order, formatDate }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <GarnishmentOrderInfo order={order} formatDate={formatDate} />
      <CustomerDetails order={order} />
      <GarnishmentTimeline order={order} formatDate={formatDate} />
    </div>
  );
};

export default GarnishmentDetailsContent;
