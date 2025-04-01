
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlusCircle, FileText, User, Shield, Scale, MessageSquare } from 'lucide-react';
import { WorkflowStage } from './GarnishmentWorkflowTracker';

// Team options for the navigation
const teamOptions: { label: string; value: WorkflowStage; icon: React.ElementType }[] = [
  { label: 'Garnishment Case Management', value: 'case_management', icon: User },
  { label: 'Legal Team', value: 'legal_team', icon: Scale },
  { label: 'Compliance Team', value: 'compliance_team', icon: Shield },
  { label: 'Customer Management', value: 'customer_management', icon: MessageSquare }
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
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
              <Link to="/" className="text-xl font-bold">Bank Portal</Link>
            </div>
            <div className="text-sm">
              <span className="opacity-75">Garnishment Processing</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex -mb-px">
            <Link 
              to="/"
              className={`py-4 px-6 font-medium flex items-center space-x-2 border-b-2 ${
                location.pathname === '/' 
                  ? 'border-bank text-bank' 
                  : 'border-transparent text-gray-500 hover:text-bank hover:border-bank-light'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Garnishment Orders</span>
            </Link>
            
            {/* Teams navigation links */}
            {teamOptions.map((team) => (
              <Link
                key={team.value}
                to={`/team/${team.value}`}
                className={`py-4 px-6 font-medium flex items-center space-x-2 border-b-2 ${
                  location.pathname === `/team/${team.value}`
                    ? 'border-bank text-bank'
                    : 'border-transparent text-gray-500 hover:text-bank hover:border-bank-light'
                }`}
              >
                <team.icon className="h-4 w-4" />
                <span>{team.label}</span>
              </Link>
            ))}
            
            <Link 
              to="/add-garnishment"
              className={`py-4 px-6 font-medium flex items-center space-x-2 border-b-2 ${
                location.pathname === '/add-garnishment' 
                  ? 'border-bank text-bank' 
                  : 'border-transparent text-gray-500 hover:text-bank hover:border-bank-light'
              }`}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add New Order</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto py-8 px-4">
        {children}
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

export default Layout;
