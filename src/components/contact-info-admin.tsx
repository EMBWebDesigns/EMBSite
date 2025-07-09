"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ContactInfo } from "@/types/contact-info";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ContactInfoForm } from "./contact-info-form";
import { Skeleton } from "./ui/skeleton";
import { useAuth } from "./auth-provider";
import { useRouter } from "next/navigation";

export function ContactInfoAdmin() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchContactInfo = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("contact_info")
        .select("*")
        .single(); // Assuming only one contact info entry

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        toast.error("Failed to fetch contact info.", { description: error.message });
      } else if (data) {
        setContactInfo(data as ContactInfo);
      }
      setLoading(false);
    };

    if (user) {
      fetchContactInfo();
    }
  }, [user]);

  const handleFormSubmit = async (values: any) => {
    setIsSubmitting(true);
    let error;

    if (contactInfo) {
      // Update existing entry
      ({ error } = await supabase.from("contact_info").update(values).eq("id", contactInfo.id));
    } else {
      // Insert new entry
      ({ error } = await supabase.from("contact_info").insert([values]));
    }

    if (error) {
      toast.error(`Failed to ${contactInfo ? 'update' : 'create'} contact info.`, { description: error.message });
    } else {
      toast.success(`Contact info ${contactInfo ? 'updated' : 'created'} successfully!`);
      // Re-fetch to ensure state is updated with new data (e.g., ID for new entry)
      const { data: updatedData } = await supabase.from("contact_info").select("*").single();
      setContactInfo(updatedData as ContactInfo);
    }
    setIsSubmitting(false);
  };

  if (authLoading || loading) {
    return <Skeleton className="h-64 w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Manage the public contact details for your website.</CardDescription>
      </CardHeader>
      <CardContent>
        <ContactInfoForm
          initialData={contactInfo}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </CardContent>
    </Card>
  );
}