"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from 'sonner';

interface CodeViewerProps {
  codeString: string;
  language: string;
}

export const CodeViewer = ({ codeString, language }: CodeViewerProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="relative h-full">
      <Button
        size="sm"
        onClick={handleCopy}
        className="absolute top-4 right-4 z-10"
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy
      </Button>
      <div className="h-full bg-[#282c34] overflow-y-auto">
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          customStyle={{ margin: 0, padding: "1.5rem", backgroundColor: "transparent", height: '100%' }}
          showLineNumbers
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};