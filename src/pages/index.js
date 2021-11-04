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
      profileAll: profileAll,
      newsAll: newsAll,
    },
  };
};


export default function Home(getServerSideProps) {
  const profileAllDisplay = getServerSideProps.profileAll.map(function(item) {
    return         <div className={styles.section}>
    <div className={styles.news_item}>
      <div className={styles.align_center}>
        <div>{item.description}</div>
        <div className={styles.section}>{item.pic}</div>
      </div>
    </div>
  </div>
  });
 
  const newsAllDisplay = getServerSideProps.newsAll.map(function(item){
    return <div className={styles.news_item}>{item.news}</div>
  });


  return (

    <>

      <div className={styles.section}>
      {profileAllDisplay}
        <hr className={styles.section} />
        <hr className={styles.section} />
        <div className={styles.section}>
        {newsAllDisplay}
        </div>
      </div>
    </>
  );
}
