import styles from "~/components/Layout.module.css";
import { useSession } from "next-auth/react";
import { getAvailability } from "~/lib/availabilities";

export const getServerSideProps = async () => {
  const allAvailabilities = await getAvailability();
  return {
    props: {
      allAvailabilities,
    },
  };
};

export default function Availabilities({ allAvailabilities }) {
  const { status } = useSession();
  const availabilitiesAllDisplay = allAvailabilities.map(function (item) {
    return (
      <tr key={item.id}>
        <td>{item.description}</td>
      </tr>
    );
  });

  if (status === "authenticated") {
    return (
      <div className={styles.section}>
        <div>
          <h1>Availabilities</h1>
          <table border="2">
            <tr>
              <th>Description</th>
            </tr>
            {availabilitiesAllDisplay}
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
