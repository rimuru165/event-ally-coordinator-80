import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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

// Mock data - replace with actual data from your backend
const mockParticipants = [
  {
    id: 1,
    name: "John Doe",
    eventType: "sports",
    school: "Sample School",
    status: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    eventType: "cultural",
    school: "Another School",
    status: "pending",
  },
];

const CoachDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState(mockParticipants);

  const handleApproval = (participantId: number, isApproved: boolean) => {
    setParticipants(
      participants.map((p) =>
        p.id === participantId
          ? { ...p, status: isApproved ? "approved" : "rejected" }
          : p
      )
    );

    toast({
      title: `Registration ${isApproved ? "Approved" : "Rejected"}`,
      description: `The participant has been ${
        isApproved ? "approved" : "rejected"
      }.`,
    });

    console.log(
      `Participant ${participantId} ${isApproved ? "approved" : "rejected"}`
    );
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
            {participants.map((participant) => (
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