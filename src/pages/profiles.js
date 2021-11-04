import styles from "~/components/layout.module.css";
import { PrismaClient } from "@prisma/client";

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();

  const profileAll = await prisma.profile.findMany({
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

  const profileDogs = await prisma.profile.findMany({
    where: {
      breed: {
        type: {
          name: "dog",
        },
      },
    },
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

  profileDogs.forEach((item, index) => {
    console.log(item);
    console.log(index);
  });

  profileAll.forEach((item, index) => {
    console.log(item);
    console.log(index);
    console.log(typeof profileAll);
  });

  return {
    props: {
      profileAll: profileAll,
    },
  };
};

export default function Profiles(getServerSideProps) {
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
  return (
    <div className={styles.section}>
      <div>
        <h1>Profiles</h1>
      </div>
      <div>{profileAllDisplay}</div>
    </div>
  );
}
