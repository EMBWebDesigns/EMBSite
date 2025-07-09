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
import { SocialLink } from "@/types/social-link";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const socialLinkFormSchema = z.object({
  platform: z.string().min(2, "Platform name is required."),
  url: z.string().url("Must be a valid URL."),
  icon_name: z.string().min(1, "Icon name is required (e.g., 'Github', 'Twitter')."),
  display_order: z.coerce.number().min(0, "Display order must be a non-negative number."),
});

type SocialLinkFormValues = z.infer<typeof socialLinkFormSchema>;

interface SocialLinkFormProps {
  initialData?: SocialLink | null;
  onSubmit: (values: SocialLinkFormValues) => void;
  isSubmitting: boolean;
}

export const SocialLinkForm = ({ initialData, onSubmit, isSubmitting }: SocialLinkFormProps) => {
  const form = useForm<SocialLinkFormValues>({
    resolver: zodResolver(socialLinkFormSchema),
    defaultValues: {
      platform: "",
      url: "",
      icon_name: "",
      display_order: 0, // Explicitly setting default value here
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        platform: initialData.platform,
        url: initialData.url,
        icon_name: initialData.icon_name,
        display_order: initialData.display_order,
      });
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Facebook, Twitter, LinkedIn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://facebook.com/yourpage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lucide Icon Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Facebook, Twitter, Linkedin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="display_order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
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
            "Save Link"
          )}
        </Button>
      </form>
    </Form>
  );
};