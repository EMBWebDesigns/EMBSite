"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatar: string;
  initials: string;
}

export const TestimonialCard = ({ quote, name, title, avatar, initials }: TestimonialCardProps) => {
  return (
    <Card className="h-full bg-card/50 hover:bg-card/80 transition-colors">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <blockquote className="text-lg font-semibold leading-snug text-foreground">
          “{quote}”
        </blockquote>
        <div className="mt-6 flex items-center gap-4">
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};