
import React from 'react';
import FileUploadForm from '@/components/FileUploadForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-bank-dark text-white shadow-md">
        <div className="container mx-auto py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span className="text-xl font-bold">Bank Portal</span>
            </div>
            <div className="text-sm">
              <span className="opacity-75">Garnishment Processing</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-bank-dark">Document Upload</h1>
          <p className="text-gray-600 mt-1">
            Upload PDF documents for garnishment court orders to be processed by the system.
          </p>
        </div>
        
        <div className="flex justify-center w-full">
          <FileUploadForm />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-6">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} Banking Document Portal | Internal Use Only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
