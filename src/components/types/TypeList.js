import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";

const ListTypes = styled.ul`
  margin-left: 47.5%;
  margin-right: 42%;
`;

export default function TypeList({ types }) {
  return (
    <ListTypes>
      {types.map(({ id, name }) => (
        <li key={id}>
          <Link href={`/admin/types/${name}`}>{name}</Link>
        </li>
      ))}
    </ListTypes>
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
