import prisma from "~/lib/prisma";

export const getNews = (options = {}) => {
  const orderBy = options.orderBy ?? [];
  return prisma.news.findMany({
    orderBy,
    select: {
      id: true,
      news: true,
    },
  });
};
