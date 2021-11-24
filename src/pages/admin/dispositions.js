import styles from "~/components/layout.module.css";
import { useSession } from "next-auth/react";
import { getDispositions } from "~/lib/disposition";

export const getServerSideProps = async () => {
  const dispositionsAll = await getDispositions();

  return {
    props: {
      dispositionsAll,
    },
  };
};

export default function Dispositions({ dispositionsAll }) {
  const { status } = useSession();
  const dispositionAllDisplay = dispositionsAll.map(function (item) {
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
          <h1>Dispositions</h1>
          <table border="2">
            <tr>
              <th>id</th>
              <th>description</th>
            </tr>
            {dispositionAllDisplay}
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