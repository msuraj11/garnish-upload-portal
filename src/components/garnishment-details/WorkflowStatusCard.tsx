
import React from 'react';
import GarnishmentWorkflowTracker from '@/components/GarnishmentWorkflowTracker';
import { WorkflowStage } from '@/components/GarnishmentWorkflowTracker';

interface WorkflowStatusCardProps {
  currentStage: WorkflowStage;
}

const WorkflowStatusCard: React.FC<WorkflowStatusCardProps> = ({ currentStage }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
      <GarnishmentWorkflowTracker currentStage={currentStage} />
    </div>
  );
};

export default WorkflowStatusCard;
