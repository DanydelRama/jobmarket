
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

const ProfileModal = ({ open, onOpenChange, user }: ProfileModalProps) => {
  // Mock profile data - in real app this would come from Supabase
  const mockProfile = {
    profilePhoto: '/placeholder.svg',
    fullName: user?.fullName || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+212 6 12 34 56 78',
    location: 'Casablanca, Morocco',
    professionalSummary: 'Experienced professional with a passion for innovation and growth. Looking for opportunities to contribute to meaningful projects.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Project Management'],
    languages: [
      { name: 'Arabic', proficiency: 'Native' },
      { name: 'French', proficiency: 'Advanced' },
      { name: 'English', proficiency: 'Advanced' }
    ],
    education: [
      {
        degree: 'Master in Computer Science',
        school: 'Université Hassan II',
        year: '2020'
      }
    ],
    experience: [
      {
        title: 'Senior Developer',
        company: 'Tech Company',
        duration: '2020 - Present'
      }
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">My Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={mockProfile.profilePhoto} alt={mockProfile.fullName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                    {mockProfile.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold">{mockProfile.fullName}</h3>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{mockProfile.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{mockProfile.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{mockProfile.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{mockProfile.professionalSummary}</p>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Skills</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockProfile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockProfile.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{lang.name}</span>
                    <Badge variant="outline">{lang.proficiency}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5" />
                <span>Education</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockProfile.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockProfile.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold">{exp.title}</h4>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                </div>
              ))}
            </CardContent>
          </Card>
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

export default ProfileModal;
