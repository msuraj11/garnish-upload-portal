import React, { createContext, useContext, useState, useEffect } from 'react';
import { GarnishmentOrder } from '@/components/GarnishmentTable';
import { WorkflowStage } from '@/components/GarnishmentWorkflowTracker';

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

// Sample data with updated stage values
const initialOrders: GarnishmentOrderWithTimeline[] = [
  {
    id: '1',
    caseNumber: 'GRN-2023-001',
    customerName: 'John Smith',
    accountNumber: '12345678',
    dateReceived: new Date(2023, 5, 15),
    dueDate: new Date(2023, 6, 15),
    currentStage: 'legal_team',
    amount: 5000
  },
  {
    id: '2',
    caseNumber: 'GRN-2023-002',
    customerName: 'Lisa Johnson',
    accountNumber: '87654321',
    dateReceived: new Date(2023, 6, 22),
    dueDate: new Date(2023, 7, 22),
    currentStage: 'case_management',
    amount: 3200
  },
  {
    id: '3',
    caseNumber: 'GRN-2023-003',
    customerName: 'Michael Davis',
    accountNumber: '45678912',
    dateReceived: new Date(2023, 7, 5),
    dueDate: new Date(2023, 8, 5),
    currentStage: 'document_management',
    amount: 7500
  },
  {
    id: '4',
    caseNumber: 'GRN-2023-004',
    customerName: 'Emma Wilson',
    accountNumber: '78901234',
    dateReceived: new Date(2023, 7, 10),
    dueDate: new Date(2023, 8, 10),
    currentStage: 'legal_team',
    amount: 4200
  },
  {
    id: '5',
    caseNumber: 'GRN-2023-005',
    customerName: 'James Taylor',
    accountNumber: '34567890',
    dateReceived: new Date(2023, 7, 15),
    dueDate: new Date(2023, 8, 15),
    currentStage: 'compliance_team',
    amount: 6300
  },
  {
    id: '6',
    caseNumber: 'GRN-2023-006',
    customerName: 'Olivia Martinez',
    accountNumber: '90123456',
    dateReceived: new Date(2023, 7, 20),
    dueDate: new Date(2023, 8, 20),
    currentStage: 'case_management',
    amount: 2900
  },
  {
    id: '7',
    caseNumber: 'GRN-2023-007',
    customerName: 'Robert Brown',
    accountNumber: '56789012',
    dateReceived: new Date(2023, 8, 1),
    dueDate: new Date(2023, 9, 1),
    currentStage: 'document_management',
    amount: 8100
  },
  {
    id: '8',
    caseNumber: 'GRN-2023-008',
    customerName: 'Sophia Anderson',
    accountNumber: '12345679',
    dateReceived: new Date(2023, 8, 5),
    dueDate: new Date(2023, 9, 5),
    currentStage: 'customer_management',
    amount: 5600
  },
  {
    id: '9',
    caseNumber: 'GRN-2023-009',
    customerName: 'William Garcia',
    accountNumber: '23456789',
    dateReceived: new Date(2023, 8, 10),
    dueDate: new Date(2023, 9, 10),
    currentStage: 'compliance_team',
    amount: 4800
  },
  {
    id: '10',
    caseNumber: 'GRN-2023-010',
    customerName: 'Ava Rodriguez',
    accountNumber: '34567891',
    dateReceived: new Date(2023, 8, 15),
    dueDate: new Date(2023, 9, 15),
    currentStage: 'legal_team',
    amount: 7200
  },
  {
    id: '11',
    caseNumber: 'GRN-2023-011',
    customerName: 'Daniel Wilson',
    accountNumber: '45678913',
    dateReceived: new Date(2023, 8, 20),
    dueDate: new Date(2023, 9, 20),
    currentStage: 'outbound_communication',
    amount: 3500
  },
  {
    id: '12',
    caseNumber: 'GRN-2023-012',
    customerName: 'Mia Thompson',
    accountNumber: '56789013',
    dateReceived: new Date(2023, 9, 1),
    dueDate: new Date(2023, 10, 1),
    currentStage: 'case_management',
    amount: 6100
  },
  {
    id: '13',
    caseNumber: 'GRN-2023-013',
    customerName: 'Ethan Harris',
    accountNumber: '67890123',
    dateReceived: new Date(2023, 9, 5),
    dueDate: new Date(2023, 10, 5),
    currentStage: 'case_management',
    amount: 4300
  }
];

// Helper function to parse dates in stored orders
const parseStoredOrders = (storedOrders: any[]): GarnishmentOrderWithTimeline[] => {
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
