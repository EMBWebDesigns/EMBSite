"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const pricingTiers = [
  {
    name: "launch Plan (Free forever)",
    price: { monthly: 0, yearly: 0 },
    description:
      "Perfect to start building and experimenting with AI-driven tools.",
    features: [
      "AI Website Builder",
      "3 Starter Templates",
      "Basic Code Generator (HTML Export)",
      "Simple UI Design Editor",
      "SEO-Friendly Page Structure",
      "Mobile Responsive Design",
      "Community Support Forum",
      "Free SSL Certificate",
      "1 Custom Domain Connection",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth Plan (Best for freelancers & startups)",
    price: { monthly: 29, yearly: 290 },
    description:
      "Expand your reach with powerful design and automation features.",
    features: [
      "Everything in Launch Plan",
      "50+ Professionally Designed Templates",
      "Full Code Generator (HTML, CSS, JS Export)",
      "Advanced UI/UX Design Studio",
      "AI-Powered Content Generator",
      "Speed & SEO Optimization Suite",
      "Analytics Dashboard & Insights",
      "Live Chat & Email Support",
      "Multi-Domain Management",
    ],
    cta: "Start Free Trial",
    isPopular: true,
  },
  {
    name: "Pro Agency Plan (For teams, agencies & developers)",
    price: { monthly: 99, yearly: 990 },
    description: "Scale your workflow with collaboration and customization.",
    features: [
      "Unlimited Websites & Templates",
      "Full Code Export (HTML, CSS, JS, React)",
      "Collaborative UI/UX Design Tools",
      "White-Label Branding & Custom Domains",
      "Client Dashboard & Permissions",
      "API Access & Webhook Integrations",
      "Priority 24/7 Support",
      "Team Collaboration & Project Management Tools",
    ],
    cta: "Contact Sales",
  },
];

const featureMatrix = [
  { feature: "AI Website Builder", free: true, developer: true, studio: true },
  {
    feature: "Number of Websites",
    free: "1",
    developer: "Unlimited",
    studio: "Unlimited",
  },
  {
    feature: "Templates",
    free: "3 Starter",
    developer: "50+ Professional",
    studio: "Unlimited",
  },
  {
    feature: "Code Generator",
    free: "Basic (HTML Export)",
    developer: "Full (HTML, CSS, JS)",
    studio: "Full (HTML, CSS, JS, React)",
  },
  {
    feature: "UI Design Tools",
    free: "Simple Editor",
    developer: "Advanced Studio",
    studio: "Collaborative Studio",
  },
  {
    feature: "AI-Powered Content Generator",
    free: false,
    developer: true,
    studio: true,
  },
  {
    feature: "SEO & Speed Optimization",
    free: "Basic SEO Structure",
    developer: "Full Optimization Suite",
    studio: "Full Optimization Suite",
  },
  {
    feature: "Support",
    free: "Community Forum",
    developer: "Live Chat & Email",
    studio: "Priority 24/7 Support",
  },
  {
    feature: "Custom Domains",
    free: "1 Domain",
    developer: "Multi-Domain",
    studio: "White-Label & Custom Domains",
  },
  {
    feature: "Analytics & Insights",
    free: false,
    developer: "Dashboard & Insights",
    studio: "Dashboard & Insights",
  },
  {
    feature: "Team Collaboration",
    free: false,
    developer: false,
    studio: true,
  },
  {
    feature: "API & Webhook Access",
    free: false,
    developer: false,
    studio: true,
  },
  {
    feature: "Client Dashboard & Permissions",
    free: false,
    developer: false,
    studio: true,
  },
];

