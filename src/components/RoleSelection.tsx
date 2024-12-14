import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { User, UserCog, Users, Award } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Student/Participant",
      description: "Register as an athlete, artist, or student participant",
      icon: <User className="w-6 h-6" />,
      path: "/student/register",
      color: "bg-gradient-to-br from-neon-blue/20 to-neon-cyan/20",
    },
    {
      title: "Coach/Teacher/Trainer",
      description: "Manage and approve participant registrations",
      icon: <UserCog className="w-6 h-6" />,
      path: "/coach/dashboard",
      color: "bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20",
    },
    {
      title: "Event Coordinator",
      description: "Manage events and participant qualifications",
      icon: <Users className="w-6 h-6" />,
      path: "/coordinator/dashboard",
      color: "bg-gradient-to-br from-neon-blue/20 to-neon-cyan/20",
    },
    {
      title: "Event Official",
      description: "Access and review approved participant galleries",
      icon: <Award className="w-6 h-6" />,
      path: "/official/gallery",
      color: "bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {roles.map((role) => (
        <Card key={role.title} className="glass-card group hover:neon-border">
          <CardHeader className={`${role.color} rounded-t-lg border-b border-white/10`}>
            <div className="flex items-center gap-3 text-foreground">
              {role.icon}
              <CardTitle className="neon-text">{role.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <CardDescription className="text-foreground/80 mb-4">{role.description}</CardDescription>
            <Button 
              onClick={() => navigate(role.path)} 
              className="w-full bg-gradient-to-r from-neon-blue to-neon-cyan hover:from-neon-cyan hover:to-neon-blue text-white shadow-lg"
            >
              Continue as {role.title}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RoleSelection;