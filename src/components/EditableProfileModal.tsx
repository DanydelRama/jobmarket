
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, Upload, User, GraduationCap, Briefcase, Award, Code, Star } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditableProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

const EditableProfileModal = ({ open, onOpenChange, user }: EditableProfileModalProps) => {
  const [profile, setProfile] = useState({
    profilePhoto: '/placeholder.svg',
    fullName: user?.fullName || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+212 6 12 34 56 78',
    location: 'Casablanca, Morocco',
    professionalSummary: 'Experienced professional with a passion for innovation and growth.',
    skills: [
      { name: 'JavaScript', level: 'Advanced', years: '3' },
      { name: 'React', level: 'Advanced', years: '2' },
      { name: 'Node.js', level: 'Intermediate', years: '2' }
    ],
    languages: [
      { name: 'Arabic', proficiency: 'Native' },
      { name: 'French', proficiency: 'Advanced' },
      { name: 'English', proficiency: 'Advanced' }
    ],
    education: [
      {
        degree: 'Master in Computer Science',
        school: 'Université Hassan II',
        startDate: '2018',
        endDate: '2020',
        description: 'Focus on software engineering and AI'
      }
    ],
    experience: [
      {
        title: 'Senior Developer',
        company: 'Tech Company',
        startDate: '2020',
        endDate: 'Present',
        description: 'Led development of web applications using React and Node.js'
      }
    ],
    certifications: [
      {
        title: 'AWS Certified Developer',
        organization: 'Amazon Web Services',
        date: '2023'
      }
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        link: 'https://github.com/example',
        description: 'Built a full-stack e-commerce platform with React and Node.js'
      }
    ],
    references: [
      {
        name: 'Ahmed Benali',
        position: 'Senior Manager',
        company: 'Tech Solutions',
        contact: 'ahmed@example.com'
      }
    ]
  });

  const { toast } = useToast();

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const languageProficiency = ['Basic', 'Intermediate', 'Advanced', 'Fluent', 'Native'];

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', school: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const removeEducation = (index: number) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const removeExperience = (index: number) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addSkill = () => {
    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, { name: '', level: 'Intermediate', years: '1' }]
    }));
  };

  const removeSkill = (index: number) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const updateSkill = (index: number, field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const addLanguage = () => {
    setProfile(prev => ({
      ...prev,
      languages: [...prev.languages, { name: '', proficiency: 'Intermediate' }]
    }));
  };

  const removeLanguage = (index: number) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) => 
        i === index ? { ...lang, [field]: value } : lang
      )
    }));
  };

  const addCertification = () => {
    setProfile(prev => ({
      ...prev,
      certifications: [...prev.certifications, { title: '', organization: '', date: '' }]
    }));
  };

  const removeCertification = (index: number) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const updateCertification = (index: number, field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const addProject = () => {
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', link: '', description: '' }]
    }));
  };

  const removeProject = (index: number) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const updateProject = (index: number, field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const addReference = () => {
    setProfile(prev => ({
      ...prev,
      references: [...prev.references, { name: '', position: '', company: '', contact: '' }]
    }));
  };

  const removeReference = (index: number) => {
    setProfile(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  const updateReference = (index: number, field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      references: prev.references.map((ref, i) => 
        i === index ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const handleSave = () => {
    // Save to localStorage (simulate database)
    localStorage.setItem('userProfile', JSON.stringify(profile));
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit My Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.profilePhoto} alt={profile.fullName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                    {profile.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  value={profile.professionalSummary}
                  onChange={(e) => setProfile(prev => ({ ...prev, professionalSummary: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Education</span>
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addEducation}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.education.map((edu, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Education #{index + 1}</h4>
                    {profile.education.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeEducation(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Degree/Certification"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    />
                    <Input
                      placeholder="School/University"
                      value={edu.school}
                      onChange={(e) => updateEducation(index, 'school', e.target.value)}
                    />
                    <Input
                      placeholder="Start Year"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                    />
                    <Input
                      placeholder="End Year"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                    />
                  </div>
                  <Textarea
                    placeholder="Description (optional)"
                    value={edu.description}
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Work Experience</span>
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addExperience}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.experience.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Experience #{index + 1}</h4>
                    {profile.experience.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeExperience(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Job Title"
                      value={exp.title}
                      onChange={(e) => updateExperience(index, 'title', e.target.value)}
                    />
                    <Input
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    />
                    <Input
                      placeholder="Start Year"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    />
                    <Input
                      placeholder="End Year (or Present)"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    />
                  </div>
                  <Textarea
                    placeholder="Job responsibilities and achievements"
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Skills</span>
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addSkill}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Input
                    placeholder="Skill name"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, 'name', e.target.value)}
                    className="flex-1"
                  />
                  <Select value={skill.level} onValueChange={(value) => updateSkill(index, 'level', value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {skillLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Years"
                    value={skill.years}
                    onChange={(e) => updateSkill(index, 'years', e.target.value)}
                    className="w-20"
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeSkill(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Languages</CardTitle>
                <Button variant="outline" size="sm" onClick={addLanguage}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Language
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile.languages.map((lang, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Input
                    placeholder="Language"
                    value={lang.name}
                    onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                    className="flex-1"
                  />
                  <Select value={lang.proficiency} onValueChange={(value) => updateLanguage(index, 'proficiency', value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languageProficiency.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm" onClick={() => removeLanguage(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Certifications & Awards</span>
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addCertification}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certification
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Input
                    placeholder="Certification Title"
                    value={cert.title}
                    onChange={(e) => updateCertification(index, 'title', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Organization"
                    value={cert.organization}
                    onChange={(e) => updateCertification(index, 'organization', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Year"
                    value={cert.date}
                    onChange={(e) => updateCertification(index, 'date', e.target.value)}
                    className="w-24"
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeCertification(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Projects</span>
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addProject}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.projects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Project #{index + 1}</h4>
                    <Button variant="ghost" size="sm" onClick={() => removeProject(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) => updateProject(index, 'name', e.target.value)}
                    />
                    <Input
                      placeholder="Project Link (GitHub, Portfolio)"
                      value={project.link}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                    />
                  </div>
                  <Textarea
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* References */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>References</CardTitle>
                <Button variant="outline" size="sm" onClick={addReference}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reference
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.references.map((ref, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Reference #{index + 1}</h4>
                    <Button variant="ghost" size="sm" onClick={() => removeReference(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Full Name"
                      value={ref.name}
                      onChange={(e) => updateReference(index, 'name', e.target.value)}
                    />
                    <Input
                      placeholder="Position"
                      value={ref.position}
                      onChange={(e) => updateReference(index, 'position', e.target.value)}
                    />
                    <Input
                      placeholder="Company"
                      value={ref.company}
                      onChange={(e) => updateReference(index, 'company', e.target.value)}
                    />
                    <Input
                      placeholder="Contact (Email/Phone)"
                      value={ref.contact}
                      onChange={(e) => updateReference(index, 'contact', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="gradient-bg">
            Save Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditableProfileModal;
