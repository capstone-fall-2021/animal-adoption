import prisma from "~/lib/prisma";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { body } = req;
    const { name, type, typeId } = JSON.parse(body);
    const new_breed = {
      name: name,
      type: type,
      typeId: typeId,
    };
    const breed = await prisma.breed.create({
      data: new_breed,
    });
    // TODO:  add update to type breeds attribute
    return res.status(200).json(breed);
  }
  res.end();
};

export default handler;
