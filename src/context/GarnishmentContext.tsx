
import React, { createContext, useContext, useState, useEffect } from 'react';
import { WorkflowStage } from '@/components/GarnishmentWorkflowTracker';
import { GarnishmentOrder, GarnishmentOrderWithTimeline, TimelineEvent } from '@/types/garnishment';
import { parseStoredOrders } from '@/utils/garnishmentUtils';
import { initialOrders } from '@/data/sampleGarnishmentOrders';

interface GarnishmentContextType {
  orders: GarnishmentOrderWithTimeline[];
  addOrder: (order: Omit<GarnishmentOrder, 'id' | 'dateReceived' | 'currentStage' | 'dueDate'>) => GarnishmentOrder;
  getOrderById: (id: string) => GarnishmentOrderWithTimeline | undefined;
  updateOrderStage: (id: string, newStage: WorkflowStage) => void;
  getOrdersByStage: (stage: WorkflowStage) => GarnishmentOrder[];
  getSamplePdfUrl: () => string;
  addTimelineEvent: (event: TimelineEvent) => void;
}

const GarnishmentContext = createContext<GarnishmentContextType | undefined>(undefined);

export const GarnishmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<GarnishmentOrderWithTimeline[]>(() => {
    // Try to load from localStorage
    const savedOrders = localStorage.getItem('garnishmentOrders');
    if (savedOrders) {
      try {
        // Parse the stored JSON and ensure dates are proper Date objects
        const parsedOrders = JSON.parse(savedOrders);
        return parseStoredOrders(parsedOrders);
      } catch (error) {
        console.error('Error parsing stored orders:', error);
        return initialOrders;
      }
    }
    return initialOrders;
  });

  // Save to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('garnishmentOrders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrderData: Omit<GarnishmentOrder, 'id' | 'dateReceived' | 'currentStage' | 'dueDate'>) => {
    const newOrder: GarnishmentOrderWithTimeline = {
      ...newOrderData,
      id: `${orders.length + 1}`,
      dateReceived: new Date(),
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Due date 1 month from now
      currentStage: 'document_management',
      timeline: []
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
    return newOrder;  // Return the new order
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const updateOrderStage = (id: string, newStage: WorkflowStage) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id 
          ? { ...order, currentStage: newStage } 
          : order
      )
    );
  };

  const getOrdersByStage = (stage: WorkflowStage) => {
    return orders.filter(order => order.currentStage === stage);
  };

  const getSamplePdfUrl = () => {
    return '/sample-garnishment-order.pdf';
  };

  const addTimelineEvent = (event: TimelineEvent) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === event.orderId 
          ? { 
              ...order, 
              timeline: [...(order.timeline || []), event] 
            } 
          : order
      )
    );
  };

  return (
    <GarnishmentContext.Provider value={{ 
      orders, 
      addOrder, 
      getOrderById, 
      updateOrderStage,
      getOrdersByStage,
      getSamplePdfUrl,
      addTimelineEvent
    }}>
      {children}
    </GarnishmentContext.Provider>
  );
};

export const useGarnishment = () => {
  const context = useContext(GarnishmentContext);
  if (context === undefined) {
    throw new Error('useGarnishment must be used within a GarnishmentProvider');
  }
  return context;
};

// Re-export types from the types file for convenience
export type { GarnishmentOrder, GarnishmentOrderWithTimeline, TimelineEvent };
