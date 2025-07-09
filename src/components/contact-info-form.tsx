"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { ContactInfo } from "@/types/contact-info";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const contactInfoFormSchema = z.object({
  phone: z.string().optional().or(z.literal('')),
  email: z.string().email("Must be a valid email address.").optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  business_hours: z.string().optional().or(z.literal('')),
});

type ContactInfoFormValues = z.infer<typeof contactInfoFormSchema>;

interface ContactInfoFormProps {
  initialData?: ContactInfo | null;
  onSubmit: (values: ContactInfoFormValues) => void;
  isSubmitting: boolean;
}

export const ContactInfoForm = ({ initialData, onSubmit, isSubmitting }: ContactInfoFormProps) => {
  const form = useForm<ContactInfoFormValues>({
    resolver: zodResolver(contactInfoFormSchema),
    defaultValues: {
      phone: "",
      email: "",
      address: "",
      business_hours: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        phone: initialData.phone || "",
        email: initialData.email || "",
        address: initialData.address || "",
        business_hours: initialData.business_hours || "",
      });
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="(555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="info@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="123 Main St, Anytown, USA" className="resize-y" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="business_hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Hours</FormLabel>
              <FormControl>
                <Input placeholder="Mon-Fri: 9am-5pm EST" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            "Save Contact Info"
          )}
        </Button>
      </form>
    </Form>
  );
};