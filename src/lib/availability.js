import prisma from "~/lib/prisma";

export const getAvailabilities = () => {
  return prisma.availability.findMany({
    select: {
      id: true,
      description: true,
    },
  });
};
