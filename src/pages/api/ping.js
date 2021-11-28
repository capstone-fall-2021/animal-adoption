import prisma from "~/prisma";

export default async function handler(req, res) {
  try {
    await prisma.$executeRaw`SELECT 1`;
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error });
  }
}
