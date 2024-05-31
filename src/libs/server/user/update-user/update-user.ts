"use server";

import { db } from "@/libs/server";
import { updateUserSchemaWithId } from "@/libs/types";
import { z } from "zod";

export const updateUser = async (
  values: z.infer<typeof updateUserSchemaWithId>,
  sessionEmail: string,
) => {
  const { username, email } = values;

  const existingUser = await db.user.findUnique({
    where: { email: sessionEmail },
  });

  if (!existingUser) {
    return console.error("no user found");
  }

  if (username) {
    await db.user.update({
      where: {
        email: sessionEmail,
      },
      data: {
        username: username,
      },
    });
  }

  if (email) {
    await db.user.update({
      where: {
        email: sessionEmail,
      },
      data: {
        email: email,
      },
    });
  }
};
