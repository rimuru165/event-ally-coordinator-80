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
import { supabase } from "@/integrations/supabase/client";

const CoordinatorDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    const { data, error } = await supabase
      .from('participants')
      .select('*')
      .eq('status', 'approved');
    
    if (error) {
      toast({
        title: "Error fetching participants",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setParticipants(data || []);
  };

  const handleQualification = async (participantId, isQualified) => {
    const { error } = await supabase
      .from('participants')
      .update({ qualification: isQualified ? 'qualified' : 'disqualified' })
      .eq('id', participantId);

    if (error) {
      toast({
        title: "Error updating qualification",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    await fetchParticipants();
    
    toast({
      title: `Participant ${isQualified ? "Qualified" : "Disqualified"}`,
      description: `The participant has been marked as ${isQualified ? "qualified" : "disqualified"}.`,
    });
  };

  const filteredParticipants = participants.filter((p) => {
    if (filter === "all") return true;
    return p.event_type === filter;
  });

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Role Selection
        </Button>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 tracking-wide">
          Coordinator Dashboard
        </h1>
      </div>

      <div className="mb-6">
        <Select onValueChange={setFilter} defaultValue={filter}>
          <SelectTrigger className="w-[180px] bg-white/5 backdrop-blur-sm border-cyan-900/30 text-white">
            <SelectValue placeholder="Filter by event type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800/90 backdrop-blur-md border-cyan-900/30">
            <SelectItem value="all" className="text-white hover:bg-cyan-500/20">All Events</SelectItem>
            <SelectItem value="sports" className="text-white hover:bg-cyan-500/20">Sports</SelectItem>
            <SelectItem value="cultural" className="text-white hover:bg-cyan-500/20">Cultural</SelectItem>
            <SelectItem value="academic" className="text-white hover:bg-cyan-500/20">Academic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="glass-card rounded-lg shadow-lg overflow-hidden border border-cyan-900/30">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-cyan-900/20 bg-white/5 backdrop-blur-sm">
              <TableHead className="text-cyan-100 font-semibold tracking-wide">Name</TableHead>
              <TableHead className="text-cyan-100 font-semibold tracking-wide">Event Type</TableHead>
              <TableHead className="text-cyan-100 font-semibold tracking-wide">School</TableHead>
              <TableHead className="text-cyan-100 font-semibold tracking-wide">Qualification</TableHead>
              <TableHead className="text-cyan-100 font-semibold tracking-wide">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants.map((participant) => (
              <TableRow 
                key={participant.id} 
                className="border-b border-cyan-900/10 hover:bg-white/5 transition-colors backdrop-blur-sm"
              >
                <TableCell className="font-medium text-white tracking-wide">
                  {participant.name}
                </TableCell>
                <TableCell className="capitalize text-white tracking-wide">
                  {participant.event_type}
                </TableCell>
                <TableCell className="text-white tracking-wide">
                  {participant.school}
                </TableCell>
                <TableCell className="capitalize text-white tracking-wide">
                  {participant.qualification || "pending"}
                </TableCell>
                <TableCell className="space-x-2">
                  {(!participant.qualification || participant.qualification === "pending") && (
                    <>
                      <Button
                        onClick={() => handleQualification(participant.id, true)}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                      >
                        Qualify
                      </Button>
                      <Button
                        onClick={() => handleQualification(participant.id, false)}
                        variant="destructive"
                        className="shadow-lg hover:shadow-red-500/20 transition-all duration-300"
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