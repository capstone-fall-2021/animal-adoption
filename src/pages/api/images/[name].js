import { connect } from "~/middleware";
import { getImageByName } from "~/repositories/images";

const handler = connect();

handler.get(async (req, res) => {
  const image = await getImageByName(req.query.name);

  if (image) {
    res.setHeader("Content-Type", image.mimeType);
    res.setHeader("Content-Length", image.contents.length);
    res.setHeader("Cache-Control", "public, max-age=604800;");
    res.status(200).send(image.contents);
  } else {
    res.status(404).send("Not found");
  }
});

export default handler;
