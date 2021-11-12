import prisma from "~/lib/prisma";

export const getAllTypes = () => {
  return prisma.type.findMany({
    select: {
      name: true,
    },
  });
};

export const getAllBreeds = () => {
  return prisma.breed.findMany({
    select: {
      name: true,
      type: {
        select: {
          name: true,
        },
      },
    },
  });
};
