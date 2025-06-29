
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Search, Users, Calendar, MapPin, Video, User, Brain, Clock } from "lucide-react";
import { mockJobSeekers } from "@/data/mockData";
import CandidateProfileModal from "./CandidateProfileModal";
import InterviewScheduleModal from "./InterviewScheduleModal";

interface ViewApplicationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewApplicationsModal = ({ open, onOpenChange }: ViewApplicationsModalProps) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);
  const [aiCriteria, setAiCriteria] = useState('');
  const [aiResults, setAiResults] = useState<{ candidates: any[], explanation: string } | null>(null);
  const [showCandidateProfile, setShowCandidateProfile] = useState(false);
  const [showInterviewSchedule, setShowInterviewSchedule] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      const savedJobs = JSON.parse(localStorage.getItem('recruiterJobs') || '[]');
      setJobs(savedJobs);
      if (savedJobs.length > 0) {
        setSelectedJob(savedJobs[0]);
      }
    }
  }, [open]);

  useEffect(() => {
    if (selectedJob) {
      // Simulate applicants for each job (using random selection from mock data)
      const numApplicants = Math.min(selectedJob.applicants || 15, mockJobSeekers.length);
      const jobApplicants = mockJobSeekers.slice(0, numApplicants).map(seeker => ({
        ...seeker,
        appliedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
      }));
      setApplicants(jobApplicants);
      setFilteredApplicants(jobApplicants);
    }
  }, [selectedJob]);

  const handleAIFilter = () => {
    if (!aiCriteria.trim()) {
      toast({
        title: "Enter AI Criteria",
        description: "Please enter search criteria for AI filtering.",
        variant: "destructive"
      });
      return;
    }

    // Simulate AI filtering logic
    const criteria = aiCriteria.toLowerCase();
    let matchingCandidates = applicants.filter(candidate => {
      const skillsMatch = candidate.skills.some((skill: string) => 
        criteria.includes(skill.toLowerCase())
      );
      const languageMatch = candidate.languages.some((lang: any) => 
        criteria.includes(lang.name.toLowerCase())
      );
      const summaryMatch = candidate.professionalSummary.toLowerCase().includes(criteria);
      
      return skillsMatch || languageMatch || summaryMatch;
    });

    // If we have fewer than 5 matches, add random candidates to reach 5
    if (matchingCandidates.length < 5) {
      const remaining = applicants.filter(candidate => 
        !matchingCandidates.includes(candidate)
      );
      const additionalNeeded = Math.min(5 - matchingCandidates.length, remaining.length);
      const randomAdditional = remaining
        .sort(() => 0.5 - Math.random())
        .slice(0, additionalNeeded);
      matchingCandidates = [...matchingCandidates, ...randomAdditional];
    }

    // Take top 5
    matchingCandidates = matchingCandidates.slice(0, 5);

    const explanation = `AI selected ${matchingCandidates.length} candidates based on criteria "${aiCriteria}". Analysis included skill matching, language requirements, and professional summary relevance. ${matchingCandidates.length < 5 ? 'Some candidates were randomly selected to reach the requested number due to limited exact matches.' : ''}`;

    setAiResults({
      candidates: matchingCandidates,
      explanation
    });

    toast({
      title: "AI Filter Applied",
      description: `Found ${matchingCandidates.length} matching candidates.`,
    });
  };

  const handleViewProfile = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowCandidateProfile(true);
  };

  const handleScheduleInterview = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowInterviewSchedule(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">View Applications</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Job Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Job to View Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jobs.map((job) => (
                    <Card 
                      key={job.id} 
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedJob?.id === job.id 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:shadow-soft'
                      }`}
                      onClick={() => setSelectedJob(job)}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-lg mb-2">{job.title}</h4>
                        <p className="text-gray-600 mb-2">{job.companyName}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">
                            {job.applicants || 15} applicants
                          </Badge>
                          <Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>
                            {job.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedJob && (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All Applications ({applicants.length})</TabsTrigger>
                  <TabsTrigger value="ai">AI Filtered {aiResults ? `(${aiResults.candidates.length})` : ''}</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5" />
                        <span>Applications for: {selectedJob.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {filteredApplicants.map((candidate) => (
                          <Card key={candidate.id} className="hover:shadow-soft transition-all duration-200">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={candidate.profilePhoto} alt={candidate.fullName} />
                                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                      {candidate.fullName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="font-semibold text-lg">{candidate.fullName}</h4>
                                    <p className="text-gray-600 mb-2">{candidate.professionalSummary}</p>
                                    <div className="flex flex-wrap gap-1">
                                      {candidate.skills.slice(0, 4).map((skill: string) => (
                                        <Badge key={skill} variant="outline" className="text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                      {candidate.skills.length > 4 && (
                                        <Badge variant="outline" className="text-xs text-gray-500">
                                          +{candidate.skills.length - 4} more
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewProfile(candidate)}
                                  >
                                    <User className="h-4 w-4 mr-2" />
                                    View Profile
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleScheduleInterview(candidate)}
                                    className="gradient-bg"
                                  >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Interview
                                  </Button>
                                </div>
                              </div>
                              <div className="mt-3 text-sm text-gray-500">
                                Applied: {formatDate(candidate.appliedDate)}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ai" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Brain className="h-5 w-5" />
                        <span>AI-Powered Candidate Filtering</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="e.g., SEO, teamwork, Arabic speaker, JavaScript, 3+ years experience"
                          value={aiCriteria}
                          onChange={(e) => setAiCriteria(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleAIFilter} className="gradient-bg">
                          <Brain className="h-4 w-4 mr-2" />
                          Apply AI Filter
                        </Button>
                      </div>

                      {aiResults && (
                        <div className="space-y-4">
                          <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-blue-800 mb-2">AI Analysis Results</h4>
                              <p className="text-blue-700">{aiResults.explanation}</p>
                            </CardContent>
                          </Card>

                          <div className="grid gap-4">
                            {aiResults.candidates.map((candidate, index) => (
                              <Card key={candidate.id} className="hover:shadow-soft transition-all duration-200 border-l-4 border-l-blue-500">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                      <div className="flex items-center space-x-2">
                                        <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                          #{index + 1}
                                        </div>
                                        <Avatar className="h-12 w-12">
                                          <AvatarImage src={candidate.profilePhoto} alt={candidate.fullName} />
                                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                            {candidate.fullName.charAt(0)}
                                          </AvatarFallback>
                                        </Avatar>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-lg">{candidate.fullName}</h4>
                                        <p className="text-gray-600 mb-2">{candidate.professionalSummary}</p>
                                        <div className="flex flex-wrap gap-1">
                                          {candidate.skills.slice(0, 5).map((skill: string) => (
                                            <Badge 
                                              key={skill} 
                                              variant={aiCriteria.toLowerCase().includes(skill.toLowerCase()) ? "default" : "outline"} 
                                              className="text-xs"
                                            >
                                              {skill}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleViewProfile(candidate)}
                                      >
                                        <User className="h-4 w-4 mr-2" />
                                        View Profile
                                      </Button>
                                      <Button
                                        size="sm"
                                        onClick={() => handleScheduleInterview(candidate)}
                                        className="gradient-bg"
                                      >
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Interview
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {selectedCandidate && (
        <>
          <CandidateProfileModal
            open={showCandidateProfile}
            onOpenChange={setShowCandidateProfile}
            candidate={selectedCandidate}
          />
          <InterviewScheduleModal
            open={showInterviewSchedule}
            onOpenChange={setShowInterviewSchedule}
            candidate={selectedCandidate}
            job={selectedJob}
          />
        </>
      )}
    </>
  );
};

export default ViewApplicationsModal;
