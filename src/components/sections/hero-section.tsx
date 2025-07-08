import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-background border-y">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Build Your Next Website
        </h1>
        <p className="mt-4 max-w-[600px] mx-auto text-muted-foreground md:text-xl">
          Visually compose beautiful pages with our library of pre-built sections.
        </p>
        <div className="mt-6">
          <Button asChild size="lg">
            <Link href="/pricing">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};