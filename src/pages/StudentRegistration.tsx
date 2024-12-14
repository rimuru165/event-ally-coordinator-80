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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Get existing registrations or initialize empty array
    const existingRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    
    // Add new registration with pending status
    const newRegistration = {
      ...values,
      id: Date.now().toString(),
      status: 'pending',
      qualification: 'pending'
    };
    
    // Save updated registrations
    localStorage.setItem('registrations', JSON.stringify([...existingRegistrations, newRegistration]));

    toast({
      title: "Registration Submitted",
      description: "Your registration has been submitted for review.",
    });

    navigate('/');
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <PersonalInfoFields form={form} />
            <AcademicInfoFields form={form} />
            <EventInfoFields form={form} />
          </div>

          <Button type="submit" className="w-full">
            Submit Registration
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StudentRegistration;