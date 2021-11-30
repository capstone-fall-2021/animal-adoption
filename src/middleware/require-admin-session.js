import { getSessionUser } from "~/session";

export default function requireAdminSession(methods = []) {
  return async (req, res, next) => {
    if (methods.includes(req.method)) {
      const user = await getSessionUser({ req });

      if (!user || !user.admin) {
        res.status(401).send("Unauthorized");
        return;
      }
    }

    return next();
  };
}
