
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
  courtOrderNumber?: string;
  courtAddress?: string;
  defendantAddress?: string;
  defendantId?: string;
  plaintiff?: string;
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

// Sample data with updated values and new fields
const initialOrders: GarnishmentOrderWithTimeline[] = [
  {
    id: "1",
    caseNumber: "GRN-2023-001",
    customerName: "Seidel Nohlmans AG GMBH",
    accountNumber: "DE41 3470 1991 0717 3190 00",
    dateReceived: new Date("2025-04-07T22:00:00.000Z"),
    dueDate: new Date("2025-05-07T22:00:00.000Z"),
    currentStage: "legal_team",
    amount: 32364,
    courtOrderNumber: "7113-581819/5",
    courtAddress: "Katharine-Kade-Platz 2, 31117 Biedenkopf",
    defendantAddress: "Fritschring 6/0, 56213 Wolmirstedt",
    defendantId: "HRB 91322",
    plaintiff: "Tlustek"
  },
  {
    id: "2",
    caseNumber: "GRN-2023-002",
    customerName: "Zimmer GMBH",
    accountNumber: "DE52 4576 7602 0512 3837 00",
    dateReceived: new Date("2025-04-21T22:00:00.000Z"),
    dueDate: new Date("2025-05-21T22:00:00.000Z"),
    currentStage: "case_management",
    amount: 90030,
    courtOrderNumber: "1869-564430/2",
    courtAddress: "Dariusz-Reichmann-Weg 3, 47299 Beeskow",
    defendantAddress: "Hilde-Atzler-Platz 14, 27793 Schlüchtern",
    defendantId: "HRB 39650",
    plaintiff: "Pieper Otto Stiftung & Co. KG"
  },
  {
    id: "3",
    caseNumber: "GRN-2023-003",
    customerName: "Kade Vogt KG GMBH",
    accountNumber: "DE42 6713 4194 0526 7828 00",
    dateReceived: new Date("2025-04-30T22:00:00.000Z"),
    dueDate: new Date("2025-05-30T22:00:00.000Z"),
    currentStage: "document_management",
    amount: 6549300,
    courtOrderNumber: "3856-803187/1",
    courtAddress: "Junckenallee 41, 93112 Uelzen",
    defendantAddress: "Julian-Ullmann-Straße 8, 88731 Forchheim",
    defendantId: "HRB 66780",
    plaintiff: "Stadelmann AG"
  },
  {
    id: "4",
    caseNumber: "GRN-2023-004",
    customerName: "Kade Vogt KG GMBH",
    accountNumber: "DE42 6713 4194 0526 7828 00",
    dateReceived: new Date("2025-04-30T22:00:00.000Z"),
    dueDate: new Date("2025-09-09T22:00:00.000Z"),
    currentStage: "legal_team",
    amount: 6549300,
    courtOrderNumber: "3856-803187/1",
    courtAddress: "Junckenallee 41, 93112 Uelzen",
    defendantAddress: "Julian-Ullmann-Straße 8, 88731 Forchheim",
    defendantId: "HRB 66780",
    plaintiff: "Stadelmann AG"
  },
  {
    id: "5",
    caseNumber: "GRN-2023-005",
    customerName: "Kade Vogt KG GMBH",
    accountNumber: "DE42 6713 4194 0526 7828 00",
    dateReceived: new Date("2025-04-30T22:00:00.000Z"),
    dueDate: new Date("2025-09-14T22:00:00.000Z"),
    currentStage: "compliance_team",
    amount: 6549300,
    courtOrderNumber: "3856-803187/1",
    courtAddress: "Junckenallee 41, 93112 Uelzen",
    defendantAddress: "Julian-Ullmann-Straße 8, 88731 Forchheim",
    defendantId: "HRB 66780",
    plaintiff: "Stadelmann AG"
  },
  {
    id: "6",
    caseNumber: "GRN-2023-006",
    customerName: "DAVID L. WILSON",
    accountNumber: "DE42 6713 4194 0526 7777 00",
    dateReceived: new Date("2025-04-30T22:00:00.000Z"),
    dueDate: new Date("2025-06-19T22:00:00.000Z"),
    currentStage: "case_management",
    amount: 6450,
    courtOrderNumber: "WG-2023-7890",
    courtAddress: "456 JUSTICE WAY ST. GEORGE, UT 84770",
    defendantAddress: "789 N PINE ST, ST. GEORGE, UT 84770",
    defendantId: "456-78-9123",
    plaintiff: "SUMMIT CREDIT SERVICES, LLC"
  },
  {
    id: "7",
    caseNumber: "GRN-2023-007",
    customerName: "JANE DOE ENTERPRISES, INC.",
    accountNumber: "DE42 6713 4009 0505 7828 00",
    dateReceived: new Date("2025-04-30T22:00:00.000Z"),
    dueDate: new Date("2025-07-30T22:00:00.000Z"),
    currentStage: "document_management",
    amount: 13200,
    courtOrderNumber: "SL-2022-4521",
    courtAddress: "123 MAIN ST, SALT LAKE CITY, UT 84101",
    defendantAddress: "500 W 100 N, SALT LAKE CITY, UT 84101",
    defendantId: "987-65-4321",
    plaintiff: "SMITH & ASSOCIATES LAW FIRM"
  },
  {
    id: "8",
    caseNumber: "GRN-2023-008",
    customerName: "Graf Linke e.V. GMBH",
    accountNumber: "DE56 4515 9294 0454 8165 00",
    dateReceived: new Date("2025-04-24T22:00:00.000Z"),
    dueDate: new Date("2025-10-04T22:00:00.000Z"),
    currentStage: "customer_management",
    amount: 90459,
    courtOrderNumber: "1605-370356/9",
    courtAddress: "Ljudmila-Söding-Straße 1/5 78801 Wiedenbrück",
    defendantAddress: "Hendriksring 7, 85397 Duderstadt",
    defendantId: "HRB 85037",
    plaintiff: "Säuberlich GmbH & Co. KG"
  },
  {
    id: "9",
    caseNumber: "GRN-2023-009",
    customerName: "Dörr GMBH",
    accountNumber: "DE24 3419 6512 0262 8349 00",
    dateReceived: new Date("2025-04-26T22:00:00.000Z"),
    dueDate: new Date("2025-08-09T22:00:00.000Z"),
    currentStage: "compliance_team",
    amount: 30773,
    courtOrderNumber: "2118-279396/4",
    courtAddress: "Elias-Cichorius-Straße 3/7 89632 Fulda",
    defendantAddress: "Kobeltstraße 5, 68909 Rochlitz",
    defendantId: "HRB 64593",
    plaintiff: "Bauer Stiftung & Co. KGaA"
  },
  {
    id: "10",
    caseNumber: "GRN-2023-010",
    customerName: "Oderwald GMBH",
    accountNumber: "DE2426 3004 8477 6371",
    dateReceived: new Date("2025-04-13T22:00:00.000Z"),
    dueDate: new Date("2025-06-14T22:00:00.000Z"),
    currentStage: "legal_team",
    amount: 45000,
    courtOrderNumber: "4873-481611/7",
    courtAddress: "Haufferring 32, 93780 Grafenau",
    defendantAddress: "Silva-Heser-Allee 3, 26502 Hechingen",
    defendantId: "HRB 36553",
    plaintiff: "Börner AG & Co. KGaA"
  },
  {
    id: "11",
    caseNumber: "GRN-2023-011",
    customerName: "BEISPIEL BAU GMBH",
    accountNumber: "DE89 3704 0044 0532 0130 00",
    dateReceived: new Date("2025-05-04T22:00:00.000Z"),
    dueDate: new Date("2025-06-19T22:00:00.000Z"),
    currentStage: "outbound_communication",
    amount: 17657,
    courtOrderNumber: "0123-4567/22",
    courtAddress: "Kolner Straße 10 60311 Frankfurt am Main",
    defendantAddress: "Beispielweg 45, 80331 München",
    defendantId: "HRB 12345",
    plaintiff: "ABC Company GMBH"
  },
  {
    id: "12",
    caseNumber: "GRN-2023-012",
    customerName: "Rust GMBH",
    accountNumber: "DE7765 8509 5522 7806",
    dateReceived: new Date("2025-04-15T22:00:00.000Z"),
    dueDate: new Date("2025-05-31T23:00:00.000Z"),
    currentStage: "case_management",
    amount: 17657,
    courtOrderNumber: "8233-795120/1",
    courtAddress: "Heinz-Wilhelm-Patberg-Gasse 1, 85017 Oranienburg",
    defendantAddress: "Heiner-Salz-Ring 308, 21045 Wiedenbrück",
    defendantId: "HRB 92237",
    plaintiff: "Binner GmbH & Co. KG"
  },
  {
    id: "13",
    caseNumber: "GRN-2023-013",
    customerName: "Rust GMBH",
    accountNumber: "DE7765 8509 5522 7806",
    dateReceived: new Date("2025-04-15T22:00:00.000Z"),
    dueDate: new Date("2025-11-04T23:00:00.000Z"),
    currentStage: "case_management",
    amount: 17657,
    courtOrderNumber: "8233-795120/1",
    courtAddress: "Heinz-Wilhelm-Patberg-Gasse 1, 85017 Oranienburg",
    defendantAddress: "Heiner-Salz-Ring 308, 21045 Wiedenbrück",
    defendantId: "HRB 92237",
    plaintiff: "Binner GmbH & Co. KG"
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

