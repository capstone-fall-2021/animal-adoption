import { getSession } from "next-auth/client";

export default function requireAdminSession(methods = []) {
  return async (req, res, next) => {
    if (methods.includes(req.method)) {
      const session = await getSession({ req });

      if (!session) {
        res.status(401).send("Unauthorized");
        return;
      }
    }

    return next();
  };
}
