import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useData } from "@/context/DataContext";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Employee name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(6, {
    message: "Phone number must be at least 6 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const EmployeeForm = () => {
  const { addEmployee } = useData();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // Generate a unique ID (in a real app, this would come from the backend)
      const newEmployee = {
        id: `employee-${Date.now()}`,
        name: values.name,
        phoneNumber: values.phoneNumber,
      };
      
      // Add the employee to database and state
      await addEmployee(newEmployee);
      
      // Show success message
      toast({
        title: "Success",
        description: `Employee "${values.name}" has been added successfully.`,
      });
      
      // Reset the form
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding employee:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter employee name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Employee"}
        </Button>
      </form>
    </Form>
  );
};

export default EmployeeForm;
