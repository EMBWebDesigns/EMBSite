"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code,
  Download,
  LayoutGrid,
  Library,
  Sparkles,
  FolderKanban,
  Newspaper,
  MessageSquareQuote,
} from "lucide-react";
import { CodeForge } from "@/components/code-forge";
import { ComponentShowcase } from "@/components/component-showcase";
import { UiBuilder } from "@/components/ui-builder";
import { DesignAdvisor } from "@/components/design-advisor";
import { ExportToolkit } from "@/components/export-toolkit";
import { SavedSnippets } from "@/components/saved-snippets";
import { BlogAdmin } from "@/components/blog-admin";
import { cn } from "@/lib/utils";
import { TestimonialAdmin } from "./testimonial-admin";

const dashboardTabs = [
  {
    value: "code-forge",
    label: "Code Forge",
    icon: <Code className='mr-2 h-5 w-5' />,
    title: "AI Code Generation",
    component: <CodeForge />,
    noPadding: true,
  },
  {
    value: "my-snippets",
    label: "My Snippets",
    icon: <FolderKanban className='mr-2 h-5 w-5' />,
    title: "Your Saved Snippets",
    component: <SavedSnippets />,
  },
  {
    value: "ui-builder",
    label: "UI Builder",
    icon: <LayoutGrid className='mr-2 h-5 w-5' />,
    title: "Visual Drag-and-Drop",
    component: <UiBuilder />,
    noPadding: true,
  },
  {
    value: "design-advisor",
    label: "Design Advisor",
    icon: <Sparkles className='mr-2 h-5 w-5' />,
    title: "AI Style Guide",
    component: <DesignAdvisor />,
  },
  {
    value: "blog-admin",
    label: "Blog Admin",
    icon: <Newspaper className='mr-2 h-5 w-5' />,
    title: "Blog Content Management",
    component: <BlogAdmin />,
  },
  {
    value: "testimonials",
    label: "Testimonials",
    icon: <MessageSquareQuote className='mr-2 h-5 w-5' />,
    title: "Testimonial Management",
    component: <TestimonialAdmin />,
  },
  {
    value: "export-toolkit",
    label: "Export Toolkit",
    icon: <Download className='mr-2 h-5 w-5' />,
    title: "Project ZIP Download",
    component: <ExportToolkit />,
    noPadding: true,
  },
  {
    value: "component-library",
    label: "Component Library",
    icon: <Library className='mr-2 h-5 w-5' />,
    title: "Reusable Blocks",
    component: <ComponentShowcase />,
  },
];

export function DashboardContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "code-forge";

  const activeTab = dashboardTabs.find(tab => tab.value === currentTab);

  if (!activeTab) {
    // Fallback for invalid tab, maybe render the first tab
    const defaultTab = dashboardTabs[0];
    return (
       <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{defaultTab.title}</CardTitle>
        </CardHeader>
        <CardContent className={cn(defaultTab.noPadding && "p-0")}>
          {defaultTab.component}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{activeTab.title}</CardTitle>
      </CardHeader>
      <CardContent className={cn(activeTab.noPadding && "p-0")}>
        {activeTab.component}
      </CardContent>
    </Card>
  );
}