"use client";

import { useAuth } from "@/components/auth-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AvatarUploader } from "@/components/avatar-uploader";

const accountFormSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters."),
  avatar_url: z.string().url().optional().or(z.literal('')),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export default function AccountPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      full_name: "",
      avatar_url: "",
    },
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    if (profile) {
      form.reset({
        full_name: profile.full_name || "",
        avatar_url: profile.avatar_url || "",
      });
    }
  }, [user, profile, loading, router, form]);

  async function onSubmit(data: AccountFormValues) {
    if (!user) return;
    setIsSubmitting(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: data.full_name,
        avatar_url: data.avatar_url,
      })
      .eq("id", user.id);

    setIsSubmitting(false);

    if (error) {
      toast.error("Failed to update profile.", { description: error.message });
    } else {
      toast.success("Profile updated successfully!");
      // Re-fetch session to get updated user data in the app
      supabase.auth.refreshSession();
    }
  }

  if (loading || !user || !profile) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16 md:px-6 md:py-24">
        <Skeleton className="h-10 w-1/2 mb-2" />
        <Skeleton className="h-6 w-3/4 mb-8" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-8">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-24" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account details and preferences.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This is how others will see you on the site.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="avatar_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <AvatarUploader
                        uid={user.id}
                        url={field.value}
                        onUpload={(url) => {
                          field.onChange(url);
                          // We can trigger a save immediately after upload
                          // or let the user save all changes at once.
                          // For simplicity, we'll let them save all at once.
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input value={user.email} disabled />
              </FormItem>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}