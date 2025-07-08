"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2 } from 'lucide-react';
import { HeroSection } from '@/components/sections/hero-section';
import { FeatureSection } from '@/components/sections/feature-section';
import { CtaSection } from '@/components/sections/cta-section';

// A map to easily render components by name
const sectionComponents = {
  'HeroSection': HeroSection,
  'FeatureSection': FeatureSection,
  'CtaSection': CtaSection,
};

// The list of available sections to add
const availableSections = [
  { id: 'HeroSection', name: 'Hero Section' },
  { id: 'FeatureSection', name: 'Feature Section' },
  { id: 'CtaSection', name: 'Call to Action' },
];

type PageSection = {
  id: string; // e.g., 'HeroSection'
  instanceId: number; // A unique ID for this specific instance on the page
};

export const UiBuilder = () => {
  const [pageSections, setPageSections] = useState<PageSection[]>([]);

  const addSection = (sectionId: string) => {
    const newSection: PageSection = {
      id: sectionId,
      instanceId: Date.now(), // Simple unique ID
    };
    setPageSections([...pageSections, newSection]);
  };

  const removeSection = (instanceId: number) => {
    setPageSections(pageSections.filter(section => section.instanceId !== instanceId));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
      {/* Sidebar with available sections */}
      <Card>
        <CardHeader>
          <CardTitle>Available Sections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {availableSections.map(section => (
            <div key={section.id} className="flex items-center justify-between p-2 border rounded-md">
              <span className="font-medium">{section.name}</span>
              <Button size="sm" variant="ghost" onClick={() => addSection(section.id)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Canvas / Preview Area */}
      <div className="border rounded-lg bg-background/50 min-h-[600px] overflow-hidden">
        <div className="bg-white dark:bg-zinc-900 h-full w-full overflow-y-auto">
          {pageSections.length > 0 ? (
            pageSections.map(section => {
              const SectionComponent = sectionComponents[section.id as keyof typeof sectionComponents];
              return (
                <div key={section.instanceId} className="relative group border-b last:border-b-0">
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeSection(section.instanceId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <SectionComponent />
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Add sections from the left panel to build your page.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};