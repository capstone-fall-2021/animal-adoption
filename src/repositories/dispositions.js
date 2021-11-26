import prisma from "~/prisma";

export function findDispositions() {
  return prisma.disposition.findMany({
    orderBy: {
      description: "asc",
    },
  });
}

export function createDisposition(description) {
  return prisma.disposition.create({
    data: {
      description,
    },
  });
}
