"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TemplateCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const TemplateCard = ({ title, description, imageUrl }: TemplateCardProps) => {
  return (
    <motion.div variants={cardVariants}>
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </AspectRatio>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="secondary" className="w-full">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};