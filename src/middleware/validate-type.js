import { getTypeByName } from "~/repositories/types";

export default function validateType(param) {
  return async (req, res, next) => {
    const type = await getTypeByName(req.query[param]);

    if (type) {
      req.type = type;
      return next();
    }

    res.status(404).send("Not found");
  };
}
