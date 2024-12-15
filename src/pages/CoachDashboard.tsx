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

const CoachDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    setParticipants(registrations);
  }, []);

  const handleApproval = (participantId: string, isApproved: boolean) => {
    const updatedParticipants = participants.map((p: any) =>
      p.id === participantId
        ? { ...p, status: isApproved ? "approved" : "rejected" }
        : p
    );

    localStorage.setItem('registrations', JSON.stringify(updatedParticipants));
    setParticipants(updatedParticipants);

    toast({
      title: `Registration ${isApproved ? "Approved" : "Rejected"}`,
      description: `The participant has been ${
        isApproved ? "approved" : "rejected"
      }.`,
    });
  };

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
        <h1 className="text-3xl font-bold neon-text">Coach Dashboard</h1>
      </div>

      <div className="glass-card rounded-lg shadow-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10">
              <TableHead className="text-white/90">Name</TableHead>
              <TableHead className="text-white/90">Event Type</TableHead>
              <TableHead className="text-white/90">School</TableHead>
              <TableHead className="text-white/90">Status</TableHead>
              <TableHead className="text-white/90">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant: any) => (
              <TableRow key={participant.id} className="border-b border-white/5">
                <TableCell className="font-medium text-white/90">{participant.name}</TableCell>
                <TableCell className="capitalize text-white/90">{participant.eventType}</TableCell>
                <TableCell className="text-white/90">{participant.school}</TableCell>
                <TableCell className="capitalize text-white/90">{participant.status}</TableCell>
                <TableCell className="space-x-2">
                  {participant.status === "pending" && (
                    <>
                      <Button
                        onClick={() => handleApproval(participant.id, true)}
                        className="bg-gradient-to-r from-neon-blue to-neon-cyan hover:from-neon-cyan hover:to-neon-blue text-white shadow-lg"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleApproval(participant.id, false)}
                        variant="destructive"
                        className="shadow-lg"
                      >
                        Reject
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

export default CoachDashboard;