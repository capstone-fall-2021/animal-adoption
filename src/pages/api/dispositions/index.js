import { connect, requireAdminSession } from "~/middleware";
import {
  createDisposition,
  findDispositions,
} from "~/repositories/dispositions";
import { disposition } from "~/schemas";

const handler = connect();
handler.use(requireAdminSession(["POST"]));

handler.get(async (req, res) => {
  const results = await findDispositions();
  res.status(200).json(results);
});

handler.post(async (req, res) => {
  await disposition.validate(req.body);
  const { description } = req.body;
  const result = await createDisposition(description);
  res.status(201).json(result);
});

export default handler;
