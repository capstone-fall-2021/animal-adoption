import PropTypes from "prop-types";

export default function TypeSelect({ options, onChange, ...props }) {
  return (
    <select {...props} onChange={onChange} defaultValue="">
      <option value="" disabled>
        Filter by type
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

TypeSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
};
