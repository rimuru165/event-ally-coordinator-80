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
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-background via-background/95 to-background">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white hover:text-neon-cyan transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Role Selection
        </Button>
        <h1 className="text-3xl font-bold neon-text bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text">
          Coordinator Dashboard
        </h1>
      </div>

      <div className="mb-6">
        <Select onValueChange={setFilter} defaultValue={filter}>
          <SelectTrigger className="w-[180px] bg-card/30 backdrop-blur-sm border-neon-cyan/30 text-white">
            <SelectValue placeholder="Filter by event type" />
          </SelectTrigger>
          <SelectContent className="bg-card/80 backdrop-blur-md border-neon-cyan/30">
            <SelectItem value="all" className="text-white hover:bg-neon-blue/20">All Events</SelectItem>
            <SelectItem value="sports" className="text-white hover:bg-neon-blue/20">Sports</SelectItem>
            <SelectItem value="cultural" className="text-white hover:bg-neon-blue/20">Cultural</SelectItem>
            <SelectItem value="academic" className="text-white hover:bg-neon-blue/20">Academic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="glass-card rounded-lg shadow-lg overflow-hidden border border-neon-cyan/30">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-neon-cyan/20 bg-card/40">
              <TableHead className="text-white font-semibold tracking-wide">Name</TableHead>
              <TableHead className="text-white font-semibold tracking-wide">Event Type</TableHead>
              <TableHead className="text-white font-semibold tracking-wide">School</TableHead>
              <TableHead className="text-white font-semibold tracking-wide">Qualification</TableHead>
              <TableHead className="text-white font-semibold tracking-wide">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants.map((participant: any) => (
              <TableRow 
                key={participant.id} 
                className="border-b border-neon-cyan/10 hover:bg-neon-blue/5 transition-colors"
              >
                <TableCell className="font-medium text-white/90 tracking-wide">
                  {participant.name}
                </TableCell>
                <TableCell className="capitalize text-white/90 tracking-wide">
                  {participant.eventType}
                </TableCell>
                <TableCell className="text-white/90 tracking-wide">
                  {participant.school}
                </TableCell>
                <TableCell className="capitalize text-white/90 tracking-wide">
                  {participant.qualification || "pending"}
                </TableCell>
                <TableCell className="space-x-2">
                  {(!participant.qualification || participant.qualification === "pending") && (
                    <>
                      <Button
                        onClick={() => handleQualification(participant.id, true)}
                        className="bg-gradient-to-r from-neon-blue to-neon-cyan hover:from-neon-cyan hover:to-neon-blue text-white shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300"
                      >
                        Qualify
                      </Button>
                      <Button
                        onClick={() => handleQualification(participant.id, false)}
                        variant="destructive"
                        className="shadow-lg hover:shadow-destructive/50 transition-all duration-300"
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