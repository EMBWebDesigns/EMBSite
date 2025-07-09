import Image from "next/image";
import { supabase } from "@/integrations/supabase/client";
import { TestimonialSectionContent } from "./testimonial-section-content";

export const TestimonialSection = async () => {
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

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
        <TestimonialSectionContent testimonials={testimonials || []} />
      </div>
    </section>
  );
};