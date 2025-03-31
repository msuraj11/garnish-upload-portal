
import React from 'react';

interface LoadingIndicatorProps {
  text?: string;
}

const LoadingIndicator = ({ text = 'Processing document...' }: LoadingIndicatorProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-6">
      <div className="relative w-full max-w-md">
        {/* Background lines to simulate paper */}
        <div className="space-y-3 w-full">
          {[...Array(5)].map((_, index) => (
            <div 
              key={index}
              className="h-2 bg-gray-100 rounded animate-pulse-opacity"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
        
        {/* Writing animation */}
        <div className="absolute inset-0 flex flex-col justify-around">
          {[...Array(3)].map((_, index) => (
            <div 
              key={index}
              className="h-1.5 bg-bank-light rounded-full animate-writing"
              style={{ animationDelay: `${index * 0.5}s` }}
            />
          ))}
        </div>
      </div>
      
      <p className="mt-4 text-sm text-bank-dark">{text}</p>
    </div>
  );
};

export default LoadingIndicator;
