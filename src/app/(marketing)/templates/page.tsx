"use client";

import { TemplateCard } from "@/components/template-card";
import { motion } from "framer-motion";
import { TemplateKey } from "@/components/template-previews";

const templates: { title: string; description: string; previewKey: TemplateKey }[] = [
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
  {
    title: "Blog & Newsletter",
    description: "A content-focused template with great readability and a clean layout.",
    previewKey: "blog",
  },
  {
    title: "Agency Homepage",
    description: "A professional and bold design to represent your creative agency.",
    previewKey: "agency",
  },
  {
    title: "Startup Website",
    description: "A vibrant and energetic template to launch your next big idea.",
    previewKey: "startup",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function TemplatesPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-16 md:px-6 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Website Templates
        </h1>
        <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Browse our library of professionally designed, production-ready templates to kickstart your next project.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {templates.map((template) => (
          <TemplateCard
            key={template.title}
            title={template.title}
            description={template.description}
            previewKey={template.previewKey}
          />
        ))}
      </motion.div>
    </div>
  );
}