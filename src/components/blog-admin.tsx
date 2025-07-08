"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { MoreHorizontal, PlusCircle, Trash2, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Post } from "@/types/blog";
import { PostForm } from "@/components/post-form";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogAdmin() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to fetch posts.", { description: error.message });
      } else {
        setPosts(data as Post[]);
      }
      setLoading(false);
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleFormSubmit = async (values: any) => {
    setIsSubmitting(true);
    const postData = {
      ...values,
      tags: values.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
    };

    let error;
    if (editingPost) {
      // Update
      ({ error } = await supabase.from("posts").update(postData).eq("id", editingPost.id));
    } else {
      // Create
      ({ error } = await supabase.from("posts").insert([postData]));
    }

    if (error) {
      toast.error(`Failed to ${editingPost ? 'update' : 'create'} post.`, { description: error.message });
    } else {
      toast.success(`Post ${editingPost ? 'updated' : 'created'} successfully!`);
      const { data: updatedPosts } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
      setPosts(updatedPosts as Post[]);
      setIsFormOpen(false);
      setEditingPost(null);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (postId: number) => {
    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (error) {
      toast.error("Failed to delete post.", { description: error.message });
    } else {
      toast.success("Post deleted.");
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  if (authLoading || loading) {
    return (
      <div>
        <div className="flex justify-end mb-4">
            <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-48 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
        <div className="flex justify-end mb-4">
            <Dialog open={isFormOpen} onOpenChange={(open) => {
            setIsFormOpen(open);
            if (!open) setEditingPost(null);
            }}>
            <DialogTrigger asChild>
                <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Post
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                <DialogTitle>{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
                <DialogDescription>
                    Fill out the details for your blog post. Click save when you're done.
                </DialogDescription>
                </DialogHeader>
                <PostForm
                initialData={editingPost}
                onSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                />
            </DialogContent>
            </Dialog>
        </div>
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">Author</TableHead>
                        <TableHead className="hidden md:table-cell">Created At</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {posts.length > 0 ? posts.map((post) => (
                        <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                        <TableCell className="hidden md:table-cell">{new Date(post.created_at).toLocaleDateString()}</TableCell>
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
                                setEditingPost(post);
                                setIsFormOpen(true);
                                }}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                                    <span className="text-destructive">Delete</span>
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete the post "{post.title}". This action cannot be undone.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(post.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
                            No posts found.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}