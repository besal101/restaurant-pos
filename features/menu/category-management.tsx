"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, ArrowUpDown, Search } from "lucide-react";
import type { Category } from "@/types";
import {
  useCategories,
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "./useCategoty";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const CategoryManagement = () => {
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editedCategoryName, setEditedCategoryName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data: categories = [], isLoading } = useCategories();
  const { mutate: addCategory } = useAddCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: newCategoryName.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addCategory(newCategory);
    setNewCategoryName("");
    toast.success("Category added successfully");
  };

  const handleEditCategory = (id: string, name: string) => {
    setEditingCategoryId(id);
    setEditedCategoryName(name);
  };

  const handleSaveCategory = () => {
    if (!editedCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    const existingCategory = categories.find(
      (cat) => cat.id === editingCategoryId!
    );
    if (!existingCategory) {
      toast.error("Category not found");
      return;
    }

    const updatedCategory: Category = {
      id: editingCategoryId!,
      name: editedCategoryName.trim(),
      createdAt: existingCategory.createdAt,
      updatedAt: new Date().toISOString(),
    };

    updateCategory(updatedCategory);
    setEditingCategoryId(null);
    toast.success("Category updated successfully");
  };

  const handleDeleteCategory = (id: string) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete);
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
      toast.success("Category deleted successfully");
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredCategories = categories
    .filter((cat) => cat.id !== "all")
    .filter((cat) => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-primary">Menu Categories</CardTitle>
        <CardDescription className="text-primary">
          Organize your menu with categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSortOrder}
              className="h-9 w-9"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 border rounded-md hover:bg-sidebar-accent/10 transition-colors"
              >
                {editingCategoryId === category.id ? (
                  <div className="flex items-center flex-1 mr-2">
                    <Input
                      value={editedCategoryName}
                      onChange={(e) => setEditedCategoryName(e.target.value)}
                      className="mr-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveCategory();
                        if (e.key === "Escape") setEditingCategoryId(null);
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={handleSaveCategory}
                      className="bg-sidebar-primary hover:bg-sidebar-primary/90"
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <span className="font-medium text-foreground">
                    {category.name}
                  </span>
                )}
                {editingCategoryId !== category.id && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-sidebar-accent/20"
                      onClick={() =>
                        handleEditCategory(category.id, category.name)
                      }
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-4 border-t">
            <Input
              placeholder="New category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCategory();
              }}
              className="flex-1"
            />
            <Button
              onClick={handleAddCategory}
              className="bg-sidebar-primary hover:bg-sidebar-primary/90"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </CardContent>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default CategoryManagement;
