import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, MapPin, Building2, Clock, User, MessageSquare, Bell, LogOut, Globe } from "lucide-react";
import { mockJobs, generateMockJobs, AVAILABLE_SKILLS, Job } from "@/data/mockData";
import JobFilterModal from "@/components/JobFilterModal";
import MessagesModal from "@/components/MessagesModal";
import ApplicationModal from "@/components/ApplicationModal";
import EditableProfileModal from "@/components/EditableProfileModal";

const JobSeekerDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filters, setFilters] = useState({
    location: '',
    skills: [] as string[],
    industry: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      window.location.href = '/';
    }

    // Load jobs
    const allJobs = [...mockJobs, ...generateMockJobs(17)];
    setJobs(allJobs);
    setFilteredJobs(allJobs);
  }, []);

  useEffect(() => {
    // Filter jobs based on search and filters
    let filtered = jobs;

    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skillTags.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.skills.length > 0) {
      filtered = filtered.filter(job =>
        filters.skills.some(skill => job.skillTags.includes(skill))
      );
    }

    if (filters.industry) {
      filtered = filtered.filter(job =>
        job.industry.toLowerCase().includes(filters.industry.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [searchQuery, filters, jobs]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleApplyNow = (job: Job) => {
    setSelectedJob(job);
    setShowApplication(true);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-xl">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TalentHub
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search jobs, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-base"
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProfile(true)}
                className="flex items-center space-x-2"
              >
                <User className="h-5 w-5" />
                <span className="hidden md:inline">Profile</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMessages(true)}
                className="flex items-center space-x-2"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="hidden md:inline">Messages</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(true)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filter by</span>
            </Button>
            
            {(filters.location || filters.skills.length > 0 || filters.industry) && (
              <div className="flex items-center space-x-2">
                {filters.location && (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{filters.location}</span>
                  </Badge>
                )}
                {filters.skills.map(skill => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
                {filters.industry && (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Building2 className="h-3 w-3" />
                    <span>{filters.industry}</span>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters({ location: '', skills: [], industry: '' })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user.fullName}!
          </h2>
          <p className="text-gray-600">
            Found {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} matching your criteria
          </p>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-soft transition-all duration-200 animate-fade-in">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={job.companyLogo} alt={job.company} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {job.company.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 text-base">
                        <span className="flex items-center space-x-1">
                          <Building2 className="h-4 w-4" />
                          <span>{job.company}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{getTimeAgo(job.postedDate)}</span>
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleApplyNow(job)}
                    className="gradient-bg hover:shadow-glow transform hover:scale-105 transition-all duration-200"
                  >
                    Apply Now
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {job.skillTags.slice(0, 6).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.skillTags.length > 6 && (
                    <Badge variant="outline" className="text-xs text-gray-500">
                      +{job.skillTags.length - 6} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or removing some filters.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <JobFilterModal
        open={showFilters}
        onOpenChange={setShowFilters}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <EditableProfileModal
        open={showProfile}
        onOpenChange={setShowProfile}
        user={user}
      />

      <MessagesModal
        open={showMessages}
        onOpenChange={setShowMessages}
        userId={user?.id}
      />

      {selectedJob && (
        <ApplicationModal
          open={showApplication}
          onOpenChange={setShowApplication}
          job={selectedJob}
          userId={user?.id}
        />
      )}
    </div>
  );
};

export default JobSeekerDashboard;
