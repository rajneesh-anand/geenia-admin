import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@utils/prisma";
import { getEnv } from "@utils/get-env";

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      EmailProvider({
        server: {
          host: getEnv("EMAIL_SERVER_HOST"),
          port: getEnv("EMAIL_SERVER_PORT"),
          auth: {
            user: getEnv("EMAIL_SERVER_USER"),
            pass: getEnv("EMAIL_SERVER_PASSWORD"),
          },
        },
        from: getEnv("EMAIL_FROM"),
      }),
    ],

    adapter: PrismaAdapter(prisma),
    secret: getEnv("SECRET"),
    session: {
      strategy: "jwt",
      // strategy: 'database',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      // updateAge: 24 * 60 * 60, // 24 hours
    },

    pages: {
      signIn: "/auth/signin",
      error: "/auth/signin",
      // signOut: '/auth/signout',
      verifyRequest: "/auth/signin-verify",
      // newUser: null // If set, new users will be directed here on first sign in
    },

    events: {},
    debug: getEnv("NODE_ENV") === "development",
  });
