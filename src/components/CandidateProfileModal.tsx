
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Code, Star } from "lucide-react";

interface CandidateProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: any;
}

const CandidateProfileModal = ({ open, onOpenChange, candidate }: CandidateProfileModalProps) => {
  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">Candidate Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mx-auto sm:mx-0">
                  <AvatarImage src={candidate.profilePhoto} alt={candidate.fullName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg sm:text-xl font-semibold">
                    {candidate.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{candidate.fullName}</h3>
                  <div className="space-y-1 text-gray-600 text-sm sm:text-base">
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="break-all">{candidate.email}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{candidate.phone}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{candidate.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Professional Summary</h4>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{candidate.professionalSummary}</p>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Skills</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(candidate.skills || []).map((skill: any, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs sm:text-sm">
                    {skill.name || skill}
                    {skill.rating && (
                      <span className="ml-1 text-xs">({skill.rating}/5)</span>
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(candidate.languages || []).map((lang: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="font-medium text-sm sm:text-base">{lang.name}</span>
                    <Badge variant="outline" className="text-xs">{lang.proficiency}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Education</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(candidate.education || []).map((edu: any, index: number) => (
                  <div key={index} className="border-l-2 border-primary pl-3 sm:pl-4">
                    <h4 className="font-semibold text-sm sm:text-base">{edu.degree}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{edu.school}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    {edu.description && (
                      <p className="text-xs sm:text-sm text-gray-700 mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Work Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(candidate.workExperience || candidate.experience || []).map((exp: any, index: number) => (
                  <div key={index} className="border-l-2 border-primary pl-3 sm:pl-4">
                    <h4 className="font-semibold text-sm sm:text-base">{exp.title || exp.jobTitle}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{exp.company}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    {(exp.description || exp.responsibilities) && (
                      <p className="text-xs sm:text-sm text-gray-700 mt-1 leading-relaxed">
                        {exp.description || exp.responsibilities}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          {candidate.certifications && candidate.certifications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Certifications & Awards</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {candidate.certifications.map((cert: any, index: number) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">{cert.title}</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">{cert.organization || cert.issuingOrg}</p>
                      </div>
                      <Badge variant="outline" className="text-xs self-start sm:self-center">{cert.date}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Projects */}
          {candidate.projects && candidate.projects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                  <Code className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Projects</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidate.projects.map((project: any, index: number) => (
                    <div key={index} className="border rounded-lg p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-2 sm:space-y-0">
                        <h4 className="font-semibold text-sm sm:text-base">{project.name}</h4>
                        {project.link && (
                          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              View Project
                            </a>
                          </Button>
                        )}
                      </div>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{project.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateProfileModal;
