import { connect, requireAdminSession, validateType } from "~/middleware";
import { createBreed, findBreedsByTypeId } from "~/repositories/breeds";
import { breed } from "~/schemas";

const handler = connect();
handler.use(requireAdminSession(["POST"]));
handler.use(validateType("type"));

handler.get(async (req, res) => {
  const result = await findBreedsByTypeId(req.type.id);
  res.status(200).json(result);
});

handler.post(async (req, res) => {
  await breed.validate(req.body);
  const { name } = req.body;
  const result = await createBreed(req.type.id, name);
  res.status(201).json(result);
});

export default handler;
