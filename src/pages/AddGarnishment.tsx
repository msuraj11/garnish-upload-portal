
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import FileUploadForm from '@/components/FileUploadForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGarnishment } from '@/context/GarnishmentContext';
import { toast } from '@/components/ui/sonner';

const AddGarnishment = () => {
  const navigate = useNavigate();
  const { addOrder } = useGarnishment();
  const [customerName, setCustomerName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!customerName || !accountNumber || !caseNumber || !amount) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert amount to number
      const amountValue = parseFloat(amount);
      
      // Add new order
      const newOrder = addOrder({
        customerName,
        accountNumber,
        caseNumber,
        amount: amountValue
      });
      
      toast.success('Garnishment order added successfully');
      
      // Navigate to the details page of the new order
      navigate(`/garnishment/${newOrder.id}`);
    } catch (error) {
      console.error('Error adding order:', error);
      toast.error('Failed to add order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bank-dark">Add New Garnishment Order</h1>
        <p className="text-gray-600 mt-1">
          Upload and process a new garnishment court order
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium text-bank-dark mb-4">Order Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="caseNumber">Case Number</Label>
              <Input 
                id="caseNumber" 
                placeholder="e.g. GRN-2025-004" 
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input 
                id="customerName" 
                placeholder="Full name of the customer" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input 
                id="accountNumber" 
                placeholder="Customer's account number" 
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Garnishment Amount ($)</Label>
              <Input 
                id="amount" 
                type="number" 
                placeholder="Amount in USD" 
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-bank hover:bg-bank-dark mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Garnishment Order'}
            </Button>
          </form>
        </div>
        
        <div>
          <FileUploadForm />
        </div>
      </div>
    </Layout>
  );
};

export default AddGarnishment;
