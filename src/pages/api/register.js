import * as yup from "yup";
import { connect } from "~/middleware";
import { emailExists, hashPassword, registerUser } from "~/repositories/users";
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

const handler = connect();

handler.post(async (req, res) => {
  try {
    await schema.validate(req.body, { stripUnknown: true });
    const { email, password } = req.body;
    const hash = await hashPassword(password);
    const user = await registerUser(email, hash);
    res.status(201).json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: err.errors[0] });
    } else {
      throw err;
    }
  }
});

export default handler;
