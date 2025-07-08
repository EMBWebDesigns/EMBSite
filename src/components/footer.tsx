"use client";

import React from 'react';
import { Logo } from './logo';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div className="mb-8 sm:mb-0">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              AI-Powered Web Development Platform to accelerate your workflow.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="font-medium text-foreground">Platform</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link href="/dashboard" className="text-muted-foreground hover:text-primary">Dashboard</Link></li>
                <li><Link href="/pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground">Resources</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link href="/docs" className="text-muted-foreground hover:text-primary">Documentation</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground">Legal</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} embwebdesigns.com. All rights reserved.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );