import { connect, requireAdminSession } from "~/middleware";
import {
  createDisposition,
  findDispositions,
} from "~/repositories/dispositions";

const handler = connect();
handler.use(requireAdminSession(["POST"]));

handler.get(async (req, res) => {
  const results = await findDispositions();
  res.status(200).json(results);
});

handler.post(async (req, res) => {
  const { description } = req.body;
  const result = await createDisposition(description);
  res.status(201).json(result);
});

export default handler;
