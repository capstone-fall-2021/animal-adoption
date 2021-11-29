import PropTypes from "prop-types";
import styled from "styled-components";

const SelectType = styled.select`
  margin-right: 10px;
  height: 30px;
  border-radius: 5px;
`;
export default function TypeSelect({ options, onChange, ...props }) {
  return (
    <SelectType {...props} onChange={onChange} defaultValue="">
      <option value="" disabled>
        Filter by type
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.name}>
          {option.name}
        </option>
      ))}
    </SelectType>
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
