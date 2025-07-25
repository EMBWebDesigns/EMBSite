"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Eye, Layers } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { TemplateKey, templatePreviews } from "./template-previews";

interface TemplateCardProps {
  title: string;
  description: string;
  previewKey: TemplateKey;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const TemplateCard = ({ title, description, previewKey }: TemplateCardProps) => {
  const PreviewComponent = templatePreviews[previewKey];

  return (
    <Dialog>
      <motion.div variants={cardVariants}>
        <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
          <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
            {PreviewComponent}
          </AspectRatio>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <DialogTrigger asChild>
              <Button variant="secondary" className="w-full">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
      </motion.div>

      <DialogContent className="sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
            {PreviewComponent}
          </AspectRatio>
        </div>
        <div className="flex justify-end">
            <Button asChild>
                <Link href="/dashboard">
                    <Layers className="mr-2 h-4 w-4" />
                    Use This Template
                </Link>
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};