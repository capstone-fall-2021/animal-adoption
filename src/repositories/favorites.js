import prisma from "~/prisma";

export function createFavorite(userId, profileId) {
  return prisma.favorite.create({
    data: {
      userId,
      profileId,
    },
  });
}
