import prisma from "~/lib/prisma";

export const getAllDispositions = () => {
  return prisma.disposition.findMany({
    select: {
      description: true,
    },
  });
};
