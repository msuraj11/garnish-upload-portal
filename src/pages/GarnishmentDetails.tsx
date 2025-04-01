
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import { useGarnishment } from '@/context/GarnishmentContext';
import GarnishmentWorkflowTracker, { WorkflowStage, workflowStages } from '@/components/GarnishmentWorkflowTracker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, FileText, User, CalendarCheck, Clock } from 'lucide-react';

const GarnishmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById, updateOrderStage } = useGarnishment();
  
  const order = getOrderById(id || '');
  
  if (!order) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">The garnishment order you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} className="bg-bank">
            Back to Orders
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleMoveToNextStage = () => {
    const currentIndex = workflowStages.findIndex(stage => stage.id === order.currentStage);
    
    if (currentIndex < workflowStages.length - 1) {
      const nextStage = workflowStages[currentIndex + 1].id;
      updateOrderStage(order.id, nextStage);
      toast.success(`Order moved to ${workflowStages[currentIndex + 1].label} stage`);
    }
  };
  
  const isLastStage = order.currentStage === 'outbound_communication';
  
  return (
    <Layout>
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-bank-dark">
              Garnishment Order: {order.caseNumber}
            </h1>
            <p className="text-gray-600 mt-1">
              Details and workflow status for this garnishment order
            </p>
          </div>
          
          {!isLastStage && (
            <Button 
              onClick={handleMoveToNextStage} 
              className="mt-4 md:mt-0 bg-bank hover:bg-bank-dark"
            >
              Advance to Next Stage
            </Button>
          )}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <GarnishmentWorkflowTracker currentStage={order.currentStage} />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-bank" />
              Order Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Case Number</p>
                <p className="font-medium">{order.caseNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">${order.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date Received</p>
                <p className="font-medium">{format(new Date(order.dateReceived), 'MMM d, yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Stage</p>
                <p className="font-medium">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.currentStage === 'outbound_communication' ? 'bg-green-100 text-green-800' :
                    order.currentStage === 'document_management' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {workflowStages.find(stage => stage.id === order.currentStage)?.label}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-bank" />
              Customer Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Customer Name</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Number</p>
                <p className="font-medium">{order.accountNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-bank" />
              Processing Timeline
            </CardTitle>
            <CardDescription>
              Recent activity and timeline for this garnishment order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-bank flex items-center justify-center text-white">
                    <CalendarCheck className="h-5 w-5" />
                  </div>
                  <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                </div>
                <div className="pb-6">
                  <p className="text-sm font-medium">Order Received</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(order.dateReceived), 'MMM d, yyyy h:mm a')}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Garnishment order processed by document management team
                  </p>
                </div>
              </div>
              
              {/* This would ideally be populated with real activity data */}
              <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <User className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Current Stage: {workflowStages.find(stage => stage.id === order.currentStage)?.label}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(), 'MMM d, yyyy')}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Order is currently being processed in this stage
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <p className="text-xs text-gray-500">
              For any updates or questions, please contact the garnishment processing team
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default GarnishmentDetails;
