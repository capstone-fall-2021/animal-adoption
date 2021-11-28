import { connect } from "~/middleware";
import { getTypeByName } from "~/repositories/types";

const handler = connect();

handler.get(async (req, res) => {
  const result = await getTypeByName(req.query.type);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send("Not found");
  }
});

export default handler;
