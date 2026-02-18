import { useEffect } from "react"
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { successLoginResponse, failedLoginResponse } from "@/Interfaces/login";

const API_BASE = process.env.API_BASE;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const response = await fetch(`${API_BASE}/auth/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          // ✅ لو السيرفر رجع خطأ
          if (!response.ok) {
            throw new Error("Invalid email or password");
          }

          const payload: successLoginResponse | failedLoginResponse =
            await response.json();

          // ✅ تحقق إن فيه token
          if ("token" in payload) {
            return {
              id: payload.user.email,
              user: payload.user,
              token: payload.token,
            };
          }

          throw new Error(payload.message);
        } catch (error) {
          throw new Error("Login failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any;
      session.token = token.token as string;
      return session;
    },
  },

  pages: {
    signIn: "/Login",
    error: "/Login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
