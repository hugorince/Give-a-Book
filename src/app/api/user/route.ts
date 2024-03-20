import { NextResponse } from "next/server";
import { db } from "@/libs/database";
import * as z from "zod";

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const userSchemaWithId = z.object({
  username: z.string().min(1, "Username is required").max(100).optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .optional(),
  sessionEmail: z.string().min(1, "Email is required").email("Invalid email"),
});

export const PATCH = async (req: Request) => {
  try {
    const body = await req.json();
    const { sessionEmail, username, email } = userSchemaWithId.parse(body);

    const existingUser = await db.user.findUnique({
      where: { email: sessionEmail },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          user: null,
          message: "user not found",
        },
        { status: 409 },
      );
    }

    if (username) {
      const modifiedUser = await db.user.update({
        where: {
          email: sessionEmail,
        },
        data: {
          username: username,
        },
      });

      return NextResponse.json(
        {
          username: modifiedUser.username,
          message: "user modified successfully",
        },
        { status: 201 },
      );
    }

    if (email) {
      const modifiedUser = await db.user.update({
        where: {
          email: sessionEmail,
        },
        data: {
          email: email,
        },
      });

      return NextResponse.json(
        {
          email: modifiedUser.email,
          message: "user modified successfully",
        },
        { status: 201 },
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something wen wrong" },
      { status: 500 },
    );
  }
};
