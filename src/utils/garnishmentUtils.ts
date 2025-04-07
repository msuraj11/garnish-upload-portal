
import { GarnishmentOrderWithTimeline } from '@/types/garnishment';

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
