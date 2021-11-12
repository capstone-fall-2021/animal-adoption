import styles from "~/components/Layout.module.css";
import { useSession } from "next-auth/react";
import { getAllTypes, getAllBreeds } from "~/lib/types";

export const getServerSideProps = async () => {
  const allTypes = await getAllTypes();
  const allBreeds = await getAllBreeds();
  return {
    props: {
      allTypes,
      allBreeds,
    },
  };
};

export default function Types({ allTypes, allBreeds }) {
  const { status } = useSession();
  const allTypesDisplay = allTypes.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
      </tr>
    );
  });
  const allBreedsDisplay = allBreeds.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.type.name}</td>
      </tr>
    );
  });
  if (status === "authenticated") {
    return (
      <div className={styles.section}>
        <div>
          <h1>Types</h1>
          <table border="2">
            <tr>
              <th>Types</th>
            </tr>
            {allTypesDisplay}
          </table>
        </div>
        <div>
          <h1>Breeds</h1>
          <table border="2">
            <tr>
              <th>Breeds</th>
              <th>Types</th>
            </tr>
            {allBreedsDisplay}
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
