"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutTemplate, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

type ComponentType = "button" | "alert" | "card";

interface PlacedComponent {
  id: number;
  type: ComponentType;
}

const availableComponents: { type: ComponentType; name: string; icon: React.ReactNode }[] = [
  { type: "button", name: "Button", icon: <div className="w-4 h-4 bg-primary rounded-sm" /> },
  { type: "alert", name: "Alert", icon: <div className="w-4 h-4 bg-destructive rounded-sm" /> },
  { type: "card", name: "Card", icon: <div className="w-4 h-4 bg-secondary rounded-sm" /> },
];

const ComponentPreview = ({ type }: { type: ComponentType }) => {
  switch (type) {
    case "button":
      return <Button className="w-full">Click Me</Button>;
    case "alert":
      return (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Alert!</AlertTitle>
          <AlertDescription>This is an alert component.</AlertDescription>
        </Alert>
      );
    case "card":
      return (
        <Card>
          <CardContent className="p-4">
            <p>This is a card component.</p>
          </CardContent>
        </Card>
      );
    default:
      return null;
  }
};

export const UiBuilder = () => {
  const [placedComponents, setPlacedComponents] = useState<PlacedComponent[]>([]);

  const addComponent = (type: ComponentType) => {
    setPlacedComponents([...placedComponents, { id: Date.now(), type }]);
  };

  const clearCanvas = () => {
    setPlacedComponents([]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 h-[500px]">
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Components</h3>
          <div className="space-y-2">
            {availableComponents.map((comp) => (
              <Button
                key={comp.type}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addComponent(comp.type)}
              >
                {comp.icon}
                <span className="ml-2">{comp.name}</span>
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-8" onClick={clearCanvas}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Canvas
          </Button>
        </CardContent>
      </Card>

      <Card className="p-4 bg-background/50">
        <div className="relative w-full h-full border-2 border-dashed rounded-lg flex flex-col items-start p-4 space-y-4 overflow-y-auto">
          <AnimatePresence>
            {placedComponents.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-muted-foreground m-auto"
              >
                <LayoutTemplate className="mx-auto h-12 w-12" />
                <p className="mt-2">Click a component on the left to add it here.</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="w-full space-y-4">
            <AnimatePresence>
              {placedComponents.map((comp) => (
                <motion.div
                  key={comp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-full"
                >
                  <ComponentPreview type={comp.type} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </div>
  );
};