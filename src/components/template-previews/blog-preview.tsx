"use client";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export const BlogPreview = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    }}
    className="w-full h-full p-4 bg-background rounded-lg border space-y-4"
  >
    <motion.div variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} className="space-y-2">
        <Skeleton className="h-24 w-full rounded-md" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
    </motion.div>
    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex gap-3">
        <Skeleton className="h-12 w-1/3 rounded-md" />
        <div className="w-2/3 space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-full" />
        </div>
    </motion.div>
  </motion.div>
);