import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardFooter } from "@/components/dashboard-footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1">{children}</main>
      <DashboardFooter />
    </div>
  );
}