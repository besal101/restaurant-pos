import React from "react";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <SidebarProvider>
        <Sidebar />
        <div className="flex-1 flex flex-col w-full">
          <Navbar />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
