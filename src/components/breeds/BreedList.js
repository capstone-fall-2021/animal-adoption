import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";

const ListBreeds = styled.ul`
  margin-left: 45%;
`;

export default function BreedList({ type, breeds }) {
  return (
    <ListBreeds>
      {breeds.map(({ id, name }) => (
        <li key={id}>
          <Link href={`/admin/types/${type}/breeds/${name}`}>{name}</Link>
        </li>
      ))}
    </ListBreeds>
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
