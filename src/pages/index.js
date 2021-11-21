import styles from "~/components/layout.module.css";

import { getProfiles } from "~/lib/profile";

import { getNews } from "~/lib/news";

export const getServerSideProps = async () => {
  const profileAll = await getProfiles({ orderBy: [{ createdAt: "desc" }] });

  const newsAll = await getNews({ orderBy: [{ createdAt: "desc" }] });

  return {
    props: {
      profileAll,
      newsAll,
    },
  };
};

export default function Home({ profileAll, newsAll }) {
  const profileAllDisplay = profileAll.map((item) => {
    const dispositionDisplay = item.profileDispositions.map((item2) => {
      return <li key={item2.id}>{item2.disposition.description}</li>;
    });
    return (
      <div key={item.id} className={styles.section}>
        <div className={styles.news_item}>
          <div>
            <div className={styles.section}>{item.pic}</div>
            <p>
              name: {item.name}
              <br />
              type: {item.breed.type.name}
              <br />
              breed: {item.breed.name}
              <br />
              description: {item.description}
              <br />
              disposition:
              <ul>{dispositionDisplay}</ul>
              <br />
              availability: {item.availability.description}
              <br />
            </p>
          </div>
        </div>
      </div>
    );
  });

  const newsAllDisplay = newsAll.map((item) => {
    return (
      <div key={item.id} className={styles.news_item}>
        {item.news}
      </div>
    );
  });

  return (
    <>
      <div className={styles.section}>
        {profileAllDisplay}
        <hr className={styles.section} />
        <hr className={styles.section} />
        <div className={styles.section}>{newsAllDisplay}</div>
      </div>
    </>
  );
}
