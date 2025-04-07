
import React from 'react';
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

interface GarnishmentTableHeaderProps {
  hideCurrentStage: boolean;
}

const GarnishmentTableHeader: React.FC<GarnishmentTableHeaderProps> = ({ hideCurrentStage }) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Case Number</TableHead>
        <TableHead>Customer Name</TableHead>
        <TableHead>Account Number</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Date Received</TableHead>
        <TableHead>Due Date</TableHead>
        {!hideCurrentStage && <TableHead>Current Stage</TableHead>}
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default GarnishmentTableHeader;
