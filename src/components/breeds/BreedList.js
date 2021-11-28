import Link from "next/link";
import PropTypes from "prop-types";

export default function BreedList({ type, breeds }) {
  return (
    <ul>
      {breeds.map(({ id, name }) => (
        <li key={id}>
          <Link href={`/admin/types/${type}/breeds/${name}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}

BreedList.propTypes = {
  type: PropTypes.string,
  breeds: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};
