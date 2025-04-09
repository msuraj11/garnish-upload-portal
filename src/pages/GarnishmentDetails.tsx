
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/dateUtils';
import { useGarnishmentDetails } from '@/hooks/useGarnishmentDetails';

// Import our component modules
import DetailPageHeader from '@/components/garnishment-details/DetailPageHeader';
import WorkflowStatusCard from '@/components/garnishment-details/WorkflowStatusCard';
import GarnishmentDetailsContent from '@/components/garnishment-details/GarnishmentDetailsContent';
import WorkflowAdvancementDialog from '@/components/WorkflowAdvancementDialog';
import DocumentViewDialog from '@/components/DocumentViewDialog';

const GarnishmentDetails = () => {
  const navigate = useNavigate();
  const {
    order,
    showDocument,
    setShowDocument,
    isStageDialogOpen,
    setIsStageDialogOpen,
    comments,
    setComments,
    selectedNextStage,
    setSelectedNextStage,
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
    orderNotFound
  } = useGarnishmentDetails();
  
  if (orderNotFound) {
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
  
  return (
    <Layout>
      <DetailPageHeader 
        order={order}
        isLastStage={isLastStage}
        isButtonDisabled={isButtonDisabled}
        handleOpenStageDialog={handleOpenStageDialog}
        handleShowDocument={handleShowDocument}
        getButtonLabel={getButtonLabel}
      />
      
      <WorkflowStatusCard currentStage={order.currentStage} />
      
      <DocumentViewDialog 
        pdfUrl={getSamplePdfUrl(pdfFileNameString)} 
        caseNumber={order.caseNumber}
        courtOrderNumber={order.courtOrderNumber}
        showDocument={showDocument}
      />
      
      <GarnishmentDetailsContent order={order} formatDate={formatDate} />
      
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
