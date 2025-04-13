"use client";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { Bell } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";

const NavbarComponent = () => {
  return (
    <nav className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[200px] pl-8 lg:w-[300px]"
          />
        </div>
        <Button
          size="sm"
          variant="outline"
          className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Today
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="relative border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
                <AvatarFallback className="bg-orange-600 text-white">
                  M
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">Manager</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavbarComponent;
