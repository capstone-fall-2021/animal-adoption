import { connect, requireAdminSession } from "~/middleware";
import { findTypes, createType } from "~/repositories/types";

const handler = connect();
handler.use(requireAdminSession(["POST"]));

handler.get(async (req, res) => {
  const results = await findTypes();
  res.status(200).json(results);
});

handler.post(async (req, res) => {
  const { name } = req.body;
  const result = await createType(name);
  res.status(201).json(result);
});

export default handler;
