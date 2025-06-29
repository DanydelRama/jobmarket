
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Plus, X } from "lucide-react";
import { AVAILABLE_SKILLS } from "@/data/mockData";

interface CreateJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateJobModal = ({ open, onOpenChange }: CreateJobModalProps) => {
  const [jobData, setJobData] = useState({
    title: '',
    companyName: '',
    location: '',
    jobType: '',
    industry: '',
    requiredSkills: [] as string[],
    ageRange: { min: '', max: '' },
    languageRequirements: [] as string[],
    experienceLevel: '',
    customQuestions: [''],
    salaryRange: { min: '', max: '' },
    applicationDeadline: '',
    description: '',
    companyLogo: null
  });
  const { toast } = useToast();

  const jobTypes = ['Full-time', 'Part-time', 'Remote', 'Internship', 'Contract'];
  const industries = ['Technology', 'Finance', 'Marketing', 'Healthcare', 'Education', 'Agriculture', 'Tourism'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
  const languages = ['Arabic', 'French', 'English', 'Spanish', 'German'];

  const handleInputChange = (field: string, value: any) => {
    setJobData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setJobData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.includes(skill) 
        ? prev.requiredSkills.filter(s => s !== skill)
        : [...prev.requiredSkills, skill]
    }));
  };

  const toggleLanguage = (language: string) => {
    setJobData(prev => ({
      ...prev,
      languageRequirements: prev.languageRequirements.includes(language) 
        ? prev.languageRequirements.filter(l => l !== language)
        : [...prev.languageRequirements, language]
    }));
  };

  const addCustomQuestion = () => {
    setJobData(prev => ({
      ...prev,
      customQuestions: [...prev.customQuestions, '']
    }));
  };

  const updateCustomQuestion = (index: number, value: string) => {
    setJobData(prev => ({
      ...prev,
      customQuestions: prev.customQuestions.map((q, i) => i === index ? value : q)
    }));
  };

  const removeCustomQuestion = (index: number) => {
    setJobData(prev => ({
      ...prev,
      customQuestions: prev.customQuestions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    // Save job to localStorage (simulate database)
    const existingJobs = JSON.parse(localStorage.getItem('recruiterJobs') || '[]');
    const newJob = {
      id: Math.random().toString(36).substr(2, 9),
      ...jobData,
      status: 'Open',
      applicants: 0,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('recruiterJobs', JSON.stringify([...existingJobs, newJob]));
    
    toast({
      title: "Job Created Successfully!",
      description: "Your job posting is now live and accepting applications.",
    });
    
    onOpenChange(false);
    // Reset form
    setJobData({
      title: '',
      companyName: '',
      location: '',
      jobType: '',
      industry: '',
      requiredSkills: [],
      ageRange: { min: '', max: '' },
      languageRequirements: [],
      experienceLevel: '',
      customQuestions: [''],
      salaryRange: { min: '', max: '' },
      applicationDeadline: '',
      description: '',
      companyLogo: null
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Job Posting</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Job Info */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={jobData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Senior Frontend Developer"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={jobData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Your company name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Location</Label>
                  <Select onValueChange={(value) => handleInputChange('location', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Casablanca">Casablanca</SelectItem>
                      <SelectItem value="Rabat">Rabat</SelectItem>
                      <SelectItem value="Marrakech">Marrakech</SelectItem>
                      <SelectItem value="Fes">Fes</SelectItem>
                      <SelectItem value="Tangier">Tangier</SelectItem>
                      <SelectItem value="Agadir">Agadir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Job Type</Label>
                  <Select onValueChange={(value) => handleInputChange('jobType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Industry</Label>
                  <Select onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={jobData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed job description, responsibilities, and requirements..."
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg">Requirements</h3>
              
              <div>
                <Label>Required Skills</Label>
                <div className="flex flex-wrap gap-2 p-3 border rounded-lg max-h-32 overflow-y-auto">
                  {AVAILABLE_SKILLS.map(skill => (
                    <Badge
                      key={skill}
                      variant={jobData.requiredSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Language Requirements</Label>
                <div className="flex flex-wrap gap-2 p-3 border rounded-lg">
                  {languages.map(language => (
                    <Badge
                      key={language}
                      variant={jobData.languageRequirements.includes(language) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleLanguage(language)}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Experience Level</Label>
                  <Select onValueChange={(value) => handleInputChange('experienceLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="applicationDeadline">Application Deadline</Label>
                  <Input
                    id="applicationDeadline"
                    type="date"
                    value={jobData.applicationDeadline}
                    onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Age Range (Optional)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Min age"
                    value={jobData.ageRange.min}
                    onChange={(e) => handleInputChange('ageRange', { ...jobData.ageRange, min: e.target.value })}
                    className="w-24"
                  />
                  <span>to</span>
                  <Input
                    placeholder="Max age"
                    value={jobData.ageRange.max}
                    onChange={(e) => handleInputChange('ageRange', { ...jobData.ageRange, max: e.target.value })}
                    className="w-24"
                  />
                </div>
              </div>

              <div>
                <Label>Salary Range (Optional)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Min salary"
                    value={jobData.salaryRange.min}
                    onChange={(e) => handleInputChange('salaryRange', { ...jobData.salaryRange, min: e.target.value })}
                  />
                  <span>to</span>
                  <Input
                    placeholder="Max salary"
                    value={jobData.salaryRange.max}
                    onChange={(e) => handleInputChange('salaryRange', { ...jobData.salaryRange, max: e.target.value })}
                  />
                  <span className="text-sm text-gray-500">MAD</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom Questions */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Custom Application Questions</h3>
                <Button variant="outline" size="sm" onClick={addCustomQuestion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
              
              {jobData.customQuestions.map((question, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={question}
                    onChange={(e) => updateCustomQuestion(index, e.target.value)}
                    placeholder="Enter your custom question for applicants"
                    className="flex-1"
                  />
                  {jobData.customQuestions.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCustomQuestion(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Company Logo */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-4">Company Logo</h3>
              <div className="flex items-center justify-center w-full">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <Button variant="outline" size="sm">
                      Upload Logo
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="gradient-bg">
            Create Job Posting
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobModal;
