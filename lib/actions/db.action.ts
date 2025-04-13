"use server";

import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const validateUser = async (email: string, password: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return { error: "Email not found. Please check your email or sign up." };
    }

    if (!user.password) {
      return { error: "Account not properly set up. Please contact support." };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return {
        error: "Invalid password. Please check your password and try again.",
      };
    }

    return { user };
  } catch (error) {
    console.error("Error validating user:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
};
