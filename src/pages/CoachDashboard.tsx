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
        <h1 className="text-3xl font-bold">Coach Dashboard</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>School</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant: any) => (
              <TableRow key={participant.id}>
                <TableCell>{participant.name}</TableCell>
                <TableCell className="capitalize">{participant.eventType}</TableCell>
                <TableCell>{participant.school}</TableCell>
                <TableCell className="capitalize">{participant.status}</TableCell>
                <TableCell className="space-x-2">
                  {participant.status === "pending" && (
                    <>
                      <Button
                        onClick={() => handleApproval(participant.id, true)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleApproval(participant.id, false)}
                        variant="destructive"
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