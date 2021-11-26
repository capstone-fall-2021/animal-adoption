import prisma from "~/prisma";

export const findAvailabilities = () => {
  return prisma.availability.findMany({
    orderBy: {
      description: "asc",
    },
  });
};
