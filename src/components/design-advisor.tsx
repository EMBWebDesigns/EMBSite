"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Paintbrush, Sparkles, Loader2, RefreshCw, Pipette } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { hexToHsl } from "@/lib/utils";
import { Label } from "./ui/label";

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

const themeColorKeys = ["primary", "secondary", "accent", "destructive", "background", "foreground"] as const;
type ThemeColor = typeof themeColorKeys[number];

const initialThemeColors: Record<ThemeColor, string> = {
    primary: '#8b5cf6',
    secondary: '#10b981',
    accent: '#f3f4f6',
    destructive: '#ef4444',
    background: '#111827',
    foreground: '#f9fafb',
};


export const DesignAdvisor = () => {
  const [prompt, setPrompt] = useState("");
  const [palettes, setPalettes] = useState<Palette[]>(initialPalettes);
  const [isLoading, setIsLoading] = useState(false);
  const [themeColors, setThemeColors] = useState<Record<ThemeColor, string>>(initialThemeColors);

  const applyColor = (colorName: ThemeColor, hex: string) => {
    const hsl = hexToHsl(hex);
    if (hsl) {
      document.documentElement.style.setProperty(`--${colorName}`, `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      setThemeColors(prev => ({ ...prev, [colorName]: hex }));
    } else {
      toast.error("Invalid color format.");
    }
  };

  const resetToDefaults = () => {
    themeColorKeys.forEach(key => {
        document.documentElement.style.removeProperty(`--${key}`);
    });
    setThemeColors(initialThemeColors);
    toast.success("Theme reset to defaults.");
  };

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
            Theme Customizer
          </CardTitle>
          <CardDescription>
            Adjust your app's theme in real-time.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {themeColorKeys.map(key => (
                    <div key={key} className="space-y-2">
                        <Label htmlFor={key} className="capitalize">{key}</Label>
                        <div className="flex items-center gap-2">
                            <Input id={key} type="color" value={themeColors[key]} onChange={(e) => applyColor(key, e.target.value)} className="p-1 h-10"/>
                            <Input value={themeColors[key]} onChange={(e) => applyColor(key, e.target.value)} />
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={resetToDefaults} variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset to Defaults
            </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5" />
            AI Color Palette Suggestions
          </CardTitle>
          <CardDescription>
            Generate a palette from a text prompt.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="e.g., 'A vibrant sunset over a city'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button onClick={handleGeneratePalette} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate Palette"}
            </Button>
          </div>
          <div className="space-y-4 pt-4 border-t max-h-60 overflow-y-auto">
            {palettes.map((palette) => (
              <div key={palette.name}>
                <h4 className="font-semibold mb-2 capitalize">{palette.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {palette.colors.map((color) => (
                    <div key={color} className="group relative">
                      <div
                        className="h-10 w-10 rounded-md border cursor-pointer"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                      <div className="absolute inset-0 flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hidden sm:flex">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => applyColor('primary', color)} title="Set as Primary"><Pipette className="h-3 w-3 text-white" /></Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => applyColor('secondary', color)} title="Set as Secondary"><Pipette className="h-3 w-3 text-white" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};