import prisma from "~/lib/prisma";
import allow from "~/lib/allow";

export async function handler(req, res) {
  try {
    if (req.method == "POST") {
      const { body } = req;
      const { name, typeId } = JSON.parse(body);
      const new_breed = {
        name: name,
        typeId: typeId,
      };
      const breed = await prisma.breed.create({
        data: new_breed,
      });
      return res.status(200).json(breed);
    }
    res.end();
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
}

export default allow(["POST"], handler);
