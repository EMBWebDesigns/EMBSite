"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

export const SaasPreview = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    }}
    className="w-full h-full p-4 bg-background rounded-lg border space-y-4 text-[8px] leading-tight"
  >
    <motion.div variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} className="flex justify-between items-center">
      <div className="font-bold">Product</div>
      <div className="flex gap-2 items-center">
        <div>Features</div>
        <div>Pricing</div>
        <Button size="sm" className="text-[7px] h-5 px-2">Sign Up</Button>
      </div>
    </motion.div>
    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="space-y-1 text-center pt-4">
      <h1 className="text-xl font-bold">Build your SaaS</h1>
      <p className="text-muted-foreground">A great tagline about your product.</p>
      <Button size="sm" className="text-[7px] h-5 px-2 mt-1">Get Started</Button>
    </motion.div>
    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-3 gap-2 pt-2">
      <Card>
        <CardHeader className="p-2">
            <Star className="w-3 h-3 text-primary" />
        </CardHeader>
        <CardContent className="p-2">
            <h3 className="font-bold">Feature One</h3>
            <p className="text-muted-foreground">Short description.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="p-2">
            <Star className="w-3 h-3 text-primary" />
        </CardHeader>
        <CardContent className="p-2">
            <h3 className="font-bold">Feature Two</h3>
            <p className="text-muted-foreground">Short description.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="p-2">
            <Check className="w-3 h-3 text-secondary" />
        </CardHeader>
        <CardContent className="p-2">
            <h3 className="font-bold">Feature Three</h3>
            <p className="text-muted-foreground">Short description.</p>
        </CardContent>
      </Card>
    </motion.div>
  </motion.div>
);