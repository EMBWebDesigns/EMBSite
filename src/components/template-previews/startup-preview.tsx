"use client";
import { motion } from "framer-motion";
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
    className="w-full h-full p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border"
  >
    <div className="flex gap-4">
        <div className="w-1/2 space-y-2">
            <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                <Skeleton className="h-6 w-full bg-foreground/20" />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                <Skeleton className="h-4 w-full bg-foreground/20" />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="flex items-center gap-1 pt-2">
                <Check className="h-3 w-3 text-foreground/60" />
                <Skeleton className="h-3 w-12 bg-foreground/20" />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="flex items-center gap-1">
                <Check className="h-3 w-3 text-foreground/60" />
                <Skeleton className="h-3 w-16 bg-foreground/20" />
            </motion.div>
        </div>
        <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="w-1/2">
            <Skeleton className="h-full w-full rounded-md bg-foreground/20" />
        </motion.div>
    </div>
  </motion.div>
);