"use client";

import { FeatureCard } from "@/components/feature-card";
import { Code, Download, Eye, LayoutGrid, Sparkles, Layers } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Code />,
    title: "Smart Code Generator",
    description: "Generate HTML, CSS, and React snippets from simple text prompts. Accelerate your workflow by turning ideas into code instantly.",
  },
  {
    icon: <LayoutGrid />,
    title: "UI Block Builder",
    description: "Visually assemble your UI with a library of pre-built, customizable components. Drag, drop, and build complex layouts with ease.",
  },
  {
    icon: <Sparkles />,
    title: "Layout Suggestion Engine",
    description: "Get AI-powered recommendations for layouts and designs that are optimized for user experience and conversion.",
  },
  {
    icon: <Eye />,
    title: "Live Component Previews",
    description: "Instantly see how your components look and behave in a real-time preview environment across different screen sizes.",
  },
  {
    icon: <Download />,
    title: "Export Tool",
    description: "Download your entire project as a clean, production-ready template compatible with popular frameworks like Next.js and Vite.",
  },
  {
    icon: <Layers />,
    title: "Component Library",
    description: "Access a rich library of reusable blocks and components to speed up your development process.",
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

export default function FeaturesPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-16 md:px-6 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Platform Features
        </h1>
        <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Explore the core capabilities that make emb.web the fastest way to build modern websites.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </motion.div>
    </div>
  );
}