import styles from "~/components/Layout.module.css";
import { useSession } from "next-auth/react";
import { getAllAvailabilities } from "~/lib/availabilities";

export const getServerSideProps = async () => {
  const allAvailabilities = await getAllAvailabilities();
  return {
    props: {
      allAvailabilities,
    },
  };
};

export default function Availabilities({ allAvailabilities }) {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <div className={styles.section}>
        <div>
          <h1>Availabilities</h1>
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
