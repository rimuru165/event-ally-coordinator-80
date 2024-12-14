import { motion } from "framer-motion";
import RoleSelection from "@/components/RoleSelection";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto p-6"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Event Registration Portal</h1>
        <p className="text-muted-foreground text-lg">
          Select your role to continue with registration or access your dashboard
        </p>
      </div>
      
      <RoleSelection />
      
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Please select the appropriate role that matches your participation in the event.</p>
      </footer>
    </motion.div>
  );
};

export default Index;