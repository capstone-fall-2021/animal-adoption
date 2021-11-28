import PropTypes from "prop-types";

export default function DispositionSelect({ options, onChange, ...props }) {
  return (
    <select {...props} onChange={onChange} defaultValue="">
      <option value="" disabled>
        Filter by disposition
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.description}
        </option>
      ))}
    </select>
  );
}

DispositionSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
};
