import prisma from "~/lib/prisma";

export const getAvailability = () => {
  return prisma.availability.findMany({
    select: {
      description: true,
    },
  });
};
