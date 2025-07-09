"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PlusCircle, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ComponentType = 'button' | 'card' | 'input' | 'textarea' | 'checkbox' | 'radio-group' | 'select' | 'slider';

interface CanvasComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
}

export const UiBuilder = () => {
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponent[]>([]);

  const addComponentToCanvas = (type: ComponentType) => {
    const newComponent: CanvasComponent = {
      id: Date.now().toString(),
      type,
      props: {},
    };
    setCanvasComponents((prev) => [...prev, newComponent]);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added to canvas!`);
  };

  const removeComponentFromCanvas = (id: string) => {
    setCanvasComponents((prev) => prev.filter((comp) => comp.id !== id));
    toast.info("Component removed.");
  };

  const renderComponent = (comp: CanvasComponent) => {
    switch (comp.type) {
      case 'button':
        return <Button {...comp.props}>Click Me</Button>;
      case 'card':
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Sample Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This is a sample card content.</p>
            </CardContent>
          </Card>
        );
      case 'input':
        return (
          <div className="space-y-2">
            <Label htmlFor={`input-${comp.id}`}>Sample Input</Label>
            <Input id={`input-${comp.id}`} placeholder="Type something..." {...comp.props} />
          </div>
        );
      case 'textarea':
        return (
          <div className="space-y-2">
            <Label htmlFor={`textarea-${comp.id}`}>Sample Textarea</Label>
            <Textarea id={`textarea-${comp.id}`} placeholder="Write a message..." {...comp.props} />
          </div>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={`checkbox-${comp.id}`} {...comp.props} />
            <Label htmlFor={`checkbox-${comp.id}`}>Accept terms and conditions</Label>
          </div>
        );
      case 'radio-group':
        return (
          <RadioGroup defaultValue="option-one" {...comp.props}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id={`option-one-${comp.id}`} />
              <Label htmlFor={`option-one-${comp.id}`}>Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id={`option-two-${comp.id}`} />
              <Label htmlFor={`option-two-${comp.id}`}>Option Two</Label>
            </div>
          </RadioGroup>
        );
      case 'select':
        return (
          <Select {...comp.props}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
            </SelectContent>
          </Select>
        );
      case 'slider':
        return (
          <div className="w-full">
            <Label>Volume</Label>
            <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" {...comp.props} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-16rem)]">
      {/* Component Toolbox */}
      <div className="w-64 border-r bg-muted/40 p-4 overflow-y-auto">
        <h3 className="font-semibold mb-4 text-lg">Components</h3>
        <div className="grid gap-3">
          <Button variant="outline" className="justify-start" onClick={() => addComponentToCanvas('button')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Button
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => addComponentToCanvas('card')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Card
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => addComponentToCanvas('input')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Input
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => addComponentToCanvas('textarea')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Textarea
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => addComponentToCanvas('checkbox')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Checkbox
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => addComponentToCanvas('radio-group')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Radio Group
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => addComponentToCanvas('select')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Select
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => addComponentToCanvas('slider')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Slider
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-background">
        <h3 className="font-semibold mb-4 text-lg">Canvas</h3>
        <div className="min-h-full border border-dashed rounded-lg p-4 space-y-4 bg-card/30">
          {canvasComponents.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              Click a component from the left to add it to the canvas.
            </div>
          ) : (
            canvasComponents.map((comp) => (
              <div
                key={comp.id}
                className={cn(
                  "relative p-3 border rounded-md bg-background shadow-sm",
                  "flex items-center gap-2 group" // Added group for hover effects
                )}
              >
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:bg-destructive/10"
                    onClick={() => removeComponentFromCanvas(comp.id)}
                    title="Remove component"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex-1">
                  {renderComponent(comp)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};