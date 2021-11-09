import bcrypt from "bcrypt";
import prisma from "~/lib/prisma";

const SALT_ROUNDS = 10;

export async function userEmailExists(email) {
  const count = await prisma.user.count({ where: { email } });
  return count > 0;
}

export function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function registerUser({ email, hash }) {
  return prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });
}
