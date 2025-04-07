
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Gavel } from 'lucide-react';
import PDFPreview from '@/components/PDFPreview';

interface DocumentViewDialogProps {
  pdfUrl: string;
  caseNumber: string;
  showDocument: boolean;
  courtOrderNumber?: string;
}

const DocumentViewDialog: React.FC<DocumentViewDialogProps> = ({
  pdfUrl,
  caseNumber,
  showDocument,
  courtOrderNumber
}) => {
  if (!showDocument) {
    return null;
  }

  return (
    <div className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-bank" />
            Garnishment Document
          </CardTitle>
          <CardDescription>
            Court order document for garnishment case {caseNumber}
            {courtOrderNumber && (
              <span className="flex items-center mt-1 text-xs">
                <Gavel className="h-3 w-3 mr-1" />
                Court Order: {courtOrderNumber}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="pdf-container">
          <PDFPreview pdfUrl={pdfUrl} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentViewDialog;
