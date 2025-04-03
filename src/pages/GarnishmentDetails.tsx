import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import Layout from '@/components/Layout';
import { useGarnishment } from '@/context/GarnishmentContext';
import GarnishmentWorkflowTracker, { WorkflowStage, workflowStages } from '@/components/GarnishmentWorkflowTracker';
import GarnishmentCharts from '@/components/GarnishmentCharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, FileText, User, CalendarCheck, Clock, FileIcon } from 'lucide-react';
import PDFPreview from '@/components/PDFPreview';

const formatDate = (date: Date | string, formatString = 'MMM d, yyyy') => {
  try {
    if (date instanceof Date) {
      return format(date, formatString);
    }
    else if (typeof date === 'string') {
      return format(parseISO(date), formatString);
    }
    return 'Invalid date';
  } catch (error) {
    console.error('Error formatting date:', date, error);
    return 'Invalid date';
  }
};

const GarnishmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById, updateOrderStage, getSamplePdfUrl } = useGarnishment();
  const [showDocument, setShowDocument] = useState(false);
  
  const order = getOrderById(id || '');
  
  if (!order) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">The garnishment order you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} className="bg-bank">
            Back to Home
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

  const handleShowDocument = () => {
    setShowDocument(true);
  };
  
  return (
    <Layout>
      <div className="mb-6">
        
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-bank-dark">
              Garnishment Order: {order.caseNumber}
            </h1>
            <p className="text-gray-600 mt-1">
              Details and workflow status for this garnishment order
            </p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button 
              onClick={handleShowDocument} 
              variant="outline"
              className="flex items-center"
            >
              <FileIcon className="h-4 w-4 mr-2" />
              Show Document
            </Button>
            
            {!isLastStage && (
              <Button 
                onClick={handleMoveToNextStage} 
                className="bg-bank hover:bg-bank-dark"
              >
                Advance to Next Stage
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <GarnishmentWorkflowTracker currentStage={order.currentStage} />
      </div>
      
      <GarnishmentCharts />
      
      {showDocument && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-bank" />
                Garnishment Document
              </CardTitle>
              <CardDescription>
                Court order document for garnishment case {order.caseNumber}
              </CardDescription>
            </CardHeader>
            <CardContent className="pdf-container">
              <PDFPreview pdfUrl={getSamplePdfUrl()} />
            </CardContent>
          </Card>
        </div>
      )}
      
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
                <p className="font-medium">{order.amount.toLocaleString('de-DE')} €</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date Received</p>
                <p className="font-medium">{formatDate(order.dateReceived)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="font-medium">{formatDate(order.dueDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Stage</p>
                <p className="font-medium">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.currentStage === 'outbound_communication' ? 'bg-green-100 text-green-800' :
                    order.currentStage === 'document_management' ? 'bg-blue-100 text-blue-800' :
                    order.currentStage === 'legal_team' ? 'bg-purple-100 text-purple-800' :
                    order.currentStage === 'compliance_team' ? 'bg-yellow-100 text-yellow-800' :
                    order.currentStage === 'case_management' ? 'bg-indigo-100 text-indigo-800' :
                    order.currentStage === 'customer_management' ? 'bg-orange-100 text-orange-800' :
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
                    {formatDate(order.dateReceived, 'MMM d, yyyy h:mm a')}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Garnishment order processed by document management team
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <User className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Current Stage: {workflowStages.find(stage => stage.id === order.currentStage)?.label}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(new Date(), 'MMM d, yyyy')}
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
