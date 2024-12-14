import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Filter, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface Participant {
  id: string;
  name: string;
  eventType: "sports" | "cultural" | "academic";
  school: string;
  status: "approved" | "pending" | "rejected";
  photoUrl: string;
}

// Mock data - replace with actual API call later
const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "John Doe",
    eventType: "sports",
    school: "Engineering",
    status: "approved",
    photoUrl: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Jane Smith",
    eventType: "cultural",
    school: "Arts",
    status: "approved",
    photoUrl: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Bob Johnson",
    eventType: "academic",
    school: "Science",
    status: "approved",
    photoUrl: "/placeholder.svg"
  }
];

const OfficialGallery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [schoolFilter, setSchoolFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("approved");

  const filteredParticipants = mockParticipants.filter(participant => {
    return (
      (eventTypeFilter === "all" || participant.eventType === eventTypeFilter) &&
      (schoolFilter === "all" || participant.school === schoolFilter) &&
      (statusFilter === "all" || participant.status === statusFilter)
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
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Arts">Arts</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setStatusFilter} defaultValue="approved">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParticipants.map((participant) => (
            <Card key={participant.id} className="overflow-hidden">
              <CardHeader className={`bg-event-${participant.eventType}`}>
                <CardTitle className="text-white">{participant.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <img
                  src={participant.photoUrl}
                  alt={participant.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="space-y-1">
                  <p><span className="font-medium">School:</span> {participant.school}</p>
                  <p><span className="font-medium">Event Type:</span> {participant.eventType}</p>
                  <p><span className="font-medium">Status:</span> {participant.status}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredParticipants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No participants found matching the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficialGallery;