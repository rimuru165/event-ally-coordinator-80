import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Filter, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const OfficialGallery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [schoolFilter, setSchoolFilter] = useState<string>("all");
  const [participants, setParticipants] = useState([]);
  const [schools, setSchools] = useState<string[]>([]);

  useEffect(() => {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    const qualifiedParticipants = registrations.filter(
      (r: any) => r.status === 'approved' && r.qualification === 'qualified'
    );
    setParticipants(qualifiedParticipants);

    // Get unique schools
    const uniqueSchools = Array.from(new Set(qualifiedParticipants.map((p: any) => p.school)));
    setSchools(uniqueSchools);
  }, []);

  const filteredParticipants = participants.filter((participant: any) => {
    return (
      (eventTypeFilter === "all" || participant.eventType === eventTypeFilter) &&
      (schoolFilter === "all" || participant.school === schoolFilter)
    );
  });

  const handlePrint = () => {
    toast({
      title: "Printing Gallery",
      description: "The gallery is being prepared for printing.",
    });
    window.print();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Role Selection
        </Button>
        <Button
          onClick={handlePrint}
          className="flex items-center gap-2"
        >
          <Printer className="h-4 w-4" />
          Print Gallery
        </Button>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Official Participant Gallery</h1>
        
        <div className="flex flex-wrap gap-4 print:hidden">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters:</span>
          </div>
          
          <Select onValueChange={setEventTypeFilter} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setSchoolFilter} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="School" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schools</SelectItem>
              {schools.map((school) => (
                <SelectItem key={school} value={school}>{school}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParticipants.map((participant: any) => (
            <Card key={participant.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{participant.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <div className="space-y-1">
                  <p><span className="font-medium">School:</span> {participant.school}</p>
                  <p><span className="font-medium">Event Type:</span> {participant.eventType}</p>
                  <p><span className="font-medium">Course:</span> {participant.course}</p>
                  <p><span className="font-medium">Year Level:</span> {participant.year}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredParticipants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No qualified participants found matching the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficialGallery;