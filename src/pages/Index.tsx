
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AuthModal from "@/components/AuthModal";
import { Briefcase, Users, Search, Star, TrendingUp, Globe } from "lucide-react";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: "2,500+" },
    { icon: Users, label: "Companies", value: "450+" },
    { icon: Star, label: "Success Rate", value: "94%" },
    { icon: TrendingUp, label: "Placements", value: "1,200+" }
  ];

  const features = [
    {
      title: "For Job Seekers",
      description: "Find your dream job with our advanced matching algorithm",
      items: ["Smart job recommendations", "Resume builder", "Interview scheduling", "Career guidance"]
    },
    {
      title: "For Recruiters", 
      description: "Connect with top talent efficiently",
      items: ["AI-powered candidate filtering", "Bulk application management", "Interview coordination", "Analytics dashboard"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-5"></div>
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-2xl shadow-soft">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ml-3">
                TalentHub Morocco
              </h1>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connect Talent with
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Opportunity</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Morocco's premier job platform connecting skilled professionals with innovative companies. 
              Build your career or find the perfect candidate with our AI-powered matching system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg gradient-bg hover:shadow-glow transform hover:scale-105 transition-all duration-200"
                onClick={() => handleAuth('signup')}
              >
                Get Started Today
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-2 hover:border-primary hover:shadow-soft transform hover:scale-105 transition-all duration-200"
                onClick={() => handleAuth('signin')}
              >
                Sign In
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                🏆 #1 Job Platform in Morocco
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                ⚡ AI-Powered Matching
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                🔒 Secure & Private
              </Badge>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-slide-in">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-soft transition-all duration-200 border-0 shadow-sm">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Everyone
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're seeking your next opportunity or looking for the perfect candidate, 
              we have the tools to make it happen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-soft transition-all duration-200 border-0 shadow-sm animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 gradient-bg">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have found their perfect match on TalentHub Morocco.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-4 text-lg bg-white text-primary hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
              onClick={() => handleAuth('signup')}
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>

      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        mode={authMode}
      />
    </div>
  );
};

export default Index;
