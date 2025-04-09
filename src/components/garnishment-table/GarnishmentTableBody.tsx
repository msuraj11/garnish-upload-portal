
import React from 'react';
import { TableBody } from "@/components/ui/table";
import { GarnishmentTableRow } from './GarnishmentTableRow';
import { GarnishmentOrder } from '@/types/garnishment';

interface GarnishmentTableBodyProps {
  currentItems: GarnishmentOrder[];
  routeState?: Record<string, any>;
}

export const GarnishmentTableBody = ({ currentItems, routeState }: GarnishmentTableBodyProps) => {
  return (
    <TableBody>
      {currentItems.length === 0 ? (
        <tr>
          <td colSpan={6} className="h-24 text-center">
            No orders found.
          </td>
        </tr>
      ) : (
        currentItems.map((order) => (
          <GarnishmentTableRow 
            key={order.id} 
            order={order}
            routeState={routeState}
          />
        ))
      )}
    </TableBody>
  );
};
