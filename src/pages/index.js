import styles from "~/components/layout.module.css";
import { PrismaClient } from "@prisma/client";

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();

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

  profileAll.forEach((item, index) => {
    console.log(item);
    console.log(index);
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

  newsAll.forEach((item, index) => {
    console.log(item);
    console.log(index);
  });

  return {
    props: {
      profileAll: profileAll,
      newsAll: newsAll,
    },
  };
};

export default function Home(getServerSideProps) {
  return (
    <>
      <div>{getServerSideProps.profileAll.toString()}</div>
      <div className={styles.section}>
        <div className={styles.section}>
          <div className={styles.news_item}>
            <div className={styles.align_center}>
              <div>animal name 1</div>
              <div className={styles.section}>Image</div>
            </div>
          </div>
          <div className={styles.news_item}>
            <div className={styles.align_center}>
              <div>animal name 2</div>
              <div className={styles.section}>Image</div>
            </div>
          </div>
          <div className={styles.news_item}>
            <div className={styles.align_center}>
              <div>animal name 3</div>
              <div className={styles.section}>Image</div>
            </div>
          </div>
        </div>
        <hr className={styles.section} />
        <hr className={styles.section} />
        <div className={styles.section}>
          <div className={styles.news_item}>
            News Item One News Item One News Item One News Item One News Item
            One
          </div>
          <div className={styles.news_item}>
            News Item Two News Item Two News Item Two News Item Two News Item
            Two
          </div>
          <div className={styles.news_item}>
            News Item Three News Item Three News Item Three News Item Three News
            Item Three
          </div>
        </div>
      </div>
    </>
  );
}
