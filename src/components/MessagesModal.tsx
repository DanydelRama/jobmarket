import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Calendar, MapPin, Clock, Bell, AlarmClock } from "lucide-react";

interface MessagesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

interface AcceptedMessage {
  id: string;
  jobTitle: string;
  company: string;
  message: string;
  interviewDate: string;
  interviewTime: string;
  location: string;
  confirmed: boolean;
  reminderSet?: boolean;
  reminderTime?: string;
}

interface RejectedMessage {
  id: string;
  jobTitle: string;
  company: string;
  message: string;
}

const mockMessages = {
  accepted: [
    {
      id: '1',
      jobTitle: 'Senior Full Stack Developer',
      company: 'TechMorocco Solutions',
      message: 'Congratulations! We are pleased to inform you that your application has been accepted. We would like to schedule an interview with you.',
      interviewDate: '2024-02-15',
      interviewTime: '10:00 AM',
      location: 'Online - Zoom Meeting',
      confirmed: false,
      reminderSet: false
    },
    {
      id: '2',
      jobTitle: 'Digital Marketing Manager',
      company: 'Maroc Digital Agency',
      message: 'Great news! Your profile impressed our team. We would like to schedule an interview to discuss this opportunity further.',
      interviewDate: '2024-02-18',
      interviewTime: '2:00 PM',
      location: 'Rabat Office - Building A, Floor 3',
      confirmed: false,
      reminderSet: false
    }
  ] as AcceptedMessage[],
  rejected: [
    {
      id: '3',
      jobTitle: 'Financial Analyst',
      company: 'Casablanca Finance Group',
      message: 'Thank you for your interest in our Financial Analyst position. After careful consideration, we have decided to proceed with other candidates whose experience more closely matches our current needs.'
    },
    {
      id: '4',
      jobTitle: 'UX/UI Designer',
      company: 'Creative Studio Maroc',
      message: 'We appreciate the time you took to apply for our UX/UI Designer role. While your portfolio shows talent, we have selected a candidate with more specific experience in mobile app design.'
    },
    {
      id: '5',
      jobTitle: 'Agricultural Engineer',
      company: 'AgriTech Morocco',
      message: 'Thank you for applying to our Agricultural Engineer position. We were impressed by your qualifications, however, we have chosen to move forward with a candidate who has more hands-on experience with precision agriculture technologies.'
    },
    {
      id: '6',
      jobTitle: 'Project Manager',
      company: 'Atlas Construction',
      message: 'We thank you for your application for the Project Manager role. After reviewing all applications, we have decided to proceed with candidates who have more experience in large-scale infrastructure projects.'
    }
  ] as RejectedMessage[]
};

