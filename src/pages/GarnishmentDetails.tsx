import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useGarnishment } from '@/context/GarnishmentContext';
import GarnishmentWorkflowTracker, { WorkflowStage, workflowStages } from '@/components/GarnishmentWorkflowTracker';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, FileIcon } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';

// Import our component modules
import GarnishmentOrderInfo from '@/components/GarnishmentOrderInfo';
import CustomerDetails from '@/components/CustomerDetails';
import GarnishmentTimeline from '@/components/GarnishmentTimeline';
import WorkflowAdvancementDialog from '@/components/WorkflowAdvancementDialog';
import DocumentViewDialog from '@/components/DocumentViewDialog';

const GarnishmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById, updateOrderStage, getSamplePdfUrl, addTimelineEvent } = useGarnishment();
  const [showDocument, setShowDocument] = useState(false);
  const [isStageDialogOpen, setIsStageDialogOpen] = useState(false);
  const [comments, setComments] = useState('');
  const [selectedNextStage, setSelectedNextStage] = useState<WorkflowStage | null>(null);
  
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
  
  const isCaseManagementStage = order.currentStage === 'case_management';
  const isDecisionStage = ['legal_team', 'compliance_team', 'customer_management'].includes(order.currentStage);
  const isLastStage = order.currentStage === 'outbound_communication';
  const isFirstStage = order.currentStage === 'document_management';
  const pdfFileNameString = `${order?.courtOrderNumber?.split('/').join(':')}-${order?.id}`;
  
  const getButtonLabel = () => {
    if (isCaseManagementStage) {
      return "Advance to Next Stage";
    } else if (isDecisionStage) {
      return "Submit a Decision";
    } else {
      return "Advance to Next Stage";
    }
  };
  
  const handleOpenStageDialog = () => {
    setComments('');
    setSelectedNextStage(null);
    setIsStageDialogOpen(true);
  };
  
  const handleApproveStage = () => {
    if (isCaseManagementStage && selectedNextStage) {
      updateOrderStage(order.id, selectedNextStage);
      
      addTimelineEvent({
        orderId: order.id,
        type: 'stage_change',
        title: 'Stage Directed',
        description: `Directed to ${workflowStages.find(stage => stage.id === selectedNextStage)?.label}. ${comments}`,
        status: 'approved',
        timestamp: new Date()
      });
      
      toast.success(`Order moved to ${workflowStages.find(stage => stage.id === selectedNextStage)?.label} stage`);
    } 
    else {
      const currentIndex = workflowStages.findIndex(stage => stage.id === order.currentStage);
      
      if (currentIndex < workflowStages.length - 1) {
        const nextStage = workflowStages[currentIndex + 1].id;
        updateOrderStage(order.id, nextStage);
        
        const commentText = comments.trim() 
          ? comments 
          : `Approved and advanced to ${workflowStages[currentIndex + 1].label}`;
        
        addTimelineEvent({
          orderId: order.id,
          type: 'stage_change',
          title: 'Stage Advanced',
          description: commentText,
          status: 'approved',
          timestamp: new Date()
        });
        
        toast.success(`Order moved to ${workflowStages[currentIndex + 1].label} stage`);
      }
    }
    
    setComments('');
    setSelectedNextStage(null);
    setIsStageDialogOpen(false);
    setTimeout(() => {navigate(-1)}, 1000);
  };
  
  const handleRejectStage = () => {
    const currentIndex = workflowStages.findIndex(stage => stage.id === order.currentStage);
    
    if (currentIndex > 0) {
      const prevStage = workflowStages[currentIndex - 1].id;
      updateOrderStage(order.id, prevStage);
      
      const commentText = comments.trim() 
        ? comments 
        : `Rejected and moved back to ${workflowStages[currentIndex - 1].label}`;
      
      addTimelineEvent({
        orderId: order.id,
        type: 'stage_change',
        title: 'Stage Rejected',
        description: commentText,
        status: 'rejected',
        timestamp: new Date()
      });
      
      toast.error(`Order moved back to ${workflowStages[currentIndex - 1].label} stage`);
    } else {
      addTimelineEvent({
        orderId: order.id,
        type: 'stage_change',
        title: 'Stage Rejected',
        description: comments.trim() ? comments : 'Rejected but kept at initial stage',
        status: 'rejected',
        timestamp: new Date()
      });
      
      toast.error('Already at first stage, rejection noted but stage not changed');
    }
    
    setComments('');
    setIsStageDialogOpen(false);
    setTimeout(() => {navigate(-1)}, 1000);
  };

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
            {order.plaintiff && (
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">Plaintiff:</span> {order.plaintiff}
              </p>
            )}
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
                onClick={handleOpenStageDialog} 
                className="bg-bank hover:bg-bank-dark"
              >
                {getButtonLabel()}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <GarnishmentWorkflowTracker currentStage={order.currentStage} />
      </div>
      
      <DocumentViewDialog 
        pdfUrl={getSamplePdfUrl(pdfFileNameString)} 
        caseNumber={order.caseNumber}
        courtOrderNumber={order.courtOrderNumber}
        showDocument={showDocument}
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <GarnishmentOrderInfo order={order} formatDate={formatDate} />
        <CustomerDetails order={order} />
        <GarnishmentTimeline order={order} formatDate={formatDate} />
      </div>
      
      <WorkflowAdvancementDialog
        isOpen={isStageDialogOpen}
        onOpenChange={setIsStageDialogOpen}
        onApprove={handleApproveStage}
        onReject={handleRejectStage}
        comments={comments}
        setComments={setComments}
        currentStage={order.currentStage}
        selectedNextStage={selectedNextStage}
        setSelectedNextStage={setSelectedNextStage}
        isFirstStage={isFirstStage}
        isLastStage={isLastStage}
      />
    </Layout>
  );
};

export default GarnishmentDetails;
