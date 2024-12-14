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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - replace with actual data from your backend
const mockParticipants = [
  {
    id: 1,
    name: "John Doe",
    eventType: "sports",
    school: "Sample School",
    status: "approved",
    qualification: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    eventType: "cultural",
    school: "Another School",
    status: "approved",
    qualification: "pending",
  },
];

const CoordinatorDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState(mockParticipants);
  const [filter, setFilter] = useState("all");

  const handleQualification = (participantId: number, isQualified: boolean) => {
    setParticipants(
      participants.map((p) =>
        p.id === participantId
          ? { ...p, qualification: isQualified ? "qualified" : "disqualified" }
          : p
      )
    );

    toast({
      title: `Participant ${isQualified ? "Qualified" : "Disqualified"}`,
      description: `The participant has been marked as ${
        isQualified ? "qualified" : "disqualified"
      }.`,
    });

    console.log(
      `Participant ${participantId} marked as ${
        isQualified ? "qualified" : "disqualified"
      }`
    );
  };

  const filteredParticipants = participants.filter((p) => {
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
              <TableHead>Status</TableHead>
              <TableHead>Qualification</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell>{participant.name}</TableCell>
                <TableCell className="capitalize">{participant.eventType}</TableCell>
                <TableCell>{participant.school}</TableCell>
                <TableCell className="capitalize">{participant.status}</TableCell>
                <TableCell className="capitalize">
                  {participant.qualification}
                </TableCell>
                <TableCell className="space-x-2">
                  {participant.status === "approved" &&
                    participant.qualification === "pending" && (
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