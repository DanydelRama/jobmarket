
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Video, User } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface InterviewScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: any;
  job: any;
}

const InterviewScheduleModal = ({ open, onOpenChange, candidate, job }: InterviewScheduleModalProps) => {
  const [interviewData, setInterviewData] = useState({
    date: new Date(),
    time: '',
    format: 'online',
    location: '',
    message: `Dear ${candidate?.fullName || 'Candidate'},\n\nWe are pleased to invite you for an interview for the position of ${job?.title || 'the role'} at ${job?.companyName || 'our company'}.\n\nPlease confirm your availability for the scheduled time.\n\nBest regards,\nRecruiting Team`
  });
  const { toast } = useToast();

  const handleSchedule = () => {
    if (!interviewData.time) {
      toast({
        title: "Missing Information",
        description: "Please select an interview time.",
        variant: "destructive"
      });
      return;
    }

    if (interviewData.format === 'in-person' && !interviewData.location.trim()) {
      toast({
        title: "Missing Location",
        description: "Please provide a location for the in-person interview.",
        variant: "destructive"
      });
      return;
    }

    // Save interview data (simulate sending invitation)
    const interviewDetails = {
      candidateId: candidate.id,
      candidateName: candidate.fullName,
      candidateEmail: candidate.email,
      jobId: job.id,
      jobTitle: job.title,
      date: interviewData.date.toISOString(),
      time: interviewData.time,
      format: interviewData.format,
      location: interviewData.location,
      message: interviewData.message,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    // Save to localStorage (simulate database)
    const existingInterviews = JSON.parse(localStorage.getItem('scheduledInterviews') || '[]');
    localStorage.setItem('scheduledInterviews', JSON.stringify([...existingInterviews, interviewDetails]));

    // Also create a message for the candidate's inbox
    const candidateMessage = {
      id: Math.random().toString(36).substr(2, 9),
      jobTitle: job.title,
      company: job.companyName,
      status: 'accepted',
      interviewDate: interviewData.date.toISOString().split('T')[0],
      interviewTime: interviewData.time,
      location: interviewData.format === 'online' ? 'Online Meeting' : interviewData.location,
      format: interviewData.format,
      message: interviewData.message,
      confirmed: false,
      createdAt: new Date().toISOString()
    };

    // Save candidate message
    const existingMessages = JSON.parse(localStorage.getItem('candidateMessages') || '[]');
    localStorage.setItem('candidateMessages', JSON.stringify([...existingMessages, candidateMessage]));

    toast({
      title: "Interview Scheduled!",
      description: `Interview invitation has been sent to ${candidate.fullName}.`,
    });

    onOpenChange(false);
    
    // Reset form
    setInterviewData({
      date: new Date(),
      time: '',
      format: 'online',
      location: '',
      message: `Dear ${candidate?.fullName || 'Candidate'},\n\nWe are pleased to invite you for an interview for the position of ${job?.title || 'the role'} at ${job?.companyName || 'our company'}.\n\nPlease confirm your availability for the scheduled time.\n\nBest regards,\nRecruiting Team`
    });
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Schedule Interview</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Candidate Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-blue-800">
                    Scheduling interview with {candidate?.fullName}
                  </h4>
                  <p className="text-blue-600">
                    For position: {job?.title} at {job?.companyName}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Select Interview Date</Label>
            <Card>
              <CardContent className="p-4">
                <CalendarComponent
                  mode="single"
                  selected={interviewData.date}
                  onSelect={(date) => date && setInterviewData(prev => ({ ...prev, date }))}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>

          {/* Time Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Select Interview Time</Label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={interviewData.time === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInterviewData(prev => ({ ...prev, time }))}
                  className="justify-center"
                >
                  <Clock className="h-4 w-4 mr-1" />
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Interview Format</Label>
            <RadioGroup 
              value={interviewData.format} 
              onValueChange={(value) => setInterviewData(prev => ({ ...prev, format: value }))}
              className="grid grid-cols-2 gap-4"
            >
              <Card className={`cursor-pointer transition-all duration-200 ${interviewData.format === 'online' ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-soft'}`}>
                <CardContent className="p-4 text-center">
                  <RadioGroupItem value="online" id="online" className="sr-only" />
                  <Label htmlFor="online" className="cursor-pointer">
                    <Video className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">Online Interview</div>
                    <div className="text-sm text-gray-600">Video call meeting</div>
                  </Label>
                </CardContent>
              </Card>

              <Card className={`cursor-pointer transition-all duration-200 ${interviewData.format === 'in-person' ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-soft'}`}>
                <CardContent className="p-4 text-center">
                  <RadioGroupItem value="in-person" id="in-person" className="sr-only" />
                  <Label htmlFor="in-person" className="cursor-pointer">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">In-Person Interview</div>
                    <div className="text-sm text-gray-600">Office meeting</div>
                  </Label>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>

          {/* Location (only for in-person) */}
          {interviewData.format === 'in-person' && (
            <div>
              <Label htmlFor="location">Interview Location</Label>
              <Input
                id="location"
                placeholder="Enter office address or meeting location"
                value={interviewData.location}
                onChange={(e) => setInterviewData(prev => ({ ...prev, location: e.target.value }))}
                className="mt-2"
              />
            </div>
          )}

          {/* Custom Message */}
          <div>
            <Label htmlFor="message">Interview Invitation Message</Label>
            <Textarea
              id="message"
              value={interviewData.message}
              onChange={(e) => setInterviewData(prev => ({ ...prev, message: e.target.value }))}
              rows={8}
              className="mt-2"
            />
          </div>

          {/* Interview Summary */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-green-800 mb-2">Interview Summary</h4>
              <div className="space-y-1 text-green-700">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{interviewData.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{interviewData.time || 'Time not selected'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {interviewData.format === 'online' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                  <span>
                    {interviewData.format === 'online' 
                      ? 'Online Meeting (Link will be provided)' 
                      : interviewData.location || 'Location not specified'
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSchedule} className="gradient-bg">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewScheduleModal;
