import PropTypes from "prop-types";

export default function ProfileImage({ path, alt }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={path} alt={alt} width="200" height="150" />;
}

ProfileImage.propTypes = {
  path: PropTypes.string,
  alt: PropTypes.string,
};
