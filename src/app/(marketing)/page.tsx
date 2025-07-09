import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Layers,
  LayoutGrid,
  Sparkles,
  PencilLine,
  Bot,
  DownloadCloud,
} from "lucide-react";
// The 'motion' import is intentionally removed as this is a Server Component.
import { MadeWithDyad } from "@/components/made-with-dyad";
import { FeatureCard } from "@/components/feature-card";
import { FeaturedTemplatesSection } from "@/components/sections/featured-templates-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroClientSection } from "@/components/sections/hero-client-section";

const homeFeatures = [
  {
    icon: <Code />,
    title: "Smart Code Generator",
    description:
      "Turn ideas into code instantly with AI-powered snippet generation.",
  },
  {
    icon: <LayoutGrid />,
    title: "UI Block Builder",
    description:
      "Visually assemble your UI with a library of pre-built components.",
  },
  {
    icon: <Sparkles />,
    title: "Layout Suggestion Engine",
    description:
      "Get AI-powered recommendations for optimized layouts and designs.",
  },
];

const howItWorksSteps = [
  {
    icon: <PencilLine />,
    title: "1. Describe Your Vision",
    description:
      "Use simple, natural language to tell the AI what you want to build. From a simple button to a complex data grid.",
  },
  {
    icon: <Bot />,
    title: "2. Generate & Preview",
    description:
      "Our AI gets to work, generating clean, production-ready code. See your component come to life instantly in a live preview.",
  },
  {
    icon: <DownloadCloud />,
    title: "3. Export & Integrate",
    description:
      "Happy with the result? Export the code snippet or the entire project and integrate it seamlessly into your workflow.",
  },
];

export default function Home() {
  return (
    <div className='flex flex-col'>
      <main className='flex-1'>
        <HeroClientSection />

        <section className='w-full py-24 md:py-32 border-t bg-grid-pattern'>
          <div className='container mx-auto max-w-screen-xl px-4 md:px-6'>
            <div
              // Removed motion.div as this is a Server Component
              className='flex flex-col items-center space-y-4 text-center mb-12'
            >
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                Powerful Features to Build Faster
              </h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                From code generation to layout suggestions, our AI has you
                covered. We provide a suite of tools designed to accelerate your
                workflow and enhance your creativity.
              </p>
            </div>

            <div
              // Removed motion.div as this is a Server Component
              className='mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12'
            >
              {homeFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>

            <div
              // Removed motion.div as this is a Server Component
              className='mt-12 text-center'
            >
              <Button asChild size='lg'>
                <Link href='/features'>
                  Explore All Features
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className='w-full py-24 md:py-32 bg-background/50 border-t bg-dot-pattern'>
          <div className='container mx-auto max-w-screen-xl px-4 md:px-6'>
            <div
              // Removed motion.div as this is a Server Component
              className='flex flex-col items-center space-y-4 text-center mb-12'
            >
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                Build in Three Simple Steps
              </h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Go from idea to production-ready code faster than ever before.
              </p>
            </div>

            <div
              // Removed motion.div as this is a Server Component
              className='mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12'
            >
              {howItWorksSteps.map((step, index) => (
                <FeatureCard
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<Skeleton className='h-[500px] w-full' />}>
          <TestimonialSection />
        </Suspense>

        <FeaturedTemplatesSection />

        <section className='w-full py-24 md:py-32 border-t bg-gradient-to-br from-primary/10 via-background to-secondary/10'>
          <div className='container mx-auto max-w-screen-xl px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-6 text-center'>
              <div
              // Removed motion.div as this is a Server Component
              >
                <h2 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
                  Ready to Build Faster?
                </h2>
              </div>
              <p
                // Removed motion.p as this is a Server Component
                className='max-w-[700px] text-muted-foreground md:text-xl'
              >
                Sign up for free and start turning your ideas into reality
                today. No credit card required.
              </p>
              <div
              // Removed motion.div as this is a Server Component
              >
                <Button asChild size='lg'>
                  <Link href='/login'>
                    Get Started for Free
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <MadeWithDyad /> */}
    </div>
  );
}
