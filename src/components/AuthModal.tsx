
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Building2 } from "lucide-react";
import MultiStepSignUp from "./MultiStepSignUp";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'signin' | 'signup';
}

const AuthModal = ({ open, onOpenChange, mode }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(mode === 'signup');
  const [userType, setUserType] = useState<'jobseeker' | 'recruiter'>('jobseeker');
  const [showMultiStep, setShowMultiStep] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { toast } = useToast();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app this would connect to Supabase
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      fullName: 'John Doe', // Mock data
      userType,
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    toast({
      title: "Welcome back!",
      description: "You have been signed in successfully.",
    });
    
    onOpenChange(false);
    
    // Redirect based on user type
    if (userType === 'jobseeker') {
      window.location.href = '/dashboard/jobseeker';
    } else {
      window.location.href = '/dashboard/recruiter'; 
    }
  };

  const handleSignUpStart = () => {
    setShowMultiStep(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (showMultiStep) {
    return (
      <MultiStepSignUp
        open={open}
        onOpenChange={(open) => {
          if (!open) {
            setShowMultiStep(false);
          }
          onOpenChange(open);
        }}
        userType={userType}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={isSignUp ? (e) => { e.preventDefault(); handleSignUpStart(); } : handleSignIn} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">I am a:</Label>
            <RadioGroup 
              value={userType} 
              onValueChange={(value) => setUserType(value as 'jobseeker' | 'recruiter')}
              className="grid grid-cols-2 gap-4"
            >
              <Card className={`cursor-pointer transition-all duration-200 ${userType === 'jobseeker' ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-soft'}`}>
                <CardContent className="p-4 text-center">
                  <RadioGroupItem value="jobseeker" id="jobseeker" className="sr-only" />
                  <Label htmlFor="jobseeker" className="cursor-pointer">
                    <User className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">Job Seeker</div>
                    <div className="text-sm text-gray-600">Find opportunities</div>
                  </Label>
                </CardContent>
              </Card>

              <Card className={`cursor-pointer transition-all duration-200 ${userType === 'recruiter' ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-soft'}`}>
                <CardContent className="p-4 text-center">
                  <RadioGroupItem value="recruiter" id="recruiter" className="sr-only" />
                  <Label htmlFor="recruiter" className="cursor-pointer">
                    <Building2 className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">Recruiter</div>
                    <div className="text-sm text-gray-600">Find talent</div>
                  </Label>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-bg hover:shadow-glow transform hover:scale-[1.02] transition-all duration-200"
            size="lg"
          >
            {isSignUp ? 'Continue with Sign Up' : 'Sign In'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
