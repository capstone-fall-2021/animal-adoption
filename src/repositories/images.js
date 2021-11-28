import prisma from "~/prisma";

export function getImageByName(name) {
  return prisma.image.findUnique({
    where: {
      name,
    },
    select: {
      mimeType: true,
      contents: true,
    },
  });
}
