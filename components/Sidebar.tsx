"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
import { usePathname, useRouter } from "next/navigation";

const SidebarComponent = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarHeader className="border-b px-6 py-4 bg-sidebar-primary">
        <div className="flex items-center gap-2 text-xl font-bold text-sidebar-primary-foreground">
          <Utensils className="h-6 w-6" />
          <span>Restaurant POS</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isActive("/")}
              onClick={() => router.push("/")}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isActive("/table")}
              onClick={() => router.push("/table")}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Table Service</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isActive("/menu")}
              onClick={() => router.push("/menu")}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Coffee className="h-5 w-5" />
              <span>Menu Management</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isActive("/reservations")}
              onClick={() => router.push("/reservations")}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Calendar className="h-5 w-5" />
              <span>Reservations</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isActive("/kitchen")}
              onClick={() => router.push("/kitchen")}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Utensils className="h-5 w-5" />
              <span>Kitchen Display</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isActive("/sales")}
              onClick={() => router.push("/sales")}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Sales History</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isActive("/inventory")}
              onClick={() => router.push("/inventory")}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Package className="h-5 w-5" />
              <span>Inventory</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isActive("/staff")}
              onClick={() => router.push("/staff")}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Users className="h-5 w-5" />
              <span>Staff Management</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isActive("/reports")}
              onClick={() => router.push("/reports")}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <BarChart className="h-5 w-5" />
              <span>Reports</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isActive("/settings")}
              onClick={() => router.push("/settings")}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CreditCard className="h-5 w-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4 bg-sidebar-accent">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
              M
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-sidebar-foreground">
              Manager
            </p>
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
