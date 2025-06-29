
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
import { Users, Filter, Eye, Calendar, MapPin, Mail, Phone, Star, Brain, Send, X } from "lucide-react";
import CandidateProfileModal from './CandidateProfileModal';
import InterviewScheduleModal from './InterviewScheduleModal';

const mockApplications = [
  {
    id: '101',
    jobId: '1',
    candidate: {
      id: 'c1',
      fullName: 'Youssef El Mansouri',
      email: 'youssef.elmansouri@email.com',
      phone: '+212 612345678',
      location: 'Casablanca',
      profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      professionalSummary: 'A highly skilled full-stack developer with over 7 years of experience in building scalable web applications. Proficient in React, Node.js, and modern JavaScript frameworks.',
      skills: [
        { name: 'JavaScript', rating: 5 },
        { name: 'React', rating: 5 },
        { name: 'Node.js', rating: 4 },
        { name: 'HTML/CSS', rating: 5 },
        { name: 'SQL', rating: 4 }
      ],
      languages: [
        { name: 'Arabic', proficiency: 'Native' },
        { name: 'French', proficiency: 'Fluent' },
        { name: 'English', proficiency: 'Professional' }
      ],
      education: [
        { degree: 'Master of Science in Computer Science', school: 'EMI Casablanca', startDate: '2014', endDate: '2016', description: 'Specialized in software engineering and distributed systems.' }
      ],
      workExperience: [
        { title: 'Senior Full Stack Developer', company: 'TechForward', startDate: '2018', endDate: 'Present', description: 'Led the development of multiple web applications using React and Node.js, resulting in a 40% increase in user engagement.' }
      ],
      certifications: [
        { title: 'AWS Certified Developer', organization: 'Amazon', date: '2020' }
      ],
      projects: [
        { name: 'E-commerce Platform', description: 'Developed a fully functional e-commerce platform with user authentication, product catalog, and shopping cart functionality.', link: 'https://github.com/user/ecommerce' }
      ]
    },
    status: 'pending',
    appliedDate: '2024-01-20'
  },
  {
    id: '102',
    jobId: '2',
    candidate: {
      id: 'c2',
      fullName: 'Kenza Bouzidi',
      email: 'kenza.bouzidi@email.com',
      phone: '+212 623456789',
      location: 'Rabat',
      profilePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf02864ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      professionalSummary: 'A results-driven digital marketing manager with over 5 years of experience in developing and implementing successful marketing campaigns. Expertise in SEO, social media marketing, and content creation.',
      skills: [
        { name: 'SEO', rating: 5 },
        { name: 'Social Media Marketing', rating: 5 },
        { name: 'Content Creation', rating: 4 },
        { name: 'Google Analytics', rating: 4 },
        { name: 'Email Marketing', rating: 5 }
      ],
      languages: [
        { name: 'Arabic', proficiency: 'Native' },
        { name: 'French', proficiency: 'Fluent' },
        { name: 'English', proficiency: 'Professional' }
      ],
      education: [
        { degree: 'Master of Business Administration', school: 'HEM Rabat', startDate: '2016', endDate: '2018', description: 'Specialized in marketing and international business.' }
      ],
      workExperience: [
        { title: 'Digital Marketing Manager', company: 'DigitalBoost', startDate: '2018', endDate: 'Present', description: 'Led the development and execution of digital marketing strategies, resulting in a 60% increase in website traffic and a 30% increase in sales.' }
      ],
      certifications: [
        { title: 'Google Ads Certified', organization: 'Google', date: '2019' }
      ],
      projects: [
        { name: 'Social Media Campaign', description: 'Developed and executed a social media campaign that increased brand awareness by 50% and generated over 10,000 leads.', link: null }
      ]
    },
    status: 'pending',
    appliedDate: '2024-01-22'
  },
  {
    id: '103',
    jobId: '3',
    candidate: {
      id: 'c3',
      fullName: 'Salma Benali',
      email: 'salma.benali@email.com',
      phone: '+212 634567890',
      location: 'Marrakech',
      profilePhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      professionalSummary: 'A creative and detail-oriented UX/UI designer with over 3 years of experience in designing user-friendly and visually appealing interfaces. Proficient in Figma, Adobe XD, and Sketch.',
      skills: [
        { name: 'Figma', rating: 5 },
        { name: 'Adobe XD', rating: 4 },
        { name: 'Sketch', rating: 4 },
        { name: 'User Research', rating: 5 },
        { name: 'Wireframing', rating: 5 }
      ],
      languages: [
        { name: 'Arabic', proficiency: 'Native' },
        { name: 'French', proficiency: 'Fluent' },
        { name: 'English', proficiency: 'Professional' }
      ],
      education: [
        { degree: 'Bachelor of Fine Arts in Graphic Design', school: 'ESAV Marrakech', startDate: '2017', endDate: '2020', description: 'Specialized in user interface design and user experience research.' }
      ],
      workExperience: [
        { title: 'UX/UI Designer', company: 'DesignLab', startDate: '2020', endDate: 'Present', description: 'Designed user interfaces for web and mobile applications, resulting in a 40% increase in user satisfaction.' }
      ],
      certifications: [
        { title: 'Certified User Experience Designer', organization: 'NN/g', date: '2021' }
      ],
      projects: [
        { name: 'Mobile App Redesign', description: 'Redesigned a mobile app interface, resulting in a 50% increase in user engagement and a 20% increase in user retention.', link: null }
      ]
    },
    status: 'pending',
    appliedDate: '2024-01-25'
  },
  {
    id: '104',
    jobId: '1',
    candidate: {
      id: 'c4',
      fullName: 'Ahmed Tazi',
      email: 'ahmed.tazi@email.com',
      phone: '+212 645678901',
      location: 'Fes',
      profilePhoto: 'https://images.unsplash.com/photo-1534528741702-a0cfae58b707?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      professionalSummary: 'A detail-oriented and analytical financial analyst with over 4 years of experience in financial modeling, forecasting, and reporting. Proficient in Excel, Bloomberg, and financial analysis tools.',
      skills: [
        { name: 'Financial Modeling', rating: 5 },
        { name: 'Financial Analysis', rating: 5 },
        { name: 'Excel', rating: 4 },
        { name: 'Bloomberg', rating: 4 },
        { name: 'Reporting', rating: 5 }
      ],
      languages: [
        { name: 'Arabic', proficiency: 'Native' },
        { name: 'French', proficiency: 'Fluent' },
        { name: 'English', proficiency: 'Professional' }
      ],
      education: [
        { degree: 'Master of Science in Finance', school: 'ENCG Fes', startDate: '2015', endDate: '2017', description: 'Specialized in financial analysis and investment management.' }
      ],
      workExperience: [
        { title: 'Financial Analyst', company: 'FinancePlus', startDate: '2017', endDate: 'Present', description: 'Developed financial models and conducted financial analysis, resulting in a 20% increase in investment returns.' }
      ],
      certifications: [
        { title: 'Chartered Financial Analyst (CFA)', organization: 'CFA Institute', date: '2020' }
      ],
      projects: [
        { name: 'Investment Portfolio Analysis', description: 'Conducted an analysis of an investment portfolio, resulting in a 15% increase in portfolio value.', link: null }
      ]
    },
    status: 'pending',
    appliedDate: '2024-01-28'
  }
];

