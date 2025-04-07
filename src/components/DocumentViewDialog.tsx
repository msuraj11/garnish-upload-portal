
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import PDFPreview from '@/components/PDFPreview';

interface DocumentViewDialogProps {
  pdfUrl: string;
  caseNumber: string;
  showDocument: boolean;
}

const DocumentViewDialog: React.FC<DocumentViewDialogProps> = ({
  pdfUrl,
  caseNumber,
  showDocument
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
