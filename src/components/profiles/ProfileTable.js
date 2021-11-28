import PropTypes from "prop-types";

export default function ProfileTable({ profiles }) {
  if (!profiles.length) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Availability</th>
        </tr>
      </thead>
      <tbody>
        {profiles.map((profile) => (
          <tr key={profile.id}>
            <td>{profile.name}</td>
            <td>{profile.availability.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ProfileTable.propTypes = {
  profiles: PropTypes.arrayOf({
    id: PropTypes.number,
    name: PropTypes.string,
    availability: PropTypes.shape({
      description: PropTypes.string,
    }),
  }),
};
