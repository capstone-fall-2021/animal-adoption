import { connect } from "~/middleware";
import { createUser } from "~/repositories/users";
import { registration } from "~/schemas";

const handler = connect();

handler.post(async (req, res) => {
  try {
    await registration.validate(req.body, {
      stripUnknown: true,
    });
    const { email, password } = req.body;
    const user = await createUser(email, password);
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
