import { validate } from "isemail";
import allow from "~/lib/allow";
import { userEmailExists, hashPassword, registerUser } from "~/lib/user";

export async function handler(req, res) {
  const { email, password } = req.body;
  const errors = [];

  try {
    if (!email) {
      errors.push("email is required");
    } else if (typeof email !== "string" || !validate(email)) {
      errors.push("email is invalid");
    } else {
      const emailExists = await userEmailExists(email);

      if (emailExists) {
        errors.push("email is already registered");
      }
    }

    if (!password) {
      errors.push("password is required");
    }

    if (errors.length) {
      res.status(400).json({ status: 400, errors });
      return;
    }

    const hash = await hashPassword(password);
    const user = await registerUser({ email, hash });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export default allow(["POST"], handler);
