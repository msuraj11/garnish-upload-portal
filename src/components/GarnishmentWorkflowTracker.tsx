
import React from 'react';
import { Check, File, User, Shield, MessageSquare, Mail, CalendarCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export type WorkflowStage = 
  | 'document_management' 
  | 'case_management_l1' 
  | 'case_management_l2' 
  | 'legal_team' 
  | 'compliance_team' 
  | 'customer_management' 
  | 'outbound_communication';

export interface WorkflowStageInfo {
  id: WorkflowStage;
  label: string;
  icon: React.FC<{ className?: string }>;
}

export const workflowStages: WorkflowStageInfo[] = [
  {
    id: 'document_management',
    label: 'Inbound Document Management',
    icon: File
  },
  {
    id: 'case_management_l1',
    label: 'Garnishment Case Management L1',
    icon: User
  },
  {
    id: 'case_management_l2',
    label: 'Garnishment Case Management L2',
    icon: CalendarCheck
  },
  {
    id: 'legal_team',
    label: 'Bank Legal Team',
    icon: Shield
  },
  {
    id: 'compliance_team',
    label: 'Bank Compliance Team',
    icon: Shield
  },
  {
    id: 'customer_management',
    label: 'Customer Management',
    icon: MessageSquare
  },
  {
    id: 'outbound_communication',
    label: 'Outbound Communication',
    icon: Mail
  }
];

interface GarnishmentWorkflowTrackerProps {
  currentStage: WorkflowStage;
}

const GarnishmentWorkflowTracker: React.FC<GarnishmentWorkflowTrackerProps> = ({ currentStage }) => {
  // Calculate progress percentage
  const currentStageIndex = workflowStages.findIndex(stage => stage.id === currentStage);
  const progressPercentage = currentStageIndex >= 0 
    ? Math.round((currentStageIndex / (workflowStages.length - 1)) * 100) 
    : 0;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-bank-dark">Garnishment Workflow Progress</h3>
        <span className="text-xs text-gray-500">{progressPercentage}% Complete</span>
      </div>
      
      <Progress value={progressPercentage} className="h-2 mb-6" />
      
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-7 left-0 right-0 h-0.5 bg-gray-200" aria-hidden="true"></div>
        
        {/* Workflow Stages */}
        <div className="relative flex justify-between">
          {workflowStages.map((stage, index) => {
            const StageIcon = stage.icon;
            const isCompleted = currentStageIndex > index;
            const isCurrent = currentStageIndex === index;
            const isPending = currentStageIndex < index;
            
            return (
              <div key={stage.id} className="flex flex-col items-center space-y-2 z-10">
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-100 text-green-600 border-2 border-green-500' :
                    isCurrent ? 'bg-bank text-white' :
                    'bg-gray-100 text-gray-400 border border-gray-300'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <StageIcon className="w-6 h-6" />
                  )}
                </div>
                <span className={`text-xs text-center max-w-[85px] ${
                  isCompleted ? 'text-green-600 font-medium' :
                  isCurrent ? 'text-bank font-medium' :
                  'text-gray-500'
                }`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GarnishmentWorkflowTracker;
