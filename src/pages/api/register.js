import bcrypt from "bcrypt";
import { validate } from "isemail";
import allow from "~/lib/allow";
import prisma from "~/lib/prisma";

export async function handler(req, res) {
  const { email, password } = req.body;
  const errors = [];

  try {
    if (!email) {
      errors.push("email is required");
    } else if (typeof email !== "string" || !validate(email)) {
      errors.push("email is invalid");
    } else {
      const count = await prisma.user.count({ where: { email } });

      if (count !== 0) {
        errors.push("email is already registered");
      }
    }

    if (!password) {
      errors.push("password is required");
    }

    if (errors.length) {
      res.status(400).json({ status: 400, errors });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: encryptedPassword,
        },
      });

      res.status(201).json(user);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export default allow(["POST"], handler);
