import prisma from "~/lib/prisma";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { body } = req;
    const {
      description,
      pic: { 0: { url } = {} },
      breed,
      breedId,
      disposition,
      dispositionId,
      availability,
      availabilityId,
    } = JSON.parse(body);
    const new_profile = {
      description: description,
      pic: url,
      breed: breed,
      breedId: breedId,
      disposition: disposition,
      dispositionId: dispositionId,
      availability: availability,
      availabilityId: availabilityId,
    };
    const profile = await prisma.profile.create({
      data: new_profile,
    });
    return res.status(200).json(profile);
  }
  res.end();
};

export default handler;
