"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SocialLink } from "@/types/social-link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { MoreHorizontal, PlusCircle, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { SocialLinkForm } from "./social-link-form";
import { Skeleton } from "./ui/skeleton";
import { useAuth } from "./auth-provider";
import { useRouter } from "next/navigation";

export function SocialLinksAdmin() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        toast.error("Failed to fetch social links.", { description: error.message });
      } else {
        setSocialLinks(data as SocialLink[]);
      }
      setLoading(false);
    };

    if (user) {
      fetchSocialLinks();
    }
  }, [user]);

  const handleFormSubmit = async (values: any) => {
    setIsSubmitting(true);
    let error;
    if (editingLink) {
      ({ error } = await supabase.from("social_links").update(values).eq("id", editingLink.id));
    } else {
      ({ error } = await supabase.from("social_links").insert([values]));
    }

    if (error) {
      toast.error(`Failed to ${editingLink ? 'update' : 'create'} social link.`, { description: error.message });
    } else {
      toast.success(`Social link ${editingLink ? 'updated' : 'created'} successfully!`);
      const { data: updatedData } = await supabase.from("social_links").select("*").order("display_order", { ascending: true });
      setSocialLinks(updatedData as SocialLink[]);
      setIsFormOpen(false);
      setEditingLink(null);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("social_links").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete social link.", { description: error.message });
    } else {
      toast.success("Social link deleted.");
      setSocialLinks(socialLinks.filter(link => link.id !== id));
    }
  };

  if (authLoading || loading) {
    return <Skeleton className="h-48 w-full" />;
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={isFormOpen} onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingLink(null);
        }}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Social Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingLink ? "Edit Social Link" : "Create New Social Link"}</DialogTitle>
              <DialogDescription>Fill out the details for the social media link.</DialogDescription>
            </DialogHeader>
            <SocialLinkForm
              initialData={editingLink}
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Order</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {socialLinks.length > 0 ? socialLinks.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-medium">{link.platform}</TableCell>
                <TableCell className="text-muted-foreground">{link.url}</TableCell>
                <TableCell>{link.display_order}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onSelect={() => {
                        setEditingLink(link);
                        setIsFormOpen(true);
                      }}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(link.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No social links found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}