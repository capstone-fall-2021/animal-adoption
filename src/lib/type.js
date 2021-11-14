import prisma from "~/lib/prisma";

export const getAllTypes = () => {
  return prisma.type.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

export const getAllBreeds = () => {
  return prisma.breed.findMany({
    select: {
      id: true,
      name: true,
      type: {
        select: {
          name: true,
        },
      },
    },
  });
};
