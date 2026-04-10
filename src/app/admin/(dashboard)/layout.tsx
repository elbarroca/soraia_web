import { AdminSidebar } from "@/components/admin/sidebar";
import { Toaster } from "@/components/ui/sonner";
import "@uploadthing/react/styles.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="px-6 pt-20 pb-6 md:px-8 md:pb-8 lg:pt-8">{children}</div>
      </main>
      <Toaster />
    </div>
  );
}
