import { connect, requireSession } from "~/middleware";
import { findProfileById } from "~/repositories/profiles";

const handler = connect();
handler.use(requireSession(["GET"]));

handler.get(async (req, res) => {
  const result = await findProfileById(Number(req.query.id));

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send("Not found");
  }
});

export default handler;
