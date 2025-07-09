"use client";

import { AgencyPreview } from "./agency-preview";
import { BlogPreview } from "./blog-preview";
import { EcommercePreview } from "./ecommerce-preview";
import { PortfolioPreview } from "./portfolio-preview";
import { SaasPreview } from "./saas-preview";
import { StartupPreview } from "./startup-preview";

export const templatePreviews = {
  "saas": <SaasPreview />,
  "ecommerce": <EcommercePreview />,
  "portfolio": <PortfolioPreview />,
  "blog": <BlogPreview />,
  "agency": <AgencyPreview />,
  "startup": <StartupPreview />,
};

export type TemplateKey = keyof typeof templatePreviews;