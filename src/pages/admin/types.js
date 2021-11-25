import styles from "~/components/layout.module.css";
import { getSessionUser } from "~/lib/session";
import { getTypes, getBreeds } from "~/lib/type";

export const getServerSideProps = async (context) => {
  const user = await getSessionUser(context);

  if (!user?.admin) {
    return { notFound: true };
  }

  const [types, breeds] = await Promise.all([getTypes(), getBreeds()]);

  return {
    props: {
      types,
      breeds,
    },
  };
};

export default function Types({ types, breeds }) {
  return (
    <div className={styles.section}>
      <div>
        <h1>Types</h1>
        <table border="2">
          <tr>
            <th>id</th>
            <th>types</th>
          </tr>
          {types.map((type) => (
            <tr key={type.id}>
              <td>{type.id}</td>
              <td>{type.name}</td>
            </tr>
          ))}
        </table>
      </div>
      <div>
        <h1>Breeds</h1>
        <table border="2">
          <tr>
            <th>id</th>
            <th>breeds</th>
            <th>types</th>
          </tr>
          {breeds.map((breed) => (
            <tr key={breed.id}>
              <td>{breed.id}</td>
              <td>{breed.name}</td>
              <td>{breed.type.name}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
