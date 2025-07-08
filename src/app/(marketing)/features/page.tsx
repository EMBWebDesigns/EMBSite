"use client";

import { FeatureCard } from "@/components/feature-card";
import { CtaSection } from "@/components/sections/cta-section";
import { Code, Download, Eye, LayoutGrid, Sparkles, Layers, Bot, Palette, Server } from "lucide-react";
import { motion } from "framer-motion";

const featureCategories = [
  {
    title: "Core AI Tools",
    description: "Harness the power of AI to accelerate every stage of development.",
    features: [
      {
        icon: <Code />,
        title: "Smart Code Generator",
        description: "Generate HTML, CSS, and React snippets from simple text prompts. Accelerate your workflow by turning ideas into code instantly.",
      },
      {
        icon: <Palette />,
        title: "Design Advisor",
        description: "Get AI-powered recommendations for color palettes and theme adjustments that are optimized for user experience.",
      },
      {
        icon: <Bot />,
        title: "Layout Suggestion Engine",
        description: "Receive intelligent suggestions for layouts and designs that are proven to enhance usability and conversion rates.",
      },
    ]
  },
  {
    title: "Development Workflow",
    description: "Tools designed to make your development process seamless and efficient.",
    features: [
      {
        icon: <LayoutGrid />,
        title: "UI Block Builder",
        description: "Visually assemble your UI with a library of pre-built, customizable components. Drag, drop, and build complex layouts with ease.",
      },
      {
        icon: <Eye />,
        title: "Live Component Previews",
        description: "Instantly see how your components look and behave in a real-time preview environment across different screen sizes.",
      },
      {
        icon: <Layers />,
        title: "Component Library",
        description: "Access a rich library of reusable blocks and components to speed up your development process and ensure consistency.",
      },
    ]
  },
  {
    title: "Export & Integration",
    description: "Go from prototype to production without friction.",
    features: [
       {
        icon: <Download />,
        title: "Export Tool",
        description: "Download your entire project as a clean, production-ready template compatible with popular frameworks like Next.js and Vite.",
      },
      {
        icon: <Server />,
        title: "API Access",
        description: "Integrate our AI capabilities into your own applications and workflows with our powerful and easy-to-use API. (Coming Soon)",
      },
    ]
  }
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
    <>
      <div className="container mx-auto max-w-screen-xl px-4 py-16 md:px-6 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Platform Features
          </h1>
          <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Explore the core capabilities that make emb.web the fastest way to build modern websites.
          </p>
        </motion.div>

        <div className="space-y-20">
          {featureCategories.map(category => (
            <motion.div
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter">{category.title}</h2>
                <p className="mt-3 max-w-[600px] mx-auto text-muted-foreground md:text-lg">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {category.features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <CtaSection />
    </>
  );
}