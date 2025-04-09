
import { GarnishmentOrderWithTimeline } from '@/types/garnishment';
import { WorkflowStage } from '@/components/GarnishmentWorkflowTracker';

// Helper function to parse dates in stored orders
export const parseStoredOrders = (storedOrders: any[]): GarnishmentOrderWithTimeline[] => {
  return storedOrders.map(order => {
    // Convert old stage IDs to new ones
    let currentStage = order.currentStage;
    if (currentStage === 'case_management_l1' || currentStage === 'case_management_l2') {
      currentStage = 'case_management';
    }
    
    return {
      ...order,
      // Ensure dates are proper Date objects
      dateReceived: new Date(order.dateReceived),
      dueDate: new Date(order.dueDate),
      currentStage: currentStage,
      // Parse timeline events if they exist
      timeline: order.timeline 
        ? order.timeline.map((event: any) => ({
            ...event,
            timestamp: new Date(event.timestamp)
          }))
        : []
    };
  });
};

// Function to get the appropriate color for each workflow stage
export const getColorForStage = (stage: WorkflowStage): string => {
  switch (stage) {
    case 'document_management':
      return 'bg-blue-100 text-blue-800';
    case 'case_management':
      return 'bg-purple-100 text-purple-800';
    case 'legal_team':
      return 'bg-yellow-100 text-yellow-800';
    case 'compliance_team':
      return 'bg-orange-100 text-orange-800';
    case 'customer_management':
      return 'bg-green-100 text-green-800';
    case 'outbound_communication':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
