import React from 'react';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary"
      >
        <path d="m12 12 4 10 4-10-4-10zM8 22l4-10-4-10L0 12z" />
      </svg>
      <span className="font-bold text-lg">emb.web</span>
    </Link>
  );
};