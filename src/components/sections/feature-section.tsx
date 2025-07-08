import { FeatureCard } from "@/components/feature-card";
import { Code, LayoutGrid, Sparkles } from "lucide-react";

const features = [
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

export const FeatureSection = () => {
  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-background/50 border-b">
      <div className="container mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Key Features</h2>
            <p className="mt-3 max-w-[600px] mx-auto text-muted-foreground md:text-lg">
                Everything you need to design and build modern web experiences.
            </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};