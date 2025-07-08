"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Layers, LayoutGrid, Sparkles, PencilLine, Bot, DownloadCloud } from "lucide-react";
import { motion } from "framer-motion";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { FeatureCard } from "@/components/feature-card";
import { FeaturedTemplatesSection } from "@/components/sections/featured-templates-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";

const homeFeatures = [
  {
    icon: <Code />,
    title: "Smart Code Generator",
    description: "Turn ideas into code instantly with AI-powered snippet generation.",
  },
  {
    icon: <LayoutGrid />,
    title: "UI Block Builder",
    description: "Visually assemble your UI with a library of pre-built components.",
  },
  {
    icon: <Sparkles />,
    title: "Layout Suggestion Engine",
    description: "Get AI-powered recommendations for optimized layouts and designs.",
  },
];

const howItWorksSteps = [
  {
    icon: <PencilLine />,
    title: "1. Describe Your Vision",
    description: "Use simple, natural language to tell the AI what you want to build. From a simple button to a complex data grid.",
  },
  {
    icon: <Bot />,
    title: "2. Generate & Preview",
    description: "Our AI gets to work, generating clean, production-ready code. See your component come to life instantly in a live preview.",
  },
  {
    icon: <DownloadCloud />,
    title: "3. Export & Integrate",
    description: "Happy with the result? Export the code snippet or the entire project and integrate it seamlessly into your workflow.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-40 flex items-center min-h-[calc(100vh-10rem)]">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

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

        <section className="w-full py-24 md:py-32 border-t">
          <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features to Build Faster
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From code generation to layout suggestions, our AI has you covered. We provide a suite of tools designed to accelerate your workflow and enhance your creativity.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.2 }}
              className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12"
            >
              {homeFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
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
              <Button asChild size="lg">
                <Link href="/features">
                  Explore All Features
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

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
                Build in Three Simple Steps
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Go from idea to production-ready code faster than ever before.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.2 }}
              className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12"
            >
              {howItWorksSteps.map((step, index) => (
                <FeatureCard
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </motion.div>
          </div>
        </section>

        <TestimonialSection />

        <FeaturedTemplatesSection />

        <section className="w-full py-24 md:py-32 border-t">
          <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Ready to Build Faster?
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-[700px] text-muted-foreground md:text-xl"
              >
                Sign up for free and start turning your ideas into reality today. No credit card required.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button asChild size="lg">
                  <Link href="/login">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <MadeWithDyad />
    </div>
  );
}