"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export const Logo = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <Link href='/' className='flex items-center gap-2'>
      {isMounted ? (
        <Image
          src='/logo.webp'
          alt='Logo'
          width={400}
          height={200}
          className='md:w-80 h-auto aspect-auto'
        />
      ) : (
        <>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-6 w-6 text-primary'
          >
            <path d='m12 12 4 10 4-10-4-10zM8 22l4-10-4-10L0 12z' />
          </svg>
          <span className='font-bold text-lg'>emb.web</span>
        </>
      )}
    </Link>
  );
};
