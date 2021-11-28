import PropTypes from "prop-types";

export default function DispositionList({ dispositions }) {
  return (
    <ul>
      {dispositions.map(({ id, description }) => (
        <li key={id}>{description}</li>
      ))}
    </ul>
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
