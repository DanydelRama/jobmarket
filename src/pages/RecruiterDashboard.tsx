import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Eye, Users, LogOut, Globe, Briefcase, TrendingUp, Settings } from "lucide-react";
import CreateJobModal from "@/components/CreateJobModal";
import ManageJobsModal from "@/components/ManageJobsModal";
import ViewApplicationsModal from "@/components/ViewApplicationsModal";

const RecruiterDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showManageJobs, setShowManageJobs] = useState(false);
  const [showViewApplications, setShowViewApplications] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      window.location.href = '/';
    }

    // Load jobs
    const savedJobs = JSON.parse(localStorage.getItem('recruiterJobs') || '[]');
    setJobs(savedJobs);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: jobs.filter(job => job.status === 'Open').length.toString(), color: "text-blue-600" },
    { icon: Users, label: "Total Applications", value: jobs.reduce((sum, job) => sum + (job.applicants || 0), 0).toString(), color: "text-green-600" },
    { icon: Eye, label: "Profile Views", value: "1,450", color: "text-purple-600" },
    { icon: TrendingUp, label: "Hire Rate", value: "18%", color: "text-orange-600" }
  ];

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
                TalentHub - Recruiter
              </h1>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.fullName}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Recruiter Dashboard
          </h2>
          <p className="text-gray-600">
            Manage your job postings and find the perfect candidates for your team.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-soft transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-soft transition-all duration-200 cursor-pointer group" onClick={() => setShowCreateJob(true)}>
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-2xl w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Create New Job</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Post a new job opening and start receiving applications from qualified candidates.
              </p>
              <Button className="gradient-bg hover:shadow-glow transform hover:scale-105 transition-all duration-200">
                Create Job Posting
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-soft transition-all duration-200 cursor-pointer group" onClick={() => setShowManageJobs(true)}>
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Manage My Jobs</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Manage your existing job postings, edit details, and track their performance.
              </p>
              <Button variant="outline" className="hover:shadow-soft transform hover:scale-105 transition-all duration-200">
                Manage Jobs ({jobs.length})
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-soft transition-all duration-200 cursor-pointer group" onClick={() => setShowViewApplications(true)}>
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">View Applications</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Review applications, filter candidates, and schedule interviews with top talent.
              </p>
              <Button variant="outline" className="hover:shadow-soft transform hover:scale-105 transition-all duration-200">
                Review Applications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobs.length > 0 ? jobs.slice(0, 4).map((job, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="font-medium text-gray-900">Job posted: {job.title}</p>
                      <p className="text-sm text-gray-600">{job.companyName} • {job.location}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No recent activity. Create your first job posting to get started!</p>
                </div>
              )}
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
