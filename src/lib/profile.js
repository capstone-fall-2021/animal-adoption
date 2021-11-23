import prisma from "~/lib/prisma";

export const getProfiles = (options = {}) => {
  const where = {};
  const { type, breed, disposition, availability } = options;

  const orderBy = options.orderBy ?? [];

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
  if (disposition != undefined) {
    where.profileDispositions = {
      some: {
        disposition: {
          description: disposition,
        },
      },
    };
  }
  if (availability != undefined) {
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
      breed: {
        select: {
          name: true,
          type: {
            select: {
              name: true,
            },
          },
        },
      },
      profileDispositions: {
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
};
