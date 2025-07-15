"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MenuItemsList from "@/features/menu/menu-items-list";
import MenuItemDialog from "@/features/menu/menu-item-dialog";
import CategoryManagement from "@/features/menu/category-management";
import SpecialMenus from "@/features/menu/special-menus";
import type { MenuItem, Category } from "@/types";

const MenuContent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddItemDialog, setShowAddItemDialog] = useState<boolean>(false);

  // Menu categories
  const categories: Category[] = [
    { id: "all", name: "All Categories", icon: Search },
    { id: "starters", name: "Starters", icon: Search },
    { id: "mains", name: "Main Courses", icon: Search },
    { id: "pizzas", name: "Pizzas", icon: Search },
    { id: "pastas", name: "Pastas", icon: Search },
    { id: "desserts", name: "Desserts", icon: Search },
    { id: "drinks", name: "Drinks", icon: Search },
  ];

  // Menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Margherita Pizza",
      price: 12.99,
      category: "pizzas",
      image: "/placeholder.svg?height=80&width=80",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      ingredients: "Dough, Tomato Sauce, Mozzarella, Fresh Basil, Olive Oil",
      allergens: "Gluten, Dairy",
      available: true,
      popular: true,
    },
    {
      id: 2,
      name: "Caesar Salad",
      price: 9.99,
      category: "starters",
      image: "/placeholder.svg?height=80&width=80",
      description:
        "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan",
      ingredients:
        "Romaine Lettuce, Caesar Dressing, Croutons, Parmesan Cheese",
      allergens: "Gluten, Dairy, Eggs",
      available: true,
      popular: false,
    },
    {
      id: 3,
      name: "Spaghetti Carbonara",
      price: 14.99,
      category: "pastas",
      image: "/placeholder.svg?height=80&width=80",
      description:
        "Spaghetti with creamy egg sauce, pancetta, and pecorino cheese",
      ingredients: "Spaghetti, Eggs, Pancetta, Pecorino Cheese, Black Pepper",
      allergens: "Gluten, Dairy, Eggs",
      available: true,
      popular: true,
    },
    {
      id: 4,
      name: "Chicken Alfredo",
      price: 15.99,
      category: "pastas",
      image: "/placeholder.svg?height=80&width=80",
      description:
        "Fettuccine pasta with creamy Alfredo sauce and grilled chicken",
      ingredients: "Fettuccine, Heavy Cream, Butter, Parmesan, Grilled Chicken",
      allergens: "Gluten, Dairy",
      available: true,
      popular: false,
    },
    {
      id: 5,
      name: "Grilled Salmon",
      price: 18.99,
      category: "mains",
      image: "/placeholder.svg?height=80&width=80",
      description:
        "Grilled salmon fillet with lemon butter sauce and seasonal vegetables",
      ingredients: "Salmon Fillet, Butter, Lemon, Herbs, Seasonal Vegetables",
      allergens: "Fish, Dairy",
      available: true,
      popular: true,
    },
    {
      id: 6,
      name: "Garlic Bread",
      price: 5.99,
      category: "starters",
      image: "/placeholder.svg?height=80&width=80",
      description: "Toasted bread with garlic butter and herbs",
      ingredients: "Bread, Butter, Garlic, Parsley",
      allergens: "Gluten, Dairy",
      available: true,
      popular: false,
    },
  ]);

  const filteredItems = menuItems.filter(
    (item) =>
      (selectedCategory === "all" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = (newItem: MenuItem): void => {
    const id = Math.max(...menuItems.map((item) => item.id), 0) + 1;
    setMenuItems([...menuItems, { ...newItem, id }]);
    setShowAddItemDialog(false);
  };

  const handleUpdateItem = (updatedItem: MenuItem): void => {
    setMenuItems(
      menuItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
  };

  const handleDeleteItem = (id: number): void => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const toggleItemAvailability = (id: number): void => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-orange-800">
            Menu Management
          </h2>
          <p className="text-muted-foreground">
            Manage your restaurant menu items, categories, and pricing.
          </p>
        </div>
        <Button
          className="bg-orange-600 hover:bg-orange-700"
          onClick={() => setShowAddItemDialog(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Menu Item
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search menu items..."
            className="pl-9 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <MenuItemsList
        filteredItems={filteredItems}
        categories={categories}
        toggleItemAvailability={toggleItemAvailability}
        setEditingItem={setEditingItem}
        handleDeleteItem={handleDeleteItem}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <CategoryManagement categories={categories} />
        <SpecialMenus />
      </div>

      <MenuItemDialog
        showDialog={showAddItemDialog || editingItem !== null}
        setShowDialog={(show) => {
          if (!show) {
            setShowAddItemDialog(false);
            setEditingItem(null);
          }
        }}
        editingItem={editingItem}
        categories={categories}
        handleAddItem={handleAddItem}
        handleUpdateItem={handleUpdateItem}
      />
    </div>
  );
};

export default MenuContent;
