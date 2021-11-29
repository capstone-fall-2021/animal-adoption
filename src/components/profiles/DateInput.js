import PropTypes from "prop-types";
import styled from "styled-components";

const InputDate = styled.input`
  height: 30px;
  border-radius: 5px;
`;

export default function DateInput({ onChange, ...props }) {
  return <InputDate {...props} type="date" onChange={onChange} />;
}

DateInput.propTypes = {
  onChange: PropTypes.func,
};
