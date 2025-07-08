"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Download, LayoutGrid, Library, Sparkles, FolderKanban } from "lucide-react";
import { motion } from "framer-motion";
import { CodeForge } from "@/components/code-forge";
import { ComponentShowcase } from "@/components/component-showcase";
import { UiBuilder } from "@/components/ui-builder";
import { DesignAdvisor } from "@/components/design-advisor";
import { ExportToolkit } from "@/components/export-toolkit";
import { Skeleton } from '@/components/ui/skeleton';
import { SavedSnippets } from '@/components/saved-snippets';

const dashboardTabs = [
  { value: "code-forge", label: "Code Forge", icon: <Code className="mr-2 h-5 w-5" />, title: "AI Code Generation", component: <CodeForge /> },
  { value: "my-snippets", label: "My Snippets", icon: <FolderKanban className="mr-2 h-5 w-5" />, title: "Your Saved Snippets", component: <SavedSnippets /> },
  { value: "ui-builder", label: "UI Builder", icon: <LayoutGrid className="mr-2 h-5 w-5" />, title: "Visual Drag-and-Drop", component: <UiBuilder /> },
  { value: "design-advisor", label: "Design Advisor", icon: <Sparkles className="mr-2 h-5 w-5" />, title: "AI Style Guide", component: <DesignAdvisor /> },
  { value: "export-toolkit", label: "Export Toolkit", icon: <Download className="mr-2 h-5 w-5" />, title: "Project ZIP Download", component: <ExportToolkit /> },
  { value: "component-library", label: "Component Library", icon: <Library className="mr-2 h-5 w-5" />, title: "Reusable Blocks", component: <ComponentShowcase /> },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container mx-auto max-w-screen-xl px-4 py-16 md:px-6 md:py-24">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
        </div>
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-16 md:px-6 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Interactive Demo Experience
        </h1>
        <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Welcome, {user.email}. Get a feel for the power of emb.web.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="code-forge" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
            {dashboardTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {dashboardTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{tab.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {tab.component}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
}