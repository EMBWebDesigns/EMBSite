import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { Skeleton } from "../ui/skeleton";
import { Suspense } from "react";

const Testimonials = async () => {
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  return <TestimonialCarousel testimonials={testimonials || []} />;
}

export const TestimonialSection = () => {
  return (
    <section className="relative w-full py-24 md:py-32 border-t">
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop"
          alt="Abstract background"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-background/80" />
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <div
          className="flex flex-col items-center space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Loved by Developers Worldwide
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Don't just take our word for it. Here's what our users are saying.
          </p>
        </div>
        <Suspense fallback={<Skeleton className="h-48 w-full max-w-5xl mx-auto" />}>
          <Testimonials />
        </Suspense>
      </div>
    </section>
  );
};