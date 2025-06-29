
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Building2, MapPin, CheckCircle } from "lucide-react";
import { Job } from "@/data/mockData";

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job;
  userId: string;
}

const ApplicationModal = ({ open, onOpenChange, job, userId }: ApplicationModalProps) => {
  const [motivationLetter, setMotivationLetter] = useState('');
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleAnswerChange = (question: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save application to localStorage (in real app, this would go to backend/Supabase)
    const application = {
      id: Math.random().toString(36).substr(2, 9),
      jobId: job.id,
      applicantId: userId,
      motivationLetter,
      answers: job.customQuestions.map(question => ({
        question,
        answer: answers[question] || ''
      })),
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    const existingApplications = JSON.parse(localStorage.getItem('applications') || '[]');
    existingApplications.push(application);
    localStorage.setItem('applications', JSON.stringify(existingApplications));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Application submitted successfully!",
      description: "You will be notified once the recruiter reviews your application.",
    });
  };

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md animate-scale-in">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been successfully submitted.
            </p>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setMotivationLetter('');
                setAnswers({});
                onOpenChange(false);
              }}
              className="gradient-bg"
            >
              Continue Exploring Jobs
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Apply for Position</DialogTitle>
        </DialogHeader>

        {/* Job Summary */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={job.companyLogo} alt={job.company} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {job.company.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Building2 className="h-4 w-4" />
                    <span>{job.company}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {job.skillTags.slice(0, 6).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Motivation Letter */}
          <div>
            <Label htmlFor="motivation" className="text-base font-medium">
              Motivation Letter *
            </Label>
            <p className="text-sm text-gray-600 mb-2">
              Tell us why you're interested in this position and what makes you a great fit.
            </p>
            <Textarea
              id="motivation"
              placeholder="Dear Hiring Manager,&#10;&#10;I am excited to apply for the position of..."
              value={motivationLetter}
              onChange={(e) => setMotivationLetter(e.target.value)}
              className="min-h-[120px]"
              required
            />
          </div>

          {/* Custom Questions */}
          {job.customQuestions && job.customQuestions.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Additional Questions</h4>
              {job.customQuestions.map((question, index) => (
                <div key={index}>
                  <Label className="text-base font-medium">
                    {question} *
                  </Label>
                  <Textarea
                    placeholder="Your answer..."
                    value={answers[question] || ''}
                    onChange={(e) => handleAnswerChange(question, e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="gradient-bg hover:shadow-glow transform hover:scale-105 transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
