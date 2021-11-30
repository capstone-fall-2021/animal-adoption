import { connect, requireSession, requireAdminSession } from "~/middleware";
import {
  findProfileById,
  updateAvailabilityById,
} from "~/repositories/profiles";

const handler = connect();
handler.use(requireSession(["GET"]));
handler.use(requireAdminSession(["PATCH"]));

handler.get(async (req, res) => {
  const result = await findProfileById(Number(req.query.id));

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send("Not found");
  }
});

handler.patch(async (req, res) => {
  const result = await updateAvailabilityById(
    Number(req.query.id),
    Number(req.body.availabilityId)
  );

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send("Not found");
  }
});

export default handler;
