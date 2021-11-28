import prisma from "~/prisma";

export function findTypes() {
  return prisma.type.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export function createType(name) {
  return prisma.type.create({
    data: { name },
  });
}

export function getTypeByName(name) {
  return prisma.type.findUnique({
    where: {
      name,
    },
  });
}
