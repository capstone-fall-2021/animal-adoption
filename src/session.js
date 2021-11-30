import { getSession } from "next-auth/client";
import { findUserByEmail } from "~/repositories/users";

export async function getSessionUser(context) {
  const session = await getSession(context);

  if (session?.user?.email) {
    return findUserByEmail(session.user.email);
  }

  return null;
}

export function withAdminSession(callback) {
  return async (context) => {
    const user = await getSessionUser(context);

    if (!user || !user.admin) {
      return {
        notFound: true,
      };
    }

    return typeof callback === "function" ? callback(context) : { props: {} };
  };
}
