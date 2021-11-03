import Layout from "~/components/layout";
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
              name: true
            }
          }
        }
      },
      disposition: {
        select: {
          description: true
        }
      },
      availability: {
        select: {
          description: true
        }
      }
    }
  })

  const profileDogs = await prisma.profile.findMany({
    where: {
      breed: {
        type: {
          name: "dog"
        }
      }
    },
    select: {
      description: true,
      pic: true,
      breed: {
        select: {
          name: true,
          type: {
            select: {
              name: true
            }
          }
        }
      },
      disposition: {
        select: {
          description: true
        }
      },
      availability: {
        select: {
          description: true
        }
      }
    }
  })

  profileDogs.forEach((item, index) => {
    console.log(item);
  })

  profileAll.forEach((item, index) => {
    console.log(item);
  })


  return {
    props: {
      test: "hello",
      profileAll: profileAll
    }
  }
  
}


export default function Profiles(getServerSideProps) {

  return (
    <div className={styles.section}>
      <div>Profiles</div>
      <div>availability</div>
      <div>{getServerSideProps.test}</div>
      <div>{getServerSideProps.profileAll.toString()}</div>
    </div>
  );
}
