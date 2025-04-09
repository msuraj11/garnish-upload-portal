
import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useGarnishment } from '@/context/GarnishmentContext';
import { toast } from '@/components/ui/sonner';
import { WorkflowStage, workflowStages } from '@/components/GarnishmentWorkflowTracker';

export const useGarnishmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getOrderById, updateOrderStage, getSamplePdfUrl, addTimelineEvent } = useGarnishment();
  const [showDocument, setShowDocument] = useState(false);
  const [isStageDialogOpen, setIsStageDialogOpen] = useState(false);
  const [comments, setComments] = useState('');
  const [selectedNextStage, setSelectedNextStage] = useState<WorkflowStage | null>(null);
  
  // Check if user is coming from Garnishment Manager role
  const isFromGarnishmentManager = location.pathname.includes('/garnishment/') && 
    (location.state?.from === 'garnishment-orders' || 
     location.pathname === '/garnishment-orders');
  
  const order = getOrderById(id || '');
  
  if (!order) {
    return { orderNotFound: true, navigate };
  }
  
  const isCaseManagementStage = order.currentStage === 'case_management';
  const isDecisionStage = ['legal_team', 'compliance_team', 'customer_management'].includes(order.currentStage);
  const isLastStage = order.currentStage === 'outbound_communication';
  const isFirstStage = order.currentStage === 'document_management';
  const pdfFileNameString = `${order?.courtOrderNumber?.split('/').join(':')}-${order?.id}`;
  
  // Determine if button should be disabled
  const isButtonDisabled = isFromGarnishmentManager && isDecisionStage;
  
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
  
  const handleShowDocument = () => {
    setShowDocument(true);
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

  return {
    order,
    showDocument,
    setShowDocument,
    isStageDialogOpen,
    setIsStageDialogOpen,
    comments,
    setComments,
    selectedNextStage,
    setSelectedNextStage,
    isCaseManagementStage,
    isDecisionStage,
    isLastStage,
    isFirstStage,
    pdfFileNameString,
    isButtonDisabled,
    getButtonLabel,
    handleOpenStageDialog,
    handleShowDocument,
    handleApproveStage,
    handleRejectStage,
    getSamplePdfUrl,
    orderNotFound: false
  };
};
