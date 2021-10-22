import { prepareConnection } from "~/database";

export default async function handler(req, res) {
  try {
    await prepareConnection();
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error });
  }
}
