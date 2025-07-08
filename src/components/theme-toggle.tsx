"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder to prevent layout shift and hydration errors
    return <div className="h-10 w-[124px] rounded-md border border-input bg-transparent" />;
  }

  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={(value) => {
        if (value) setTheme(value);
      }}
      aria-label="Theme toggle"
      className="border border-input rounded-md p-0.5"
    >
      <ToggleGroupItem value="light" aria-label="Toggle light theme">
        <Sun className="h-5 w-5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Toggle dark theme">
        <Moon className="h-5 w-5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="system" aria-label="Toggle system theme">
        <Laptop className="h-5 w-5" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}