"use client";

import { TemplateCard } from "@/components/template-card";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TemplateKey } from "../template-previews";

const featuredTemplates: { title: string; description: string; previewKey: TemplateKey }[] = [
  {
    title: "SaaS Landing Page",
    description: "A modern, clean landing page perfect for any software-as-a-service product.",
    previewKey: "saas",
  },
  {
    title: "E-commerce Storefront",
    description: "A stylish and functional storefront designed to maximize conversions.",
    previewKey: "ecommerce",
  },
  {
    title: "Portfolio Website",
    description: "A minimalist and elegant portfolio to showcase your creative work.",
    previewKey: "portfolio",
  },
];

export const FeaturedTemplatesSection = () => {
  return (
    <section className="w-full py-24 md:py-32 bg-background/50 border-t">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Kickstart Your Next Project
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Browse our library of professionally designed, production-ready templates.
          </p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
          className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12"
        >
          {featuredTemplates.map((template) => (
            <TemplateCard
              key={template.title}
              title={template.title}
              description={template.description}
              previewKey={template.previewKey}
            />
          ))}
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
        >
            <Button asChild size="lg" variant="secondary">
            <Link href="/templates">
                Explore All Templates
                <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            </Button>
        </motion.div>
      </div>
    </section>
  );
};