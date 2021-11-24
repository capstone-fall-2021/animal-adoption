import bcrypt from "bcrypt";
import prisma from "~/lib/prisma";

const SALT_ROUNDS = 10;

export function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export async function emailExists(email) {
  const count = await prisma.user.count({ where: { email } });
  return count > 0;
}

export function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function registerUser(email, hash) {
  return prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });
}
