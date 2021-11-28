import prisma from "~/prisma";

export function getBreedByName(name) {
  return prisma.breed.findFirst({
    where: {
      name,
    },
  });
}

export function findBreedsByTypeId(typeId) {
  return prisma.breed.findMany({
    where: {
      typeId,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export function createBreed(typeId, name) {
  return prisma.breed.create({
    data: {
      typeId,
      name,
    },
  });
}
