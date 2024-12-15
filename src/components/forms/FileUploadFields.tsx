import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploadFieldsProps {
  form: UseFormReturn<any>;
}

const FileUploadFields = ({ form }: FileUploadFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="photo"
        render={({ field: { onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Photo</FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
                  {...field}
                  value={field.value?.filename || ''}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neon-blue/10 file:text-neon-blue hover:file:bg-neon-blue/20"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  className="bg-gradient-to-r from-neon-blue/10 to-neon-cyan/10 hover:from-neon-blue/20 hover:to-neon-cyan/20"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="registrarCert"
        render={({ field: { onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Registrar's Certification</FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
                  {...field}
                  value={field.value?.filename || ''}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neon-blue/10 file:text-neon-blue hover:file:bg-neon-blue/20"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  className="bg-gradient-to-r from-neon-blue/10 to-neon-cyan/10 hover:from-neon-blue/20 hover:to-neon-cyan/20"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="psaCopy"
        render={({ field: { onChange, ...field } }) => (
          <FormItem>
            <FormLabel>PSA Birth Certificate Copy</FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
                  {...field}
                  value={field.value?.filename || ''}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neon-blue/10 file:text-neon-blue hover:file:bg-neon-blue/20"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  className="bg-gradient-to-r from-neon-blue/10 to-neon-cyan/10 hover:from-neon-blue/20 hover:to-neon-cyan/20"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FileUploadFields;