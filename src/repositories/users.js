import bcrypt from "bcrypt";
import prisma from "~/prisma";

const SALT_ROUNDS = 10;

export function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email, password) {
  return prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, SALT_ROUNDS),
    },
  });
}
