
import React from 'react';
import Layout from '@/components/Layout';
import { useGarnishment } from '@/context/GarnishmentContext';
import GarnishmentTable from '@/components/GarnishmentTable';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const Index = () => {
  const { orders } = useGarnishment();

  return (
    <Layout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-bank-dark">Garnishment Orders</h1>
          <p className="text-gray-600 mt-1">
            Manage and track garnishment court orders in the system
          </p>
        </div>
        <Button asChild className="bg-bank hover:bg-bank-dark">
          <Link to="/add-garnishment" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Order
          </Link>
        </Button>
      </div>
      
      <GarnishmentTable orders={orders} />
    </Layout>
  );
};

export default Index;
