"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Layers } from "lucide-react";
import { motion } from "framer-motion";

export const HeroClientSection = () => {
  return (
    <section className='relative w-full py-24 md:py-32 lg:py-40 flex items-center min-h-[calc(100vh-10rem)]'>
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/hero.webp'
          alt='Abstract background'
          width={1920}
          height={1080}
          className='object-cover h-full'
        />
      </div>
      <div className='absolute z-10 inset-0 bg-gradient-to-b from-transparent via-75% via-background/30 to-background/50' />

      <div className='container z-20 mx-auto max-w-screen-xl px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-6 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>
              Build Smarter Websites with AI Precision
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='max-w-[700px] text-muted-foreground md:text-xl'
          >
            Accelerate your web development process with AI automation. Deliver
            pixel-perfect designs, strategic content, and optimized pages with
            instant AI generated code.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex flex-col sm:flex-row gap-4'
          >
            <Button asChild size='lg'>
              <Link href='/dashboard'>
                <Code className='mr-2 h-5 w-5' />
                Try Code Builder
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button asChild variant='secondary' size='lg'>
              <Link href='/templates'>
                <Layers className='mr-2 h-5 w-5' />
                Explore Templates
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
