import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt callback :", { token, user });

      const userInDb = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });

      if (!userInDb) {
        token.id = user!.id;
        return token;
      }

      return {
        id: userInDb.id,
        name: userInDb.name,
        email: userInDb.email,
        picture: userInDb.image,
        role: userInDb.role,
      };
    },

    async session({ token, session }) {
      console.log("session callback :", { session, token });
      if (token) {
        session.user.id = token.id;
        session.user.image = token.picture;
        session.user.role = token.role;
      }

      return session;
    },
  },
};
