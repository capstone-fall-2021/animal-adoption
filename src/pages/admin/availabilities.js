import styles from "~/components/layout.module.css";
import { getAvailabilities } from "~/lib/availability";
import { getSessionUser } from "~/lib/session";

export const getServerSideProps = async (context) => {
  const user = await getSessionUser(context);

  if (!user?.admin) {
    return { notFound: true };
  }

  const availabilities = await getAvailabilities();

  return {
    props: {
      availabilities,
    },
  };
};

export default function Availabilities({ availabilities }) {
  return (
    <div className={styles.section}>
      <div>
        <h1>Availabilities</h1>
        <table border="2">
          <tr>
            <th>id</th>
            <th>description</th>
          </tr>
          {availabilities.map((availability) => (
            <tr key={availability.id}>
              <td>{availability.id}</td>
              <td>{availability.description}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
