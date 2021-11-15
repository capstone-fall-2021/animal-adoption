import styles from "~/components/layout.module.css";
import { getNews } from "~/lib/news";

export const getServerSideProps = async () => {
  const newsAll = await getNews();

  return {
    props: {
      newsAll,
    },
  };
};

export default function News({ newsAll }) {
  const newsAllDisplay = newsAll.map(function (item) {
    return (
      <div key={item.id} className={styles.news_item}>
        {item.news}
      </div>
    );
  });
  return (
    <div className={styles.section}>
      <h1>News</h1>
      <div>{newsAllDisplay}</div>
    </div>
  );
}
