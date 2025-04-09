
import React from 'react';
import Layout from '@/components/Layout';
import { useGarnishment } from '@/context/GarnishmentContext';
import { GarnishmentTable } from '@/components/garnishment-table';
import GarnishmentCharts from '@/components/GarnishmentCharts';
import { useLocation } from 'react-router-dom';

const GarnishmentOrders = () => {
  const { orders } = useGarnishment();
  const location = useLocation();

  return (
    <Layout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-bank-dark">Garnishment Orders</h1>
          <p className="text-gray-600 mt-1">
            Manage and track garnishment court orders in the system
          </p>
        </div>
      </div>
      
      <GarnishmentCharts />
      
      <GarnishmentTable 
        orders={orders} 
        itemsPerPage={5}
        routeState={{ from: 'orders' }} 
      />
    </Layout>
  );
};

export default GarnishmentOrders;
