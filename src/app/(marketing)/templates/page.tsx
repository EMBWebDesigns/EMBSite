"use client";

import { TemplateCard } from "@/components/template-card";
import { motion } from "framer-motion";

const templates = [
  {
    title: "SaaS Landing Page",
    description: "A modern, clean landing page perfect for any software-as-a-service product.",
    imageUrl: "https://images.unsplash.com/photo-1559028006-44a3a4f3658b?q=80&w=2187&auto=format&fit=crop",
  },
  {
    title: "E-commerce Storefront",
    description: "A stylish and functional storefront designed to maximize conversions.",
    imageUrl: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2340&auto=format&fit=crop",
  },
  {
    title: "Portfolio Website",
    description: "A minimalist and elegant portfolio to showcase your creative work.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2340&auto=format&fit=crop",
  },
  {
    title: "Blog & Newsletter",
    description: "A content-focused template with great readability and a clean layout.",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2340&auto=format&fit=crop",
  },
  {
    title: "Agency Homepage",
    description: "A professional and bold design to represent your creative agency.",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2340&auto=format&fit=crop",
  },
  {
    title: "Startup Website",
    description: "A vibrant and energetic template to launch your next big idea.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop",
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
            imageUrl={template.imageUrl}
          />
        ))}
      </motion.div>
    </div>
  );
}