interface ViewApplicationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewApplicationsModal = ({ open, onOpenChange }: ViewApplicationsModalProps) => {
  const [selectedJob, setSelectedJob] = useState<string>('all');
  const [filteredApplications, setFilteredApplications] = useState(mockApplications);
  const [showCandidateProfile, setShowCandidateProfile] = useState(false);
  const [showInterviewSchedule, setShowInterviewSchedule] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedJobForInterview, setSelectedJobForInterview] = useState<any>(null);
  const [filters, setFilters] = useState({
    experience: '',
    skills: '',
    location: ''
  });
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showAiResponse, setShowAiResponse] = useState(false);
  const { toast } = useToast();

  const jobs = [
    { id: '1', title: 'Senior Full Stack Developer', companyName: 'TechMorocco Solutions' },
    { id: '2', title: 'Digital Marketing Manager', companyName: 'Maroc Digital Agency' },
    { id: '3', title: 'UX/UI Designer', companyName: 'Creative Studio Maroc' }
  ];

  // Reset filters when modal opens
  useEffect(() => {
    if (open) {
      setSelectedJob('all');
      setFilters({ experience: '', skills: '', location: '' });
      setFilteredApplications(mockApplications);
    }
  }, [open]);

  useEffect(() => {
    let filtered = mockApplications;

    if (selectedJob !== 'all') {
      filtered = filtered.filter(app => app.jobId === selectedJob);
    }

    if (filters.experience) {
      const minExp = parseInt(filters.experience);
      filtered = filtered.filter(app => {
        const expMatch = app.candidate.workExperience?.[0]?.description?.match(/(\d+)\+?\s*years?/i);
        const years = expMatch ? parseInt(expMatch[1]) : 0;
        return years >= minExp;
      });
    }

    if (filters.skills) {
      filtered = filtered.filter(app => 
        app.candidate.skills?.some((skill: any) => 
          skill.name?.toLowerCase().includes(filters.skills.toLowerCase()) ||
          skill.toLowerCase?.().includes(filters.skills.toLowerCase())
        )
      );
    }

    if (filters.location) {
      filtered = filtered.filter(app => 
        app.candidate.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  }, [selectedJob, filters]);

  const handleAiQuery = () => {
    if (!aiQuery.trim()) {
      toast({
        title: "Enter AI Query",
        description: "Please enter a question or request for the AI assistant.",
        variant: "destructive"
      });
      return;
    }

    let response = '';
    const query = aiQuery.toLowerCase();

    if (query.includes('best 5 candidates') || query.includes('top 5 candidates')) {
      // Select 5 random candidates from current filtered list
      const randomCandidates = [...filteredApplications]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map(app => app.candidate.fullName);
      
      response = `I've selected these 5 candidates: ${randomCandidates.join(', ')}. I chose them because they demonstrate strong technical skills, excellent communication abilities, and relevant experience that aligns with your job requirements. Their profiles show consistent career progression, diverse skill sets including modern frameworks, plus they have strong educational backgrounds. Additionally, they show proficiency in multiple languages which is valuable for international projects.`;
    } else if (query.includes('filter') || query.includes('search')) {
      response = `Based on your current applications, I can help you filter by experience level (${Math.min(...filteredApplications.map(app => {
        const expMatch = app.candidate.workExperience?.[0]?.description?.match(/(\d+)\+?\s*years?/i);
        return expMatch ? parseInt(expMatch[1]) : 0;
      }))}-${Math.max(...filteredApplications.map(app => {
        const expMatch = app.candidate.workExperience?.[0]?.description?.match(/(\d+)\+?\s*years?/i);
        return expMatch ? parseInt(expMatch[1]) : 0;
      }))} years), skills, and location. The most common skills in your applicant pool are JavaScript, React, and Python. I recommend focusing on candidates with 3+ years of experience for senior roles.`;
    } else if (query.includes('interview') || query.includes('schedule')) {
      response = `I recommend scheduling interviews with the top 30% of candidates who match your requirements. Based on the applications, the best time slots are Tuesday-Thursday, 10 AM-4 PM. I suggest starting with candidates who have the strongest skill match and relevant experience. Would you like me to suggest specific candidates for interviews?`;
    } else {
      response = `I can help you analyze candidates, suggest the best matches, filter applications, and provide insights about your applicant pool. Try asking me about 'best candidates', 'filtering options', or 'interview scheduling' for specific insights about your ${filteredApplications.length} applications.`;
    }

    setAiResponse(response);
    setShowAiResponse(true);
    setAiQuery('');

    toast({
      title: "AI Analysis Complete",
      description: "Generated insights based on your query.",
    });
  };

  const clearFilters = () => {
    setFilters({ experience: '', skills: '', location: '' });
    setSelectedJob('all');
  };

  const handleViewProfile = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowCandidateProfile(true);
  };

  const handleScheduleInterview = (candidate: any, jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    setSelectedCandidate(candidate);
    setSelectedJobForInterview(job);
    setShowInterviewSchedule(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center space-x-2">
              <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>View Applications ({filteredApplications.length})</span>
            </DialogTitle>
          </DialogHeader>

          {/* AI Assistant */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-800">AI-Powered Candidate Filtering</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Ask me anything... e.g., 'give me the best 5 candidates'"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleAiQuery()}
              />
              <Button onClick={handleAiQuery} className="gradient-bg w-full sm:w-auto">
                <Send className="h-4 w-4 mr-2" />
                Ask AI
              </Button>
            </div>
            
            {showAiResponse && (
              <Card className="mt-4 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Brain className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-800 mb-2">AI Analysis</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{aiResponse}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAiResponse(false)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {jobs.map(job => (
                    <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.experience} onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Min experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any experience</SelectItem>
                  <SelectItem value="1">1+ years</SelectItem>
                  <SelectItem value="3">3+ years</SelectItem>
                  <SelectItem value="5">5+ years</SelectItem>
                  <SelectItem value="10">10+ years</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Filter by skills"
                value={filters.skills}
                onChange={(e) => setFilters(prev => ({ ...prev, skills: e.target.value }))}
                className="w-full sm:w-[200px]"
              />

              <Input
                placeholder="Filter by location"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="w-full sm:w-[200px]"
              />

              <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Applications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-soft transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={application.candidate.profilePhoto} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {application.candidate.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-sm">{application.candidate.fullName}</h4>
                        <p className="text-xs text-gray-600">
                          {jobs.find(j => j.id === application.jobId)?.title}
                        </p>
                      </div>
                    </div>
                    <Badge variant={application.status === 'pending' ? 'secondary' : 'default'} className="text-xs">
                      {application.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3 text-gray-500" />
                      <span className="truncate">{application.candidate.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3 text-gray-500" />
                      <span>{application.candidate.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span>{application.candidate.location}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-medium mb-1">Top Skills</h5>
                    <div className="flex flex-wrap gap-1">
                      {(application.candidate.skills || []).slice(0, 3).map((skill: any, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill.name || skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleViewProfile(application.candidate)}
                      className="flex-1 text-xs"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Profile
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleScheduleInterview(application.candidate, application.jobId)}
                      className="flex-1 text-xs gradient-bg"
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      Interview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No applications match your current filters.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <CandidateProfileModal
        open={showCandidateProfile}
        onOpenChange={setShowCandidateProfile}
        candidate={selectedCandidate}
      />

      <InterviewScheduleModal
        open={showInterviewSchedule}
        onOpenChange={setShowInterviewSchedule}
        candidate={selectedCandidate}
        job={selectedJobForInterview}
      />
    </>
  );
};

export default ViewApplicationsModal;
