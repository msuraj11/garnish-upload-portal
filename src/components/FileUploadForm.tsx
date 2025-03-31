
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import FileUploader from './FileUploader';
import PDFPreview from './PDFPreview';
import LoadingIndicator from './LoadingIndicator';
import { validateFile } from '@/utils/fileValidation';

const FileUploadForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    
    if (file) {
      // Simulate processing time when a file is uploaded
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
    }
  };
  
  const handleSubmit = async () => {
    // Validate file before submission
    const validation = validateFile(selectedFile);
    if (!validation.isValid) {
      toast.error(validation.errorMessage || 'Please upload a valid PDF file');
      return;
    }
    
    // Simulate submission to backend
    setIsSubmitting(true);
    
    try {
      // For demo purposes, we're simulating an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the file to your backend, e.g:
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // await fetch('/api/garnishment/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      toast.success('Document successfully submitted for garnishment processing');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error submitting file:', error);
      toast.error('Failed to submit document. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-3xl shadow-md border-gray-200">
      <CardHeader className="bg-bank-dark text-white rounded-t-lg">
        <CardTitle className="text-xl">Garnishment Document Upload</CardTitle>
        <CardDescription className="text-gray-300">
          Upload court order documents for processing
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Upload Document</h3>
          <FileUploader 
            onFileSelect={handleFileSelect} 
            selectedFile={selectedFile} 
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Document Preview</h3>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {isProcessing ? (
              <div className="p-6">
                <LoadingIndicator text="Processing document..." />
              </div>
            ) : (
              <PDFPreview file={selectedFile} isLoading={isSubmitting} />
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-lg">
        <div className="flex justify-between items-center w-full">
          <p className="text-xs text-gray-500">
            Only PDF files under 10MB are accepted
          </p>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedFile || isSubmitting || isProcessing}
            className="bg-bank hover:bg-bank-dark"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Document'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FileUploadForm;
