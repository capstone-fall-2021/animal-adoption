import prisma from "~/lib/prisma";
import allow from "~/lib/allow";

export async function handler(req, res) {
  if (req.method == "POST") {
    const { body } = req;
    const {
      name,
      age,
      description,
      breed,
      breedId,
      availability,
      availabilityId,
      profileDispositions,
      pictures,
    } = JSON.parse(body);
    const new_profile = {
      name: name,
      age: age,
      description: description,
      breed: breed,
      breedId: breedId,
      availability: availability,
      availabilityId: availabilityId,
      profileDispositions: profileDispositions,
      pictures: pictures,
    };
    const profile = await prisma.profile.create({
      data: new_profile,
    });
    return res.status(200).json(profile);
  } else if (req.method == "DELETE") {
    const { body } = req;
    const { id } = JSON.parse(body);
    await prisma.Profile.delete({
      where: {
        id: id,
      },
    });
    return res.status(204);
  }
  res.end();
}

export default allow(["POST", "DELETE"], handler);
