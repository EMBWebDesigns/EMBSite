"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { HeroSection } from "./sections/hero-section";
import { FeatureSection } from "./sections/feature-section";
import { CtaSection } from "./sections/cta-section";

type Section = {
  id: number;
  name: string;
  component: React.ReactNode;
};

const availableSections: { name: string; component: React.ReactNode }[] = [
  { name: "Hero Section", component: <HeroSection /> },
  { name: "Feature Section", component: <FeatureSection /> },
  { name: "CTA Section", component: <CtaSection /> },
];

export const UiBuilder = () => {
  const [pageSections, setPageSections] = useState<Section[]>([]);

  const addSection = (sectionComponent: React.ReactNode, sectionName: string) => {
    const newSection: Section = {
      id: Date.now(),
      name: sectionName,
      component: sectionComponent,
    };
    setPageSections([...pageSections, newSection]);
  };

  const clearSections = () => {
    setPageSections([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
      <aside>
        <Card>
          <CardHeader>
            <CardTitle>Add Sections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {availableSections.map((section, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addSection(section.component, section.name)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {section.name}
                </Button>
              ))}
            </div>
            <Button
              variant="destructive"
              className="w-full"
              onClick={clearSections}
              disabled={pageSections.length === 0}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
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
              <div key={section.id} className="relative group">
                {section.component}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};