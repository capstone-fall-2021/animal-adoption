import fs from "fs/promises";
import mime from "mime-types";
import { v4 as uuidv4 } from "uuid";
import prisma from "~/prisma";

export function findFilteredProfiles(filters = {}) {
  const { type, breed, disposition, createdAt } = filters;
  const where = {
    availability: {
      is: {
        description: {
          in: ["Available", "Pending"],
        },
      },
    },
  };

  if (type) {
    where.breed = {
      type: {
        name: type,
      },
    };
  }

  if (breed) {
    where.breed = {
      name: breed,
      ...where.breed,
    };
  }

  if (disposition) {
    where.dispositions = {
      some: {
        disposition: {
          id: Number(disposition),
        },
      },
    };
  }

  if (createdAt) {
    where.createdAt = {
      gte: new Date(createdAt),
    };
  }

  return prisma.profile.findMany({
    where,
    select: {
      id: true,
      name: true,
      description: true,
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
      availability: {
        select: {
          description: true,
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
      images: {
        select: {
          name: true,
        },
      },
      createdAt: true,
    },
  });
}

export function findProfileById(id) {
  return prisma.profile.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      dob: true,
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
      availability: {
        select: {
          description: true,
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
      images: {
        select: {
          name: true,
        },
      },
      createdAt: true,
    },
  });
}

export function updateAvailabilityById(id, availabilityId) {
  return prisma.profile.update({
    where: {
      id,
    },
    data: {
      availabilityId,
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
      availabilityId: true,
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

export async function createProfile({ dispositionIds, image, ...profile }) {
  return prisma.profile.create({
    data: {
      ...profile,
      dispositions: {
        create: dispositionIds.map((dispositionId) => ({
          dispositionId,
        })),
      },
      images: {
        create: [
          {
            name: `${uuidv4()}.${mime.extension(image.mimeType)}`,
            mimeType: image.mimeType,
            contents: await fs.readFile(image.path),
          },
        ],
      },
    },
  });
}
