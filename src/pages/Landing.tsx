
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { FileText, User, Shield, Scale, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

// Team options for the navigation
const teamOptions: { label: string; value: string; icon: React.ElementType }[] = [
  { label: 'Garnishment Manager', value: 'orders', icon: FileText },
  { label: 'Garnishment Case User', value: 'case_management', icon: User },
  { label: 'Legal User', value: 'legal_team', icon: Scale },
  { label: 'Compliance User', value: 'compliance_team', icon: Shield },
  { label: 'CRM User', value: 'customer_management', icon: MessageSquare }
];

const Landing = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOption) return;
    
    if (selectedOption === 'orders') {
      navigate('/garnishment-orders');
    } else {
      navigate(`/team/${selectedOption}`);
    }
  };

  return (
    <div className="min-h-screen bg-bank-dark flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Logo and Name */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 text-white">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-auto mb-6"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <h1 className="text-4xl md:text-6xl font-bold text-center">Portal</h1>
          </motion.div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-bank-dark mb-6">Select Portal Area</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} className="space-y-4">
                {teamOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedOption === option.value
                        ? 'border-bank bg-bank-gray text-bank-dark'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <div className="flex items-center space-x-3 flex-1">
                      <option.icon className="h-5 w-5 text-bank" />
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </label>
                ))}
              </RadioGroup>
              
              <Button 
                type="submit" 
                disabled={!selectedOption}
                className="w-full bg-bank hover:bg-bank-dark transition-colors"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-bank-dark border-t border-bank-light/20 py-4">
        <div className="container mx-auto px-6">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Banking Document Portal | Internal Use Only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
