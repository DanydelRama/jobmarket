
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Eye, Users, LogOut, Globe, Briefcase, TrendingUp, Settings, Brain, Send, Clock, UserCheck, MessageSquare } from "lucide-react";
import CreateJobModal from "@/components/CreateJobModal";
import ManageJobsModal from "@/components/ManageJobsModal";
import ViewApplicationsModal from "@/components/ViewApplicationsModal";

const RecruiterDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showManageJobs, setShowManageJobs] = useState(false);
  const [showViewApplications, setShowViewApplications] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showAiResponse, setShowAiResponse] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      window.location.href = '/';
    }

    // Load jobs with enhanced data
    const defaultJobs = [
      {
        id: '1',
        title: 'Senior Full Stack Developer',
        companyName: 'TechMorocco Solutions',
        location: 'Casablanca',
        status: 'Open',
        applicants: 18,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        jobType: 'Full-time'
      },
      {
        id: '2',
        title: 'Digital Marketing Manager',
        companyName: 'Maroc Digital Agency',
        location: 'Rabat',
        status: 'Open',
        applicants: 15,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        jobType: 'Full-time'
      },
      {
        id: '3',
        title: 'UX/UI Designer',
        companyName: 'Creative Studio Maroc',
        location: 'Casablanca',
        status: 'Open',
        applicants: 22,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        jobType: 'Contract'
      }
    ];
    
    const savedJobs = JSON.parse(localStorage.getItem('recruiterJobs') || JSON.stringify(defaultJobs));
    setJobs(savedJobs);
    localStorage.setItem('recruiterJobs', JSON.stringify(savedJobs));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

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
      response = "I've selected these 5 candidates because they demonstrate strong technical skills, excellent communication abilities, and relevant experience that aligns with your job requirements. Their profiles show consistent career progression, diverse skill sets including JavaScript, React, and modern frameworks, plus they have strong educational backgrounds from reputable Moroccan universities. Additionally, they all show proficiency in multiple languages (Arabic, French, English) which is valuable for your international projects.";
    } else if (query.includes('interview') && query.includes('schedule')) {
      response = "Based on current applications, I recommend scheduling interviews for candidates who have 5+ years of experience and match at least 80% of your job requirements. The best time slots based on candidate availability are Tuesday-Thursday, 10 AM-4 PM. I can help you send interview invitations to the top candidates automatically.";
    } else if (query.includes('salary') || query.includes('budget')) {
      response = "Based on current market data in Morocco, the salary ranges for your posted positions are competitive. For Senior Developer roles in Casablanca, the range is 15,000-25,000 MAD/month. Digital Marketing Manager positions typically range from 12,000-20,000 MAD/month. I recommend staying within these ranges to attract quality candidates.";
    } else if (query.includes('skill') && (query.includes('shortage') || query.includes('gap'))) {
      response = "Analysis shows that candidates are strongest in JavaScript, React, and digital marketing skills. However, there's a skills gap in advanced cloud technologies (AWS, Azure) and data analysis. Consider offering training programs or adjusting requirements for these specialized skills to expand your candidate pool.";
    } else {
      response = "I understand you're looking for assistance with recruitment. I can help you with candidate selection, interview scheduling, salary benchmarking, skills analysis, and more. Try asking me about 'best candidates', 'interview scheduling', 'salary ranges', or 'skills analysis' for specific insights.";
    }

    setAiResponse(response);
    setShowAiResponse(true);
    setAiQuery('');

    toast({
      title: "AI Analysis Complete",
      description: "Generated insights based on your query.",
    });
  };

  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: jobs.filter(job => job.status === 'Open').length.toString(), color: "text-blue-600" },
    { icon: Users, label: "Total Applications", value: jobs.reduce((sum, job) => sum + (job.applicants || 0), 0).toString(), color: "text-green-600" },
    { icon: Eye, label: "Profile Views", value: "1,450", color: "text-purple-600" },
    { icon: TrendingUp, label: "Hire Rate", value: "18%", color: "text-orange-600" }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'application',
      message: 'New application received for Senior Full Stack Developer',
      candidate: 'Youssef El Mansouri',
      time: '2 hours ago',
      icon: Users
    },
    {
      id: 2,
      type: 'interview',
      message: 'Interview scheduled with Kenza Bouzidi',
      candidate: 'Digital Marketing Manager',
      time: '4 hours ago',
      icon: Clock
    },
    {
      id: 3,
      type: 'hire',
      message: 'Ahmed Tazi accepted the offer',
      candidate: 'Financial Analyst position',
      time: '1 day ago',
      icon: UserCheck
    },
    {
      id: 4,
      type: 'message',
      message: 'Message sent to 5 candidates',
      candidate: 'Interview invitations',
      time: '2 days ago',
      icon: MessageSquare
    },
    {
      id: 5,
      type: 'application',
      message: 'New application for UX/UI Designer',
      candidate: 'Salma Benali',
      time: '3 days ago',
      icon: Users
    }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-xl">
                <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TalentHub - Recruiter
              </h1>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center justify-between sm:justify-end space-x-4">
              <span className="text-sm sm:text-base text-gray-700">Welcome, {user.fullName}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* AI Assistant */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-800">AI Recruitment Assistant</span>
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
            </div>
          </div>
          
          {showAiResponse && (
            <Card className="mt-4 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Brain className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">AI Analysis</h4>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{aiResponse}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Recruiter Dashboard
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your job postings and find the perfect candidates for your team.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-soft transition-all duration-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="hover:shadow-soft transition-all duration-200 cursor-pointer group" onClick={() => setShowCreateJob(true)}>
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-primary to-accent p-3 sm:p-4 rounded-2xl w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Plus className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Create New Job</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Post a new job opening and start receiving applications from qualified candidates.
              </p>
              <Button className="gradient-bg hover:shadow-glow transform hover:scale-105 transition-all duration-200 w-full sm:w-auto">
                Create Job Posting
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-soft transition-all duration-200 cursor-pointer group" onClick={() => setShowManageJobs(true)}>
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 sm:p-4 rounded-2xl w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Manage My Jobs</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Manage your existing job postings, edit details, and track their performance.
              </p>
              <Button variant="outline" className="hover:shadow-soft transform hover:scale-105 transition-all duration-200 w-full sm:w-auto">
                Manage Jobs ({jobs.length})
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-soft transition-all duration-200 cursor-pointer group" onClick={() => setShowViewApplications(true)}>
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 sm:p-4 rounded-2xl w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl">View Applications</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Review applications, filter candidates, and schedule interviews with top talent.
              </p>
              <Button variant="outline" className="hover:shadow-soft transform hover:scale-105 transition-all duration-200 w-full sm:w-auto">
                Review Applications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <activity.icon className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{activity.message}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{activity.candidate}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Modals */}
      <CreateJobModal
        open={showCreateJob}
        onOpenChange={setShowCreateJob}
      />

      <ManageJobsModal
        open={showManageJobs}
        onOpenChange={setShowManageJobs}
      />

      <ViewApplicationsModal
        open={showViewApplications}
        onOpenChange={setShowViewApplications}
      />
    </div>
  );
};

export default RecruiterDashboard;
