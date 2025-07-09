"use client";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export const BlogPreview = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    }}
    className="w-full h-full p-4 bg-background rounded-lg border space-y-3 text-[8px] leading-tight"
  >
    <motion.div variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} className="space-y-1">
        <Skeleton className="h-20 w-full rounded-md" />
        <div className="flex gap-1 pt-1">
            <Badge variant="secondary" className="text-[7px] px-1 py-0">Tech</Badge>
            <Badge variant="secondary" className="text-[7px] px-1 py-0">News</Badge>
        </div>
        <h3 className="font-bold text-lg">Featured Article Title</h3>
        <p className="text-muted-foreground">This is a short excerpt of the main article to give readers a glimpse of the content...</p>
    </motion.div>
    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex gap-2 pt-2 border-t">
        <Skeleton className="h-10 w-1/3 rounded-md" />
        <div className="w-2/3 space-y-1">
            <div className="font-bold">Secondary Post</div>
            <div className="text-muted-foreground">A short description of another post.</div>
        </div>
    </motion.div>
  </motion.div>
);