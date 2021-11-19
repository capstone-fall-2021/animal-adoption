import prisma from "~/lib/prisma";
import allow from "~/lib/allow";

export async function handler(req, res) {
  if (req.method == "POST") {
    const { body } = req;
    const { description } = JSON.parse(body);
    const new_disposition = {
      description: description,
      profiles: null,
    };
    const disposition = await prisma.disposition.create({
      data: new_disposition,
    });
    return res.status(200).json(disposition);
  }
  res.end();
}

export default allow(["POST"], handler);
