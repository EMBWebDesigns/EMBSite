"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactElement<LucideProps>;
  title: string;
  description: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div variants={cardVariants}>
      <Card className="h-full bg-card/50 hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center gap-4 pb-4">
          {React.cloneElement(icon, { className: "h-8 w-8 text-primary" })}
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};