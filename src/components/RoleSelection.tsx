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
      color: "bg-event-sports",
    },
    {
      title: "Coach/Teacher/Trainer",
      description: "Manage and approve participant registrations",
      icon: <UserCog className="w-6 h-6" />,
      path: "/coach/dashboard",
      color: "bg-event-cultural",
    },
    {
      title: "Event Coordinator",
      description: "Manage events and participant qualifications",
      icon: <Users className="w-6 h-6" />,
      path: "/coordinator/dashboard",
      color: "bg-event-academic",
    },
    {
      title: "Event Official",
      description: "Access and review approved participant galleries",
      icon: <Award className="w-6 h-6" />,
      path: "/official/gallery",
      color: "bg-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {roles.map((role) => (
        <Card key={role.title} className="group hover:shadow-lg transition-shadow">
          <CardHeader className={`${role.color} text-white rounded-t-lg`}>
            <div className="flex items-center gap-3">
              {role.icon}
              <CardTitle>{role.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <CardDescription className="mb-4">{role.description}</CardDescription>
            <Button 
              onClick={() => navigate(role.path)} 
              className="w-full"
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