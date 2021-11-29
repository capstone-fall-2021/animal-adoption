import PropTypes from "prop-types";
import styled from "styled-components";

const DispoList = styled.ul`
  margin-left: 42%;
  margin-right: 42%;
  margin-top: 2%;
`;

export default function DispositionList({ dispositions }) {
  return (
    <DispoList>
      {dispositions.map(({ id, description }) => (
        <li key={id}>{description}</li>
      ))}
    </DispoList>
  );
}

DispositionList.propTypes = {
  dispositions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
    })
  ),
};
