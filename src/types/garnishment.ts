
import { WorkflowStage } from '@/components/GarnishmentWorkflowTracker';

export interface GarnishmentOrder {
  id: string;
  caseNumber: string;
  customerName: string;
  accountNumber: string;
  dateReceived: Date;
  dueDate: Date;
  currentStage: WorkflowStage;
  amount: number;
  courtOrderNumber?: string;
  courtAddress?: string;
  defendantAddress?: string;
  defendantId?: string;
  plaintiff?: string;
}

export interface TimelineEvent {
  orderId: string;
  type: 'stage_change' | 'note' | 'action';
  title: string;
  description: string;
  status: 'approved' | 'rejected' | 'pending';
  timestamp: Date;
}

// Extend the GarnishmentOrder type to include timeline
export interface GarnishmentOrderWithTimeline extends GarnishmentOrder {
  timeline?: TimelineEvent[];
}
