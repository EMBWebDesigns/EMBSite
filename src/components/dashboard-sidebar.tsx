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
  Contact, // Added for contact info
} from "lucide-react";

const dashboardLinks = [
  {
    value: "code-forge",
    label: "Code Forge",
    icon: <Code className='h-5 w-5' />,
  },
  {
    value: "my-snippets",
    label: "My Snippets",
    icon: <FolderKanban className='h-5 w-5' />,
  },
  {
    value: "ui-builder",
    label: "UI Builder",
    icon: <LayoutGrid className='h-5 w-5' />,
  },
  {
    value: "design-advisor",
    label: "Design Advisor",
    icon: <Sparkles className='h-5 w-5' />,
  },
  {
    value: "blog-admin",
    label: "Blog Admin",
    icon: <Newspaper className='h-5 w-5' />,
  },
  {
    value: "testimonials",
    label: "Testimonials",
    icon: <MessageSquareQuote className='h-5 w-5' />,
  },
  {
    value: "social-links",
    label: "Social Links",
    icon: <Share2 className='h-5 w-5' />,
  },
  {
    value: "contact-info", // New link
    label: "Contact Info", // New label
    icon: <Contact className='h-5 w-5' />, // New icon
  },
  {
    value: "export-toolkit",
    label: "Export Toolkit",
    icon: <Download className='h-5 w-5' />,
  },
  {
    value: "component-library",
    label: "Component Library",
    icon: <Library className='h-5 w-5' />,
  },
];

export function DashboardSidebar() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "code-forge";

  return (
    <aside className="hidden md:block border-r bg-muted/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1">
          <nav className="grid items-start px-2 py-4 text-sm font-medium lg:px-4">
            {dashboardLinks.map((link) => (
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
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}