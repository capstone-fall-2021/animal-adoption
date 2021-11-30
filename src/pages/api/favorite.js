import { getSession } from "next-auth/client";
import { connect, requireSession } from "~/middleware";
import { createFavorite } from "~/repositories/favorites";
import { findUserByEmail } from "~/repositories/users";
import { favorite } from "~/schemas";

const handler = connect();
handler.use(requireSession(["POST"]));

handler.post(async (req, res) => {
  await favorite.validate(req.body);
  const session = await getSession({ req });
  const user = await findUserByEmail(session.user.email);
  const result = await createFavorite(user.id, req.body.profileId);
  res.status(201).json(result);
});

export default handler;
