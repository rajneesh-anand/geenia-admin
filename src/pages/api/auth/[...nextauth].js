import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@utils/prisma";

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
    ],

    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
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
    debug: "development",
  });
