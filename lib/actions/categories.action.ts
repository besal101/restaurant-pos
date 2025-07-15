"use server";

import db from "@/db/drizzle";
import { categories } from "@/db/schema";
import { Category } from "@/types";
import { eq } from "drizzle-orm";

export const addCategory = async (category: Category) => {
  const result = await db
    .insert(categories)
    .values({
      id: category.id,
      name: category.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return {
    ...result[0],
    createdAt: result[0].createdAt.toISOString(),
    updatedAt: result[0].updatedAt.toISOString(),
  };
};

export const getCategory = async (id: string) => {
  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id));
  return {
    ...result[0],
    createdAt: result[0].createdAt.toISOString(),
    updatedAt: result[0].updatedAt.toISOString(),
  };
};

export const getCategories = async () => {
  const result = await db.select().from(categories);
  return result.map((category) => ({
    ...category,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
  }));
};

export const updateCategory = async (category: Category) => {
  const existingCategory = await db
    .select()
    .from(categories)
    .where(eq(categories.id, category.id))
    .then((result) => result[0]);

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  const result = await db
    .update(categories)
    .set({
      name: category.name,
      updatedAt: new Date(),
    })
    .where(eq(categories.id, category.id))
    .returning();

  return {
    ...result[0],
    createdAt: result[0].createdAt.toISOString(),
    updatedAt: result[0].updatedAt.toISOString(),
  };
};

export const deleteCategory = async (id: string) => {
  const existingCategory = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .then((result) => result[0]);

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  await db.delete(categories).where(eq(categories.id, id));
  return { success: true };
};
