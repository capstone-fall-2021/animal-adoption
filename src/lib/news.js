import prisma from "~/lib/prisma";

export const getAllNewsItems = () => {
  return prisma.news.findMany({
    select: {
      news: true,
    },
  });
};

export const getAllNewsItemsDesc = () => {
  return prisma.news.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    select: {
      news: true,
    },
  });
};