const MessagesModal = ({ open, onOpenChange, userId }: MessagesModalProps) => {
  const [selectedTab, setSelectedTab] = useState('accepted');
  const [acceptedMessages, setAcceptedMessages] = useState<AcceptedMessage[]>(mockMessages.accepted);
  const [rejectedMessages, setRejectedMessages] = useState<RejectedMessage[]>(mockMessages.rejected);
  const [reminderSettings, setReminderSettings] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const handleConfirmInterview = (messageId: string) => {
    const updatedMessages = acceptedMessages.map(msg => 
      msg.id === messageId 
        ? { ...msg, confirmed: true, reminderSet: false }
        : msg
    );
    setAcceptedMessages(updatedMessages);
    
    toast({
      title: "Interview Confirmed",
      description: "Your interview has been confirmed successfully!",
    });
  };

  const handleSetReminder = (messageId: string, reminderTime: string) => {
    const updatedMessages = acceptedMessages.map(msg => 
      msg.id === messageId 
        ? { ...msg, reminderSet: true, reminderTime }
        : msg
    );
    setAcceptedMessages(updatedMessages);
    
    const message = acceptedMessages.find(msg => msg.id === messageId);
    if (message) {
      // In a real app, you would set up actual notifications/alarms here
      const reminderText = `${reminderTime} minutes before your interview`;
      
      toast({
        title: "Reminder Set!",
        description: `You'll be notified ${reminderText} for your ${message.jobTitle} interview.`,
      });

      // Simulate setting a browser notification (in a real app, you'd use the Notifications API)
      if ('Notification' in window && Notification.permission === 'granted') {
        setTimeout(() => {
          new Notification(`Interview Reminder`, {
            body: `Your interview for ${message.jobTitle} is in ${reminderTime} minutes`,
            icon: '/favicon.ico'
          });
        }, 5000); // Demo: show in 5 seconds instead of actual time
      }
    }
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
    } else {
      toast({
        title: "No Upcoming Interviews",
        description: "You don't have any interviews scheduled for today or tomorrow.",
      });
    }
  };

  // Request notification permission on component mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <DialogTitle className="text-xl sm:text-2xl font-bold">Messages</DialogTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={checkUpcomingInterviews}
              className="flex items-center space-x-2 w-full sm:w-auto"
            >
              <Bell className="h-4 w-4" />
              <span>Check Reminders</span>
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="accepted" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Accepted ({acceptedMessages.length})</span>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
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
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-base sm:text-lg text-green-700">
                          {message.jobTitle}
                        </CardTitle>
                        <p className="text-gray-600 text-sm sm:text-base">{message.company}</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Badge variant="outline" className="text-green-700 border-green-700 text-xs">
                          Interview Scheduled
                        </Badge>
                        {message.confirmed && (
                          <Badge variant="default" className="bg-green-600 text-xs">
                            Confirmed
                          </Badge>
                        )}
                        {message.reminderSet && (
                          <Badge variant="outline" className="text-blue-700 border-blue-700 text-xs">
                            <AlarmClock className="h-3 w-3 mr-1" />
                            Reminder Set
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-sm sm:text-base">{message.message}</p>
                    
                    <div className="bg-green-50 p-3 sm:p-4 rounded-lg space-y-2">
                      <h4 className="font-semibold text-green-800 text-sm sm:text-base">Interview Details</h4>
                      <div className="grid grid-cols-1 gap-3 text-xs sm:text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                          <span>{new Date(message.interviewDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                          <span>{message.interviewTime}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="break-words">{message.location}</span>
                        </div>
                      </div>
                    </div>

                    {!message.confirmed && (
                      <Button 
                        onClick={() => handleConfirmInterview(message.id)}
                        className="w-full gradient-bg text-sm sm:text-base"
                      >
                        Confirm Interview
                      </Button>
                    )}

                    {message.confirmed && !message.reminderSet && (
                      <div className="space-y-3">
                        <div className="text-center text-green-700 font-medium text-sm sm:text-base">
                          ✓ Interview Confirmed
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 items-center">
                          <Select
                            value={reminderSettings[message.id] || ''}
                            onValueChange={(value) => setReminderSettings(prev => ({ ...prev, [message.id]: value }))}
                          >
                            <SelectTrigger className="w-full sm:w-[200px]">
                              <SelectValue placeholder="Set reminder" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 minutes before</SelectItem>
                              <SelectItem value="10">10 minutes before</SelectItem>
                              <SelectItem value="15">15 minutes before</SelectItem>
                              <SelectItem value="20">20 minutes before</SelectItem>
                              <SelectItem value="30">30 minutes before</SelectItem>
                              <SelectItem value="60">1 hour before</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            onClick={() => handleSetReminder(message.id, reminderSettings[message.id] || '15')}
                            disabled={!reminderSettings[message.id]}
                            variant="outline"
                            className="w-full sm:w-auto"
                          >
                            <Bell className="h-4 w-4 mr-2" />
                            Set Reminder
                          </Button>
                        </div>
                      </div>
                    )}

                    {message.confirmed && message.reminderSet && (
                      <div className="text-center space-y-2">
                        <div className="text-green-700 font-medium text-sm sm:text-base">
                          ✓ Interview Confirmed
                        </div>
                        <div className="text-blue-700 text-sm flex items-center justify-center space-x-2">
                          <AlarmClock className="h-4 w-4" />
                          <span>Reminder set for {message.reminderTime || '15'} minutes before</span>
                        </div>
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
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-base sm:text-lg text-red-700">
                          {message.jobTitle}
                        </CardTitle>
                        <p className="text-gray-600 text-sm sm:text-base">{message.company}</p>
                      </div>
                      <Badge variant="outline" className="text-red-700 border-red-700 text-xs self-start">
                        Not Selected
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{message.message}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessagesModal;