const faqs = [
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes, we offer a 14-day free trial for our Developer plan. You can explore all the advanced features with no commitment. No credit card is required to start your trial.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely! You can upgrade, downgrade, or cancel your plan at any time from your account settings. Changes will be prorated and applied to your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, including Visa, Mastercard, and American Express. For our Studio plan, we also support invoicing and bank transfers.",
  },
  {
    question:
      "What happens if I exceed my project limit on the Developer plan?",
    answer:
      "If you reach the 10-project limit on the Developer plan, you will be prompted to upgrade to the Studio plan to create more projects. You can also delete old projects to free up space.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <div className='container mx-auto max-w-screen-xl px-4 py-16 md:px-6 md:py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-12'
      >
        <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
          Find the Right Plan for You
        </h1>
        <p className='mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl'>
          Start for free, then scale up as you grow. All plans include our core
          AI features.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='flex items-center justify-center space-x-4 mb-12'
      >
        <Label htmlFor='billing-cycle'>Monthly</Label>
        <Switch
          id='billing-cycle'
          checked={billingCycle === "yearly"}
          onCheckedChange={(checked) =>
            setBillingCycle(checked ? "yearly" : "monthly")
          }
        />
        <Label htmlFor='billing-cycle' className='flex items-center'>
          Yearly
          <span className='ml-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground'>
            SAVE 15%
          </span>
        </Label>
      </motion.div>

      <motion.div
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
        className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
      >
        {pricingTiers.map((tier) => (
          <motion.div
            key={tier.name}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card
              className={cn(
                "flex flex-col h-full",
                tier.isPopular && "border-primary ring-2 ring-primary"
              )}
            >
              {tier.isPopular && (
                <div className='py-1 px-4 bg-primary text-primary-foreground text-center text-sm font-semibold rounded-t-lg'>
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className='flex-grow grid gap-6'>
                <div className='text-4xl font-bold'>
                  ${tier.price[billingCycle]}
                  <span className='text-sm font-normal text-muted-foreground'>
                    {tier.name !== "Free"
                      ? billingCycle === "monthly"
                        ? "/month"
                        : "/year"
                      : ""}
                  </span>
                </div>
                <ul className='space-y-2'>
                  {tier.features.map((feature) => (
                    <li key={feature} className='flex items-center'>
                      <Check className='mr-2 h-4 w-4 text-secondary' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className='w-full'
                  variant={tier.isPopular ? "default" : "secondary"}
                >
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
        className='mt-24'
      >
        <h2 className='text-3xl font-bold tracking-tighter text-center mb-8'>
          Feature Comparison
        </h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[300px]'>Feature</TableHead>
                <TableHead className='text-center'>Free</TableHead>
                <TableHead className='text-center'>Developer</TableHead>
                <TableHead className='text-center'>Studio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureMatrix.map((item) => (
                <TableRow key={item.feature}>
                  <TableCell className='font-medium'>{item.feature}</TableCell>
                  <TableCell className='text-center'>
                    {typeof item.free === "boolean" ? (
                      item.free ? (
                        <Check className='h-5 w-5 text-secondary mx-auto' />
                      ) : (
                        <X className='h-5 w-5 text-muted-foreground mx-auto' />
                      )
                    ) : (
                      item.free
                    )}
                  </TableCell>
                  <TableCell className='text-center'>
                    {typeof item.developer === "boolean" ? (
                      item.developer ? (
                        <Check className='h-5 w-5 text-secondary mx-auto' />
                      ) : (
                        <X className='h-5 w-5 text-muted-foreground mx-auto' />
                      )
                    ) : (
                      item.developer
                    )}
                  </TableCell>
                  <TableCell className='text-center'>
                    {typeof item.studio === "boolean" ? (
                      item.studio ? (
                        <Check className='h-5 w-5 text-secondary mx-auto' />
                      ) : (
                        <X className='h-5 w-5 text-muted-foreground mx-auto' />
                      )
                    ) : (
                      item.studio
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='mt-24 max-w-3xl mx-auto'
      >
        <h2 className='text-3xl font-bold tracking-tighter text-center mb-8'>
          Frequently Asked Questions
        </h2>
        <Accordion type='single' collapsible className='w-full'>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className='text-lg'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground text-base'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}
