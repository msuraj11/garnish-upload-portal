
import React from 'react';
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { GarnishmentOrder } from '@/types/garnishment';
import GarnishmentTableRow from './GarnishmentTableRow';

interface GarnishmentTableBodyProps {
  orders: GarnishmentOrder[];
  hideCurrentStage: boolean;
}

const GarnishmentTableBody: React.FC<GarnishmentTableBodyProps> = ({ orders, hideCurrentStage }) => {
  return (
    <TableBody>
      {orders.length === 0 ? (
        <TableRow>
          <TableCell colSpan={8} className="h-24 text-center text-gray-500">
            No garnishment orders found
          </TableCell>
        </TableRow>
      ) : (
        orders.map((order) => (
          <GarnishmentTableRow 
            key={order.id}
            order={order}
            hideCurrentStage={hideCurrentStage}
          />
        ))
      )}
    </TableBody>
  );
};

export default GarnishmentTableBody;
