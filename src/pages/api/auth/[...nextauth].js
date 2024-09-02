import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/db";
import User from "../../../model/user";
import { compare } from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials.email }).lean();
          if (!user) {
            throw new Error("No user found with this email");
          }
          const isValidPassword = await compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }
          return { id: user._id, name: user.name, email: user.email };
        } catch (error) {
          console.error("Error in authorization:", error.message);
          throw new Error(error.message || "Internal server error");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
