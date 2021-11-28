import { connect } from "~/middleware";
import { getImageByName } from "~/repositories/images";

const handler = connect();

handler.get(async (req, res) => {
  const name = `${req.query.path}/${req.query.name}`;
  const image = await getImageByName(name);

  if (image) {
    res.setHeader("Content-Type", image.mimeType);
    res.status(200).send(image.contents);
  } else {
    res.status(404).send("Not found");
  }
});

export default handler;
