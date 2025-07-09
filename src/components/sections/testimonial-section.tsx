"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TestimonialCard } from "@/components/testimonial-card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Testimonial } from "@/types/testimonial";
import { Skeleton } from "../ui/skeleton";

export const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      setTestimonials(data || []);
      setLoading(false);
    };
    fetchTestimonials();
  }, []);

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Loved by Developers Worldwide
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Don't just take our word for it. Here's what our users are saying.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <Skeleton className="h-48 w-full max-w-5xl" />
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="basis-full md:basis-1/2">
                  <div className="p-1 h-full">
                    <TestimonialCard
                      quote={testimonial.quote}
                      name={testimonial.name}
                      title={testimonial.title}
                      avatar={testimonial.avatar_url || ''}
                      initials={testimonial.initials || '??'}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="flex" />
            <CarouselNext className="flex" />
          </Carousel>
        )}
      </div>
    </section>
  );
};