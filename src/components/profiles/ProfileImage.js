import PropTypes from "prop-types";

export default function ProfileImage({ name, alt, width = 200, height = 200 }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/api/images/${name}`} alt={alt} width={width} height={height} />
  );
}

ProfileImage.propTypes = {
  name: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.oneOf(PropTypes.string, PropTypes.number),
  height: PropTypes.oneOf(PropTypes.string, PropTypes.number),
};
