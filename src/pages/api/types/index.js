import { connect, requireAdminSession } from "~/middleware";
import { findTypes, createType } from "~/repositories/types";
import { type } from "~/schemas";

const handler = connect();
handler.use(requireAdminSession(["POST"]));

handler.get(async (req, res) => {
  const results = await findTypes();
  res.status(200).json(results);
});

handler.post(async (req, res) => {
  await type.validate(req.body);
  const { name } = req.body;
  const result = await createType(name);
  res.status(201).json(result);
});

export default handler;
