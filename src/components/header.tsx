"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserNav } from "./user-nav";
import { useAuth } from "./auth-provider";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/docs", label: "Documentation" },
  { href: "/contact", label: "Contact" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className='sticky mx-auto top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container relative flex h-16 max-w-screen-2xl items-center'>
        <div className='flex items-center'>
          <Logo />
        </div>

        <nav className='hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-6 text-sm font-medium'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname.startsWith(link.href)
                  ? "text-primary"
                  : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='flex flex-1 items-center justify-end space-x-2'>
          <div className='hidden md:flex items-center space-x-2'>
            {user && (
              <Button asChild variant='ghost'>
                <Link href='/dashboard'>Dashboard</Link>
              </Button>
            )}
            <UserNav />
          </div>

          <div className='md:hidden'>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-6 w-6' />
                  <span className='sr-only'>Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
                <div className='p-4'>
                  <div className='mb-8'>
                    <Logo />
                  </div>
                  <div className='flex flex-col space-y-4'>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          pathname.startsWith(link.href) && "text-primary"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className='mt-4 border-t pt-4'>
                      <div className='flex flex-col space-y-4 items-start'>
                        {user && (
                          <Link
                            href='/dashboard'
                            onClick={() => setIsMenuOpen(false)}
                            className={cn(
                              "text-lg font-medium transition-colors hover:text-primary",
                              pathname.startsWith("/dashboard") &&
                                "text-primary"
                            )}
                          >
                            Dashboard
                          </Link>
                        )}
                        <UserNav />
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
