import prisma from "~/prisma";

export function getFavoritesByUserId(userId) {
  return prisma.favorite.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      profile: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

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
