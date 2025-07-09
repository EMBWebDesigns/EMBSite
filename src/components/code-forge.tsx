"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Save } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "./auth-provider";

const defaultCode = `// Enter a prompt like "a login form with email and password"
// and see the AI generate real code.

const Welcome = () => {
  return <h1>Hello, World!</h1>
}
`;

export const CodeForge = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState(defaultCode);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    setIsLoading(true);
    setGeneratedCode("");
    setIsCodeGenerated(false);

    const { data, error } = await supabase.functions.invoke('generate-code', {
      body: { prompt },
    });

    setIsLoading(false);

    if (error || data.error) {
      const errorMessage = error?.message || data?.error;
      console.error("Function error:", errorMessage);
      toast.error("Failed to generate code.", { description: errorMessage });
      setGeneratedCode(`// Error: ${errorMessage}`);
      return;
    }

    setGeneratedCode(data.code || "// No code was generated.");
    setIsCodeGenerated(true);
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("You must be logged in to save snippets.");
      return;
    }
    if (!generatedCode || generatedCode === defaultCode) {
      toast.error("Please generate some code before saving.");
      return;
    }

    setIsSaving(true);
    const { error } = await supabase
      .from("code_snippets")
      .insert([{ user_id: user.id, prompt, code: generatedCode }]);
    
    setIsSaving(false);

    if (error) {
      toast.error("Failed to save snippet.", { description: error.message });
    } else {
      toast.success("Snippet saved successfully!");
    }
  };

  return (
    <ResizablePanelGroup direction="vertical" className="min-h-[600px] w-full">
      <ResizablePanel defaultSize={30}>
        <div className="p-6 h-full flex flex-col gap-4">
          <Textarea
            placeholder="e.g., 'Create a responsive card component with an image and a title'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-grow resize-none"
          />
          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Code
            </Button>
            {isCodeGenerated && (
              <Button onClick={handleSave} disabled={isSaving} variant="secondary">
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Snippet
              </Button>
            )}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <div className="h-full bg-[#282c34] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={generatedCode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <SyntaxHighlighter
                language="jsx"
                style={atomDark}
                customStyle={{ margin: 0, padding: "1.5rem", backgroundColor: "transparent", height: "100%" }}
                wrapLongLines
              >
                {generatedCode}
              </SyntaxHighlighter>
            </motion.div>
          </AnimatePresence>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};