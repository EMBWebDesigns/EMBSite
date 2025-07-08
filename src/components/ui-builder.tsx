"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Download, Copy } from "lucide-react";
import { HeroSection } from "./sections/hero-section";
import { FeatureSection } from "./sections/feature-section";
import { CtaSection } from "./sections/cta-section";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";

type Section = {
  id: number;
  name: string;
  component: React.ReactNode;
  componentName: string;
};

const availableSections: Omit<Section, "id">[] = [
  { name: "Hero Section", component: <HeroSection />, componentName: "HeroSection" },
  { name: "Feature Section", component: <FeatureSection />, componentName: "FeatureSection" },
  { name: "CTA Section", component: <CtaSection />, componentName: "CtaSection" },
];

export const UiBuilder = () => {
  const [pageSections, setPageSections] = useState<Section[]>([]);
  const [generatedCode, setGeneratedCode] = useState("");

  const addSection = (section: Omit<Section, "id">) => {
    const newSection: Section = {
      id: Date.now(),
      ...section,
    };
    setPageSections([...pageSections, newSection]);
  };

  const removeSection = (id: number) => {
    setPageSections(pageSections.filter((section) => section.id !== id));
  };

  const clearSections = () => {
    setPageSections([]);
  };

  const generateExportCode = () => {
    if (pageSections.length === 0) {
      toast.error("Please add at least one section to export.");
      return;
    }

    const imports = Array.from(new Set(pageSections.map(s => s.componentName)))
      .map(name => {
        const fileName = name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
        return `import { ${name} } from '@/components/sections/${fileName}';`;
      })
      .join('\n');

    const components = pageSections.map(s => `        <${s.componentName} />`).join('\n');

    const fullCode = `
"use client";

import React from 'react';
${imports}

export default function MyCustomPage() {
  return (
    <>
${components}
    </>
  );
}
    `.trim();
    
    setGeneratedCode(fullCode);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
      <aside>
        <Card>
          <CardHeader>
            <CardTitle>Page Builder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Add Sections</p>
              {availableSections.map((section, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addSection(section)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {section.name}
                </Button>
              ))}
            </div>
            <div className="space-y-2 pt-4 border-t">
              <p className="text-sm text-muted-foreground">Actions</p>
              <Dialog onOpenChange={(isOpen) => !isOpen && setGeneratedCode('')}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full"
                    onClick={generateExportCode}
                    disabled={pageSections.length === 0}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Code
                  </Button>
                </DialogTrigger>
                {generatedCode && (
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Export Page Code</DialogTitle>
                    </DialogHeader>
                    <div className="relative mt-4">
                      <Button
                        size="sm"
                        onClick={handleCopy}
                        className="absolute top-4 right-4 z-10"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <div className="rounded-lg bg-[#282c34] overflow-hidden max-h-[60vh] overflow-y-auto">
                        <SyntaxHighlighter
                          language="jsx"
                          style={atomDark}
                          customStyle={{ margin: 0, padding: "1.5rem", backgroundColor: "transparent" }}
                          wrapLongLines
                        >
                          {generatedCode}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </DialogContent>
                )}
              </Dialog>
              <Button
                variant="destructive"
                className="w-full"
                onClick={clearSections}
                disabled={pageSections.length === 0}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>
      <main className="bg-muted/40 rounded-lg border p-4 min-h-[600px]">
        {pageSections.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              Add sections from the left panel to build your page.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pageSections.map((section) => (
              <div key={section.id} className="relative group border-2 border-transparent hover:border-primary rounded-lg transition-colors">
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeSection(section.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove section</span>
                </Button>
                {section.component}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};