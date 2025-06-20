import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "@/lib/auth";

// This is the NextAuth API route handler for App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
