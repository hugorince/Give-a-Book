import { NextResponse } from "next/server";
import { db } from "@/libs/database";
import { hash } from "bcrypt";
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

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "user already registered",
        },
        { status: 409 },
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "user already registered",
        },
        { status: 409 },
      );
    }

    const encryptedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email: email,
        username: username,
        password: encryptedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json(
      {
        user: rest,
        message: "user created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something wen wrong" },
      { status: 500 },
    );
  }
};

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
    }

    return NextResponse.json(
      {
        email: email,
        message: "user modified successfully",
      },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something wen wrong" },
      { status: 500 },
    );
  }
};
