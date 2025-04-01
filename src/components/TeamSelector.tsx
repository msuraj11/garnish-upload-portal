
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { WorkflowStage } from './GarnishmentWorkflowTracker';

interface TeamOption {
  label: string;
  value: WorkflowStage;
}

const teamOptions: TeamOption[] = [
  { label: 'Garnishment Case Management Team (GCM)', value: 'case_management' },
  { label: 'Bank Legal Team', value: 'legal_team' },
  { label: 'Bank Compliance Team', value: 'compliance_team' },
];

const TeamSelector: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<WorkflowStage | ''>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTeam) {
      navigate(`/team/${selectedTeam}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold mb-4">Filter Orders by Team</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Select value={selectedTeam} onValueChange={(value) => setSelectedTeam(value as WorkflowStage)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
              {teamOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          type="submit" 
          className="bg-bank hover:bg-bank-dark"
          disabled={!selectedTeam}
        >
          View Team Orders
        </Button>
      </form>
    </div>
  );
};

export default TeamSelector;
