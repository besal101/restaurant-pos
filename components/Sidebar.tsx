"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  BarChart,
  Calendar,
  Coffee,
  CreditCard,
  Home,
  Package,
  ShoppingBag,
  ShoppingCart,
  Users,
  Utensils,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SidebarComponent = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname.split("/")[1];
    setActiveTab(path);
  }, [pathname]);

  return (
    <Sidebar className="border-r bg-white">
      <SidebarHeader className="border-b px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="flex items-center gap-2 text-xl font-bold text-white">
          <Utensils className="h-6 w-6" />
          <span>Restaurant POS</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "pos"}
              onClick={() => setActiveTab("pos")}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 data-[active=true]:from-orange-600 data-[active=true]:to-red-600"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Table Service</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "menu"}
              onClick={() => setActiveTab("menu")}
            >
              <Coffee className="h-5 w-5" />
              <span>Menu Management</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "reservations"}
              onClick={() => setActiveTab("reservations")}
            >
              <Calendar className="h-5 w-5" />
              <span>Reservations</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "kitchen"}
              onClick={() => setActiveTab("kitchen")}
            >
              <Utensils className="h-5 w-5" />
              <span>Kitchen Display</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "sales"}
              onClick={() => setActiveTab("sales")}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Sales History</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "inventory"}
              onClick={() => setActiveTab("inventory")}
            >
              <Package className="h-5 w-5" />
              <span>Inventory</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "staff"}
              onClick={() => setActiveTab("staff")}
            >
              <Users className="h-5 w-5" />
              <span>Staff Management</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "reports"}
              onClick={() => setActiveTab("reports")}
            >
              <BarChart className="h-5 w-5" />
              <span>Reports</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            >
              <CreditCard className="h-5 w-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
            <AvatarFallback className="bg-orange-600 text-white">
              M
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Manager</p>
            <p className="text-xs text-muted-foreground">
              manager@restaurant.com
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;
