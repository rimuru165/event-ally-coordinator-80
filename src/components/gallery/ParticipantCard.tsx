import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ParticipantCardProps {
  name: string;
  school: string;
  eventType: string;
  course: string;
  year: string;
}

export const ParticipantCard = ({ name, school, eventType, course, year }: ParticipantCardProps) => {
  return (
    <Card className="overflow-hidden border-cyan-900/30 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent tracking-wide">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2 text-white tracking-wide">
          <p className="flex justify-between">
            <span className="text-cyan-300 font-medium">School:</span>
            <span className="text-right">{school}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-cyan-300 font-medium">Event Type:</span>
            <span className="capitalize">{eventType}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-cyan-300 font-medium">Course:</span>
            <span>{course}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-cyan-300 font-medium">Year Level:</span>
            <span>{year}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};