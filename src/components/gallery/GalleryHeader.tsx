import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface GalleryHeaderProps {
  onPrint: () => void;
}

export const GalleryHeader = ({ onPrint }: GalleryHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePrint = () => {
    toast({
      title: "Preparing Gallery for Print",
      description: "The gallery will open in a new window for printing.",
    });
    onPrint();
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <Button
        variant="ghost"
        className="flex items-center gap-2 text-white hover:text-cyan-300 hover:bg-cyan-900/30"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-lg tracking-wide">Back to Role Selection</span>
      </Button>
      <Button
        onClick={handlePrint}
        className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/20 transition-all duration-300"
      >
        <Printer className="h-4 w-4" />
        Print Gallery
      </Button>
    </div>
  );
};