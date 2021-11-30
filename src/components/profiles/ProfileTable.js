import PropTypes from "prop-types";
import styled from "styled-components";
import AvailabilityDropdown from "./AvailabilityDropdown";

const ProfTable = styled.table`
  width: 50%;
  tr,
  th {
    border-bottom: 1px solid black;
    &:hover {
      background-color: #d6eeee;
    }
  }
  tbody td {
    margin-right: 70%;
  }
  td:nth-child(odd) {
    border-right: 1px solid black;
  }
`;

export default function ProfileTable({ availabilities, profiles }) {
  if (!profiles.length) {
    return null;
  }

  return (
    <ProfTable>
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
            <td>
              <center>
                <AvailabilityDropdown
                  profileId={profile.id}
                  availabilities={availabilities}
                  value={profile.availabilityId}
                />
              </center>
            </td>
          </tr>
        ))}
      </tbody>
    </ProfTable>
  );
}

ProfileTable.propTypes = {
  availabilities: PropTypes.arrayOf(PropTypes.object),
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      availability: PropTypes.shape({
        description: PropTypes.string,
      }),
    })
  ),
};
