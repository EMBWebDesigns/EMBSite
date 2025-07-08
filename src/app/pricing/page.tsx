"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const pricingTiers = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "For individuals and hobbyists getting started.",
    features: ["1 User", "1 Project", "Basic AI Suggestions", "Community Support"],
    cta: "Get Started",
  },
  {
    name: "Developer",
    price: { monthly: 29, yearly: 290 },
    description: "For professional developers building serious projects.",
    features: ["1 User", "10 Projects", "Advanced AI Suggestions", "Code Export", "Email Support"],
    cta: "Start Free Trial",
    isPopular: true,
  },
  {
    name: "Studio",
    price: { monthly: 99, yearly: 990 },
    description: "For agencies and teams requiring collaboration.",
    features: ["5 Users", "Unlimited Projects", "Team Collaboration", "Priority Support", "API Access"],
    cta: "Contact Sales",
  },
];

const featureMatrix = [
    { feature: "Number of Users", free: "1", developer: "1", studio: "5 (customizable)" },
    { feature: "Projects", free: "1", developer: "10", studio: "Unlimited" },
    { feature: "Basic AI Suggestions", free: true, developer: true, studio: true },
    { feature: "Advanced AI Suggestions", free: false, developer: true, studio: true },
    { feature: "Code Export (Next.js, Vite)", free: false, developer: true, studio: true },
    { feature: "Team Collaboration", free: false, developer: false, studio: true },
    { feature: "API Access", free: false, developer: false, studio: true },
    { feature: "Community Support", free: true, developer: true, studio: true },
    { feature: "Email Support", free: false, developer: true, studio: true },
    { feature: "Priority Support", free: false, developer: false, studio: true },
];


export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-16 md:px-6 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Find the Right Plan for You
        </h1>
        <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Start for free, then scale up as you grow. All plans include our core AI features.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center justify-center space-x-4 mb-12"
      >
        <Label htmlFor="billing-cycle">Monthly</Label>
        <Switch
          id="billing-cycle"
          checked={billingCycle === "yearly"}
          onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
        />
        <Label htmlFor="billing-cycle" className="flex items-center">
            Yearly
            <span className="ml-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">SAVE 15%</span>
        </Label>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {pricingTiers.map((tier) => (
          <motion.div key={tier.name} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Card className={cn("flex flex-col h-full", tier.isPopular && "border-primary ring-2 ring-primary")}>
              {tier.isPopular && (
                <div className="py-1 px-4 bg-primary text-primary-foreground text-center text-sm font-semibold rounded-t-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow grid gap-6">
                <div className="text-4xl font-bold">
                  ${tier.price[billingCycle]}
                  <span className="text-sm font-normal text-muted-foreground">
                    {tier.name !== "Free" ? (billingCycle === "monthly" ? "/month" : "/year") : ""}
                  </span>
                </div>
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={tier.isPopular ? "default" : "secondary"}>
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-24"
      >
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
            Feature Comparison
        </h2>
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Feature</TableHead>
                        <TableHead className="text-center">Free</TableHead>
                        <TableHead className="text-center">Developer</TableHead>
                        <TableHead className="text-center">Studio</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {featureMatrix.map((item) => (
                        <TableRow key={item.feature}>
                            <TableCell className="font-medium">{item.feature}</TableCell>
                            <TableCell className="text-center">
                                {typeof item.free === 'boolean' ? (item.free ? <Check className="h-5 w-5 text-secondary mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />) : item.free}
                            </TableCell>
                            <TableCell className="text-center">
                                {typeof item.developer === 'boolean' ? (item.developer ? <Check className="h-5 w-5 text-secondary mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />) : item.developer}
                            </TableCell>
                            <TableCell className="text-center">
                                {typeof item.studio === 'boolean' ? (item.studio ? <Check className="h-5 w-5 text-secondary mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />) : item.studio}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
      </motion.div>
    </div>
  );
}