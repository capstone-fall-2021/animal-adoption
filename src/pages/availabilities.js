import styles from "~/components/Layout.module.css";
import { useSession } from "next-auth/react";
import { getAvailabilities } from "~/lib/availability";

export const getServerSideProps = async () => {
  const allAvailabilities = await getAvailabilities();
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
        <td>{item.id}</td>
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
              <th>id</th>
              <th>description</th>
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
