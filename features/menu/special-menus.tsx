"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const SpecialMenus = () => {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
        <CardTitle className="text-lg text-orange-800">Special Menus</CardTitle>
        <CardDescription>Create special or seasonal menus</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-2 border rounded-md">
            <div>
              <span className="font-medium">Happy Hour Menu</span>
              <p className="text-sm text-gray-500">4:00 PM - 6:00 PM</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded-md">
            <div>
              <span className="font-medium">Weekend Brunch</span>
              <p className="text-sm text-gray-500">
                Sat-Sun, 10:00 AM - 2:00 PM
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded-md">
            <div>
              <span className="font-medium">Summer Specials</span>
              <p className="text-sm text-gray-500">Jun 1 - Aug 31</p>
            </div>
            <Badge className="bg-gray-100 text-gray-800">Upcoming</Badge>
          </div>
          <Button className="w-full bg-orange-600 hover:bg-orange-700">
            <Plus className="h-4 w-4 mr-1" /> Create Special Menu
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecialMenus;
