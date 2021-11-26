import PropTypes from "prop-types";
import styles from "~/components/layout.module.css";
import { getNews } from "~/repositories/news";

export const getServerSideProps = async () => {
  return {
    props: {
      news: await await getNews(),
    },
  };
};

export default function News({ news }) {
  return (
    <div className={styles.section}>
      <h1>News</h1>
      <div>
        {news.map((item) => (
          <div key={item.id} className={styles.news_item}>
            {item.news}
          </div>
        ))}
      </div>
    </div>
  );
}

News.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      news: PropTypes.string,
    })
  ),
};
