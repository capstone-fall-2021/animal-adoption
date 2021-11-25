import styles from "~/components/layout.module.css";
import { getNews } from "~/lib/news";
import { getSessionUser } from "~/lib/session";

export const getServerSideProps = async (context) => {
  const user = await getSessionUser(context);

  if (!user?.admin) {
    return { notFound: true };
  }

  const news = await getNews();

  return {
    props: {
      news,
    },
  };
};

export default function NewsItems({ news }) {
  return (
    <div className={styles.section}>
      <div>
        <h1>News Items</h1>
        <table border="2">
          <tr>
            <th>id</th>
            <th>news</th>
          </tr>
          {news.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.news}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
