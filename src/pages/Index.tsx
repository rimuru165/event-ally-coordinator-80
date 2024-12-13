import { motion } from "framer-motion";
import { ArrowRight, Calendar, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const eventTypes = [
    {
      title: "Sports Events",
      description: "Athletic competitions and tournaments",
      icon: Award,
      color: "sports",
    },
    {
      title: "Cultural Events",
      description: "Art exhibitions and performances",
      icon: Users,
      color: "cultural",
    },
    {
      title: "Academic Events",
      description: "Competitions and symposiums",
      icon: Calendar,
      color: "academic",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Event Coordination
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-event-sports to-event-cultural"> Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your event management process with our comprehensive platform for coordinators, participants, and officials.
          </p>
          <Button 
            onClick={() => navigate("/login")}
            className="bg-black text-white hover:bg-gray-800 transition-all duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {eventTypes.map((event, index) => (
            <motion.div
              key={event.title}
              className={`event-card ${event.color}-card bg-white`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <event.icon className={`h-12 w-12 mb-4 text-event-${event.color}`} />
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;