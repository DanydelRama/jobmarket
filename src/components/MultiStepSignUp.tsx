
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Upload, Camera } from "lucide-react";

interface MultiStepSignUpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType: 'jobseeker' | 'recruiter';
}

const MultiStepSignUp = ({ open, onOpenChange, userType }: MultiStepSignUpProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Basic Info
    fullName: '',
    email: '',
    password: '',
    // Step 2 - Personal Info
    birthday: '',
    location: '',
    gender: '',
    // Step 3 - Career Info
    fieldOfWork: '',
    skills: [] as string[],
    languages: [] as string[],
    summary: '',
    // Step 4 - Education & Experience
    education: [{ degree: '', school: '', year: '' }],
    experience: [{ title: '', company: '', duration: '' }],
    // Step 5 - Photo
    profilePhoto: null,
    // Recruiter specific
    companyName: '',
    position: ''
  });
  const { toast } = useToast();

  const availableSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'SEO', 'HTML', 'CSS', 'Marketing',
    'Design', 'Finance', 'Agriculture', 'Teamwork', 'Communication', 'Management',
    'Leadership', 'Analysis', 'Problem Solving', 'Customer Service'
  ];

  const availableLanguages = ['Arabic', 'French', 'English', 'Spanish', 'German'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language) 
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleNext = () => {
    if (currentStep < (userType === 'jobseeker' ? 5 : 2)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      userType
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    toast({
      title: "Account created successfully!",
      description: "Welcome to TalentHub! You can now explore opportunities.",
    });
    
    onOpenChange(false);
    
    if (userType === 'jobseeker') {
      window.location.href = '/dashboard/jobseeker';
    } else {
      window.location.href = '/dashboard/recruiter';
    }
  };

  const renderJobSeekerStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div>
              <Label htmlFor="birthday">Date of Birth</Label>
              <Input
                id="birthday"
                type="date"
                value={formData.birthday}
                onChange={(e) => handleInputChange('birthday', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Select onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your city" />
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
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Career Information</h3>
            <div>
              <Label htmlFor="fieldOfWork">Field of Work</Label>
              <Input
                id="fieldOfWork"
                value={formData.fieldOfWork}
                onChange={(e) => handleInputChange('fieldOfWork', e.target.value)}
                placeholder="e.g., Software Development, Marketing"
              />
            </div>
            <div>
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-lg max-h-32 overflow-y-auto">
                {availableSkills.map(skill => (
                  <Badge
                    key={skill}
                    variant={formData.skills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label>Languages</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-lg">
                {availableLanguages.map(language => (
                  <Badge
                    key={language}
                    variant={formData.languages.includes(language) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleLanguage(language)}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                placeholder="Brief description of your career goals and experience"
                rows={3}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Education & Experience</h3>
            <div>
              <Label>Education</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Degree"
                  value={formData.education[0].degree}
                  onChange={(e) => handleInputChange('education', [{ ...formData.education[0], degree: e.target.value }])}
                />
                <Input
                  placeholder="School/University"
                  value={formData.education[0].school}
                  onChange={(e) => handleInputChange('education', [{ ...formData.education[0], school: e.target.value }])}
                />
                <Input
                  placeholder="Year"
                  value={formData.education[0].year}
                  onChange={(e) => handleInputChange('education', [{ ...formData.education[0], year: e.target.value }])}
                />
              </div>
            </div>
            <div>
              <Label>Work Experience</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Job Title"
                  value={formData.experience[0].title}
                  onChange={(e) => handleInputChange('experience', [{ ...formData.experience[0], title: e.target.value }])}
                />
                <Input
                  placeholder="Company"
                  value={formData.experience[0].company}
                  onChange={(e) => handleInputChange('experience', [{ ...formData.experience[0], company: e.target.value }])}
                />
                <Input
                  placeholder="Duration (e.g., 2020-2022)"
                  value={formData.experience[0].duration}
                  onChange={(e) => handleInputChange('experience', [{ ...formData.experience[0], duration: e.target.value }])}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Photo & Verification</h3>
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
                <Button variant="outline" className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo (Camera Verification)
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Upload a clear photo of yourself for profile verification
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderRecruiterStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recruiter Information</h3>
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter your company name"
                required
              />
            </div>
            <div>
              <Label htmlFor="position">Your Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="e.g., HR Manager, Recruiter"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company Verification</h3>
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Company Logo
                </Button>
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Business License (Optional)
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Help candidates trust your company by uploading verification documents
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const totalSteps = userType === 'jobseeker' ? 5 : 2;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Create {userType === 'jobseeker' ? 'Job Seeker' : 'Recruiter'} Account
          </DialogTitle>
          <div className="flex items-center justify-center space-x-2 mt-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-8 h-2 rounded-full ${
                  i + 1 <= currentStep ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {userType === 'jobseeker' ? renderJobSeekerStep() : renderRecruiterStep()}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gradient-bg">
              Create Account
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MultiStepSignUp;
