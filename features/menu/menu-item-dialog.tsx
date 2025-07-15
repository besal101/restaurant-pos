"use client";

import type React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import type { MenuItem, Category } from "@/types";

interface MenuItemDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  editingItem: MenuItem | null;
  categories: Category[];
  handleAddItem: (newItem: MenuItem) => void;
  handleUpdateItem: (updatedItem: MenuItem) => void;
}

const MenuItemDialog = ({
  showDialog,
  setShowDialog,
  editingItem,
  categories,
  handleAddItem,
  handleUpdateItem,
}: MenuItemDialogProps) => {
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: "",
    price: 0,
    category: "starters",
    image: "/placeholder.svg?height=80&width=80",
    description: "",
    ingredients: "",
    allergens: "",
    available: true,
    popular: false,
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({
        name: "",
        price: 0,
        category: "starters",
        image: "/placeholder.svg?height=80&width=80",
        description: "",
        ingredients: "",
        allergens: "",
        available: true,
        popular: false,
      });
    }
  }, [editingItem, showDialog]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    });
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSelectChange = (name: string, value: string): void => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (editingItem) {
      handleUpdateItem({ ...editingItem, ...formData } as MenuItem);
    } else {
      handleAddItem(formData as MenuItem);
    }
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name as string}
                onChange={handleChange}
                placeholder="Item name"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                Price ($)
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select
              value={formData.category as string}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((cat) => cat.id !== "all")
                  .map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description as string}
              onChange={handleChange}
              placeholder="Brief description of the item"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="ingredients" className="text-sm font-medium">
                Ingredients
              </label>
              <Textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients as string}
                onChange={handleChange}
                placeholder="List of ingredients"
                className="h-20"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="allergens" className="text-sm font-medium">
                Allergens
              </label>
              <Textarea
                id="allergens"
                name="allergens"
                value={formData.allergens as string}
                onChange={handleChange}
                placeholder="List of allergens"
                className="h-20"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={formData.available}
              onChange={handleCheckboxChange}
              className="rounded border-gray-300"
            />
            <label htmlFor="available" className="text-sm font-medium">
              Available on menu
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="popular"
              name="popular"
              checked={formData.popular}
              onChange={handleCheckboxChange}
              className="rounded border-gray-300"
            />
            <label htmlFor="popular" className="text-sm font-medium">
              Mark as popular item
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700" type="submit">
              {editingItem ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemDialog;
