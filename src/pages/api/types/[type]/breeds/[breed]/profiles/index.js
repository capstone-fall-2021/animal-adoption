import fs from "fs/promises";
import formidable from "formidable";
import {
  connect,
  requireAdminSession,
  validateType,
  validateBreed,
} from "~/middleware";
import { createProfile, findProfilesByBreedId } from "~/repositories/profiles";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = connect();
handler.use(requireAdminSession(["POST"]));
handler.use(validateType("type"));
handler.use(validateBreed("breed"));

handler.get(async (req, res) => {
  const result = await findProfilesByBreedId(req.breed.id);
  res.status(200).json(result);
});

handler.post((req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      throw err;
    }

    const { availabilityId, dob, dispositionIds, ...data } = fields;
    const picture = await fs.readFile(files.picture.filepath);

    const result = await createProfile({
      breedId: req.breed.id,
      availabilityId: Number(availabilityId),
      dob: new Date(dob),
      ...data,
      picture,
      dispositionIds: dispositionIds.split(",").map((id) => Number(id)),
    });

    res.status(201).json(result);
    res.end();
  });
});

export default handler;
