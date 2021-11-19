import prisma from "~/lib/prisma";
import allow from "~/lib/allow";

export async function handler(req, res) {
  if (req.method == "POST") {
    const { body } = req;
    const { name } = JSON.parse(body);
    const new_type = {
      name: name,
      breeds: null,
    };
    const type = await prisma.type.create({
      data: new_type,
    });
    return res.status(200).json(type);
  }
  res.end();
}

export default allow(["POST"], handler);
