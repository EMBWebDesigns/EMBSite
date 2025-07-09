"use client";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export const PortfolioPreview = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    }}
    className="w-full h-full p-4 bg-background rounded-lg border space-y-3 text-[8px] leading-tight"
  >
    <motion.div variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
            <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
            <div className="font-bold text-lg">John Doe</div>
            <div className="text-muted-foreground">Creative Developer & Designer</div>
        </div>
    </motion.div>
    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-2 gap-2">
        <Card><Skeleton className="h-16 w-full rounded-sm" /></Card>
        <Card><Skeleton className="h-16 w-full rounded-sm" /></Card>
        <Card><Skeleton className="h-16 w-full rounded-sm" /></Card>
        <Card><Skeleton className="h-16 w-full rounded-sm" /></Card>
    </motion.div>
  </motion.div>
);