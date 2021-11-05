import styles from "~/components/layout.module.css";
import prisma from "~/lib/prisma";

export const getServerSideProps = async () => {
  const profileAll = await prisma.profile.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    select: {
      description: true,
      pic: true,
      breed: {
        select: {
          name: true,
          type: {
            select: {
              name: true,
            },
          },
        },
      },
      disposition: {
        select: {
          description: true,
        },
      },
      availability: {
        select: {
          description: true,
        },
      },
    },
  });

  const newsAll = await prisma.news.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    select: {
      news: true,
    },
  });

  return {
    props: {
      profileAll,
      newsAll,
    },
  };
};

export default function Home({ profileAll, newsAll }) {
  const profileAllDisplay = profileAll.map((item) => {
    return (
      <div key={item.id} className={styles.section}>
        <div className={styles.news_item}>
          <div className={styles.align_center}>
            <div>{item.description}</div>
            <div className={styles.section}>{item.pic}</div>
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
