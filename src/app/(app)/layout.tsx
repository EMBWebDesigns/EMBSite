import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardFooter } from "@/components/dashboard-footer";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Suspense } from "react"; // Import Suspense
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton for fallback

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Suspense fallback={<aside className="hidden md:block border-r bg-muted/40"><div className="flex h-full max-h-screen flex-col gap-2 p-4"><Skeleton className="h-8 w-full mb-2" /><Skeleton className="h-8 w-full mb-2" /><Skeleton className="h-8 w-full" /></div></aside>}>
        <DashboardSidebar />
      </Suspense>
      <div className="flex flex-col">
        <DashboardHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
}