"use client";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCard = () => (
    <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="space-y-2">
        <Skeleton className="h-16 w-full rounded-md" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
    </motion.div>
)

export const EcommercePreview = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    }}
    className="w-full h-full p-4 bg-background rounded-lg border"
  >
    <div className="grid grid-cols-3 gap-3">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
    </div>
  </motion.div>
);