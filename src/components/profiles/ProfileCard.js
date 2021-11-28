import PropTypes from "prop-types";
import ProfileImage from "./ProfileImage";

export default function ProfileCard({
  // id,
  name,
  availability,
  type,
  breed,
  dispositions,
  image,
}) {
  return (
    <div>
      <ProfileImage path={`/api/images/${image}`} alt={name} />
      <div>{name}</div>
      <div>{availability}</div>
      <div>
        {type} / {breed}
      </div>
      <ul>
        {dispositions.map((disposition) => (
          <li key={disposition}>{disposition}</li>
        ))}
      </ul>
    </div>
  );
}

ProfileCard.propTypes = {
  // id: PropTypes.number,
  name: PropTypes.string,
  availability: PropTypes.string,
  type: PropTypes.string,
  breed: PropTypes.string,
  dispositions: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
};
