import prisma from "~/prisma";

export async function createFavorite(userId, profileId) {
  const count = await prisma.favorite.count({
    where: {
      userId,
      profileId,
    },
  });

  if (count) {
    return {};
  }

  return prisma.favorite.create({
    data: {
      userId,
      profileId,
    },
  });
}
