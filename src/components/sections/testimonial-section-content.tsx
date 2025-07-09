"use client";

import { motion } from "framer-motion";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { Testimonial } from "@/types/testimonial";

interface TestimonialSectionContentProps {
  testimonials: Testimonial[];
}

export const TestimonialSectionContent = ({ testimonials }: TestimonialSectionContentProps) => {
  return (
    <>
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
      <TestimonialCarousel testimonials={testimonials} />
    </>
  );
};