
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { WorkflowStage, workflowStages } from '@/components/GarnishmentWorkflowTracker';

interface WorkflowAdvancementDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: () => void;
  onReject: () => void;
  comments: string;
  setComments: (comments: string) => void;
  currentStage: WorkflowStage;
  selectedNextStage: WorkflowStage | null;
  setSelectedNextStage: (stage: WorkflowStage | null) => void;
  isFirstStage: boolean;
  isLastStage: boolean;
}

const WorkflowAdvancementDialog: React.FC<WorkflowAdvancementDialogProps> = ({
  isOpen,
  onOpenChange,
  onApprove,
  onReject,
  comments,
  setComments,
  currentStage,
  selectedNextStage,
  setSelectedNextStage,
  isFirstStage,
  isLastStage
}) => {
  const isCaseManagementStage = currentStage === 'case_management';
  
  // Define the possible next stages for case management
  const nextStageOptions = [
    { id: 'legal_team', label: 'Legal Team' },
    { id: 'compliance_team', label: 'Compliance Team' },
    { id: 'customer_management', label: 'Customer Management' }
  ];
  
  // Check if the action can be submitted
  const canSubmitAction = () => {
    if (isCaseManagementStage) {
      return selectedNextStage !== null && comments.trim().length > 0;
    } else {
      return comments.trim().length > 0;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isCaseManagementStage 
              ? "Select Next Processing Team" 
              : "Advance Workflow Stage"}
          </DialogTitle>
          <DialogDescription>
            {isCaseManagementStage 
              ? "Choose one option to direct this order to the appropriate team." 
              : "Add comments before advancing or rejecting this stage. Your comments will be recorded in the timeline."}
          </DialogDescription>
        </DialogHeader>
        
        {isCaseManagementStage && (
          <div className="py-4">
            <RadioGroup value={selectedNextStage || ""} onValueChange={(value) => setSelectedNextStage(value as WorkflowStage)} className="flex gap-4">
              {nextStageOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex-1 flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedNextStage === option.id
                      ? 'border-bank bg-bank-gray text-bank-dark'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <RadioGroupItem value={option.id} id={option.id} className="mr-2" />
                  <span className="font-medium">{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        )}
        
        <div className="py-4">
          <Textarea
            placeholder="Add your comments here..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0">
          {!isCaseManagementStage && (
            <Button 
              variant="outline" 
              onClick={onReject}
              className="flex items-center"
              disabled={isFirstStage || !comments.trim()}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject {isFirstStage && "(Already at first stage)"}
            </Button>
          )}
          <Button 
            onClick={onApprove} 
            className="bg-bank hover:bg-bank-dark flex items-center"
            disabled={!canSubmitAction() || isLastStage}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {isCaseManagementStage ? "Submit" : "Approve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowAdvancementDialog;
