"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, PenTool, Search } from "lucide-react";

export const AgencyPreview = () => (
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
        <h1 className="text-xl font-bold">Creative Agency</h1>
        <p className="text-muted-foreground">We build amazing digital experiences that users love. Let's build something great together.</p>
        <Button size="sm" className="text-[7px] h-5 px-2 mt-1">Our Work</Button>
    </motion.div>
    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-3 gap-2 pt-2">
        <div className="text-center p-1 bg-muted rounded-md space-y-1">
            <PenTool className="w-4 h-4 mx-auto text-primary" />
            <p className="font-bold">Design</p>
        </div>
        <div className="text-center p-1 bg-muted rounded-md space-y-1">
            <Bot className="w-4 h-4 mx-auto text-primary" />
            <p className="font-bold">Development</p>
        </div>
        <div className="text-center p-1 bg-muted rounded-md space-y-1">
            <Search className="w-4 h-4 mx-auto text-primary" />
            <p className="font-bold">SEO</p>
        </div>
    </motion.div>
  </motion.div>
);