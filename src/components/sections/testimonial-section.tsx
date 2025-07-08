"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TestimonialCard } from "@/components/testimonial-card";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "This tool has supercharged my workflow. I can prototype ideas in minutes instead of hours. It's an absolute game-changer.",
    name: "Sarah Dayan",
    title: "Frontend Developer @ TechCorp",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    initials: "SD",
  },
  {
    quote: "As a designer who codes, emb.web is the perfect bridge. I can bring my visual ideas to life without getting stuck on boilerplate code.",
    name: "Carlos Rodriguez",
    title: "UI/UX Designer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    initials: "CR",
  },
  {
    quote: "The quality of the generated code is surprisingly high. It's clean, follows best practices, and is easy to customize.",
    name: "Mei Lin",
    title: "Full-Stack Engineer",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    initials: "ML",
  },
  {
    quote: "The UI Builder is incredibly intuitive. I was able to assemble a complex landing page in under an hour. Highly recommended!",
    name: "Alex Johnson",
    title: "Project Manager @ Innovate Inc.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    initials: "AJ",
  },
  {
    quote: "As a freelance developer, speed is everything. emb.web helps me deliver high-quality websites to my clients faster than ever before.",
    name: "Emily White",
    title: "Freelance Web Developer",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    initials: "EW",
  },
  {
    quote: "The perfect tool for validating startup ideas. I can spin up a professional-looking landing page and start gathering feedback in no time.",
    name: "David Chen",
    title: "Startup Founder",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    initials: "DC",
  },
];

export const TestimonialSection = () => {
  return (
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
            Loved by Developers Worldwide
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Don't just take our word for it. Here's what our users are saying.
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="basis-full md:basis-1/2">
                <div className="p-1 h-full">
                  <TestimonialCard
                    quote={testimonial.quote}
                    name={testimonial.name}
                    title={testimonial.title}
                    avatar={testimonial.avatar}
                    initials={testimonial.initials}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="flex" />
          <CarouselNext className="flex" />
        </Carousel>
      </div>
    </section>
  );
};