
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Calendar, MapPin, Clock } from "lucide-react";

interface MessagesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

const MessagesModal = ({ open, onOpenChange, userId }: MessagesModalProps) => {
  const [selectedTab, setSelectedTab] = useState('accepted');

  // Mock messages data - in real app this would come from Supabase
  const mockAcceptedMessages = [
    {
      id: '1',
      jobTitle: 'Senior Full Stack Developer',
      company: 'TechMorocco Solutions',
      status: 'accepted',
      interviewDate: '2024-02-15',
      interviewTime: '14:00',
      location: 'Casablanca Office',
      format: 'in-person',
      message: 'Congratulations! We would like to invite you for an interview.',
      confirmed: false
    },
    {
      id: '2',
      jobTitle: 'Digital Marketing Manager',
      company: 'Maroc Digital Agency',
      status: 'accepted',
      interviewDate: '2024-02-18',
      interviewTime: '10:30',
      location: 'Online Meeting',
      format: 'online',
      message: 'We are impressed with your profile and would like to schedule an interview.',
      confirmed: true
    }
  ];

  const mockRejectedMessages = [
    {
      id: '3',
      jobTitle: 'Financial Analyst',
      company: 'Casablanca Finance Group',
      status: 'rejected',
      message: 'Thank you for your interest. Unfortunately, we have decided to move forward with other candidates.'
    }
  ];

  const handleConfirmInterview = (messageId: string) => {
    // In real app, this would update the backend
    console.log('Confirming interview for message:', messageId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Messages</DialogTitle>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="accepted" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Accepted ({mockAcceptedMessages.length})</span>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center space-x-2">
              <XCircle className="h-4 w-4" />
              <span>Rejected ({mockRejectedMessages.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accepted" className="space-y-4 mt-6">
            {mockAcceptedMessages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No accepted applications yet.</p>
              </div>
            ) : (
              mockAcceptedMessages.map((message) => (
                <Card key={message.id} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-green-700">
                          {message.jobTitle}
                        </CardTitle>
                        <p className="text-gray-600">{message.company}</p>
                      </div>
                      <Badge variant="outline" className="text-green-700 border-green-700">
                        Interview Scheduled
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{message.message}</p>
                    
                    <div className="bg-green-50 p-4 rounded-lg space-y-2">
                      <h4 className="font-semibold text-green-800">Interview Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <span>{new Date(message.interviewDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span>{message.interviewTime}</span>
                        </div>
                        <div className="flex items-center space-x-2 md:col-span-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span>{message.location}</span>
                        </div>
                      </div>
                    </div>

                    {!message.confirmed && (
                      <Button 
                        onClick={() => handleConfirmInterview(message.id)}
                        className="w-full gradient-bg"
                      >
                        Confirm Interview
                      </Button>
                    )}

                    {message.confirmed && (
                      <div className="text-center text-green-700 font-medium">
                        ✓ Interview Confirmed
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4 mt-6">
            {mockRejectedMessages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <XCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No rejected applications.</p>
              </div>
            ) : (
              mockRejectedMessages.map((message) => (
                <Card key={message.id} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-red-700">
                          {message.jobTitle}
                        </CardTitle>
                        <p className="text-gray-600">{message.company}</p>
                      </div>
                      <Badge variant="outline" className="text-red-700 border-red-700">
                        Not Selected
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{message.message}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessagesModal;
