import { getSession } from "next-auth/react";
import { findUserByEmail } from "./user";

export async function getSessionUser(context) {
  const session = await getSession(context);

  if (session?.user?.email) {
    return findUserByEmail(session.user.email);
  }

  return null;
}
