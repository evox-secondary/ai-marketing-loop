import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell } from "lucide-react";
import { mockNotifications } from "@/lib/mock-data";
import { Link } from "react-router-dom";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const unread = mockNotifications.filter((n) => !n.read).length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border/50 px-4 backdrop-blur-sm bg-background/80 sticky top-0 z-30">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <Link to="/notifications" className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
              {unread > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
              )}
            </Link>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
