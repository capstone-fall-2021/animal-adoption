import prisma from "~/lib/prisma";

export const getDispositions = () => {
  return prisma.disposition.findMany({
    select: {
      id: true,
      description: true,
    },
  });
};
