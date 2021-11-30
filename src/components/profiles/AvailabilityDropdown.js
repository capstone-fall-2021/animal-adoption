import { $fetch } from "ohmyfetch";
import PropTypes from "prop-types";

export default function AvailabilityDropdown({
  profileId,
  availabilities,
  value,
}) {
  function handleChange(event) {
    $fetch(`/api/profiles/${profileId}`, {
      method: "PATCH",
      body: {
        availabilityId: event.target.value,
      },
    });
  }

  return (
    <select onChange={handleChange} defaultValue={value}>
      {availabilities.map((availability) => (
        <option key={availability.id} value={availability.id}>
          {availability.description}
        </option>
      ))}
    </select>
  );
}

AvailabilityDropdown.propTypes = {
  profileId: PropTypes.number,
  availabilities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
    })
  ),
  value: PropTypes.number,
};
