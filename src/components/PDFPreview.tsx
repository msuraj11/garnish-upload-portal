
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingIndicator from './LoadingIndicator';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFPreviewProps {
  file?: File | null;
  pdfUrl?: string;
  isLoading?: boolean;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ file, pdfUrl, isLoading = false }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      // Clean up previous URL object to avoid memory leaks
      if (fileUrl && !fileUrl.startsWith('http') && !fileUrl.startsWith('/')) {
        URL.revokeObjectURL(fileUrl);
      }
      
      setFileUrl(URL.createObjectURL(file));
      setPageNumber(1); // Reset to first page when changing files
      setError(null);
    } else if (pdfUrl) {
      setFileUrl(pdfUrl);
      setPageNumber(1);
      setError(null);
    }
    
    // Cleanup on component unmount
    return () => {
      if (fileUrl && !fileUrl.startsWith('http') && !fileUrl.startsWith('/')) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [file, pdfUrl]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setError('Error loading PDF. Please check that the file is not corrupted.');
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    if (numPages) {
      setPageNumber(prev => Math.min(prev + 1, numPages));
    }
  };

  if (isLoading) {
    return (
      <div className="pdf-page">
        <LoadingIndicator text="Loading document..." />
      </div>
    );
  }

  if (!fileUrl) {
    return (
      <div className="pdf-page bg-bank-gray">
        <p className="text-bank-dark text-opacity-60">
          No document available. Please upload a PDF file.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pdf-page bg-red-50">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="pdf-container">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<LoadingIndicator text="Loading PDF..." />}
        className="mx-auto"
      >
        <Page 
          pageNumber={pageNumber} 
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="pdf-page"
        />
      </Document>
      
      {numPages && numPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <Button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <p className="text-sm text-bank-dark">
            Page {pageNumber} of {numPages}
          </p>
          
          <Button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PDFPreview;
