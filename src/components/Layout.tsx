
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, User, Shield, Scale, MessageSquare } from 'lucide-react';
import { WorkflowStage } from './GarnishmentWorkflowTracker';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

// Team options for the navigation
const teamOptions: { label: string; value: string; icon: React.ElementType }[] = [
  { label: 'Garnishment Manger', value: 'orders', icon: FileText },
  { label: 'Garnishment Case User', value: 'case_management', icon: User },
  { label: 'Legal User', value: 'legal_team', icon: Scale },
  { label: 'Compliance User', value: 'compliance_team', icon: Shield },
  { label: 'CRM User', value: 'customer_management', icon: MessageSquare }
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine which team is currently active
  const getActiveTeam = () => {
    const path = location.pathname;
    
    if (path === '/dashboard' || path === '/garnishment-orders') {
      return 'orders';
    }
    
    if (path.startsWith('/team/')) {
      const teamId = path.split('/team/')[1];
      return teamId;
    }

    if (path.startsWith('/garnishment/')) {
      return 'details';
    }
    
    return null;
  };
  
  const activeTeam = getActiveTeam();
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <motion.header 
        className="bg-bank-dark text-white shadow-md"
        initial={{ height: location.pathname === '/' ? '100vh' : 'auto' }}
        animate={{ height: 'auto' }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto py-4 px-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ scale: location.pathname === '/' ? 2 : 1, x: location.pathname === '/' ? '50%' : 0 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/">
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
              </Link>
              <Link to="/" className="text-xl font-bold">Bank Portal</Link>
            </motion.div>
            <div className="text-sm">
              <span className="opacity-75">Garnishment Processing</span>
            </div>
          </div>
        </div>
      </motion.header>

      {location.pathname !== '/' && (
        <nav className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex -mb-px overflow-x-auto justify-between">
              {activeTeam === 'orders' && (
                <Link 
                  to="/garnishment-orders"
                  className={`py-4 px-6 font-medium flex items-center space-x-2 border-b-2 border-bank text-bank`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Garnishment Manger</span>
                </Link>
              )}
              
              {activeTeam && activeTeam !== 'orders' && (
                teamOptions.filter(team => team.value === activeTeam).map((team) => (
                  <Link
                    key={team.value}
                    to={`/team/${team.value}`}
                    className={`py-4 px-6 font-medium flex items-center space-x-2 border-b-2 border-bank text-bank`}
                  >
                    <team.icon className="h-4 w-4" />
                    <span>{team.label}</span>
                  </Link>
                ))
              )}
              {activeTeam && activeTeam === 'details' && (
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="mt-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              <Link 
                to="/"
                className="py-4 px-6 font-medium flex items-center space-x-2 border-b-2 border-transparent text-gray-500 hover:text-bank hover:border-bank-light"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Choose Persona</span>
              </Link>
            </div>
          </div>
        </nav>
      )}

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
