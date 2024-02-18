import * as z from "zod";

export const SignUpFormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
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
  author: z.string(),
  description: z.string(),
  image: z.string().optional(),
});

export const updateUserSchemaWithId = z.object({
  username: z.string().max(100).optional(),
  email: z.string().optional(),
});
