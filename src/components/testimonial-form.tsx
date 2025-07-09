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
import { Testimonial } from "@/types/testimonial";
import { useEffect } from "react";

const testimonialFormSchema = z.object({
  name: z.string().min(2, "Name is required."),
  title: z.string().min(2, "Title is required."),
  quote: z.string().min(10, "Quote must be at least 10 characters."),
  avatar_url: z.string().url("Must be a valid URL.").optional().or(z.literal('')),
  initials: z.string().max(2).optional(),
});

type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;

interface TestimonialFormProps {
  initialData?: Testimonial | null;
  onSubmit: (values: TestimonialFormValues) => void;
  isSubmitting: boolean;
}

export const TestimonialForm = ({ initialData, onSubmit, isSubmitting }: TestimonialFormProps) => {
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: "",
      title: "",
      quote: "",
      avatar_url: "",
      initials: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        title: initialData.title,
        quote: initialData.quote,
        avatar_url: initialData.avatar_url || "",
        initials: initialData.initials || "",
      });
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title / Company</FormLabel>
              <FormControl>
                <Input placeholder="CEO, Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quote</FormLabel>
              <FormControl>
                <Textarea placeholder="This product is amazing..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/avatar.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="initials"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initials</FormLabel>
              <FormControl>
                <Input placeholder="JD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Testimonial"}
        </Button>
      </form>
    </Form>
  );
};