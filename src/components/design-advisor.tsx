"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Paintbrush, Type, Sparkles, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Palette {
  name: string;
  colors: string[];
}

const initialPalettes: Palette[] = [
  {
    name: "Electric Vibe",
    colors: ["#0D0D0D", "#7B2BF8", "#33FF8D", "#FFFFFF", "#EFEFEF"],
  },
  {
    name: "Cybernetic Glow",
    colors: ["#1A1A2E", "#E94560", "#0F3460", "#F0F0F0", "#FFFFFF"],
  },
];

export const DesignAdvisor = () => {
  const [prompt, setPrompt] = useState("");
  const [palettes, setPalettes] = useState<Palette[]>(initialPalettes);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePalette = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt for the theme.");
      return;
    }
    setIsLoading(true);

    const { data, error } = await supabase.functions.invoke('generate-palette', {
      body: { prompt },
    });

    setIsLoading(false);

    if (error || data.error) {
      const errorMessage = error?.message || data?.error;
      toast.error("Failed to generate palette.", { description: errorMessage });
      return;
    }

    if (data.colors && Array.isArray(data.colors)) {
      const newPalette: Palette = {
        name: prompt,
        colors: data.colors,
      };
      setPalettes([newPalette, ...palettes]);
      setPrompt("");
      toast.success("New color palette generated!");
    } else {
      toast.error("The AI returned an unexpected format.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Paintbrush className="mr-2 h-5 w-5" />
            AI Color Palette Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="e.g., 'A vibrant sunset over a city'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button onClick={handleGeneratePalette} disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Palette
            </Button>
          </div>
          <div className="space-y-4 pt-4 border-t">
            {palettes.map((palette) => (
              <div key={palette.name}>
                <h4 className="font-semibold mb-2 capitalize">{palette.name}</h4>
                <div className="flex gap-2">
                  {palette.colors.map((color) => (
                    <div
                      key={color}
                      className="h-10 w-10 rounded-md border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Type className="mr-2 h-5 w-5" />
            Recommended Font Pairings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold font-sans">Inter</h4>
              <p className="text-muted-foreground text-sm">A clean and modern sans-serif for UI elements, headings, and body text.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold font-mono">JetBrains Mono</h4>
              <p className="text-muted-foreground text-sm">A crisp monospaced font perfect for displaying code snippets and technical details.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};