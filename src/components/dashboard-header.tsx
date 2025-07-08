"use client";

import { Logo } from './logo';
import { UserNav } from './user-nav';

export const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Logo />
        <UserNav />
      </div>
    </header>
  );
};