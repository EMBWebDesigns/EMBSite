import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CtaSection = () => {
  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-primary/10 border-b">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Ready to Start Building?
        </h2>
        <p className="mt-3 max-w-[600px] mx-auto text-muted-foreground md:text-lg">
          Sign up today and experience the future of web development.
        </p>
        <div className="mt-6">
          <Button asChild size="lg">
            <Link href="/login">Sign Up for Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};