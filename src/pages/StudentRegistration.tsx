import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PersonalInfoFields from "@/components/forms/PersonalInfoFields";
import AcademicInfoFields from "@/components/forms/AcademicInfoFields";
import EventInfoFields from "@/components/forms/EventInfoFields";
import FileUploadFields from "@/components/forms/FileUploadFields";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  dateOfBirth: z.string(),
  age: z.number().min(0).max(100),
  nationality: z.string().min(2),
  year: z.string(),
  course: z.string().min(2),
  academicLoadUnits: z.number().min(0),
  yearsOfParticipation: z.number().min(0),
  highSchoolGradYear: z.number(),
  eventType: z.enum(["sports", "cultural", "academic"]),
  school: z.string(),
  photo: z.any(),
  registrarCert: z.any(),
  psaCopy: z.any(),
});

const StudentRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
      age: 0,
      nationality: "",
      year: "",
      course: "",
      academicLoadUnits: 0,
      yearsOfParticipation: 0,
      highSchoolGradYear: new Date().getFullYear(),
      eventType: "sports",
      school: "",
    },
  });

  const uploadFile = async (file: File, participantId: string, fileType: string) => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const filePath = `${participantId}/${fileType}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('participant_files')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw new Error(`Error uploading ${fileType}`);
    }

    const { error: dbError } = await supabase
      .from('participant_files')
      .insert({
        participant_id: participantId,
        file_type: fileType,
        file_path: filePath,
      });

    if (dbError) {
      console.error('Error saving file metadata:', dbError);
      throw new Error(`Error saving ${fileType} metadata`);
    }

    return filePath;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to register",
          variant: "destructive",
        });
        return;
      }

      // Insert participant data
      const { data: participant, error: participantError } = await supabase
        .from('participants')
        .insert({
          user_id: user.id,
          name: values.name,
          date_of_birth: values.dateOfBirth,
          age: values.age,
          nationality: values.nationality,
          year: values.year,
          course: values.course,
          academic_load_units: values.academicLoadUnits,
          years_of_participation: values.yearsOfParticipation,
          high_school_grad_year: values.highSchoolGradYear,
          event_type: values.eventType,
          school: values.school,
        })
        .select()
        .single();

      if (participantError) {
        throw new Error('Error creating participant profile');
      }

      // Upload files
      await Promise.all([
        uploadFile(values.photo, participant.id, 'photo'),
        uploadFile(values.registrarCert, participant.id, 'registrar_cert'),
        uploadFile(values.psaCopy, participant.id, 'psa_copy'),
      ]);

      toast({
        title: "Registration Successful",
        description: "Your registration has been submitted successfully.",
      });

      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto p-6 max-w-2xl"
    >
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Role Selection
        </Button>
        <h1 className="text-3xl font-bold">Student Registration</h1>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-8 glass-card p-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold neon-text">Personal Information</h2>
              <PersonalInfoFields form={form} />
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold neon-text">Academic Information</h2>
              <AcademicInfoFields form={form} />
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold neon-text">Event Information</h2>
              <EventInfoFields form={form} />
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold neon-text">Required Documents</h2>
              <FileUploadFields form={form} />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-neon-blue to-neon-cyan hover:from-neon-cyan hover:to-neon-blue text-white shadow-lg"
          >
            Submit Registration
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default StudentRegistration;