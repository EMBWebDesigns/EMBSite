"use client";

import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardClient } from "@/components/dashboard-client";
import { DashboardTabsSkeleton } from "@/components/dashboard-tabs-skeleton";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className='container mx-auto max-w-screen-xl px-4 py-16 md:px-6 md:py-24'>
        <div className='text-center mb-12'>
          <Skeleton className='h-12 w-3/4 mx-auto' />
          <Skeleton className='h-6 w-1/2 mx-auto mt-4' />
        </div>
        <Skeleton className='h-[600px] w-full' />
      </div>
    );
  }

  return (
    <div className='container mx-auto max-w-screen-xl px-4 py-16 md:px-6 md:py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-12'
      >
        <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
          Interactive Demo Experience
        </h1>
        <p className='mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl'>
          Welcome, {user.email}. Get a feel for the power of emb.web.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Suspense fallback={<DashboardTabsSkeleton />}>
          <DashboardClient />
        </Suspense>
      </motion.div>
    </div>
  );
}