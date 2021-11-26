import prisma from "~/lib/prisma";
import allow from "~/lib/allow";

export async function handler(req, res) {
  try {
    if (req.method == "POST") {
      const { body } = req;
      const {
        name,
        age,
        description,
        breedId,
        availabilityId,
        profileDispositions,
        pictures,
      } = JSON.parse(body);
      const new_profile = {
        name: name,
        age: age,
        description: description,
        breedId: breedId,
        availabilityId: availabilityId,
      };
      const profile = await prisma.profile.create({
        data: new_profile,
      });
      if (profileDispositions.length != 0) {
        for (var i = 0; i < profileDispositions.length; i++) {
          await prisma.profileDisposition.create({
            data: {
              profile: { connect: { id: profile.id } },
              disposition: { connect: { id: profileDispositions[i].id } },
            },
          });
        }
      }
      if (pictures.length != 0) {
        for (var j = 0; j < pictures.length; j++) {
          await prisma.pictures.create({
            data: {
              profile: { connect: { id: profile.id } },
              image: pictures[j],
            },
          });
        }
      }
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
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [error.message] });
  }
}

export default allow(["POST", "DELETE"], handler);
