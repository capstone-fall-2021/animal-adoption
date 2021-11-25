import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { findUserByEmail } from "~/lib/user";
import prisma from "~/lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await findUserByEmail(email);

        if (user !== null) {
          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            return user;
          }
        }

        throw new Error("The email or password is invalid");
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
});
