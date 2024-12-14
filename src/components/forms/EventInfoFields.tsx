import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface EventInfoFieldsProps {
  form: UseFormReturn<any>;
}

const EventInfoFields = ({ form }: EventInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="highSchoolGradYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>High School Graduation Year</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="eventType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Event Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="school"
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input placeholder="Enter your school" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default EventInfoFields;