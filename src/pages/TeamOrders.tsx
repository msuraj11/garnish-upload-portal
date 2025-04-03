
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useGarnishment } from '@/context/GarnishmentContext';
import GarnishmentTable from '@/components/GarnishmentTable';
import { Button } from '@/components/ui/button';
import { workflowStages, WorkflowStage } from '@/components/GarnishmentWorkflowTracker';

const TeamOrders = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { getOrdersByStage } = useGarnishment();
  
  // Type assertion with validation
  const isValidTeam = (id: string): id is WorkflowStage => {
    return workflowStages.some(stage => stage.id === id);
  };

  if (!teamId || !isValidTeam(teamId)) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Team Not Found</h1>
          <p className="text-gray-600 mb-6">The team you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} className="bg-bank">
            Back to Orders
          </Button>
        </div>
      </Layout>
    );
  }
  
  const orders = getOrdersByStage(teamId);
  const team = workflowStages.find(stage => stage.id === teamId);

  return (
    <Layout>
      <div className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-bank-dark">
            {team?.label} Orders
          </h1>
          <p className="text-gray-600 mt-1">
            Showing garnishment orders currently assigned to this team
          </p>
        </div>
      </div>
      
      <GarnishmentTable orders={orders} itemsPerPage={5} />
    </Layout>
  );
};

export default TeamOrders;
