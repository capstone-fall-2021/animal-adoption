import PropTypes from "prop-types";
import styled from "styled-components";

const SelectDispo = styled.select`
  margin-right: 10px;
  height: 30px;
  border-radius: 5px;
  @media screen and (max-width: 812px) {
    margin-bottom: 5px;
  }
`;

export default function DispositionSelect({ options, onChange, ...props }) {
  return (
    <SelectDispo {...props} onChange={onChange} defaultValue="">
      <option value="" disabled>
        Filter by disposition
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.description}
        </option>
      ))}
    </SelectDispo>
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
