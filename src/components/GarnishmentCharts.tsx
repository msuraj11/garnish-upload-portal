
import React from 'react';
import { useGarnishment } from '@/context/GarnishmentContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { WorkflowStage, workflowStages } from '@/components/GarnishmentWorkflowTracker';
import { format, parseISO, differenceInCalendarMonths, addMonths, startOfMonth } from 'date-fns';
import { ChartPie, BarChart2 } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const COLORS = [
  '#4f46e5', // indigo for document_management
  '#0ea5e9', // blue for case_management
  '#8b5cf6', // purple for legal_team
  '#f59e0b', // amber for compliance_team
  '#10b981', // emerald for customer_management
  '#ef4444', // red for outbound_communication
];

const GarnishmentCharts = () => {
  const { orders } = useGarnishment();

  // Data for pie chart - group orders by their current stage
  const pieChartData = React.useMemo(() => {
    const stageMap = new Map<WorkflowStage, number>();
    
    // Initialize all stages with 0
    workflowStages.forEach(stage => {
      stageMap.set(stage.id, 0);
    });
    
    // Count orders in each stage
    orders.forEach(order => {
      const currentCount = stageMap.get(order.currentStage) || 0;
      stageMap.set(order.currentStage, currentCount + 1);
    });
    
    // Convert map to array for the chart
    return Array.from(stageMap.entries()).map(([stage, value]) => {
      const stageInfo = workflowStages.find(s => s.id === stage);
      return {
        name: stageInfo?.label || stage,
        value,
        stage
      };
    });
  }, [orders]);

  // Data for bar chart - group orders by month received
  const barChartData = React.useMemo(() => {
    if (orders.length === 0) return [];

    // Find the earliest date
    const dates = orders.map(order => new Date(order.dateReceived));
    const earliestDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const latestDate = new Date(Math.max(...dates.map(d => d.getTime())));
    
    // Generate all months between earliest and latest
    const monthDiff = differenceInCalendarMonths(latestDate, earliestDate) + 1;
    const months = Array.from({ length: monthDiff }, (_, i) => 
      startOfMonth(addMonths(earliestDate, i))
    );
    
    // Count orders for each month
    const monthlyCounts = months.map(month => {
      const monthStr = format(month, 'MMM yyyy');
      const count = orders.filter(order => {
        const orderDate = new Date(order.dateReceived);
        return format(orderDate, 'MMM yyyy') === monthStr;
      }).length;
      
      return {
        month: monthStr,
        count
      };
    });
    
    return monthlyCounts;
  }, [orders]);

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ChartPie className="h-5 w-5 mr-2 text-bank" />
            Cases by Stage
          </CardTitle>
          <CardDescription>
            Distribution of garnishment cases by workflow stage
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => percent ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 border rounded shadow-sm text-xs">
                        <p className="font-medium">{data.name}</p>
                        <p>{`Count: ${data.value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-bank" />
            Cases by Month
          </CardTitle>
          <CardDescription>
            Monthly distribution of garnishment cases
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border rounded shadow-sm text-xs">
                        <p className="font-medium">{label}</p>
                        <p>{`Count: ${payload[0].value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="count" name="Cases" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GarnishmentCharts;
