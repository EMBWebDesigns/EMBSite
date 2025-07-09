"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
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
} from "lucide-react";
import { useAuth } from "./auth-provider"; // Import useAuth

const dashboardLinks = [
  {
    value: "code-forge",
    label: "Code Forge",
    icon: <Code className='h-5 w-5' />,
    roles: ['user', 'admin'],
  },
  {
    value: "my-snippets",
    label: "My Snippets",
    icon: <FolderKanban className='h-5 w-5' />,
    roles: ['user', 'admin'],
  },
  {
    value: "ui-builder",
    label: "UI Builder",
    icon: <LayoutGrid className='h-5 w-5' />,
    roles: ['user', 'admin'],
  },
  {
    value: "design-advisor",
    label: "Design Advisor",
    icon: <Sparkles className='h-5 w-5' />,
    roles: ['user', 'admin'],
  },
  {
    value: "blog-admin",
    label: "Blog Admin",
    icon: <Newspaper className='h-5 w-5' />,
    roles: ['admin'], // Admin only
  },
  {
    value: "testimonials",
    label: "Testimonials",
    icon: <MessageSquareQuote className='h-5 w-5' />,
    roles: ['admin'], // Admin only
  },
  {
    value: "social-links",
    label: "Social Links",
    icon: <Share2 className='h-5 w-5' />,
    roles: ['admin'], // Admin only
  },
  {
    value: "contact-info",
    label: "Contact Info",
    icon: <Contact className='h-5 w-5' />,
    roles: ['admin'], // Admin only
  },
  {
    value: "export-toolkit",
    label: "Export Toolkit",
    icon: <Download className='h-5 w-5' />,
    roles: ['user', 'admin'],
  },
  {
    value: "component-library",
    label: "Component Library",
    icon: <Library className='h-5 w-5' />,
    roles: ['user', 'admin'],
  },
];

export function DashboardSidebar() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "code-forge";
  const { profile, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <aside className="hidden md:block border-r bg-muted/40">
        <div className="flex h-full max-h-screen flex-col gap-2 p-4">
          <div className="flex-1 space-y-2">
            <div className="h-8 w-full bg-muted rounded-lg animate-pulse" />
            <div className="h-8 w-full bg-muted rounded-lg animate-pulse" />
            <div className="h-8 w-full bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </aside>
    );
  }

  const userRole = profile?.role;

  return (
    <aside className="hidden md:block border-r bg-muted/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1">
          <nav className="grid items-start px-2 py-4 text-sm font-medium lg:px-4">
            {dashboardLinks.map((link) => {
              // Only render link if user's role is allowed
              if (link.roles.includes(userRole || '')) {
                return (
                  <Link
                    key={link.value}
                    href={`/dashboard?tab=${link.value}`}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      currentTab === link.value && "bg-muted text-primary"
                    )}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              }
              return null;
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}