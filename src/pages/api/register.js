import * as yup from "yup";
import allow from "~/lib/allow";
import { emailExists, hashPassword, registerUser } from "~/lib/user";
import { email, password } from "~/schemas";

const schema = yup.object({
  email: email
    .required()
    .test(
      "is-email-unique",
      "${path} is already registered",
      async (value) => !(await emailExists(value))
    ),
  password,
});

export async function handler(req, res) {
  try {
    await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const { email, password } = req.body;
    const hash = await hashPassword(password);
    const user = await registerUser(email, hash);
    res.status(201).json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ errors: err.errors });
    } else {
      res.status(500).json({ errors: [err.message] });
    }
  }
}

export default allow(["POST"], handler);
