import { Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GalleryFiltersProps {
  schools: string[];
  onEventTypeChange: (value: string) => void;
  onSchoolChange: (value: string) => void;
}

export const GalleryFilters = ({ schools, onEventTypeChange, onSchoolChange }: GalleryFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 print:hidden backdrop-blur-sm bg-white/5 p-6 rounded-lg border border-cyan-900/30 shadow-lg mb-8">
      <div className="flex items-center gap-2 text-cyan-300">
        <Filter className="h-4 w-4" />
        <span className="font-medium tracking-wide text-lg">Filters:</span>
      </div>
      
      <Select onValueChange={onEventTypeChange} defaultValue="all">
        <SelectTrigger className="w-[180px] border-cyan-900/30 bg-white/10 backdrop-blur-sm text-white">
          <SelectValue placeholder="Event Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Events</SelectItem>
          <SelectItem value="sports">Sports</SelectItem>
          <SelectItem value="cultural">Cultural</SelectItem>
          <SelectItem value="academic">Academic</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onSchoolChange} defaultValue="all">
        <SelectTrigger className="w-[180px] border-cyan-900/30 bg-white/10 backdrop-blur-sm text-white">
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
  );
};