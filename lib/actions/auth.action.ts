"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/authSchema";
import * as z from "zod";
import { validateUser } from "./db.action";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const { user, error } = await validateUser(values.email, values.password);

    if (error) {
      return { error };
    }

    if (!user) {
      return { error: "Email not found. Please check your email." };
    }

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      return {
        error: "Invalid credentials. Please check your email and password.",
      };
    }

    return { success: "Signed in successfully!" };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred. Please try again." };
  }
};
