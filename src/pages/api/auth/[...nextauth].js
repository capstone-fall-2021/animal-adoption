import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { findUserByEmail } from "~/repositories/users";
import prisma from "~/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Providers.Credentials({
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
  jwt: {
    signingKey: process.env.JWT_SIGNING_KEY,
  },
});
