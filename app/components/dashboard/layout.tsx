import { useState, useEffect } from "react";
import { Topbar } from "./topbar";
import { Sidebar } from "./sidebar";
import { DashboardFooter } from "./footer";
import { cn } from "~/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close mobile sidebar on desktop resize, but keep desktop sidebar visible
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false); // Only affects mobile overlay
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Topbar */}
      <Topbar 
        onMenuToggle={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-72">
          <div className="min-h-[calc(100vh-4rem)] flex flex-col">
            {/* Page Content */}
            <div className="flex-1 p-4 lg:p-6">
              {children}
            </div>

            {/* Footer */}
            <DashboardFooter />
          </div>
        </main>
      </div>
    </div>
  );
}
