import { userResponse } from "@/Interfaces/login";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: userResponse; // API user object
    token: string;      // JWT token
  }

  interface User {
    user: userResponse; // API user object
    token: string;      // JWT token
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: userResponse; // stored inside the token
    token: string;      // stored inside the token
  }
}
