"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface BlogPostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  tags: string[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const BlogPostCard = ({ slug, title, excerpt, imageUrl, date, tags }: BlogPostCardProps) => {
  return (
    <motion.div variants={cardVariants}>
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
        <Link href={`/blog/${slug}`}>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          </AspectRatio>
        </Link>
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{excerpt}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow" />
        <CardFooter className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{date}</p>
          <Button asChild variant="secondary" size="sm">
            <Link href={`/blog/${slug}`}>
              Read More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};