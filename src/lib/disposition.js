import prisma from "~/lib/prisma";

export const getAllDispositions = () => {
  return prisma.disposition.findMany({
    select: {
      id: true,
      description: true,
    },
  });
};
