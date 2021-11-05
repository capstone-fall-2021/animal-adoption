import styles from "~/components/layout.module.css";
import prisma from "~/lib/prisma";

export const getServerSideProps = async () => {
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

  return {
    props: {
      profileAll,
      profileDogs,
    },
  };
};

export default function Profiles({ profileAll, profileDogs }) {
  const profileAllDisplay = profileAll.map(function (item, index) {
    return (
      <div key={index} className={styles.section}>
        <div className={styles.news_item}>
          <div className={styles.align_center}>
            <div>{item.description}</div>
            <div className={styles.section}>{item.pic}</div>
          </div>
        </div>
      </div>
    );
  });
  const profileDogsDisplay = profileDogs.map(function (item, index) {
    return (
      <div key={index} className={styles.section}>
        <div className={styles.news_item}>
          <div className={styles.align_center}>
            <div>{item.description}</div>
            <div className={styles.section}>{item.pic}</div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className={styles.section}>
      <div>
        <h1>Profiles</h1>
      </div>
      <div>{profileAllDisplay}</div>
      <div>{profileDogsDisplay}</div>
    </div>
  );
}
