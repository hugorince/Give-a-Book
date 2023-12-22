import { NextResponse } from "next/server";
import { db } from "@/libs/database/db";
import { supabase } from "../../../../supabase";

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

    // const newUser = await db.user.create({
    //   data: {
    //     email: email,
    //     username: username,
    //   },
    // });
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    return NextResponse.json({ user: data, error: error });
  } catch (error) {}
};
