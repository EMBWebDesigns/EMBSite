"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";

export const StartupPreview = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    }}
    className="w-full h-full p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border text-[8px] leading-tight"
  >
    <div className="flex gap-3">
        <div className="w-1/2 space-y-1">
            <motion.h1 variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="text-xl font-bold">
              Launch Fast
            </motion.h1>
            <motion.p variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="text-foreground/80">
              The perfect template for your new venture.
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="flex items-center gap-1 pt-1">
                <Check className="h-3 w-3 text-secondary" />
                <span>Feature one</span>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="flex items-center gap-1">
                <Check className="h-3 w-3 text-secondary" />
                <span>Feature two</span>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pt-2">
                <Button size="sm" className="text-[7px] h-5 px-2">Get Started</Button>
            </motion.div>
        </div>
        <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="w-1/2">
            <Skeleton className="h-full w-full rounded-md bg-foreground/20" />
        </motion.div>
    </div>
  </motion.div>
);