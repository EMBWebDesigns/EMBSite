"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { DashboardContent } from "@/components/dashboard-content";
import { DashboardContentSkeleton } from "@/components/dashboard-content-skeleton";

export default function DashboardPage() {
  // The layout now handles authentication checks and loading states.
  // This component will only render if the user is authenticated.
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