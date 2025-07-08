"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Paintbrush, Type } from "lucide-react";

const colorPalettes = [
  {
    name: "Electric Vibe",
    colors: ["#0D0D0D", "#7B2BF8", "#33FF8D", "#FFFFFF"],
  },
  {
    name: "Cybernetic Glow",
    colors: ["#1A1A2E", "#E94560", "#0F3460", "#F0F0F0"],
  },
  {
    name: "Quantum Core",
    colors: ["#232931", "#4ECCA3", "#EEEEEE", "#393E46"],
  },
];

export const DesignAdvisor = () => {
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
          {colorPalettes.map((palette) => (
            <div key={palette.name}>
              <h4 className="font-semibold mb-2">{palette.name}</h4>
              <div className="flex gap-2">
                {palette.colors.map((color) => (
                  <div
                    key={color}
                    className="h-10 w-10 rounded-md border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          ))}
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