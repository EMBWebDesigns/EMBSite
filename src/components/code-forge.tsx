"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";

const codeSnippets: { [key: string]: string } = {
  button: `import { Button } from "@/components/ui/button";

export const MyButton = () => {
  return <Button>Click Me</Button>;
};`,
  alert: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export const MyAlert = () => {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
};`,
  default: `// Enter a prompt like "a primary button" or "an alert dialog"
// and see the AI generate code.

const Welcome = () => {
  return <h1>Hello, World!</h1>
}
`,
};

export const CodeForge = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState(codeSnippets.default);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    setGeneratedCode("");

    setTimeout(() => {
      let newCode = codeSnippets.default;
      if (prompt.toLowerCase().includes("button")) {
        newCode = codeSnippets.button;
      } else if (prompt.toLowerCase().includes("alert")) {
        newCode = codeSnippets.alert;
      }
      setGeneratedCode(newCode);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="e.g., 'Create a primary button with a click handler'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px]"
      />
      <Button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        Generate Code
      </Button>
      <div className="mt-4 rounded-lg bg-[#282c34] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={generatedCode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SyntaxHighlighter
              language="jsx"
              style={atomDark}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                backgroundColor: "transparent",
              }}
              wrapLongLines
            >
              {generatedCode}
            </SyntaxHighlighter>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};