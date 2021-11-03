import styles from "~/components/layout.module.css";
import { PrismaClient } from "@prisma/client";

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();

  const newsAll = await prisma.news.findMany({
    select: {
      news: true,
    },
  });

  newsAll.forEach((item, index) => {
    console.log(item);
    console.log(index);
  });

  return {
    props: {
      newsall: newsAll,
    },
  };
};

export default function News(getServerSideProps) {
  return (
    <div className={styles.section}>
      <div>News</div>
      <div>{getServerSideProps.newsall.toString()}</div>
    </div>
  );
}
