
import React from 'react';
import { GarnishmentOrderWithTimeline, TimelineEvent } from '@/context/GarnishmentContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, CheckCircle, Clock, User, XCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface GarnishmentTimelineProps {
  order: GarnishmentOrderWithTimeline;
  formatDate: (date: Date | string, formatString?: string) => string;
}

const GarnishmentTimeline: React.FC<GarnishmentTimelineProps> = ({ order, formatDate }) => {
  const timeline = order.timeline || [];

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-bank" />
          Processing Timeline
        </CardTitle>
        <CardDescription>
          Recent activity and timeline for this garnishment order
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-bank flex items-center justify-center text-white">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
            </div>
            <div className="pb-6">
              <p className="text-sm font-medium">Order Received</p>
              <p className="text-xs text-gray-500">
                {formatDate(order.dateReceived, 'MMM d, yyyy h:mm a')}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Garnishment order processed by document management team
              </p>
            </div>
          </div>
          
          {timeline.map((event, index) => (
            <div className="flex" key={index}>
              <div className="mr-4 flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white
                  ${event.status === 'approved' ? 'bg-green-500' : 
                    event.status === 'rejected' ? 'bg-red-500' : 'bg-gray-400'}`}>
                  {event.status === 'approved' ? 
                    <CheckCircle className="h-5 w-5" /> : 
                    event.status === 'rejected' ? 
                      <XCircle className="h-5 w-5" /> : 
                      <Clock className="h-5 w-5" />
                  }
                </div>
                {index < timeline.length - 1 && (
                  <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                )}
              </div>
              <div className={index < timeline.length - 1 ? "pb-6" : ""}>
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(event.timestamp, 'MMM d, yyyy h:mm a')}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
          
          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <User className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">
                Current Stage: {order.currentStage 
                  ? order.currentStage.charAt(0).toUpperCase() + order.currentStage.slice(1).replace(/_/g, ' ') 
                  : 'Unknown'}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(new Date(), 'MMM d, yyyy')}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Order is currently being processed in this stage
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <p className="text-xs text-gray-500">
          For any updates or questions, please contact the garnishment processing team
        </p>
      </CardFooter>
    </Card>
  );
};

export default GarnishmentTimeline;
