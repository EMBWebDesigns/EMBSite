"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Folder, File, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

const fileContents: Record<string, string> = {
  "package.json": `{
  "name": "emb-web-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "^18",
    "react-dom": "^18",
    "tailwindcss": "^3.4.1",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.378.0",
    "tailwind-merge": "^2.3.0",
    "tailwindcss-animate": "^1.0.7",
    "@supabase/supabase-js": "^2.50.3",
    "sonner": "^2.0.3",
    "next-themes": "^0.4.6"
  }
}`,
  "tailwind.config.ts": `import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-jetbrains-mono)", ...defaultTheme.fontFamily.mono],
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;`,
  "src/app/layout.tsx": `import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "embwebdesigns.com - AI-Powered Web Development",
  description: "An AI-driven platform that streamlines website development with intelligent code generation, UI/UX suggestions, and component-based modular building.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          jetbrainsMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}`,
  "src/app/(marketing)/page.tsx": `import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Layers, LayoutGrid, Sparkles, PencilLine, Bot, DownloadCloud } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { FeatureCard } from "@/components/feature-card";
import { FeaturedTemplatesSection } from "@/components/sections/featured-templates-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroClientSection } from "@/components/sections/hero-client-section";

const homeFeatures = [
  {
    icon: <Code />,
    title: "Smart Code Generator",
    description: "Turn ideas into code instantly with AI-powered snippet generation.",
  },
  {
    icon: <LayoutGrid />,
    title: "UI Block Builder",
    description: "Visually assemble your UI with a library of pre-built components.",
  },
  {
    icon: <Sparkles />,
    title: "Layout Suggestion Engine",
    description: "Get AI-powered recommendations for optimized layouts and designs.",
  },
];

const howItWorksSteps = [
  {
    icon: <PencilLine />,
    title: "1. Describe Your Vision",
    description: "Use simple, natural language to tell the AI what you want to build. From a simple button to a complex data grid.",
  },
  {
    icon: <Bot />,
    title: "2. Generate & Preview",
    description: "Our AI gets to work, generating clean, production-ready code. See your component come to life instantly in a live preview.",
  },
  {
    icon: <DownloadCloud />,
    title: "3. Export & Integrate",
    description: "Happy with the result? Export the code snippet or the entire project and integrate it seamlessly into your workflow.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <HeroClientSection />

        <section className="w-full py-24 md:py-32 border-t bg-grid-pattern">
          <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
            <div
              className="flex flex-col items-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features to Build Faster
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From code generation to layout suggestions, our AI has you covered. We provide a suite of tools designed to accelerate your workflow and enhance your creativity.
              </p>
            </div>
            
            <div
              className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12"
            >
              {homeFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>

            <div
              className="mt-12 text-center"
            >
              <Button asChild size="lg">
                <Link href="/features">
                  Explore All Features
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-24 md:py-32 bg-background/50 border-t bg-dot-pattern">
          <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
            <div
              className="flex flex-col items-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Build in Three Simple Steps
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Go from idea to production-ready code faster than ever before.
              </p>
            </div>
            
            <div
              className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12"
            >
              {howItWorksSteps.map((step, index) => (
                <FeatureCard
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
          <TestimonialSection />
        </Suspense>

        <FeaturedTemplatesSection />

        <section className="w-full py-24 md:py-32 border-t bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div
              >
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Ready to Build Faster?
                </h2>
              </div>
              <p
                className="max-w-[700px] text-muted-foreground md:text-xl"
              >
                Sign up for free and start turning your ideas into reality today. No credit card required.
              </p>
              <div
              >
                <Button asChild size="lg">
                  <Link href="/login">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MadeWithDyad />
    </div>
  );
}
`,
  "src/components/ui/button.tsx": `"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
`,
};

const fileTree = [
  { name: "src", type: "folder", children: [
    { name: "app", type: "folder", children: [
      { name: "layout.tsx", type: "file", path: "src/app/layout.tsx" },
      { name: "(marketing)", type: "folder", children: [
        { name: "page.tsx", type: "file", path: "src/app/(marketing)/page.tsx" },
      ]},
    ]},
    { name: "components", type: "folder", children: [
      { name: "ui", type: "folder", children: [
        { name: "button.tsx", type: "file", path: "src/components/ui/button.tsx" },
      ]},
    ]},
  ]},
  { name: "package.json", type: "file", path: "package.json" },
  { name: "tailwind.config.ts", type: "file", path: "tailwind.config.ts" },
];

const FileTreeItem = ({ item, level = 0, onSelect, selectedFile }: { item: any; level?: number; onSelect: (path: string) => void; selectedFile: string | null }) => (
  <button
    onClick={() => item.type === 'file' && onSelect(item.path)}
    disabled={item.type === 'folder'}
    className={cn(
      "w-full text-left flex items-center text-sm px-2 py-1.5 rounded-md",
      item.type === 'folder' ? 'cursor-default text-muted-foreground' : 'hover:bg-muted',
      selectedFile === item.path && 'bg-muted'
    )}
    style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
  >
    {item.type === 'folder' ? <Folder className="h-4 w-4 mr-2 text-primary" /> : <File className="h-4 w-4 mr-2 text-muted-foreground" />}
    <span>{item.name}</span>
  </button>
);

const RenderFileTree = ({ tree, level = 0, onSelect, selectedFile }: { tree: any[]; level?: number; onSelect: (path: string) => void; selectedFile: string | null }) => (
  <>
    {tree.map(item => (
      <div key={item.name}>
        <FileTreeItem item={item} level={level} onSelect={onSelect} selectedFile={selectedFile} />
        {item.children && <RenderFileTree tree={item.children} level={level + 1} onSelect={onSelect} selectedFile={selectedFile} />}
      </div>
    ))}
  </>
);

export const ExportToolkit = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>("src/app/(marketing)/page.tsx");

  const handleCopy = () => {
    if (selectedFile && fileContents[selectedFile]) {
      navigator.clipboard.writeText(fileContents[selectedFile]);
      toast.success("Code copied to clipboard!");
    }
  };

  const handleDownloadZip = () => {
    toast.success("Simulating download...", {
      description: "A ZIP file containing your project would be downloaded here.",
      duration: 3000,
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] w-full">
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="p-4 h-full">
              <h3 className="font-semibold mb-2">File Explorer</h3>
              <div className="font-mono space-y-1">
                <RenderFileTree tree={fileTree} onSelect={setSelectedFile} selectedFile={selectedFile} />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            <div className="relative h-full">
              {selectedFile && (
                <Button
                  size="sm"
                  onClick={handleCopy}
                  className="absolute top-4 right-4 z-10"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              )}
              <div className="h-full bg-[#282c34] overflow-y-auto">
                {selectedFile ? (
                  <SyntaxHighlighter
                    language="tsx"
                    style={atomDark}
                    customStyle={{ margin: 0, padding: "1.5rem", backgroundColor: "transparent", height: '100%' }}
                    showLineNumbers
                  >
                    {fileContents[selectedFile]}
                  </SyntaxHighlighter>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Select a file to view its content.</p>
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
      <div className="p-4 border-t flex justify-end">
        <Button onClick={handleDownloadZip}>
          <Download className="mr-2 h-4 w-4" />
          Download Project ZIP
        </Button>
      </div>
    </Card>
  );
};