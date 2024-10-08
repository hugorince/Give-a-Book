import { BOOK_TYPE } from "@/constants";
import { getValues } from "@/utils";
import * as z from "zod";

export const SignUpFormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    postalCode: z.string(),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    confidentiality: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export const LoginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export const PostBookFormSchema = z.object({
  title: z.string().min(1, "title is required"),
  author: z.string().min(1, "author is required"),
  description: z.string(),
  image: z.string().optional(),
  exchangeGive: z.enum(getValues(BOOK_TYPE)),
});

export const updateUserSchemaWithId = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  postalCode: z.string().optional(),
});
