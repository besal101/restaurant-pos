"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MenuItem, Category } from "@/types";

interface MenuItemsListProps {
  filteredItems: MenuItem[];
  categories: Category[];
  toggleItemAvailability: (id: number) => void;
  setEditingItem: (item: MenuItem) => void;
  handleDeleteItem: (id: number) => void;
}

const MenuItemsList = ({
  filteredItems,
  categories,
  toggleItemAvailability,
  setEditingItem,
  handleDeleteItem,
}: MenuItemsListProps) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-orange-50">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.name}
                    {item.popular && (
                      <Badge className="ml-2 bg-orange-100 text-orange-800 hover:bg-orange-100">
                        Popular
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {categories.find((cat) => cat.id === item.category)?.name ||
                      item.category}
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    ${item.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item.description}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        item.available
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {item.available ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={
                          item.available
                            ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                            : "text-green-600 hover:text-green-700 hover:bg-green-50"
                        }
                        onClick={() => toggleItemAvailability(item.id)}
                      >
                        {item.available ? "Mark Unavailable" : "Mark Available"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        onClick={() => setEditingItem(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No menu items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MenuItemsList;
