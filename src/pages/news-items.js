import styles from "~/components/Layout.module.css";
import { useSession } from "next-auth/react";
import { getNews } from "~/lib/news";

export const getServerSideProps = async () => {
  const newsAll = await getNews();

  return {
    props: {
      newsAll,
    },
  };
};

export default function NewsItems({ newsAll }) {
  const { status } = useSession();
  const newsAllDisplay = newsAll.map(function (item) {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.news}</td>
      </tr>
    );
  });

  if (status === "authenticated") {
    return (
      <div className={styles.section}>
        <div>
          <h1>News Items</h1>
          <table border="2">
            <tr>
              <th>id</th>
              <th>news</th>
            </tr>
            {newsAllDisplay}
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.section}>
        <div>
          <h1>Not Authorized</h1>
        </div>
      </div>
    );
  }
}
