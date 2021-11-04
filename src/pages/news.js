import styles from "~/components/layout.module.css";
import prisma from "~/lib/prisma";

export const getServerSideProps = async () => {
  const newsAll = await prisma.news.findMany({
    select: {
      news: true,
    },
  });

  return {
    props: {
      newsAll: newsAll,
    },
  };
};

export default function News(getServerSideProps) {
  const newsAllDisplay = getServerSideProps.newsAll.map(function(item){
    return <div className={styles.news_item}>{item.news}</div>
  });
  return (
    <div className={styles.section}>
      <h1>News</h1>
      <div>{newsAllDisplay}</div>
    </div>
  );
}
