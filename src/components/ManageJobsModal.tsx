
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Copy, Eye } from "lucide-react";

interface ManageJobsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  status: string;
  applicants: number;
  createdAt: string;
  jobType: string;
}

const ManageJobsModal = ({ open, onOpenChange }: ManageJobsModalProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      const savedJobs = JSON.parse(localStorage.getItem('recruiterJobs') || '[]');
      setJobs(savedJobs);
    }
  }, [open]);

  const handleDelete = (jobId: string) => {
    const updatedJobs = jobs.filter(job => job.id !== jobId);
    setJobs(updatedJobs);
    localStorage.setItem('recruiterJobs', JSON.stringify(updatedJobs));
    
    toast({
      title: "Job Deleted",
      description: "The job posting has been removed successfully.",
    });
  };

  const handleDuplicate = (job: Job) => {
    const duplicatedJob = {
      ...job,
      id: Math.random().toString(36).substr(2, 9),
      title: `${job.title} (Copy)`,
      createdAt: new Date().toISOString(),
      applicants: 0
    };
    
    const updatedJobs = [...jobs, duplicatedJob];
    setJobs(updatedJobs);
    localStorage.setItem('recruiterJobs', JSON.stringify(updatedJobs));
    
    toast({
      title: "Job Duplicated",
      description: "A copy of the job posting has been created.",
    });
  };

  const toggleStatus = (jobId: string) => {
    const updatedJobs = jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: job.status === 'Open' ? 'Closed' : 'Open' }
        : job
    );
    setJobs(updatedJobs);
    localStorage.setItem('recruiterJobs', JSON.stringify(updatedJobs));
    
    toast({
      title: "Status Updated",
      description: "Job status has been changed successfully.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Manage My Jobs</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Eye className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
              <p className="text-gray-600">
                Create your first job posting to start receiving applications.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-soft transition-all duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{job.companyName}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.jobType}</span>
                          <span>•</span>
                          <span>Posted {formatDate(job.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                        <Badge variant="outline">
                          {job.applicants} applicant{job.applicants !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleStatus(job.id)}
                        >
                          {job.status === 'Open' ? 'Close Job' : 'Reopen Job'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDuplicate(job)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(job.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageJobsModal;
