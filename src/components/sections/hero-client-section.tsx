"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Layers } from "lucide-react";
import { motion } from "framer-motion";

export const HeroClientSection = () => {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 flex items-center min-h-[calc(100vh-10rem)]">
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1550026593-de5480a75034?q=80&w=2194&auto=format&fit=crop"
          alt="Abstract background"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-background/60 bg-gradient-to-b from-background/20 via-background/80 to-background" />

      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              AI-Powered Web Development
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[700px] text-muted-foreground md:text-xl"
          >
            Streamline your development with intelligent code generation, UI/UX suggestions, and a component-based modular builder.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg">
              <Link href="/dashboard">
                <Code className="mr-2 h-5 w-5" />
                Try Code Builder
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/templates">
                <Layers className="mr-2 h-5 w-5" />
                Explore Templates
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};