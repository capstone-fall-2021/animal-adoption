import prisma from "~/prisma";

export function findProfiles(options = {}) {
  const { type, breed, disposition, availability } = options;
  const orderBy = options.orderBy ?? {};
  const where = {};

  if (type !== undefined) {
    where.breed = {
      type: {
        name: type,
      },
    };
  }

  if (breed !== undefined) {
    where.breed = {
      name: breed,
      ...where.breed,
    };
  }

  if (disposition !== undefined) {
    where.profileDispositions = {
      some: {
        disposition: {
          description: disposition,
        },
      },
    };
  }

  if (availability !== undefined) {
    where.availability = {
      description: availability,
    };
  }

  return prisma.profile.findMany({
    where,
    orderBy,
    select: {
      name: true,
      description: true,
      pictures: {
        select: {
          image: true,
        },
      },
      dispositions: {
        select: {
          disposition: {
            select: {
              description: true,
            },
          },
        },
      },
      availability: {
        select: {
          description: true,
        },
      },
    },
  });
}

export function findProfilesByBreedId(breedId) {
  return prisma.profile.findMany({
    where: {
      breedId,
    },
    select: {
      id: true,
      name: true,
      availability: {
        select: {
          description: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

export function createProfile({ dispositionIds, image, ...profile }) {
  return prisma.profile.create({
    data: {
      ...profile,
      dispositions: {
        create: dispositionIds.map((dispositionId) => ({
          dispositionId,
        })),
      },
      images: {
        create: [image],
      },
    },
  });
}
