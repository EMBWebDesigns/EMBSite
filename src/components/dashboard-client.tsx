"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code,
  Download,
  LayoutGrid,
  Library,
  Sparkles,
  FolderKanban,
  Newspaper,
} from "lucide-react";
import { CodeForge } from "@/components/code-forge";
import { ComponentShowcase } from "@/components/component-showcase";
import { UiBuilder } from "@/components/ui-builder";
import { DesignAdvisor } from "@/components/design-advisor";
import { ExportToolkit } from "@/components/export-toolkit";
import { SavedSnippets } from "@/components/saved-snippets";
import { BlogAdmin } from "@/components/blog-admin";
import { cn } from "@/lib/utils";

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

export function DashboardClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "code-forge";

  const handleTabChange = (value: string) => {
    router.push(`${pathname}?tab=${value}`);
  };

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleTabChange}
      className='w-full'
    >
      <TabsList className='grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7'>
        {dashboardTabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {dashboardTabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className='mt-6'>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>{tab.title}</CardTitle>
            </CardHeader>
            <CardContent className={cn(tab.noPadding && "p-0")}>
              {tab.component}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}