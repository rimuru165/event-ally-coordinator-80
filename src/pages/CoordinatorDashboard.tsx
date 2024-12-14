import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CoordinatorDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    const approvedRegistrations = registrations.filter((r: any) => r.status === 'approved');
    setParticipants(approvedRegistrations);
  }, []);

  const handleQualification = (participantId: string, isQualified: boolean) => {
    const allRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    const updatedRegistrations = allRegistrations.map((p: any) =>
      p.id === participantId
        ? { ...p, qualification: isQualified ? "qualified" : "disqualified" }
        : p
    );

    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
    
    const approvedRegistrations = updatedRegistrations.filter((r: any) => r.status === 'approved');
    setParticipants(approvedRegistrations);

    toast({
      title: `Participant ${isQualified ? "Qualified" : "Disqualified"}`,
      description: `The participant has been marked as ${
        isQualified ? "qualified" : "disqualified"
      }.`,
    });
  };

  const filteredParticipants = participants.filter((p: any) => {
    if (filter === "all") return true;
    return p.eventType === filter;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Role Selection
        </Button>
        <h1 className="text-3xl font-bold">Coordinator Dashboard</h1>
      </div>

      <div className="mb-4">
        <Select onValueChange={setFilter} defaultValue={filter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="cultural">Cultural</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>School</TableHead>
              <TableHead>Qualification</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants.map((participant: any) => (
              <TableRow key={participant.id}>
                <TableCell>{participant.name}</TableCell>
                <TableCell className="capitalize">{participant.eventType}</TableCell>
                <TableCell>{participant.school}</TableCell>
                <TableCell className="capitalize">{participant.qualification}</TableCell>
                <TableCell className="space-x-2">
                  {participant.qualification === "pending" && (
                    <>
                      <Button
                        onClick={() => handleQualification(participant.id, true)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Qualify
                      </Button>
                      <Button
                        onClick={() => handleQualification(participant.id, false)}
                        variant="destructive"
                      >
                        Disqualify
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;