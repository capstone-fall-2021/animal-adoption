import PropTypes from "prop-types";
import styled from "styled-components";

const ErrorMessage = styled.span`
  color: crimson;
`;

export default function FormError({ error }) {
  if (typeof error === "undefined" || error === null) {
    return null;
  }

  return <ErrorMessage>{error.message}</ErrorMessage>;
}

FormError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};
