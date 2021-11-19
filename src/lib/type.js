import prisma from "~/lib/prisma";

export const getTypes = () => {
  return prisma.type.findMany({
    select: {
      id: true,
      name: true,
      breeds: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getBreeds = () => {
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
