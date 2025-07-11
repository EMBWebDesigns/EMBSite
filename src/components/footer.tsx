"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { supabase } from "@/integrations/supabase/client";
import { SocialLink } from "@/types/social-link";
import * as ReactIcons from "react-icons/si"; // Import all Simple Icons from react-icons

// Helper to get the correct icon (SVG or React Icon)
const getSocialIcon = (iconName: string) => {
  const lower = iconName.toLowerCase();
  if (lower === "f6s") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 800 800'
        className='w-6 h-6 fill-current'
      >
        <path d='M156.9 180.1h136.8v57.8h-79.1v124.9h45.8v57.8h-45.8v199.3h-57.8V180.1z' />
        <path d='M372.4 237.9v124.9h68.5c16.6 0 31.1 14.5 31.1 31v194.7c0 16.7-14.5 31.4-31.1 31.4h-95c-16.6 0-31.1-14.3-31.1-30.6V212.3c0-16.8 14.4-32.2 30.3-32.2h95.9c16.6 0 31.1 14.5 31.1 31v72.7h-57.8v-45.8zm0 182.7v141.5h41.9V420.6h-41.9z' />
        <path d='M647.1 283.7h-57.8v-45.8h-41.9v124.9l69.1 0.02c16.4 0 30.5 19.7 30.5 35.8v189.7c0 16.8-14.3 31.6-30.5 31.6h-92.9c-16.3 0-30.5-14.4-30.5-30.7v-106l54.3-0.1v79.1h41.9v-141.5l-65.7 0.02c-16.2 0-30.5-14.6-30.5-31.1V211.3c0-16.6 14.3-31.2 30.5-31.2h92.9c16.3 0 30.5 14.6 30.5 31.2v72.4z' />
      </svg>
    );
  }
  if (lower === "crunchbase") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 68 68'
        className='w-6 h-6'
      >
        <path
          className='fill-current'
          d='M13.94 33.658a2.962 2.962 0 110.034-2.44h2.296a5.167 5.167 0 100 2.44h-2.296zM23.51 27.257h-.379a5.098 5.098 0 00-2.526.89v-5.752h-2.095v14.794h2.107v-.54a5.167 5.167 0 102.893-9.392zm2.962 5.534v.092a2.94 2.94 0 01-.08.362 2.934 2.934 0 01-.144.373v.046a2.98 2.98 0 01-2.072 1.625l-.281.046h-.063a2.916 2.916 0 01-.322 0 2.962 2.962 0 01-.402-.029h-.057a2.934 2.934 0 01-.752-.23h-.057a2.974 2.974 0 01-.666-.447 2.991 2.991 0 01-.522-.626 2.962 2.962 0 01-.19-.367 2.945 2.945 0 01.035-2.44 2.968 2.968 0 012.377-1.682 2.934 2.934 0 01.304 0 2.968 2.968 0 012.928 2.882 2.957 2.957 0 010 .396z'
          transform='matrix(3 0 0 3 -17 -60)'
        />
      </svg>
    );
  }
  // Default: try to use React Icon
  const formattedName = iconName.startsWith("Si") ? iconName : `Si${iconName}`;
  const IconComponent = (ReactIcons as any)[formattedName];
  return IconComponent ? <IconComponent className='h-5 w-5' /> : null;
};

export const Footer = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching social links:", error);
      } else {
        setSocialLinks(data || []);
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <footer className='border-t'>
      <div className='container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:items-start sm:justify-between'>
          <div className='mb-8 sm:mb-0'>
            <Logo />
            <p className='mt-4 text-sm text-muted-foreground max-w-xs'>
              EMB Web Designs lets you build and launch professional,
              AI-generated websites in minutes, complete with smart design, code
              export, and SEO tools. Instant smart coding. No hassle.
            </p>
            {socialLinks.length > 0 && (
              <div className='flex space-x-4 mt-6'>
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-muted-foreground hover:text-primary transition-colors'
                    aria-label={link.platform}
                  >
                    {getSocialIcon(link.icon_name)}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className='grid grid-cols-2 gap-8 sm:grid-cols-3'>
            <div>
              <p className='font-medium text-foreground'>Platform</p>
              <ul className='mt-4 space-y-2 text-sm'>
                <li>
                  <Link
                    href='/features'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href='/dashboard'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href='/pricing'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className='font-medium text-foreground'>Resources</p>
              <ul className='mt-4 space-y-2 text-sm'>
                <li>
                  <Link
                    href='/blog'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href='/docs'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className='font-medium text-foreground'>Legal</p>
              <ul className='mt-4 space-y-2 text-sm'>
                <li>
                  <Link
                    href='/privacy'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='/terms'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='mt-8 border-t pt-8 pr-32 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-muted-foreground'>
            &copy; {new Date().getFullYear()} embwebdesigns.com. All rights
            reserved.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};
