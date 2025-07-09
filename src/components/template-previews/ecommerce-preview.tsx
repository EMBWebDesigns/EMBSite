"use client";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ProductCard = () => (
    <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}>
        <Card className="text-[8px] leading-tight">
            <CardContent className="p-1 space-y-1">
                <Skeleton className="h-12 w-full rounded-sm" />
                <div className="font-bold">Product Name</div>
                <div className="text-primary font-bold">$19.99</div>
            </CardContent>
        </Card>
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
    <div className="grid grid-cols-3 gap-2">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
    </div>
  </motion.div>
);