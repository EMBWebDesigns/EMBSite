"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Square, Type, Image as ImageIcon, Bot } from "lucide-react";
import { motion } from "framer-motion";

const components = [
  { name: "Button", icon: <Square className="h-4 w-4" /> },
  { name: "Card", icon: <LayoutGrid className="h-4 w-4" /> },
  { name: "Heading", icon: <Type className="h-4 w-4" /> },
  { name: "Image", icon: <ImageIcon className="h-4 w-4" /> },
];

export const UiBuilder = () => {
  return (
    <div className="flex h-[600px] w-full gap-4">
      {/* Sidebar */}
      <Card className="w-1/4 lg:w-1/5">
        <CardHeader>
            <CardTitle className="text-base">Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {components.map((comp) => (
              <Button key={comp.name} variant="ghost" className="w-full justify-start cursor-grab">
                {comp.icon}
                <span className="ml-2">{comp.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Canvas */}
      <div className="w-3/4 lg:w-4/5 bg-muted/30 rounded-lg border-dashed border-2 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8"
        >
          <Bot className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="mt-6 text-2xl font-bold">Visual Builder Coming Soon</h2>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto">
            This feature is currently under construction. Soon, you'll be able to drag and drop components to build your UI visually, with AI assistance to guide you.
          </p>
        </motion.div>
      </div>
    </div>
  );
};