import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import StudentRegistration from "./pages/StudentRegistration";
import CoachDashboard from "./pages/CoachDashboard";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import OfficialGallery from "./pages/OfficialGallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/student/register" element={<StudentRegistration />} />
            <Route path="/coach/dashboard" element={<CoachDashboard />} />
            <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
            <Route path="/official/gallery" element={<OfficialGallery />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;