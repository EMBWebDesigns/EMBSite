"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./auth-provider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import { Copy, Edit, Trash2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Snippet = {
  id: string;
  prompt: string;
  code: string;
  created_at: string;
};

const EditSnippetForm = ({ snippet, onSave, closeDialog }: { snippet: Snippet, onSave: (id: string, prompt: string, code: string) => void, closeDialog: () => void }) => {
  const [prompt, setPrompt] = useState(snippet.prompt);
  const [code, setCode] = useState(snippet.code);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(snippet.id, prompt, code);
    closeDialog();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="prompt">Prompt</Label>
        <Input id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="code">Code</Label>
        <Textarea id="code" value={code} onChange={(e) => setCode(e.target.value)} className="min-h-[300px] font-mono" />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

export const SavedSnippets = () => {
  const { user } = useAuth();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);

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

  const handleUpdate = async (id: string, prompt: string, code: string) => {
    const { error } = await supabase
      .from("code_snippets")
      .update({ prompt, code })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update snippet.", { description: error.message });
    } else {
      setSnippets(snippets.map(s => s.id === id ? { ...s, prompt, code } : s));
      toast.success("Snippet updated successfully!");
    }
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
              <Skeleton className="h-10 w-10" />
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
    <>
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
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setEditingSnippet(snippet)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleCopy(snippet.code)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
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

      <Dialog open={!!editingSnippet} onOpenChange={(isOpen) => !isOpen && setEditingSnippet(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Snippet</DialogTitle>
          </DialogHeader>
          {editingSnippet && (
            <EditSnippetForm 
              snippet={editingSnippet} 
              onSave={handleUpdate} 
              closeDialog={() => setEditingSnippet(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};