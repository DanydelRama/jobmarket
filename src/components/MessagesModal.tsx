
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Calendar, MapPin, Clock, Bell } from "lucide-react";

interface MessagesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

const MessagesModal = ({ open, onOpenChange, userId }: MessagesModalProps) => {
  const [selectedTab, setSelectedTab] = useState('accepted');
  const [acceptedMessages, setAcceptedMessages] = useState<any[]>([]);
  const [rejectedMessages, setRejectedMessages] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      // Load messages from localStorage
      const candidateMessages = JSON.parse(localStorage.getItem('candidateMessages') || '[]');
      
      // Filter messages by status
      const accepted = candidateMessages.filter((msg: any) => msg.status === 'accepted');
      const rejected = candidateMessages.filter((msg: any) => msg.status === 'rejected');
      
      setAcceptedMessages(accepted);
      setRejectedMessages(rejected);
    }
  }, [open]);

  const handleConfirmInterview = (messageId: string) => {
    const updatedMessages = acceptedMessages.map(msg => 
      msg.id === messageId 
        ? { ...msg, confirmed: true }
        : msg
    );
    setAcceptedMessages(updatedMessages);
    
    // Update localStorage
    const allMessages = JSON.parse(localStorage.getItem('candidateMessages') || '[]');
    const updatedAllMessages = allMessages.map((msg: any) => 
      msg.id === messageId 
        ? { ...msg, confirmed: true }
        : msg
    );
    localStorage.setItem('candidateMessages', JSON.stringify(updatedAllMessages));
    
    toast({
      title: "Interview Confirmed",
      description: "Your interview has been confirmed successfully.",
    });
  };

  const checkUpcomingInterviews = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const upcomingInterviews = acceptedMessages.filter(msg => {
      const interviewDate = new Date(msg.interviewDate);
      return interviewDate <= tomorrow && interviewDate >= today && msg.confirmed;
    });

    if (upcomingInterviews.length > 0) {
      toast({
        title: "Interview Reminder",
        description: `You have ${upcomingInterviews.length} interview(s) coming up soon!`,
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    if (acceptedMessages.length > 0) {
      checkUpcomingInterviews();
    }
  }, [acceptedMessages]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Messages</DialogTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={checkUpcomingInterviews}
              className="flex items-center space-x-2"
            >
              <Bell className="h-4 w-4" />
              <span>Check Reminders</span>
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="accepted" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Accepted ({acceptedMessages.length})</span>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center space-x-2">
              <XCircle className="h-4 w-4" />
              <span>Rejected ({rejectedMessages.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accepted" className="space-y-4 mt-6">
            {acceptedMessages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No accepted applications yet.</p>
              </div>
            ) : (
              acceptedMessages.map((message) => (
                <Card key={message.id} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-green-700">
                          {message.jobTitle}
                        </CardTitle>
                        <p className="text-gray-600">{message.company}</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Badge variant="outline" className="text-green-700 border-green-700">
                          Interview Scheduled
                        </Badge>
                        {message.confirmed && (
                          <Badge variant="default" className="bg-green-600">
                            Confirmed
                          </Badge>
                        )}
                      </div>
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
            {rejectedMessages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <XCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No rejected applications.</p>
              </div>
            ) : (
              rejectedMessages.map((message) => (
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
