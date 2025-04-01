
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GarnishmentOrder } from '@/components/GarnishmentTable';
import { WorkflowStage } from '@/components/GarnishmentWorkflowTracker';

interface GarnishmentContextType {
  orders: GarnishmentOrder[];
  addOrder: (order: Omit<GarnishmentOrder, 'id' | 'dateReceived' | 'currentStage'>) => GarnishmentOrder;
  getOrderById: (id: string) => GarnishmentOrder | undefined;
  updateOrderStage: (id: string, newStage: WorkflowStage) => void;
}

const GarnishmentContext = createContext<GarnishmentContextType | undefined>(undefined);

// Sample data
const initialOrders: GarnishmentOrder[] = [
  {
    id: '1',
    caseNumber: 'GRN-2023-001',
    customerName: 'John Smith',
    accountNumber: '12345678',
    dateReceived: new Date(2023, 5, 15),
    currentStage: 'legal_team',
    amount: 5000
  },
  {
    id: '2',
    caseNumber: 'GRN-2023-002',
    customerName: 'Lisa Johnson',
    accountNumber: '87654321',
    dateReceived: new Date(2023, 6, 22),
    currentStage: 'case_management_l1',
    amount: 3200
  },
  {
    id: '3',
    caseNumber: 'GRN-2023-003',
    customerName: 'Michael Davis',
    accountNumber: '45678912',
    dateReceived: new Date(2023, 7, 5),
    currentStage: 'document_management',
    amount: 7500
  }
];

export const GarnishmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<GarnishmentOrder[]>(() => {
    // Try to load from localStorage
    const savedOrders = localStorage.getItem('garnishmentOrders');
    return savedOrders ? JSON.parse(savedOrders) : initialOrders;
  });

  // Save to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('garnishmentOrders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrderData: Omit<GarnishmentOrder, 'id' | 'dateReceived' | 'currentStage'>) => {
    const newOrder: GarnishmentOrder = {
      ...newOrderData,
      id: `${orders.length + 1}`,
      dateReceived: new Date(),
      currentStage: 'document_management'
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

  return (
    <GarnishmentContext.Provider value={{ orders, addOrder, getOrderById, updateOrderStage }}>
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
