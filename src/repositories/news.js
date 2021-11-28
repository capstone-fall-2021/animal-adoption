import prisma from "~/prisma";

export function getNews(options = {}) {
  const orderBy = options.orderBy ?? [];
  return prisma.news.findMany({
    orderBy,
    select: {
      id: true,
      news: true,
    },
  });
}
