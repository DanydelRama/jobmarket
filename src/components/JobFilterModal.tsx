
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { AVAILABLE_SKILLS } from "@/data/mockData";

interface JobFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: {
    location: string;
    skills: string[];
    industry: string;
  };
  onFiltersChange: (filters: any) => void;
}

const JobFilterModal = ({ open, onOpenChange, filters, onFiltersChange }: JobFilterModalProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleSkillToggle = (skill: string) => {
    const updatedSkills = localFilters.skills.includes(skill)
      ? localFilters.skills.filter(s => s !== skill)
      : [...localFilters.skills, skill];
    
    setLocalFilters(prev => ({
      ...prev,
      skills: updatedSkills
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onOpenChange(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = { location: '', skills: [], industry: '' };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const industries = [
    'Technology', 'Finance', 'Marketing', 'Healthcare', 'Education', 
    'Agriculture', 'Tourism', 'Manufacturing', 'Design', 'Consulting'
  ];

  const locations = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier', 
    'Agadir', 'Meknes', 'Oujda', 'Tetouan', 'Kenitra'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Filter Jobs</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Location Filter */}
          <div>
            <Label className="text-base font-medium mb-3 block">Location</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {locations.map(location => (
                <Card 
                  key={location}
                  className={`cursor-pointer transition-all duration-200 ${
                    localFilters.location === location ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-soft'
                  }`}
                  onClick={() => setLocalFilters(prev => ({
                    ...prev,
                    location: prev.location === location ? '' : location
                  }))}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-sm font-medium">{location}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Industry Filter */}
          <div>
            <Label className="text-base font-medium mb-3 block">Industry</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {industries.map(industry => (
                <Card 
                  key={industry}
                  className={`cursor-pointer transition-all duration-200 ${
                    localFilters.industry === industry ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-soft'
                  }`}
                  onClick={() => setLocalFilters(prev => ({
                    ...prev,
                    industry: prev.industry === industry ? '' : industry
                  }))}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-sm font-medium">{industry}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Skills Filter */}
          <div>
            <Label className="text-base font-medium mb-3 block">Skills</Label>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg bg-gray-50">
              {AVAILABLE_SKILLS.map(skill => (
                <Badge
                  key={skill}
                  variant={localFilters.skills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    localFilters.skills.includes(skill) 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                  {localFilters.skills.includes(skill) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
            {localFilters.skills.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {localFilters.skills.length} skill{localFilters.skills.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClearFilters}>
            Clear All
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilters} className="gradient-bg">
              Apply Filters
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobFilterModal;
