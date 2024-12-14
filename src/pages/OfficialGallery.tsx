import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Filter, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Registration {
  id: string;
  name: string;
  school: string;
  eventType: string;
  course: string;
  year: string;
  status: string;
  qualification: string;
}

const OfficialGallery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [schoolFilter, setSchoolFilter] = useState<string>("all");
  const [participants, setParticipants] = useState<Registration[]>([]);
  const [schools, setSchools] = useState<string[]>([]);

  useEffect(() => {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]') as Registration[];
    const qualifiedParticipants = registrations.filter(
      (r) => r.status === 'approved' && r.qualification === 'qualified'
    );
    setParticipants(qualifiedParticipants);

    const uniqueSchools = Array.from(new Set(qualifiedParticipants.map(p => p.school)));
    setSchools(uniqueSchools);
  }, []);

  const filteredParticipants = participants.filter((participant) => {
    return (
      (eventTypeFilter === "all" || participant.eventType === eventTypeFilter) &&
      (schoolFilter === "all" || participant.school === schoolFilter)
    );
  });

  const handlePrint = () => {
    toast({
      title: "Preparing Gallery for Print",
      description: "The gallery will open in a new window for printing.",
    });

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Generate print-friendly HTML
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Official Participant Gallery</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
            }
            .card {
              border: 1px solid #ddd;
              padding: 15px;
              border-radius: 8px;
            }
            .name {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            @media print {
              .card {
                break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Official Participant Gallery</h1>
            <p>Total Participants: ${filteredParticipants.length}</p>
          </div>
          <div class="grid">
            ${filteredParticipants.map(p => `
              <div class="card">
                <div class="name">${p.name}</div>
                <p><strong>School:</strong> ${p.school}</p>
                <p><strong>Event Type:</strong> ${p.eventType}</p>
                <p><strong>Course:</strong> ${p.course}</p>
                <p><strong>Year Level:</strong> ${p.year}</p>
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900/10 via-blue-900/10 to-cyan-900/10">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-cyan-700 hover:text-cyan-600 hover:bg-cyan-100/50"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Role Selection
          </Button>
          <Button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/20 transition-all duration-300"
          >
            <Printer className="h-4 w-4" />
            Print Gallery
          </Button>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Official Participant Gallery
          </h1>
          
          <div className="flex flex-wrap gap-4 print:hidden backdrop-blur-sm bg-white/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-cyan-700">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <Select onValueChange={setEventTypeFilter} defaultValue="all">
              <SelectTrigger className="w-[180px] border-cyan-200 bg-white/50 backdrop-blur-sm">
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
              <SelectTrigger className="w-[180px] border-cyan-200 bg-white/50 backdrop-blur-sm">
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
            {filteredParticipants.map((participant) => (
              <Card 
                key={participant.id} 
                className="overflow-hidden border-cyan-200 bg-white/40 backdrop-blur-sm hover:bg-white/50 transition-all duration-300 shadow-lg shadow-cyan-500/10"
              >
                <CardHeader>
                  <CardTitle className="text-cyan-900">{participant.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <div className="space-y-1 text-cyan-800">
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
              <p className="text-cyan-700">No qualified participants found matching the selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficialGallery;