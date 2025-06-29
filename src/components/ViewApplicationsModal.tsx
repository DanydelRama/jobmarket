
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, Users, Calendar, MapPin, Video, User, Brain, Clock, Filter, X } from "lucide-react";
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
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    skills: '',
    experience: '',
    location: '',
    education: ''
  });
  const { toast } = useToast();

  // Enhanced mock jobs with more applicants
  const enhancedJobs = [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      companyName: 'TechMorocco Solutions',
      location: 'Casablanca',
      status: 'Open',
      applicants: 18,
      createdAt: new Date().toISOString(),
      jobType: 'Full-time'
    },
    {
      id: '2',
      title: 'Digital Marketing Manager',
      companyName: 'Maroc Digital Agency',
      location: 'Rabat',
      status: 'Open',
      applicants: 15,
      createdAt: new Date().toISOString(),
      jobType: 'Full-time'
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      companyName: 'Creative Studio Maroc',
      location: 'Casablanca',
      status: 'Open',
      applicants: 22,
      createdAt: new Date().toISOString(),
      jobType: 'Contract'
    }
  ];

  useEffect(() => {
    if (open) {
      const savedJobs = JSON.parse(localStorage.getItem('recruiterJobs') || JSON.stringify(enhancedJobs));
      setJobs(savedJobs);
      if (savedJobs.length > 0) {
        setSelectedJob(savedJobs[0]);
      }
    }
  }, [open]);

  useEffect(() => {
    if (selectedJob) {
      // Generate applicants for the selected job
      const numApplicants = selectedJob.applicants || 15;
      const jobApplicants = Array.from({ length: numApplicants }, (_, index) => {
        const baseCandidate = mockJobSeekers[index % mockJobSeekers.length];
        return {
          ...baseCandidate,
          id: `${selectedJob.id}-${index + 1}`,
          appliedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'pending'
        };
      });
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

    const criteria = aiCriteria.toLowerCase();
    let matchingCandidates = applicants.filter(candidate => {
      const skillsMatch = candidate.skills.some((skill: any) => 
        criteria.includes(skill.name ? skill.name.toLowerCase() : skill.toLowerCase())
      );
      const languageMatch = candidate.languages.some((lang: any) => 
        criteria.includes(lang.name.toLowerCase())
      );
      const summaryMatch = candidate.professionalSummary.toLowerCase().includes(criteria);
      const locationMatch = candidate.location.toLowerCase().includes(criteria);
      
      return skillsMatch || languageMatch || summaryMatch || locationMatch;
    });

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

    matchingCandidates = matchingCandidates.slice(0, 5);

    const explanation = `AI selected ${matchingCandidates.length} candidates based on criteria "${aiCriteria}". Analysis included skill matching, language requirements, location preferences, and professional summary relevance. These candidates show strong alignment with your requirements and demonstrate the expertise needed for this role.`;

    setAiResults({
      candidates: matchingCandidates,
      explanation
    });

    toast({
      title: "AI Filter Applied",
      description: `Found ${matchingCandidates.length} matching candidates.`,
    });
  };

  const applyFilters = () => {
    let filtered = applicants;

    if (filters.skills) {
      filtered = filtered.filter(candidate =>
        candidate.skills.some((skill: any) =>
          (skill.name || skill).toLowerCase().includes(filters.skills.toLowerCase())
        )
      );
    }

    if (filters.location) {
      filtered = filtered.filter(candidate =>
        candidate.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.education) {
      filtered = filtered.filter(candidate =>
        candidate.education.some((edu: any) =>
          edu.degree.toLowerCase().includes(filters.education.toLowerCase()) ||
          edu.school.toLowerCase().includes(filters.education.toLowerCase())
        )
      );
    }

    setFilteredApplicants(filtered);
    setShowFilters(false);
    
    toast({
      title: "Filters Applied",
      description: `Showing ${filtered.length} candidates matching your criteria.`,
    });
  };

  const clearFilters = () => {
    setFilters({
      skills: '',
      experience: '',
      location: '',
      education: ''
    });
    setFilteredApplicants(applicants);
    setShowFilters(false);
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
        <DialogContent className="sm:max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold">View Applications</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6">
            {/* Job Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Select Job to View Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {enhancedJobs.map((job) => (
                    <Card 
                      key={job.id} 
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedJob?.id === job.id 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:shadow-soft'
                      }`}
                      onClick={() => setSelectedJob(job)}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <h4 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">{job.title}</h4>
                        <p className="text-gray-600 mb-2 text-sm sm:text-base">{job.companyName}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <Badge variant="outline" className="text-xs">
                            {job.applicants} applicants
                          </Badge>
                          <Badge variant={job.status === 'Open' ? 'default' : 'secondary'} className="text-xs">
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
                  <TabsTrigger value="all" className="text-xs sm:text-sm">All Applications ({filteredApplicants.length})</TabsTrigger>
                  <TabsTrigger value="ai" className="text-xs sm:text-sm">AI Filtered {aiResults ? `(${aiResults.candidates.length})` : ''}</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {/* Filter Section */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                          <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span>Applications for: {selectedJob.title}</span>
                        </CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowFilters(!showFilters)}
                          className="flex items-center space-x-2 w-full sm:w-auto"
                        >
                          <Filter className="h-4 w-4" />
                          <span>Filter By</span>
                        </Button>
                      </div>
                    </CardHeader>

                    {showFilters && (
                      <CardContent className="border-t pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <Input
                            placeholder="Filter by skills..."
                            value={filters.skills}
                            onChange={(e) => setFilters(prev => ({ ...prev, skills: e.target.value }))}
                          />
                          <Input
                            placeholder="Filter by location..."
                            value={filters.location}
                            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                          />
                          <Input
                            placeholder="Filter by education..."
                            value={filters.education}
                            onChange={(e) => setFilters(prev => ({ ...prev, education: e.target.value }))}
                          />
                          <Select value={filters.experience} onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                              <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                              <SelectItem value="senior">Senior (5+ years)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button onClick={applyFilters} className="gradient-bg w-full sm:w-auto">
                            Apply Filters
                          </Button>
                          <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
                            <X className="h-4 w-4 mr-2" />
                            Clear Filters
                          </Button>
                        </div>
                      </CardContent>
                    )}

                    <CardContent>
                      <div className="grid gap-3 sm:gap-4">
                        {filteredApplicants.map((candidate) => (
                          <Card key={candidate.id} className="hover:shadow-soft transition-all duration-200">
                            <CardContent className="p-3 sm:p-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                                    <AvatarImage src={candidate.profilePhoto} alt={candidate.fullName} />
                                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                                      {candidate.fullName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm sm:text-lg truncate">{candidate.fullName}</h4>
                                    <p className="text-gray-600 mb-2 text-xs sm:text-base line-clamp-2">{candidate.professionalSummary}</p>
                                    <div className="flex flex-wrap gap-1">
                                      {(candidate.skills.slice(0, 3) || []).map((skill: any, index: number) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {skill.name || skill}
                                        </Badge>
                                      ))}
                                      {candidate.skills.length > 3 && (
                                        <Badge variant="outline" className="text-xs text-gray-500">
                                          +{candidate.skills.length - 3} more
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewProfile(candidate)}
                                    className="w-full sm:w-auto text-xs sm:text-sm"
                                  >
                                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                    View Profile
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleScheduleInterview(candidate)}
                                    className="gradient-bg w-full sm:w-auto text-xs sm:text-sm"
                                  >
                                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                    Interview
                                  </Button>
                                </div>
                              </div>
                              <div className="mt-3 text-xs sm:text-sm text-gray-500 border-t pt-2">
                                Applied: {formatDate(candidate.appliedDate)} • Location: {candidate.location}
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
                      <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                        <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>AI-Powered Candidate Filtering</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Input
                          placeholder="e.g., SEO, teamwork, Arabic speaker, JavaScript, 3+ years experience"
                          value={aiCriteria}
                          onChange={(e) => setAiCriteria(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleAIFilter} className="gradient-bg w-full sm:w-auto">
                          <Brain className="h-4 w-4 mr-2" />
                          Apply AI Filter
                        </Button>
                      </div>

                      {aiResults && (
                        <div className="space-y-4">
                          <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-3 sm:p-4">
                              <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">AI Analysis Results</h4>
                              <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">{aiResults.explanation}</p>
                            </CardContent>
                          </Card>

                          <div className="grid gap-3 sm:gap-4">
                            {aiResults.candidates.map((candidate, index) => (
                              <Card key={candidate.id} className="hover:shadow-soft transition-all duration-200 border-l-4 border-l-blue-500">
                                <CardContent className="p-3 sm:p-4">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                                      <div className="flex items-center space-x-2 flex-shrink-0">
                                        <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-xs sm:text-sm">
                                          #{index + 1}
                                        </div>
                                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                                          <AvatarImage src={candidate.profilePhoto} alt={candidate.fullName} />
                                          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                                            {candidate.fullName.charAt(0)}
                                          </AvatarFallback>
                                        </Avatar>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm sm:text-lg truncate">{candidate.fullName}</h4>
                                        <p className="text-gray-600 mb-2 text-xs sm:text-base line-clamp-2">{candidate.professionalSummary}</p>
                                        <div className="flex flex-wrap gap-1">
                                          {(candidate.skills.slice(0, 5) || []).map((skill: any, skillIndex: number) => (
                                            <Badge 
                                              key={skillIndex} 
                                              variant={aiCriteria.toLowerCase().includes((skill.name || skill).toLowerCase()) ? "default" : "outline"} 
                                              className="text-xs"
                                            >
                                              {skill.name || skill}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleViewProfile(candidate)}
                                        className="w-full sm:w-auto text-xs sm:text-sm"
                                      >
                                        <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                        View Profile
                                      </Button>
                                      <Button
                                        size="sm"
                                        onClick={() => handleScheduleInterview(candidate)}
                                        className="gradient-bg w-full sm:w-auto text-xs sm:text-sm"
                                      >
                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
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
            <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
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
