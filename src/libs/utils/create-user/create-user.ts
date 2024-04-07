"use server";

import { db } from "@/libs/database";
import { SignUpFormSchema } from "@/libs/types";
import { hash } from "bcrypt";
import { z } from "zod";

export const createUser = async (values: z.infer<typeof SignUpFormSchema>) => {
  try {
    const existingUserByEmail = await db.user.findUnique({
      where: { email: values.email },
    });

    if (existingUserByEmail) {
      return null;
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username: values.username },
    });

    if (existingUserByUsername) {
      return null;
    }

    const encryptedPassword = await hash(values.password, 10);

    await db.user.create({
      data: {
        email: values.email,
        username: values.username,
        postalCode: values.postalCode,
        password: encryptedPassword,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
