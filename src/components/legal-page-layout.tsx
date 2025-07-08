"use client";

import React from "react";
import { motion } from "framer-motion";

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const LegalPageLayout = ({ title, children }: LegalPageLayoutProps) => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-8">
          {title}
        </h1>
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          {children}
        </div>
      </motion.div>
    </div>
  );
};