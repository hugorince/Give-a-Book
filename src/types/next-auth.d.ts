// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string | null;
    // id: number | null;
  }
  interface Session {
    user: User & {
      username: string;
      id: number;
    };
    token: {
      username: string;
    };
  }
}
