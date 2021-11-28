import PropTypes from "prop-types";

export default function FormError({ error }) {
  if (typeof error === "undefined" || error === null) {
    return null;
  }

  return <span>{error.message}</span>;
}

FormError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};
