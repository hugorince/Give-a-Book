import NextAuth from "next-auth";
import { authOptions } from "@/actions/auth/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
