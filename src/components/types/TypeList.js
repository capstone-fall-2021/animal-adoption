import Link from "next/link";
import PropTypes from "prop-types";

export default function TypeList({ types }) {
  return (
    <ul>
      {types.map(({ id, name }) => (
        <li key={id}>
          <Link href={`/admin/types/${name}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}

TypeList.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};
