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
  Share2,
  Contact,
  Lock, // New icon for permission denied
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
import { SocialLinksAdmin } from "./social-links-admin";
import { ContactInfoAdmin } from "./contact-info-admin";
import { useAuth } from "./auth-provider"; // Import useAuth

const dashboardTabs = [
  {
    value: "code-forge",
    label: "Code Forge",
    icon: <Code className='mr-2 h-5 w-5' />,
    title: "AI Code Generation",
    component: <CodeForge />,
    noPadding: true,
    roles: ['user', 'admin'],
  },
  {
    value: "my-snippets",
    label: "My Snippets",
    icon: <FolderKanban className='mr-2 h-5 w-5' />,
    title: "Your Saved Snippets",
    component: <SavedSnippets />,
    roles: ['user', 'admin'],
  },
  {
    value: "ui-builder",
    label: "UI Builder",
    icon: <LayoutGrid className='mr-2 h-5 w-5' />,
    title: "Visual Drag-and-Drop",
    component: <UiBuilder />,
    noPadding: true,
    roles: ['user', 'admin'],
  },
  {
    value: "design-advisor",
    label: "Design Advisor",
    icon: <Sparkles className='mr-2 h-5 w-5' />,
    title: "AI Style Guide",
    component: <DesignAdvisor />,
    roles: ['user', 'admin'],
  },
  {
    value: "blog-admin",
    label: "Blog Admin",
    icon: <Newspaper className='mr-2 h-5 w-5' />,
    title: "Blog Content Management",
    component: <BlogAdmin />,
    roles: ['admin'], // Admin only
  },
  {
    value: "testimonials",
    label: "Testimonials",
    icon: <MessageSquareQuote className='mr-2 h-5 w-5' />,
    title: "Testimonial Management",
    component: <TestimonialAdmin />,
    roles: ['admin'], // Admin only
  },
  {
    value: "social-links",
    label: "Social Links",
    icon: <Share2 className='mr-2 h-5 w-5' />,
    title: "Social Media Links Management",
    component: <SocialLinksAdmin />,
    roles: ['admin'], // Admin only
  },
  {
    value: "contact-info",
    label: "Contact Info",
    icon: <Contact className='mr-2 h-5 w-5' />,
    title: "Contact Information Management",
    component: <ContactInfoAdmin />,
    roles: ['admin'], // Admin only
  },
  {
    value: "export-toolkit",
    label: "Export Toolkit",
    icon: <Download className='mr-2 h-5 w-5' />,
    title: "Project ZIP Download",
    component: <ExportToolkit />,
    roles: ['user', 'admin'],
  },
  {
    value: "component-library",
    label: "Component Library",
    icon: <Library className='mr-2 h-5 w-5' />,
    title: "Reusable Blocks",
    component: <ComponentShowcase />,
    roles: ['user', 'admin'],
  },
];

export function DashboardContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "code-forge";
  const { profile, loading: authLoading } = useAuth();

  const activeTab = dashboardTabs.find(tab => tab.value === currentTab);

  if (authLoading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle><div className="h-8 w-1/2 bg-muted rounded-lg animate-pulse" /></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full bg-muted rounded-lg animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  const userRole = profile?.role;

  // Check if the active tab exists and if the user has permission to view it
  if (!activeTab || !activeTab.roles.includes(userRole || '')) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <Lock className="mr-2 h-5 w-5" />
            Permission Denied
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-muted-foreground">
          <p>You do not have the necessary permissions to view this section.</p>
          <p className="mt-2">Please contact an administrator if you believe this is an error.</p>
        </CardContent>
      </Card>
    );
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