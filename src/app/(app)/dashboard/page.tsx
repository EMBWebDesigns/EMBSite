"use client";

import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardContent } from "@/components/dashboard-content";
import { DashboardContentSkeleton } from "@/components/dashboard-content-skeleton";

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
      <div>
        <Skeleton className='h-12 w-3/4 mb-8' />
        <DashboardContentSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Suspense fallback={<DashboardContentSkeleton />}>
        <DashboardContent />
      </Suspense>
    </motion.div>
  );
}