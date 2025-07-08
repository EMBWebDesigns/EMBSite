"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./auth-provider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import { Copy, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Snippet = {
  id: string;
  prompt: string;
  code: string;
  created_at: string;
};

export const SavedSnippets = () => {
  const { user } = useAuth();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("code_snippets")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to fetch snippets.", { description: error.message });
      } else {
        setSnippets(data);
      }
      setLoading(false);
    };

    fetchSnippets();
  }, [user]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const handleDelete = async (snippetId: string) => {
    const { error } = await supabase
      .from("code_snippets")
      .delete()
      .eq("id", snippetId);

    if (error) {
      toast.error("Failed to delete snippet.", { description: error.message });
    } else {
      setSnippets(snippets.filter((s) => s.id !== snippetId));
      toast.success("Snippet deleted.");
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardFooter>
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (snippets.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">No Snippets Yet</h3>
        <p className="text-muted-foreground mt-2">
          Go to the "Code Forge" tab to generate and save your first snippet!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {snippets.map((snippet) => (
        <Card key={snippet.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg line-clamp-2">{snippet.prompt || "Untitled Snippet"}</CardTitle>
            <CardDescription>
              Saved on {new Date(snippet.created_at).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow" />
          <CardFooter className="flex justify-between">
            <Button variant="secondary" onClick={() => handleCopy(snippet.code)}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Code
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your saved snippet.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(snippet.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};