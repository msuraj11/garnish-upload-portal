
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { File, X, FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { validateFile } from '@/utils/fileValidation';
import { toast } from '@/components/ui/sonner';

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, selectedFile }) => {
  const [fileError, setFileError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const validation = validateFile(file);
      
      if (!validation.isValid) {
        setFileError(validation.errorMessage);
        toast.error(validation.errorMessage || 'Invalid file');
        return;
      }
      
      setFileError(null);
      onFileSelect(file);
      toast.success('File uploaded successfully');
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    multiple: false
  });

  const removeFile = () => {
    onFileSelect(null);
    setFileError(null);
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:bg-bank-gray ${
            isDragActive ? 'border-bank-accent bg-bank-gray' : 'border-gray-300'
          } ${fileError ? 'border-red-400 bg-red-50' : ''}`}
        >
          <input {...getInputProps()} />
          <File 
            className={`mx-auto h-12 w-12 mb-3 ${
              isDragActive ? 'text-bank-accent' : 'text-bank-light'
            } ${fileError ? 'text-red-500' : ''}`} 
          />
          
          <p className="text-bank-dark font-medium mb-1">
            {isDragActive 
              ? 'Drop the PDF file here' 
              : 'Drag and drop your PDF file here'}
          </p>
          <p className="text-sm text-gray-500 mb-3">
            or click to browse your files
          </p>
          
          <Button 
            variant="outline" 
            className="bg-white hover:bg-gray-50 border-bank-light text-bank-dark"
            onClick={(e) => e.stopPropagation()}
          >
            Select PDF File
          </Button>
          
          {fileError && (
            <p className="mt-3 text-sm text-red-600">{fileError}</p>
          )}
        </div>
      ) : (
        <div className="p-4 bg-bank-gray bg-opacity-50 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-bank-light bg-opacity-10 rounded">
              <FileIcon className="h-6 w-6 text-bank" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-bank-dark truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-500 hover:text-red-500 hover:bg-red-50"
              onClick={removeFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
