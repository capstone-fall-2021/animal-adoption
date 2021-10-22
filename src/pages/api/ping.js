import { createConnection } from "typeorm";

export default async function handler(req, res) {
  try {
    await createConnection();
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error });
  }
}
