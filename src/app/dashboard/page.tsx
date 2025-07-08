"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Download, LayoutGrid, Library, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const dashboardTabs = [
  {
    value: "code-forge",
    label: "Code Forge",
    icon: <Code className="mr-2 h-5 w-5" />,
    title: "Simulated Prompt-to-Code",
    description: "Enter a prompt and watch as the AI generates code in real-time. (This is a simulated experience)",
  },
  {
    value: "ui-builder",
    label: "UI Builder",
    icon: <LayoutGrid className="mr-2 h-5 w-5" />,
    title: "Visual Drag-and-Drop",
    description: "Assemble layouts by dragging and dropping components from the library. (This is a simulated experience)",
  },
  {
    value: "design-advisor",
    label: "Design Advisor",
    icon: <Sparkles className="mr-2 h-5 w-5" />,
    title: "AI Style Guide",
    description: "Get instant suggestions for color palettes, fonts, and layouts. (This is a simulated experience)",
  },
  {
    value: "export-toolkit",
    label: "Export Toolkit",
    icon: <Download className="mr-2 h-5 w-5" />,
    title: "Project ZIP Download",
    description: "Preview and download the complete project as a production-ready template. (This is a simulated experience)",
  },
  {
    value: "component-library",
    label: "Component Library",
    icon: <Library className="mr-2 h-5 w-5" />,
    title: "Reusable Blocks",
    description: "Browse a showcase of available components and blocks to use in your projects. (This is a simulated experience)",
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-16 md:px-6 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Interactive Demo Experience
        </h1>
        <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Get a feel for the power of emb.web. The following tabs showcase a simulation of our core features.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="code-forge" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {dashboardTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {dashboardTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{tab.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-muted-foreground">{tab.description}</p>
                  <div className="border rounded-lg p-16 bg-background/50 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">[Interactive Content for {tab.label} coming soon]</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
}