import { connect, requireSession } from "~/middleware";
import { findFilteredProfiles } from "~/repositories/profiles";

const handler = connect();
handler.use(requireSession(["GET"]));

handler.get(async (req, res) => {
  const results = await findFilteredProfiles(req.query);
  res.status(200).json(results);
});

export default handler;
