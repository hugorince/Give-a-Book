import { NextResponse } from "next/server";
import { db } from "@/libs/database/db";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, username, password } = body;

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

    const encryptedPassword = password;

    const newUser = await db.user.create({
      data: {
        email: email,
        username: username,
        password: encryptedPassword,
      },
    });

    return NextResponse.json({ email: email, username: username });
  } catch (error) {
    return NextResponse.json(error);
  }
};
