import styles from "~/components/layout.module.css";
import { getDispositions } from "~/lib/disposition";
import { getSessionUser } from "~/lib/session";

export const getServerSideProps = async (context) => {
  const user = await getSessionUser(context);

  if (!user?.admin) {
    return { notFound: true };
  }

  const dispositions = await getDispositions();

  return {
    props: {
      dispositions,
    },
  };
};

export default function Dispositions({ dispositions }) {
  return (
    <div className={styles.section}>
      <div>
        <h1>Dispositions</h1>
        <table border="2">
          <tr>
            <th>id</th>
            <th>description</th>
          </tr>
          {dispositions.map((disposition) => (
            <tr key={disposition.id}>
              <td>{disposition.id}</td>
              <td>{disposition.description}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
