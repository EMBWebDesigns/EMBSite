"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Code } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeDialogProps {
  codeString: string;
  title: string;
}

export const CodeDialog = ({ codeString, title }: CodeDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Code className="mr-2 h-4 w-4" />
          View Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title} - Code</DialogTitle>
        </DialogHeader>
        <div className="mt-4 rounded-md bg-[#282c34] overflow-y-auto max-h-[60vh]">
            <SyntaxHighlighter
                language="jsx"
                style={atomDark}
                customStyle={{ margin: 0, padding: "1.5rem", backgroundColor: "transparent" }}
                wrapLongLines
            >
                {codeString}
            </SyntaxHighlighter>
        </div>
      </DialogContent>
    </Dialog>
  );
};