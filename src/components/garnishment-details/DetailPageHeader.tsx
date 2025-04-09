
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileIcon } from 'lucide-react';
import { GarnishmentOrderWithTimeline } from '@/types/garnishment';

interface DetailPageHeaderProps {
  order: GarnishmentOrderWithTimeline;
  isLastStage: boolean;
  isButtonDisabled: boolean;
  handleOpenStageDialog: () => void;
  handleShowDocument: () => void;
  getButtonLabel: () => string;
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = ({
  order,
  isLastStage,
  isButtonDisabled,
  handleOpenStageDialog,
  handleShowDocument,
  getButtonLabel
}) => {
  const navigate = useNavigate();

  return (
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
              disabled={isButtonDisabled}
            >
              {getButtonLabel()}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPageHeader;
