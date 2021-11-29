import PropTypes from "prop-types";

export default function DateInput({ onChange, ...props }) {
  return <input {...props} type="date" onChange={onChange} />;
}

DateInput.propTypes = {
  onChange: PropTypes.func,
};
