"use client";

import { DollarSign, ShoppingCart, Receipt, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import type { SalesData, PieData } from "@/types";

export default function DashboardPage() {
  // Sample data for charts
  const salesData: SalesData[] = [
    { name: "Mon", value: 1200 },
    { name: "Tue", value: 900 },
    { name: "Wed", value: 1500 },
    { name: "Thu", value: 1800 },
    { name: "Fri", value: 2400 },
    { name: "Sat", value: 2800 },
    { name: "Sun", value: 2100 },
  ];

  const pieData: PieData[] = [
    { name: "Main Courses", value: 40 },
    { name: "Appetizers", value: 20 },
    { name: "Desserts", value: 15 },
    { name: "Drinks", value: 25 },
  ];

  const COLORS = ["#f97316", "#ec4899", "#f59e0b", "#10b981"];

  return (
    <div className="space-y-6 px-4 py-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Sales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-orange-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,427.89</div>
            <p className="text-xs text-orange-100">+12.5% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-pink-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+86</div>
            <p className="text-xs text-pink-100">+8.2% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Check</CardTitle>
            <Receipt className="h-4 w-4 text-amber-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$39.86</div>
            <p className="text-xs text-amber-100">+2.1% from last week</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tables Served</CardTitle>
            <Users className="h-4 w-4 text-emerald-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-emerald-100">+5% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1 bg-white shadow-sm">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
            <CardTitle className="text-orange-800">Weekly Sales</CardTitle>
            <CardDescription>
              Daily revenue for the current week
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#f97316"
                  fill="#f97316"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 bg-white shadow-sm">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
            <CardTitle className="text-pink-800">Sales by Category</CardTitle>
            <CardDescription>
              Distribution of sales by menu category
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
          <CardTitle className="text-amber-800">Recent Orders</CardTitle>
          <CardDescription>Latest orders from all tables</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Server</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">ORD-1042</TableCell>
                <TableCell>Table 5</TableCell>
                <TableCell>Mike</TableCell>
                <TableCell>7:32 PM</TableCell>
                <TableCell>3</TableCell>
                <TableCell className="text-right font-medium text-green-600">
                  $57.98
                </TableCell>
                <TableCell>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    In Progress
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ORD-1041</TableCell>
                <TableCell>Table 2</TableCell>
                <TableCell>Sarah</TableCell>
                <TableCell>7:28 PM</TableCell>
                <TableCell>1</TableCell>
                <TableCell className="text-right font-medium text-green-600">
                  $12.99
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Served
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ORD-1040</TableCell>
                <TableCell>Table 7</TableCell>
                <TableCell>Lisa</TableCell>
                <TableCell>7:15 PM</TableCell>
                <TableCell>4</TableCell>
                <TableCell className="text-right font-medium text-green-600">
                  $64.96
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Served
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ORD-1039</TableCell>
                <TableCell>Table 4</TableCell>
                <TableCell>John</TableCell>
                <TableCell>7:05 PM</TableCell>
                <TableCell>5</TableCell>
                <TableCell className="text-right font-medium text-green-600">
                  $87.95
                </TableCell>
                <TableCell>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                    Bill Requested
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ORD-1038</TableCell>
                <TableCell>Table 9</TableCell>
                <TableCell>Mike</TableCell>
                <TableCell>6:58 PM</TableCell>
                <TableCell>2</TableCell>
                <TableCell className="text-right font-medium text-green-600">
                  $29.98
                </TableCell>
                <TableCell>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                    Completed
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
